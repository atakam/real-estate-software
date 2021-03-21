const { clean } = require('../utils/utils');
const ndb = require("../../databasePool");

const getTenants = (req, res) => {
  const db = ndb();
  db.query(
    "SELECT *, contracts.id AS contract_id FROM tenants LEFT JOIN contracts ON contracts.id = tenants.contract_id ORDER BY form_completion.id DESC",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
  db.end();
}

const createTenant = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    waNumber,
    dateOfBirth,
    isActive,
    notes
  } = req.body;

  const tenant = {
    firstName,
    lastName,
    email,
    phoneNumber,
    waNumber,
    dateOfBirth,
    isActive,
    notes
  };

  const db = ndb();
  db.query(
    "INSERT INTO tenants SET ?",
    tenant,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
  db.end();
}

const deleteTenant = (req, res) => {
  const id = req.params.id;
  const db = ndb();
  db.query(
    "DELETE FROM tenants WHERE id = ?",
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

const updateTenant = (req, res) => {
  const id = req.params.id;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    waNumber,
    dateOfBirth,
    isActive,
    notes
  } = req.body;

  let tenant = {
    firstName,
    lastName,
    email,
    phoneNumber,
    waNumber,
    dateOfBirth,
    isActive,
    notes
  };

  tenant = clean(tenant);

  const db = ndb();
  db.query(
    "UPDATE tenants SET ? WHERE id = ?",
    [tenant, id],
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
  createTenant,
  updateTenant,
  deleteTenant,
  getTenants
};