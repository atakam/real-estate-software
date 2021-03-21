const { clean } = require('../utils/utils');
const ndb = require("../../databasePool");

const getManagers = (req, res) => {
  const db = ndb();
  db.query(
    "SELECT * FROM managers ORDER BY managers.id ASC",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
  db.end();
}

const createManager = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    waNumber,
    notes
  } = req.body;

  const manager = {
    firstName,
    lastName,
    email,
    phoneNumber,
    waNumber,
    notes
  };

  const db = ndb();
  db.query(
    "INSERT INTO managers SET ?",
    manager,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
  db.end();
}

const deleteManager = (req, res) => {
  const id = req.params.id;
  const db = ndb();
  db.query(
    "DELETE FROM managers WHERE id = ?",
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

const updateManager = (req, res) => {
  const id = req.params.id;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    waNumber,
    notes
  } = req.body;

  let manager = {
    firstName,
    lastName,
    email,
    phoneNumber,
    waNumber,
    notes
  };

  manager = clean(manager);

  const db = ndb();
  db.query(
    "UPDATE managers SET ? WHERE id = ?",
    [manager, id],
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
  createManager,
  updateManager,
  deleteManager,
  getManagers
};