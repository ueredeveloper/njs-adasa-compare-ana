const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exportJson } = require('./snirh');
const app = express();
// router
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use
app.use("/", router);
router.use("/exportacao-json", exportJson);

// initial page
app.get('/', async (req, res) => {
    res.send("<b>Comparando Coordenadas - Adasa - Ana!!!</b>");
  });


let port = process.env.PORT || 3000;
app.listen(port, (res, req) => {
  console.log("Comparação de Coordenadas - Adasa - Ana")
})