const { clean } = require('../utils/utils');
const ndb = require("../../databasePool");
const { createDoc } = require('nodejs-html-docx');

const getContracts = (req, res) => {
  const db = ndb();
  db.query(
    "SELECT *, properties.id AS property_id, properties.notes AS property_notes, contracts.notes AS notes, contracts.id AS id FROM contracts LEFT JOIN properties ON contracts.property_id = properties.id ORDER BY contracts.id ASC",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
  db.end();
}

const createContract = (req, res) => {
  const {
    reference,
    template_id,
    property_id,
    tenant_ids,
    lender,
    landlord,
    signed_date,
    rent_type,
    duration,
    payment_frequency,
    amount,
    deposit,
    caution,
    start_date,
    deposit_date,
    revision_date,
    payment_location,
    notes
  } = req.body;

  let contract = {
    reference,
    template_id,
    property_id,
    tenant_ids,
    lender,
    landlord,
    signed_date,
    rent_type,
    duration,
    payment_frequency,
    amount,
    deposit,
    caution,
    start_date,
    deposit_date,
    revision_date,
    payment_location,
    notes
  };

  contract = clean(contract);

  const db = ndb();
  db.query(
    "INSERT INTO contracts SET ?",
    contract,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
  db.end();
}

const deleteContract = (req, res) => {
  const id = req.params.id;
  const db = ndb();
  db.query(
    "DELETE FROM contracts WHERE id = ?",
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

const updateContract = (req, res) => {
  const id = req.params.id;
  const {
    reference,
    template_id,
    property_id,
    tenant_ids,
    lender,
    landlord,
    signed_date,
    rent_type,
    duration,
    payment_frequency,
    amount,
    deposit,
    caution,
    start_date,
    deposit_date,
    revision_date,
    payment_location,
    notes
  } = req.body;

  let contract = {
    reference,
    template_id,
    property_id,
    tenant_ids,
    lender,
    landlord,
    signed_date,
    rent_type,
    duration,
    payment_frequency,
    amount,
    deposit,
    caution,
    start_date,
    deposit_date,
    revision_date,
    payment_location,
    notes
  };

  contract = clean(contract);

  const db = ndb();
  db.query(
    "UPDATE contracts SET ? WHERE id = ?",
    [contract, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
  db.end();
}

const downloadDoc = (req, res) => {
  const {
    htmlMarkup,
    headerTitle
  } = req.body;
  createDoc(htmlMarkup, { headerTitle, outputFile: 'Report' }).then(path => {
    // you get the path for the generated file here
    console.log('Conversion complete at => ', path)
    res.download(path); // Set disposition and send it.
  }).catch(err => {
    // You know this
    console.log(err)
  })
}

module.exports = {
  createContract,
  updateContract,
  deleteContract,
  getContracts,
  downloadDoc
};