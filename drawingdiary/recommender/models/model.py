from recommender.scripts.analysis import predict_user_style
from flask import Flask, request, jsonify

app = Flask(__name__)

user_age = 26  # 예: 24
user_gender = 'male'  # 예: 'female'

@app.route('/api/get-member', methods=['GET'])
def get_member_styles():
    user_age = request.args.get('age', default=24, type=int)
    user_gender = request.args.get('gender', default='male', type=str)

    # 스타일 예측 실행
    predicted_styles = predict_user_style(user_age, user_gender)

    # 예측된 스타일을 JSON 형태로 반환
    return jsonify({
        'age':user_age,
        'gender': user_gender,
        'predicted_styles': predicted_styles
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)