const { clean } = require('../utils/utils');
const ndb = require("../../databasePool");

const getTenants = (req, res) => {
  const db = ndb();
  db.query(
    "SELECT * FROM tenants ORDER BY tenants.id DESC",
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
    cni,
    cni_date,
    job,
    address,
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
    cni,
    cni_date,
    job,
    address,
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
    cni,
    cni_date,
    job,
    address,
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
    cni,
    cni_date,
    job,
    address,
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