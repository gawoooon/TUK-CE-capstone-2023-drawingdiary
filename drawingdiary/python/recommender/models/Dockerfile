# Dockerfile
FROM python:3.12.1
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app
COPY ./data/expanded_init_set.csv /app/data/expanded_init_set.csv
COPY ./data/history_set.csv /app/data/history_set.csv
COPY ./data/styles.csv /app/data/styles.csv
CMD ["flask", "run", "--host=0.0.0.0"]
