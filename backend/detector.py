import os
import math
import cv2
from ultralytics import YOLO


model = YOLO("yolov8n.pt")


def analyze_video(video_path):

    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        raise ValueError("Could not open uploaded video.")

    original_width = int(
        cap.get(cv2.CAP_PROP_FRAME_WIDTH)
    )

    original_height = int(
        cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
    )

    fps = cap.get(cv2.CAP_PROP_FPS)

    if fps <= 0:
        fps = 30

    total_frames = int(
        cap.get(cv2.CAP_PROP_FRAME_COUNT)
    )

    duration = (
        total_frames / fps
        if total_frames > 0
        else 0
    )

    # ---------------------------------------
    # Resize large videos
    # ---------------------------------------

    max_width = 1280

    width = original_width
    height = original_height

    if width > max_width:

        scale = max_width / width

        width = int(width * scale)
        height = int(height * scale)

    # ---------------------------------------
    # Output video
    # ---------------------------------------

    os.makedirs(
        "outputs",
        exist_ok=True
    )

    output_path = (
        "outputs/processed_video.mp4"
    )

    writer = cv2.VideoWriter(
        output_path,
        cv2.VideoWriter_fourcc(*"avc1"),
        fps,
        (width, height)
    )

    # ---------------------------------------
    # Vehicle counting
    # ---------------------------------------

    counted_ids = set()

    counts = {
        "car": 0,
        "motorcycle": 0,
        "bus": 0,
        "truck": 0
    }

    # ---------------------------------------
    # Tracking data
    # ---------------------------------------

    track_history = {}

    speed_data = {}
        # ---------------------------------------
    # Lane analysis
    # ---------------------------------------

    lane_vehicle_ids = {
        "Lane 01": set(),
        "Lane 02": set(),
        "Lane 03": set()
    }

    # ---------------------------------------
    # Traffic flow
    # ---------------------------------------

    vehicles_per_frame = []

    traffic_flow = []

    # ---------------------------------------
    # Processing settings
    # ---------------------------------------

    frame_skip = 5

    frame_number = 0

    frames_processed = 0

    while True:

        success, frame = cap.read()

        if not success:
            break

        frame_number += 1

        # -----------------------------------
        # Resize frame
        # -----------------------------------

        if (
            frame.shape[1] != width
            or frame.shape[0] != height
        ):

            frame = cv2.resize(
                frame,
                (width, height),
                interpolation=cv2.INTER_AREA
            )

        # -----------------------------------
        # Skip frames for faster processing
        # -----------------------------------

        if frame_number % frame_skip != 0:

            writer.write(frame)

            continue

        frames_processed += 1

        # -----------------------------------
        # YOLO + ByteTrack
        # -----------------------------------

        results = model.track(
            frame,
            persist=True,
            tracker="bytetrack.yaml",
            imgsz=512,
            conf=0.35,
            verbose=False
        )

        result = results[0]

        annotated_frame = result.plot()

        writer.write(
            annotated_frame
        )

        # -----------------------------------
        # Current vehicles in frame
        # -----------------------------------

        current_vehicle_count = 0

        if result.boxes is not None:

            classes = (
                result.boxes.cls
                .int()
                .cpu()
                .tolist()
            )

            current_vehicle_count = sum(
                1
                for cls in classes
                if cls in [2, 3, 5, 7]
            )

        vehicles_per_frame.append(
            current_vehicle_count
        )

        traffic_flow.append(
            current_vehicle_count
        )

        # -----------------------------------
        # No tracked objects
        # -----------------------------------

        if (
            result.boxes is None
            or result.boxes.id is None
        ):
            continue

        # -----------------------------------
        # Tracking IDs
        # -----------------------------------

        ids = (
            result.boxes.id
            .int()
            .cpu()
            .tolist()
        )

        classes = (
            result.boxes.cls
            .int()
            .cpu()
            .tolist()
        )

        boxes = (
            result.boxes.xyxy
            .cpu()
            .tolist()
        )

        # -----------------------------------
        # Process every tracked vehicle
        # -----------------------------------

        for track_id, cls, box in zip(
            ids,
            classes,
            boxes
        ):

            x1, y1, x2, y2 = box

            # Vehicle center
            center_x = (
                x1 + x2
            ) / 2

            center_y = (
                y1 + y2
            ) / 2

            current_position = (
                center_x,
                center_y
            )
                        # --------------------------------
            # Lane detection
            # --------------------------------

            if center_x < width / 3:
                lane_name = "Lane 01"

            elif center_x < (width * 2) / 3:
                lane_name = "Lane 02"

            else:
                lane_name = "Lane 03"

            lane_vehicle_ids[lane_name].add(track_id)

            # --------------------------------
            # Speed estimation
            # --------------------------------

            if track_id in track_history:

                previous_position = (
                    track_history[track_id]
                )

                dx = (
                    current_position[0]
                    - previous_position[0]
                )

                dy = (
                    current_position[1]
                    - previous_position[1]
                )

                pixel_distance = math.sqrt(
                    dx * dx + dy * dy
                )

                time_between_frames = (
                    frame_skip / fps
                )

                if time_between_frames > 0:

                    pixel_speed = (
                        pixel_distance
                        / time_between_frames
                    )

                    speed_data[track_id] = (
                        pixel_speed
                    )

            # Save latest position
            track_history[track_id] = (
                current_position
            )

            # --------------------------------
            # Count unique vehicles
            # --------------------------------

            if track_id in counted_ids:
                continue

            counted_ids.add(
                track_id
            )

            if cls == 2:

                counts["car"] += 1

            elif cls == 3:

                counts["motorcycle"] += 1

            elif cls == 5:

                counts["bus"] += 1

            elif cls == 7:

                counts["truck"] += 1

    # ---------------------------------------
    # Release resources
    # ---------------------------------------

    cap.release()

    writer.release()

    # ---------------------------------------
    # Total vehicles
    # ---------------------------------------

    counts["total"] = sum(
        counts.values()
    )

    # ---------------------------------------
    # Traffic statistics
    # ---------------------------------------

    if vehicles_per_frame:

        peak_vehicles = max(
            vehicles_per_frame
        )

        average_vehicles = (
            sum(vehicles_per_frame)
            / len(vehicles_per_frame)
        )

    else:

        peak_vehicles = 0

        average_vehicles = 0

    # ---------------------------------------
    # Compact traffic-flow data
    # ---------------------------------------

    max_points = 20

    if len(traffic_flow) > max_points:

        step = (
            len(traffic_flow)
            / max_points
        )

        traffic_flow_chart = [
            traffic_flow[
                int(index * step)
            ]
            for index in range(max_points)
        ]

    else:

        traffic_flow_chart = traffic_flow

    # ---------------------------------------
    # Speed statistics
    # ---------------------------------------

    if speed_data:

        average_pixel_speed = (
            sum(speed_data.values())
            / len(speed_data)
        )

        max_pixel_speed = max(
            speed_data.values()
        )

    else:

        average_pixel_speed = 0

        max_pixel_speed = 0

    # ---------------------------------------
    # Traffic density
    # ---------------------------------------

    if average_vehicles < 5:

        density = "Low"

    elif average_vehicles < 15:

        density = "Medium"

    else:

        density = "High"

    # ---------------------------------------
    # Congestion score
    # ---------------------------------------

    if peak_vehicles > 0:

        congestion_score = round(
            min(
                100,
                (
                    average_vehicles
                    / peak_vehicles
                ) * 100
            )
        )

    else:

        congestion_score = 0

    # ---------------------------------------
    # AI recommendation
    # ---------------------------------------

    if density == "High":

        recommendation = (
            "Heavy traffic detected. "
            "Consider optimizing signal timing "
            "and prioritizing the dominant traffic flow."
        )

    elif density == "Medium":

        recommendation = (
            "Moderate traffic detected. "
            "Traffic flow should be monitored "
            "during peak periods."
        )

    else:

        recommendation = (
            "Traffic flow is currently light. "
            "No immediate intervention is required."
        )

    # ---------------------------------------
    # Final analysis
    # ---------------------------------------
        # ---------------------------------------
    # Lane statistics
    # ---------------------------------------

    lane_analysis = []

    for lane_name, vehicle_ids in lane_vehicle_ids.items():

        vehicle_count = len(vehicle_ids)

        occupancy = (
            round((vehicle_count / counts["total"]) * 100)
            if counts["total"] > 0
            else 0
        )

        lane_analysis.append({
            "lane": lane_name,
            "vehicles": vehicle_count,
            "occupancy": occupancy
        })

    analysis = {

        "car": counts["car"],

        "motorcycle": counts["motorcycle"],

        "bus": counts["bus"],

        "truck": counts["truck"],

        "total": counts["total"],

        "density": density,

        "congestion_score": congestion_score,

        "peak_vehicles": peak_vehicles,

        "average_vehicles": round(
            average_vehicles,
            2
        ),

        "traffic_flow": traffic_flow_chart,
        "lane_analysis": lane_analysis,

        "average_pixel_speed": round(
            average_pixel_speed,
            2
        ),

        "max_pixel_speed": round(
            max_pixel_speed,
            2
        ),

        "fps": round(
            fps,
            2
        ),

        "duration": round(
            duration,
            2
        ),

        "frames_processed": frames_processed,

        "resolution": (
            f"{width}x{height}"
        ),

        "recommendation": recommendation,

        "processed_video": output_path
    }

    print("✅ Analysis Complete")

    print(analysis)

    return analysis