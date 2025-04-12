const express = require('express');
const app = express();
const productoRoutes = require('./routes/productoRoutes');

app.use(express.json());
app.use('/productos', productoRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Producto Service corriendo en puerto ${PORT}`));
