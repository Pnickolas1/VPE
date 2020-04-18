const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const axios  = require('axios')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var Airtable = require('airtable');

const API_KEY = ''
var base = new Airtable({apiKey: API_KEY }).base('appAvx7alyyMwT8TR');


// CONSTANT ROUTE/API KEY
const AIR_TABLE_BASE_ROUTE = `https://api.airtable.com/v0/appAvx7alyyMwT8TR`
const surveys = `${AIR_TABLE_BASE_ROUTE}/surveys\?api_key\=${API_KEY}`

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/surveys', async function (req, res) {
    return axios.get(`${surveys}`)
      .then(data => res.send({ error: false, data: data.data.records }))
      .catch(err => res.send({ error: true, err: err, data: []}))
 })

 app.get('/api/:id', async function (req, res) {
  const id = req.params.id
  return axios.get(`${AIR_TABLE_BASE_ROUTE}/surveys/${id}\?api_key\=${API_KEY}`)
  .then(data => res.send({ success: true, error: false, data: data.data, err: ''}))
  .catch(err => res.send({ success: false, error: true, err: err, data: []}))
})

app.post('/api/submit', async function (req, res) {
  const clientPayload = req.body
  const air_table_payload = {
    uuid: clientPayload.id,
    survey_uuid: clientPayload.uuid,
    user_email: clientPayload.email,
    user_choice: clientPayload.number,
    }
  //  making a post req with axios was not playing nicely with the airtable
    base('responses').create(air_table_payload
    , {typecast: true}, function(err, record) {
      if (err) {
        console.error(err);
        res.send({ error: err, success: false, record: null });
      }
      res.send({ error: false, success: true, record: record.getId() });
    });
})


app.listen(8080, function() {
  console.log("server started on port", 8080);
})
