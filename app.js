const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// 1. Middlewares de lectura (DEBEN IR PRIMERO)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. Sesiones
app.use(session({
    secret: 'clave_secreta_upt',
    resave: false,
    saveUninitialized: false
}));

// 3. Archivos estáticos y Vistas
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// 4. Importación de rutas con validación
const indexRoutes = require('./src/routes/index');

if (indexRoutes) {
    app.use('/', indexRoutes);
} else {
    console.error("Error: No se pudieron cargar las rutas correctamente.");
}

// 5. Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor en: http://localhost:${PORT}/login`);
});