const db = require('../config/db');

const User = {
    // Busca un usuario por su correo
    findByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0]; // Retorna el primer usuario que encuentre
    },
    // Crea un nuevo usuario
    create: async (nombre, email, password) => {
        const sql = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
        const [result] = await db.execute(sql, [nombre, email, password]);
        return result;
    }
};

module.exports = User;