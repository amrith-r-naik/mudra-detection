# server.py on GPU machine
from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np
import io
import json
import base64

app = Flask(__name__)
model = tf.keras.models.load_model("mudra_transfer_model81.h5")
with open("mudra_labels.json") as f:
    class_indices = json.load(f)
    index_to_label = {v: k for k, v in class_indices.items()}

def preprocess_image(base64_string):
    image_data = base64.b64decode(base64_string)
    img = Image.open(io.BytesIO(image_data)).resize((224, 224))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return img

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if "image" not in data:
        return jsonify({"error": "No image provided"}), 400

    img = preprocess_image(data["image"])
    prediction = model.predict(img)
    predicted_class = index_to_label[np.argmax(prediction)]
    confidence = float(np.max(prediction))
    return jsonify({"class": predicted_class, "confidence": confidence})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)