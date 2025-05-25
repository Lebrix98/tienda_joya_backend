const { getAll, prepareHateoas, filterAll } = require("../models/querys");

const readAllJewel = async (req, res) => {
    
  const { limit = 3, order_by = "stock_ASC", page = 2 } = req.query;

  const isPageValid = /^[1-9]\d*$/.test(page);

  if (!isPageValid) {
    return res.status(400).send({ message: "Invalid page number" });
  }

  try {
    const result = await getAll(limit, order_by, page);
    const hateoas = await prepareHateoas(result);

    if (hateoas.results.length <= 0)
      return res.status(500).send({ message: "There is not enough data" });

    return res.json(hateoas);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const filterJewel = async (req, res) => {

  const { precio_min, precio_max, categoria, metal } = req.query;

  try {
    const result = await filterAll(precio_min, precio_max, categoria, metal);
    return res.json(result);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const defaultUrl = (req, res) => {
  return res.status(404).send({ message: `${req.originalUrl} : Not Found` });
};

module.exports = {
  readAllJewel,
  filterJewel,
  defaultUrl,
};
