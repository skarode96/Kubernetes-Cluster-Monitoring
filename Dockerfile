FROM python:3
RUN apt-get update
RUN apt-get install tcpdump -y htop
RUN pip install gunicorn flask scapy requests
ADD packets-api/mainapp.py packets-api/wsgi.py /app/
ADD sniffer/* /sniffer/
ADD run.sh /
EXPOSE 3000
WORKDIR /
ENTRYPOINT [ "sh","run.sh"]