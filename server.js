const app = require('./app/index');
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("running server on port: " + port);
});