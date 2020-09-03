cd app/ &&
gunicorn --bind 0.0.0.0:3000 wsgi:app &
echo "gunicorn started" &
python sniffer/sniffer.py test --filter="tcp" &
echo "sniffing started" &
tail -f /dev/null
