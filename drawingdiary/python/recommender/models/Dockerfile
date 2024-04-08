# Dockerfile
FROM python:3.12.1
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app
COPY ./data/init_set.csv /app/data/init_set.csv
CMD ["flask", "run", "--host=0.0.0.0"]
