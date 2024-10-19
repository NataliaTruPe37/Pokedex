const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta "public"

// Rutas
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.render('index'); // Renderiza la vista index.ejs
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
