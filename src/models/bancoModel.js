const db = require('../config/db');

const Banco = {
    // Crear un banco nuevo vinculado al usuario logueado
    create: async (titulo, descripcion, categoria, autor_id) => {
        const sql = 'INSERT INTO bancos (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)';
        return db.execute(sql, [titulo, descripcion, categoria, autor_id]);
    },
    // Traer todos los bancos del usuario actual
    getByUser: async (autor_id) => {
        const [rows] = await db.execute('SELECT * FROM bancos WHERE autor_id = ?', [autor_id]);
        return rows;
    }
};

module.exports = Banco;