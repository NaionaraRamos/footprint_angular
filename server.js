const express = require('express')
const path = require('path')
const footprint = process.env.npm_package_name
const app = express();

app.use(express.static(`${__dirname}/dist/${footprint}`));
app.get('/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/dist/${footprint}/index.html`));
});

app.listen(process.env.PORT || 8080);