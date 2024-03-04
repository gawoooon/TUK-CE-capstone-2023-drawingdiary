from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import openai
import os
import logging

app = Flask(__name__)
CORS(app)
load_dotenv()

# OpenAI API 키 설정
openai.api_key =os.getenv("OPENAI_API_KEY")


@app.route('/api/diary/image', methods=['POST'])
def save_diary():
    try:
        # 클라이언트로부터 일기 내용을 받아옴
        data = request.json
        diary_text = data.get('diaryText','')
        select_style = data.get('parentSelectedButtonStyle','')
        print("일기내용:",diary_text, select_style)

        # OpenAI API에 전달하여 이미지 생성
        prompt = select_style + diary_text
        response = openai.Image.create(
            model="dall-e-3",
            prompt=prompt,
            n=1,
            size="1024x1024",
            response_format="url",
        )

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
        app.logger.error("Error saving diary: %s", repr(e))  # 로깅으로 변경
        return jsonify({"success": False, "message": "Error saving diary"})


if __name__ == '__main__':
    app.run(debug=False, port=5000)
   
