const express = require("express");
const path = require('path');
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require('express-session')
const MemoryStore = require('memorystore')(session)

const {
  registerRouter,
  loginGetRouter,
  loginPostRouter,
  logoutRouter,
  forgotPassword
} = require('./api/credentials');

const {
  createTenant,
  updateTenant,
  deleteTenant,
  getTenants
} = require('./api/tenants');

const {
  createProperty,
  updateProperty,
  deleteProperty,
  getProperties
} = require('./api/properties');

const {
  createManager,
  updateManager,
  deleteManager,
  getManagers
} = require('./api/managers');

const {
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplates,
  getSections
} = require('./api/templates');

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    secret: 'keyboard cat',
    saveUninitialized: false
  })
);

app.post("/register", registerRouter);
app.get("/login", loginGetRouter);
app.get("/logout", logoutRouter);
app.post("/login", loginPostRouter);
app.post("/forgotpw", forgotPassword);

app.get("/tenant/findAll", getTenants);
app.delete("/tenant/delete/:id", deleteTenant);
app.post("/tenant/create", createTenant);
app.put("/tenant/update/:id", updateTenant);

app.get("/property/findAll", getProperties);
app.delete("/property/delete/:id", deleteProperty);
app.post("/property/create", createProperty);
app.put("/property/update/:id", updateProperty);

app.get("/manager/findAll", getManagers);
app.delete("/manager/delete/:id", deleteManager);
app.post("/manager/create", createManager);
app.put("/manager/update/:id", updateManager);

app.get("/template/findAll", getTemplates);
app.get("/template_sections/findAll/:id", getSections);
app.delete("/template/delete/:id", deleteTemplate);
app.post("/template/create", createTemplate);
app.put("/template/update/:id", updateTemplate);

module.exports = app;