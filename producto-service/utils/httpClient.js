const axios = require('axios');

exports.calcularValorTotal = async (precio, cantidad) => {
    const response = await axios.post('http://calculo-service:5000/calcular', { precio, cantidad });
    return response.data.valor_total;
};