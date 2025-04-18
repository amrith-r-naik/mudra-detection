# ML Backend

This repository contains the machine learning backend for the FS Project.

## Setup Instructions

### Prerequisites

- Python 3.8 or higher (preferable python 3.10 conda env)
- pip package manager

### Installation

1. Clone the repository
2. Create a virtual environment:

```bash
conda create -n fs python=3.10
conda activate fs
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

## Usage

Start the server:

```bash
python server.py
```

The server will start on `http://<YOUR_LOCAL_IP>:5000` by default.

## API Endpoints

### 1. `/predict` (POST)

**Description**: This endpoint accepts a base64-encoded image and returns the predicted class and confidence score.

**Request**:

- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "image": "<base64_encoded_image>"
  }
  ```

**Response**:

- **Status Code**: `200 OK`
- **Body**:
  ```json
  {
    "class": "<predicted_class>",
    "confidence": <confidence_score>
  }
  ```

**Error Responses**:

- **Status Code**: `400 Bad Request`
  ```json
  {
    "error": "No image provided"
  }
  ```

**Example**:

```bash
curl -X POST http://127.0.0.1:5000/predict \
-H "Content-Type: application/json" \
-d '{
  "image": "<base64_encoded_image>"
}'
```
