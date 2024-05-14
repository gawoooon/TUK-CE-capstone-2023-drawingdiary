import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity


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
    app.run(debug=True, port=5001)
    
    
    
    
    
# 이건 추천 시스템

# history 기반으로 사용자 추천
# 예시값 memberID는 1부터 155까지 존재하며, 실제 실행시 MemberStylePreference를 일정 주기로 csv 형태로 넣어줘야함
# pivot 테이블과 similarity_df 코사인 유사도 미리 저장해놓으면 효과적일듯

# 파일 경로 설정
# 데이터 로드 및 전처리
styles_file_path = '/app/data/styles.csv'
history_file_path = '/app/data/history_set.csv'


def pivot():
    # 1. CSV 파일 읽기
    history_data = pd.read_csv(history_file_path)

    # 2. memberID별 총 frequency 계산
    total_frequency_by_member = history_data.groupby('memberID')['frequency'].sum()
    # print(total_frequency_by_member.head(5)) # 체크

    # 3. 전처리 (normalized_frequency, 유효값 필터링)
    # 3-1. 각 memberID별 frequency 정규화
    history_data['normalized_frequency'] = history_data.apply(
        lambda row: row['frequency'] / total_frequency_by_member[row['memberID']], axis=1)
    # 3-2 유효값 필터링 total_frequency_by_member 값이 5 이하인 member 제거
    valid_members = total_frequency_by_member[total_frequency_by_member > 5].index
    filtered_history_data = history_data[history_data['memberID'].isin(valid_members)]
    # print(filtered_history_data.head()) # 체크

    # pivot_table 생성
    pivot_table = filtered_history_data.pivot(index='memberID', columns='styleID', values='normalized_frequency').fillna(0)
    # print(pivot_table) # 체크
    return pivot_table

def get_similarity_df(pivot_table):
# 모든 멤버 사이의 코사인 유사도를 계산한다
    similarity_matrix = cosine_similarity(pivot_table)
    similarity_df = pd.DataFrame(similarity_matrix, index=pivot_table.index, columns=pivot_table.index)
    return similarity_df

# 가장 비슷한 member 5명 찾기
def find_similar_members(member_id, matrix, top_n=5):
    if member_id not in matrix.index:
        return []
    sim_scores = matrix.loc[member_id]
    sim_scores = sim_scores.sort_values(ascending=False)
    top_members = sim_scores.iloc[1:top_n+1].index.tolist()
    return top_members

# 스타일 추천하기 5개
def recommend_styles(member_id, pivot, matrix, top_n=5):
    global similarity_df  # 전역 변수로 선언
    similar_members = find_similar_members(member_id, matrix)
    # 비슷한 멤버에게서 스타일 리스트 뽑기
    recommended_styles = pivot.loc[similar_members].sum().sort_values(ascending=False)  #내림차순정렬
    # 멤버의 빈도수 높은 스타일 5개 뽑기
    member_top_styles = pivot.loc[member_id].sort_values(ascending=False).head(top_n).index.tolist()
    # 초기화
    recommendations = []
    top_style_count = 0
    
    # 적어도 2개는 멤버의 빈도수 높은 스타일과 다른 요소로 채우기
    for style in recommended_styles.index:
        if style not in recommendations:  # 이미 추천되어 있는지 확인
            if style in member_top_styles:
                if top_style_count < 2: # 멤버가 이미 많이쓰는 스타일은 3개까지만
                    recommendations.append(style)
                    top_style_count += 1
            else:
                recommendations.append(style)
                
        # 5개 채웠으면 break
        if len(recommendations) == top_n:
            break

    return recommendations

def mapping_stylenames(recommended_styles):
    # 이름과 id 딕셔너리로 매핑
    styles_data = pd.read_csv(styles_file_path)
    style_dict = dict(zip(styles_data['styleID'], styles_data['styleName']))
    # 딕셔너리로 찾아서 추천 이름에 추가
    recommended_names = [style_dict[style] for style in recommended_styles if style in style_dict]
    return recommended_names

# 테스트 코드
# member_id = 1
# recommended_styles = recommend_styles(member_id, pivot_table, similarity_df)  # id 리스트
# recommended_names = mapping_stylenames(recommended_styles, styles_data) # 이름 리스트

# print(f"Recommended Styles for member {member_id}: {recommended_styles}")
# print(f"Recommended Styles for member {member_id}: {recommended_names}")

app = Flask(__name__)
CORS(app)

@app.route('/api/get-styles-history', methods=['POST'])
def get_styles_history():
    try:
        data = request.get_json()
        member_id = int(data['member_id'])  # 데이터 타입 확인 및 변환
        app.logger.info(f"Received member_id: {member_id}")  # 로그에 member_id 기록

        pivot_table = pivot()
        
        # 오류처리
        if member_id not in pivot_table.index:
            app.logger.error(f"Member ID {member_id} not found in pivot table.")
            return jsonify({'error': 'Member ID not found'}), 404
        
        similarity_df = get_similarity_df(pivot_table)
        recommended_styles = recommend_styles(member_id, pivot_table, similarity_df)
        recommended_names = mapping_stylenames(recommended_styles)

        return jsonify({'recommended_styles': recommended_names})
    
    except Exception as e:
        app.logger.error(f"Error processing request: {str(e)}")  # 오류 로깅
        return jsonify({'error': 'Internal server error'}), 500
    
    
if __name__ == '__main__':
    app.run(debug=False, port=5001)