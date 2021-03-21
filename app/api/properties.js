const { clean } = require('../utils/utils');
const ndb = require("../../databasePool");

const getProperties = (req, res) => {
  const db = ndb();
  db.query(
    "SELECT *, contracts.id AS contract_id, properties.id AS id, managers.id AS manager_id FROM properties LEFT JOIN contracts ON contracts.property_id = properties.id LEFT JOIN managers ON managers.id = properties.manager_id ORDER BY properties.id ASC",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
  db.end();
}

const createProperty = (req, res) => {
  const {
    propertyName,
    unit,
    isActive,
    notes,
    manager_id
  } = req.body;

  const property = {
    propertyName,
    unit,
    isActive,
    notes,
    manager_id
  };

  const db = ndb();
  db.query(
    "INSERT INTO properties SET ?",
    property,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
  db.end();
}

const deleteProperty = (req, res) => {
  const id = req.params.id;
  const db = ndb();
  db.query(
    "DELETE FROM properties WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
  db.end();
}

const updateProperty = (req, res) => {
  const id = req.params.id;
  const {
    propertyName,
    unit,
    isActive,
    notes,
    manager_id
  } = req.body;

  let property = {
    propertyName,
    unit,
    isActive,
    notes,
    manager_id
  };

  property = clean(property);

  const db = ndb();
  db.query(
    "UPDATE properties SET ? WHERE id = ?",
    [property, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
  db.end();
}

module.exports = {
  createProperty,
  updateProperty,
  deleteProperty,
  getProperties
};