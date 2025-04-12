from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calcular', methods=['POST'])
def calcular():
    data = request.json
    precio = data.get('precio', 0)
    cantidad = data.get('cantidad', 0)
    valor_total = precio * cantidad
    return jsonify({"valor_total": valor_total})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)