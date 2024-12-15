FROM python:3.13

WORKDIR /grinda-rest-server

COPY ./backend/requirements.txt /grinda-rest-server/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /grinda-rest-server/requirements.txt

COPY ./backend /grinda-rest-server/backend

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]