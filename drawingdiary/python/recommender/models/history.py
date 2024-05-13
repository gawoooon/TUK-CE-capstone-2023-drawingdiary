# import csv
# import random
# import pandas as pd
# import statistics
# import matplotlib.pyplot as plt

# from sklearn.metrics.pairwise import cosine_similarity
# import operator


# # 파일 경로 설정
# styles_file_path = '/app/data/styles.csv'
# history_file_path = '/app/data/history_set.csv'

# # CSV 파일 읽기
# styles_data = pd.read_csv(styles_file_path)
# history_data = pd.read_csv(history_file_path)

# # 각 데이터 세트에서 처음 5개 행 출력
# print("Styles Data (First 5 Rows):")
# print(styles_data.head(5))

# print("\nHistory Data (First 5 Rows):")
# print(history_data.head(5))


# # with open('python/recommender/models/data/history_set.csv', mode='a', newline='', encoding='utf-8') as file:
# #     writer = csv.writer(file)
# #     writer.writerow([24, "female", "ISFJ", "만화"])