from recommender.scripts.analysis import predict_user_style

user_age = 24  # 예: 24
user_gender = 'male'  # 예: 'female'

# 스타일 예측 실행
predicted_styles = predict_user_style(user_age, user_gender)
print(predicted_styles)