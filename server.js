const app = require('./app/index');
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("running server on port: " + port);

  const ndb = require("./databasePool");
  const db = ndb();

  db.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('database connected as id ' + db.threadId);
  });
  db.end();
});