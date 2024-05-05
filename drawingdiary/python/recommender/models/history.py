import csv

with open('python/recommender/models/data/history_set.csv', mode='a', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow([24, "female", "ISFJ", "만화"])