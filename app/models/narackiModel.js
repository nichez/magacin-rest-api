var query = require('../db.js');
var sql = require('../db2.js');
const { multipleColumnSet } = require('../utils/common.utils');

class Naracki {
  tableName = 'naracki';

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;

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

  create = async function (body, result) {
    await sql.query(
      'INSERT INTO `naracki` (orderNumber, artikalId, userId, kolicina, datum) VALUES ? ',
      [body],
      function (err, res) {
        if (err) {
          result(err, null);
        } else {
          result(null, res.insertId);
        }
      }
    );
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

  getNarackiByOrderNumber = async (orderNo, result) => {
    const sql1 = 'SELECT * FROM naracki WHERE orderNumber = ? ';
    const sql2 = 'SELECT * FROM artikli WHERE id = ?';

    const res = await query(sql1, [orderNo]);

    const dataRes = res.map(async (resItem) => {
      const res2 = await query(sql2, [resItem.artikalId]);
      resItem.artikal = res2[0];
      return resItem;
    });

    const waitAll = await Promise.all(dataRes);

    result(res);
  };
}

module.exports = new Naracki();
