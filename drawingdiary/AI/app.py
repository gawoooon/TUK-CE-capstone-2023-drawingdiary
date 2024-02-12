from flask import Flask, request, jsonify
from flask_cors import CORS 
import random
import openai 
import requests
from PIL import Image
from io import BytesIO
import os
import flask

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")
# OpenAI API 키 설정
openai.api_key = "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"
print("키 저장")

@app.route('/diary', methods=['POST'])
def ai_diary():
    try:
        print("으어 저장")
        # 클라이언트로부터 일기 내용을 받아옴
        data = request.json
        diary_text = data.get('diaryText')
        print("문장 저장")

        # OpenAI API에 전달하여 이미지 생성
        prompt = diary_text
        response = openai.Image.create(
            model="dall-e-3",
            prompt=prompt,
            n=1,
            size="1024x1024",
            response_format="url",
        )
        print("이미지 생성")
    


        # 이미지 저장
        image_url = response.data[0].url
        image_data = requests.get(image_url).content
        image = Image.open(BytesIO(image_data))
        print("이미지 저장")
        
        # 저장할 디렉토리 경로 설정
        save_directory =  os.path.join("frontend", "public") # 경로를 적절히 변경하세요.
        print("디렉토리 저장")

        # 디렉토리가 존재하지 않으면 생성
        if not os.path.exists(save_directory):
            os.makedirs(save_directory)

        # 이미지 저장
        saved_path = os.path.join(save_directory, "image01.jpg")
        image.save(saved_path)

        print("이미지가 다음 경로에 저장되었습니다:", saved_path)

        return jsonify({"success": True, "message": "Diary saved successfullyyyy"})
    except Exception as e:
        print("Error saving diary^^^:",  repr(e))
        return jsonify({"success": False, "message": "Error"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
