from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv 
import random
import openai 
import requests
from PIL import Image
from io import BytesIO
import os

app = Flask(__name__)
CORS(app,resources={r"/api/image/*": {"origins": "http://localhost:3000"}})

load_dotenv()
# OpenAI API 키 설정
openai.api_key =os.getenv("OPENAI_API_KEY")
print("키")
print("?")


@app.route('/api/diary/test/add', methods=['POST'])
def save_diary():
    try:
        # 클라이언트로부터 일기 내용을 받아옴
        data = request.json
        diary_text = data.get('text','')
        print("일기내용:",diary_text)
        print("왜 안나오는지 아시나요")

        print("왜 안나오니?")
        # OpenAI API에 전달하여 이미지 생성
        prompt = "수채화" + diary_text
        response = openai.Image.create(
            model="dall-e-3",
            prompt=prompt,
            n=1,
            size="1024x1024",
            response_format="url",
        )

        # image_data = requests.get(image_url).content
        # image = Image.open(BytesIO(image_data))
        
        # # 저장할 디렉토리 경로 설정
        # save_directory =  os.path.join("frontend", "public") # 경로를 적절히 변경하세요.

        # # 디렉토리가 존재하지 않으면 생성
        # if not os.path.exists(save_directory):
        #     os.makedirs(save_directory)

        # # 이미지 저장
        # saved_path = os.path.join(save_directory, "image01.jpg")
        # image.save(saved_path)

        # print("이미지가 다음 경로에 저장되었습니다:", saved_path)

        print("왜 안나와")
        # 이미지 url을 클라이언트에게 전송
        image_url = response.data[0].url
        print("image_url:",image_url)

        response = {
        "message": "Diary saved successfullyyyy",
        "diaryContent": diary_text,
        "image": {
            "imageUrl": image_url
        }
    }

        
        return jsonify(response)
    except Exception as e:
        print("Error saving diary:",  repr(e))
        return jsonify({"success": False, "message": "Error saving diary"})

if __name__ == '__main__':
    app.run(debug=False, port=8080)
