import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.multiclass import OneVsRestClassifier
from sklearn.metrics import classification_report
from scipy.sparse import csr_matrix, vstack
from imblearn.over_sampling import RandomOverSampler

# 데이터 불러오기 및 전처리
data = pd.read_csv('C:/Users/jjiwo/TUK-CE-capstone-2023-drawingdiary/drawingdiary/recommender/data/data_set2.csv')

# 연령, 성별, MBTI를 입력 피처로 사용
X = data[['age', 'gender', 'mbti']]

# 원-핫 인코딩 적용
encoder = OneHotEncoder(handle_unknown='ignore')
X_encoded = encoder.fit_transform(X)

# 스타일을 원-핫 인코딩으로 변환
y = data['styles'].str.get_dummies(', ')

# 데이터셋 분할
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# 오버샘플링 적용
ros = RandomOverSampler(random_state=42)
X_train_resampled = csr_matrix(X_train)
y_train_resampled = csr_matrix(y_train.values)

for label in y_train.columns:
    X_resampled, y_resampled = ros.fit_resample(X_train, y_train[[label]])
    y_resampled_sparse = csr_matrix(y_resampled)
    X_train_resampled = vstack([X_train_resampled, X_resampled])
    y_train_resampled = vstack([y_train_resampled, y_resampled_sparse])

# 중복 제거
X_train_resampled = X_train_resampled.tocsr()
y_train_resampled = y_train_resampled.tocsr()

# MLkNN 분류기 초기화 및 학습
knn_classifier = OneVsRestClassifier(KNeighborsClassifier(n_neighbors=5))
knn_classifier.fit(X_train_resampled, y_train_resampled)

# 성능 평가
y_test_sparse = csr_matrix(y_test.values)
predictions = knn_classifier.predict(X_test)
print(classification_report(y_test_sparse, predictions))
