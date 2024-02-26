from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MultiLabelBinarizer
import pandas as pd

def predict_user_style(age, gender):
    # 데이터 불러오기
    file_path = 'C:/Users/jjiwo/TUK-CE-capstone-2023-drawingdiary/drawingdiary/recommender/data/data_set2.csv'
    data = pd.read_csv(file_path)

    # 필터링: 입력받은 성별과 연령대(+/- 2년)에 해당하는 데이터
    filtered_data = data[(data['gender'] == gender) & (data['age'] >= age - 2) & (data['age'] <= age + 2)]

    # 스타일을 리스트로 변환
    filtered_data.loc[:, 'styles_list'] = filtered_data['styles'].apply(lambda x: [style.strip() for style in x.split(',')])

    # 입력 특성(X) 설정
    X = filtered_data[['age']]
    y = filtered_data['styles_list']

    # 다중 레이블 인코딩
    mlb = MultiLabelBinarizer()
    y_mlb = mlb.fit_transform(y)

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

    # 예측된 스타일 출력
    return predicted_styles


