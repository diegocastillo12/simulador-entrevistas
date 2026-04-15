const db = require('../config/db');

class Reto {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM retos');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM retos WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = Reto;
