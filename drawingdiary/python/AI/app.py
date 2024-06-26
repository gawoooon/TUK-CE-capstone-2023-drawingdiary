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

@app.route('/api/diary/comment', methods=['POST'])
def save_comment():
    try:
        data = request.json
        diary_text = data.get("diaryText", '')
        print(diary_text)

        prompt = diary_text + " 이 일기로 코멘트를 230자 이내로 작성해줘"

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        chat_response = response.choices[0].message.content
        return jsonify({"comment": chat_response})
    
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/api/diary/image', methods=['POST'])
def save_diary():
    try:
        # 클라이언트로부터 일기 내용을 받아옴
        data = request.json
        diary_text = data.get('resultDiaryText','')
        print("일기내용:",diary_text)

        # OpenAI API에 전달하여 이미지 생성
        prompt = diary_text
        response = openai.Image.create(
            model="dall-e-3",
            prompt=prompt,
            n=1,
            size="1024x1024",
            response_format="b64_json",
        )

        # 이미지 base64을 클라이언트에게 전송
        b64_json = response.data[0].b64_json

        response = {
            "message": "Diary saved successfullyyyy",
            "diaryContent": diary_text,
            "image": {
                "imageUrl": b64_json
            }
        }   
        return jsonify(response)

    except Exception as e:
        return jsonify({"success": False, "message": "Error saving diary"})


if __name__ == '__main__':
    app.run(debug=False, port=5000)
   
