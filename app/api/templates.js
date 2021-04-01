const { clean } = require('../utils/utils');
const ndb = require("../../databasePool");

const getTemplates = (req, res) => {
  const db = ndb();
  db.query(
    "SELECT * FROM templates ORDER BY templates.id ASC",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
  db.end();
}

const getSections = (req, res) => {
  const id = req.params.id;
  const db = ndb();
  db.query(
    "SELECT * FROM template_sections WHERE template_id = ? ORDER BY template_sections.position ASC",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      else res.send(result);
    }
  );
  db.end();
}

const createTemplate = (req, res) => {
  const {
    t_name,
    number_parties
  } = req.body;

  const template = {
    t_name,
    number_parties
  };

  const db = ndb();
  db.query(
    "INSERT INTO templates SET ?",
    template,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
  db.end();
}

const deleteTemplate = (req, res) => {
  const id = req.params.id;
  const db = ndb();
  db.query(
    "DELETE FROM templates WHERE id = ?",
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

const updateTemplate = (req, res) => {
  const id = req.params.id;
  const {
    t_name,
    number_parties,
    sections
  } = req.body;

  let template = {
    t_name,
    number_parties
  };

  sections.forEach(el => {
    let tsections = {
      id: el.id || null,
      template_id: id,
      content: JSON.stringify(el)
    };
    tsections = clean(tsections);

    if (el.id) {
      const db1 = ndb();
      db1.query(
        `UPDATE template_sections SET ? WHERE id=?`,
        [tsections, el.id],
        (err, result) => {
          if (err) {
            res.send({ err: err, tsections });
          }
        }
      );
      db1.end();
    } else {
      const db1 = ndb();
      db1.query(
        `INSERT INTO template_sections SET ?`,
        tsections,
        (err, result) => {
          if (err) {
            res.send({ err: err, tsections });
          }
        }
      );
      db1.end();
    }
  });

  template = clean(template);
  const db2 = ndb();
  db2.query(
    "UPDATE templates SET ? WHERE id = ?",
    [template, id],
    (err, result) => {
      if (err) {
        res.send({ err: err, template });
      }
      res.send(result);
    }
  );
  db2.end();
}

module.exports = {
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplates,
  getSections
};