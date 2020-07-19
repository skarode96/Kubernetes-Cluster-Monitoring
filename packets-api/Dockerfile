FROM python:3
RUN pip install gunicorn flask
ADD mainapp.py wsgi.py /app/
EXPOSE 3000
WORKDIR /app
ENTRYPOINT [ "gunicorn","--bind","0.0.0.0:3000","wsgi:app" ]