const express = require('express');
const path = require('path');
const routes = require("./routes");

const app = express();

app.use(routes);

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
