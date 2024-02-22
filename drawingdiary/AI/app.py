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
CORS(app)

load_dotenv()
# OpenAI API 키 설정
openai.api_key =os.getenv("OPENAI_API_KEY")
print("키")
print("?")


@app.route('/api/diary/image', methods=['POST'])
def save_diary():
    try:
        # 클라이언트로부터 일기 내용을 받아옴
        data = request.json
        diary_text = data.get('diaryText','')
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
        print("??")

        # 여기서 이미지를 http://localhost:8080/api/image/test/create에 전송
        # send_image_to_api(image_url)
        print("됐음?")
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

# def send_image_to_api(image_url):
#     print("뭐니")
#     try:
         
#         # 이미지 데이터를 가져오기
#         image_data = image_url

#         # 다음 필드들에 대한 임의의 값을 설정
#         diary_id = 1
#         date_id = 2
#         prompt_id = 3
#         print(f'이미지 전송 중')


#         # 이미지를 파일 형태로 변환
#         files = {'imageFile': ('image.jpg', image_data, 'image/jpeg')}
#         data = {'diaryID': diary_id, 'dateID': date_id, 'promptID': prompt_id}

#         print(f'이미지 전송 중')
#         # API에 이미지 전송
#         api_url = 'http://localhost:8080/api/image/test/create'
#         # Content-Type 명시
#         headers = {'Content-Type': 'multipart/form-data'}

#         response = requests.post(api_url, files=files, data=data, headers=headers)

#         print(f'이미지 전송 중3')

#         if response.status_code == 200:
#             print('이미지가 성공적으로 전송되었습니다.')
#         else:
#             print(f'이미지 전송 실패. 응답 코드: {response.status_code}')
#             response.raise_for_status()
#             print(f'이미지')

#     except Exception as e:
#         print(f'오류 발생: {repr(e)}')

if __name__ == '__main__':
    app.run(debug=False, port=5000)
   
