const express = require("express");
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/js"));

app.get('/', function (req, res) {
    res.render('/static/index.html');
})

app.listen(port, function () {
    console.log(`listening on port ${port}`);
});