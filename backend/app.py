from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from detector import analyze_video

app = Flask(__name__)
@app.route("/processed-video")
def processed_video():
    return send_from_directory(
        "outputs",
        "processed_video.mp4"
    )
CORS(app)

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"

# Create folders if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return {
        "status": "Running",
        "project": "AI Traffic Analyzer"
    }


@app.route("/upload", methods=["POST"])
def upload_video():

    if "video" not in request.files:
        return jsonify({
            "error": "No video uploaded"
        }), 400

    video = request.files["video"]

    filepath = os.path.join(UPLOAD_FOLDER, video.filename)
    video.save(filepath)

    # Run AI Detection
    result = analyze_video(filepath)

    return jsonify(result)


# Serve processed video
@app.route("/video/<filename>")
def get_video(filename):
    return send_from_directory(OUTPUT_FOLDER, filename)


if __name__ == "__main__":
    app.run(debug=False, use_reloader=False)