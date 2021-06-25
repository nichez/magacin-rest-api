var query = require('../db.js');
const { multipleColumnSet } = require('../utils/common.utils');

class Artikal {
  tableName = 'artikli';

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;

    console.log('params ', params)

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM ${this.tableName}
    WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    // return back the first row (user)
    return result[0];
  };

  create = async (novArtikal) => {
    const sql = `INSERT INTO ${this.tableName} VALUES (?, ?, ?)`;

    const result = await query(sql, [
      novArtikal.ime,
      novArtikal.proizvoditel,
      novArtikal.cena,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };

  delete = async (id) => {
    const sql = `DELETE FROM ${this.tableName}
    WHERE id = ?`;

    const result = await query(sql, [id.id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new Artikal();