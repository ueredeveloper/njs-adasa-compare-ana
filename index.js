const express = require('express');
const cors = require("cors")
const app = express();

app.use(cors());

// initial page
app.get('/', async (req, res) => {
  res.send("<b>Comparando Coordenadas - Adasa - Ana!!!</b>");
});

app.get('/exportacao-json', async (req, res) => {
  console.log('exportacao-json')
  // token
  const token = process.env['SNIRH_TOKEN'];

  let url = new URL('http://www.snirh.gov.br/cnarh40_treinamento/rest/api/exportacao/json?');

  const params = new URLSearchParams([
    ...Object.entries(req.query),
  ]).toString();

  const url_params = new URL(`${url.origin}${url.pathname}?${params}`);

  const headers = {
    'Accept': '*/*',
    'Authorization': token,
  }

  await fetch(url_params.href, {
    method: 'GET',
    headers: headers,
    follow: 'follow',
  })
    .then(response => { return response.json() }).then(json => {
      res.send(JSON.stringify(json))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
})

let port = process.env.PORT || 3000;
app.listen(port, (res, req) => {
  console.log("Comparação de Coordenadas - Adasa - Ana")
})