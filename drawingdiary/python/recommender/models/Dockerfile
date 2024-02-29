# Dockerfile
FROM python:3.12.1
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app
COPY ./data/data_set2.csv /app/data/data_set2.csv
CMD ["flask", "run", "--host=0.0.0.0"]
