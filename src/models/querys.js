const { pool } = require("../database/connection");
const format = require("pg-format");

const getAll = async (limit, order_by, page) => {
  const [id, order] = order_by.split("_");
  const offset = (page - 1) * limit;
  const query = "SELECT * FROM inventario ORDER BY %s %s OFFSET %s LIMIT %s";

  const formattedQuery = format(query, id, order, offset, limit);

  const { rows: jewel } = await pool.query(formattedQuery);

  return jewel;
};

const filterAll = async (precio_min, precio_max, categoria, metal) => {
  let filter = [];
  const values = [];

  const addFilters = (field, comparator, value) => {
    values.push(value);
    const { length } = filter;
    filter.push(`${field} ${comparator} $${length + 1}`);
  };

  if (precio_min) addFilters("precio", ">=", precio_min);
  if (precio_max) addFilters("precio", "<=", precio_max);
  if (categoria) addFilters("categoria", "=", categoria);
  if (metal) addFilters("metal", "=", metal);

  let query = "Select * from inventario";

  if (filter.length > 0) {
    filter = filter.join(" and ");
    query += ` where ${filter} `;
  }

  const { rows: jewel } = await pool.query(query, values);
  return jewel;
};

const prepareHateoas = (arr) => {
  const results = arr.map((a) => {
    return {
      name: a.nombre,
      href: `/joyas/joya/${a.id}`,
    };
  });

  const total = arr.length;

  const stockTotal = arr.reduce((sum, item) => sum + item.stock, 0);

  const HATEOAS = {
    totalJoyas: total,
    stockTotal,
    results,
  };

  return HATEOAS;
};

module.exports = {
  getAll,
  filterAll,
  prepareHateoas,
};
