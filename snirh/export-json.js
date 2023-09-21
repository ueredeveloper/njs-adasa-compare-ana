const router = require("express").Router();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();


// bollinger technical
router.get('/', async (req, res) => {

  // token
  const token = process.env['SNIRH_TOKEN'];

  let url = new URL('http://www.snirh.gov.br/cnarh40_treinamento/rest/api/exportacao/json?');

  const params = new URLSearchParams([
    ...Object.entries(req.query),
  ]).toString();

  const url_params = new URL(`${url.origin}${url.pathname}?${params}`);

  await fetch(url_params.href, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    }
  })
    .then(response => { return response.json() }).then(json => {
      res.send(JSON.stringify(json))
    })
    .catch((error) => {
      console.error('Error:', error);
    });

})

module.exports = router;