from recommender.scripts.analysis import predict_user_style
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/get-styles', methods=['POST'])
def get_member_styles():
    data = request.get_json()

    user_age = data.get('age', '0')
    user_gender = data.get('gender', '')

    # 스타일 예측 실행
    predicted_styles = predict_user_style(user_age, user_gender)

    # 예측된 스타일을 JSON 형태로 반환
    return jsonify({
        'predicted_styles': predicted_styles
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)