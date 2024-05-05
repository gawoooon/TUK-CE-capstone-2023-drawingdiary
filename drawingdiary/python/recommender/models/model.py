from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MultiLabelBinarizer
import pandas as pd
import logging


def predict_user_style(age, gender):
    # 데이터 불러오기
    file_path = '/app/data/init_set.csv'
    data = pd.read_csv(file_path)

    # 나이 범위 초기화, 필요한 스타일 수 초기화
    age_range = 2
    required_styles_count = 5

    # 예측된 스타일을 저장할 집합 초기화
    predicted_styles_set = set()

    # 전체 데이터 세트에서 가장 많이 나타나는 스타일 추출
    common_styles = data['styles'].str.split(',').explode().str.strip().value_counts().index.tolist()


    while len(predicted_styles_set) < required_styles_count and age_range <= 10:
        # 나이 범위에 따라 데이터 필터링
        # 필터링: 입력받은 성별과 연령대(+/- 2년)에 해당하는 데이터
        filtered_data = data[(data['gender'] == gender) & (data['age'] >= age - age_range) & (data['age'] <= age + age_range)]

        if not filtered_data.empty:
            filtered_data['styles_list'] = filtered_data['styles'].apply(lambda x: [style.strip() for style in x.split(',')])

            X = filtered_data[['age']]
            y = filtered_data['styles_list']

            # 다중 레이블 인코딩
            mlb = MultiLabelBinarizer()
            y_mlb = mlb.fit_transform(y)

            if len(y_mlb) >= 5:
                # 모델 훈련을 위한 데이터 분할
                X_train, X_test, y_train, y_test = train_test_split(X, y_mlb, test_size=0.2, random_state=42)
                
                # 모델 훈련
                model = RandomForestClassifier(random_state=42)
                model.fit(X_train, y_train)

                # 입력받은 나이와 성별에 대한 스타일 선호도 예측
                age_input = pd.DataFrame([[age]], columns=['age'])  # 나이 입력을 DataFrame으로 변환
                predicted_styles_mlb = model.predict(age_input)
        
                # 예측된 스타일 인덱스를 스타일 이름으로 변환
                predicted_styles = mlb.inverse_transform(predicted_styles_mlb)

                # 중복을 제거하면서 예측된 스타일 추가
                for styles in predicted_styles:
                    predicted_styles_set.update(styles)

        # 나이 범위 확장
        age_range += 1

    predicted_styles_list = list(predicted_styles_set)[:required_styles_count]
    
    # 필요한 스타일 수를 채우기 위해 가장 흔한 스타일 추가
    for style in common_styles:
        if len(predicted_styles_list) >= required_styles_count:
            break
        if style not in predicted_styles_list:
            predicted_styles_list.append(style)

    app.logger.info(f'Predicted styles: {predicted_styles_list[:required_styles_count]}')

    return predicted_styles_list[:required_styles_count]


app = Flask(__name__)
CORS(app)

@app.route('/api/get-styles', methods=['POST'])
def get_member_styles():

    try :
        response = request.get_json()
        app.logger.info(f'data : {response}')

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
        predicted_styles = predict_user_style(user_age, new_user_gender)

        # 예측된 스타일을 JSON 형태로 반환
        return jsonify({
            'predicted_styles': predicted_styles
        })
    except Exception as e:
        app.logger.error(f'Error processing request: {e}', exc_info=True)
        return jsonify({'error': 'Internal server error'}), 500
    
if not app.debug:
    app.logger.setLevel(logging.INFO)

if __name__ == '__main__':
    app.run(debug=False, port=5001)