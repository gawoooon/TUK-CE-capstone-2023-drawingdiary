import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS


def get_top_styles(age, gender):
    # 데이터 불러오기
    file_path = '/app/data/expanded_init_set.csv'
    data = pd.read_csv(file_path)

    # 데이터 전처리
    data['styles'] = data['styles'].str.rstrip(', "')
    data['age'] = data['age'].astype(int)
    data = data[(data['age'] > 0) & (data['age'] <= 100)]

    # 필터링: 입력받은 성별과 나이에 해당하는 데이터
    filtered_data = data[(data['gender'] == gender) & (data['age'] == age)]

    # 스타일 빈도 계산
    style_counts = filtered_data['styles'].str.split(',').explode().value_counts()
    top_styles = style_counts.head(5).index.tolist()  # 상위 5개 스타일 추출

    return top_styles

app = Flask(__name__)
CORS(app)

@app.route('/api/get-styles', methods=['POST'])
def get_member_styles():

    try :
        response = request.get_json()

        user_age = response.get('age', '0')
        user_gender = response.get('gender', '')

        new_user_gender = ""

        if(user_gender == "M") :
            new_user_gender = "male"
        elif(user_gender == "F") :
            new_user_gender = "female"
        else:
            new_user_gender = "secret"

        # 스타일 예측 실행
        top_styles = get_top_styles(user_age, new_user_gender)

        # 예측된 스타일을 JSON 형태로 반환
        return jsonify({
            'top_styles': top_styles
        })
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=False, port=5001)