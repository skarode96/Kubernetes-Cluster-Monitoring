cd app/ &&
gunicorn --bind 0.0.0.0:3000 wsgi:app &
echo "gunicorn started" &
python sniffer/sniff_packets.py test --filter="tcp port 6379" &
echo "sniffing started" &
tail -f /dev/null
