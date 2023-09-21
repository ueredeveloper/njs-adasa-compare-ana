import express from "express";
import { Router } from "express";
import dotenv from 'dotenv';


// bollinger technical
router.get('/', async (req, res) => {

  // token
  const token = process.env['SNIRH_TOKEN'];

  console.log(token)

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
      console.log(json)
      res.send(JSON.stringify(json))
    })
    .catch((error) => {
      console.error('Error:', error);
    });

})

module.exports = router;