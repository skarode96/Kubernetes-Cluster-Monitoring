FROM python:3
RUN apt-get update
RUN apt-get install tcpdump -y
RUN pip install gunicorn flask scapy requests
ADD packets-api/mainapp.py packets-api/wsgi.py /app/
ADD sniffer/* /sniffer/
EXPOSE 3000
WORKDIR /app
ENTRYPOINT [ "gunicorn","--bind","0.0.0.0:3000","wsgi:app" ]