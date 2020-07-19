from flask import Flask
from flask import request, jsonify

app = Flask(__name__)

packets = []

@app.route('/', methods=['GET'])
def index():
    packets.clear()
    return jsonify({'Hello':'World'}), 200

@app.route('/api/packets', methods=['GET'])
def get_packets():
    response = packets.copy()
    packets.clear()
    return jsonify({'packets': response}), 200


@app.route('/api/packets', methods=['POST'])
def create_task():
    if not request.json:
        abort(400)
    packet = {
        'id': request.json['timestamp'],
        'payload': request.json,
    }
    packets.append(packet)
    return jsonify({'status': 'OK'}), 201

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
