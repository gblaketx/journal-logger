const JSONUtils = require('./src/JSONUtils');

const express = require('express');
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/mostRecentEntry', function(request, response) {
    console.log('Received mostRecentEntry request');
    response.send(JSONUtils.getLastEntry());
});

app.post('/api/validateEntry', function(request, response) {
    console.log('Received validateEntry request');

    const validationResult = JSONUtils.validateEntry(request.body);
    response.send({entryErrors: validationResult});
});

app.post('/api/addEntry', function(request, response) {
    console.log('Received addEntry request');
    const result = JSONUtils.createJSON(request.body);
    if(result) {
        response.send({});
    } else {
        console.log('Doing /api/addEntry error: Failed to create JSON');
        response.status(500).send({});
    }

});

app.listen(port, () => console.log(`Listening on port ${port}`));