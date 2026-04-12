const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
    res.render('auth/login');
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);

        if (user) {
            // Compatible de forma retroactiva (encriptadas o texto plano)
            const isMatch = bcrypt.compareSync(password, user.password) || user.password === password;
            if (isMatch) {
                // Guardamos datos en la sesión
                req.session.userId = user.id;
                req.session.userName = user.nombre;
                return res.redirect('/dashboard');
            }
        }
        return res.send('Correo o contraseña incorrectos');
    } catch (error) {
        console.error(error);
        res.send('Error al intentar iniciar sesión');
    }
};

exports.getRegister = (req, res) => {
    res.render('auth/register');
};

exports.postRegister = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.send('El correo ya está registrado en el sistema.');
        }

        // Hasheamos la contraseña para mantener la seguridad
        const hashedPassword = bcrypt.hashSync(password, 10);
        
        // Creamos el nuevo usuario
        const result = await User.create(nombre, email, hashedPassword);
        
        // Auto-login al terminar el registro
        req.session.userId = result.insertId;
        req.session.userName = nombre;
        
        return res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.send('Error al intentar registrarse');
    }
};