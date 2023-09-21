import express from 'express';
import cors from 'cors';
//import fetch from 'node-fetch';
import fetch from 'cross-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
//app.use(cors());

// initial page
app.get('/', async (req, res) => {
  res.send("<b>Comparando Coordenadas - Adasa - Ana!!!</b>");
});
let token = null;



//ex: http://localhost:3000/exportacao-json?uf=DF&pagina=1&tamanhoPagina=10&idFinalidade=5
app.get('/exportacao-json', async (req, res) => {

  if(!token) {
    console.log('if ! token')
   token = process.env['SNIRH_TOKEN'];
  }

  let url = new URL('http://www.snirh.gov.br/cnarh40_treinamento/rest/api/exportacao/json?');

  const params = new URLSearchParams([
    ...Object.entries(req.query),
  ]).toString();

  const url_params = new URL(`${url.origin}${url.pathname}?${params}`);

  const headers = {
    'Content-Type':'application/json',
    'Accept': 'application/json',
    Authorization:`Bearer ${token}`,
  }
  
  console.log(headers)

  if(headers) {
    console.log('headers', headers, url_params.href)
  }
  await fetch(url_params.href, {
    method: 'GET',
    headers: headers,
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