var express = require('express');
var crypto = require('crypto');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function reverseString(str) {
  let arrStr = str.split("");
  return arrStr.reverse().join("");
}

// Endpoint principal
app.get("/", async function (request, response) {
  const r = {
    'message': 'Nothing to send'
  };
  response.json(r);
});

// Servicio 001 - Reverso de parámetros recibidos en la URL
app.get("/serv001", async function (req, res) {
  const user_id = req.query.id;
  const token = req.query.token;
  const geo = req.query.geo;

  const r = {
    'user_id': reverseString(user_id),
    'token': reverseString(token),
    'geo': reverseString(geo)
  };

  res.json(r);
});

// Servicio 0010 - Retorna los parámetros recibidos en la URL sin modificarlos
app.get("/serv0010", async function (req, res) {
  const user_id1 = req.query.id;
  const token1 = req.query.token;
  const geo1 = req.query.geo;

  const r1 = {
    'user_id': user_id1,
    'token': token1,
    'geo': geo1
  };

  res.json(r1);
});

// Servicio 002 - Recibe datos en el cuerpo de la solicitud y los retorna
app.post("/serv002", async function (req, res) {
  const user_id = req.body.id;
  const token = req.body.token;
  const geo = req.body.geo;

  const r = {
    'user_id': user_id,
    'token': token,
    'geo': geo
  };

  res.json(r);
});

// Servicio 003 - Recibe un parámetro en la URL y lo retorna
app.post("/serv003/:info", async function (req, res) {
  const info = req.params.info;
  const r = { 'info': info };
  res.json(r);
});

// Servicio 007 - Recibe datos en el cuerpo de la solicitud y un parámetro en la URL, y los retorna
app.post("/serv007/:info", async function (req, res) {
  const user_id = req.body.id;
  const token = req.body.token;
  const geo = req.body.geo;
  const info = req.params.info;

  const r = {
    'user_id': user_id,
    'token': token,
    'geo': geo,
    'info': info
  };

  res.json(r);
});

// Servicio mascaracteres - Retorna la cadena con más caracteres entre las dos recibidas
app.post("/mascaracteres", async function (req, res) {
  const str1 = req.body.str1;
  const str2 = req.body.str2;

  if (!str1 || !str2) {
    return res.status(400).json({ error: "Both str1 and str2 are required" });
  }

  const result = str1.length >= str2.length ? str1 : str2;

  res.json({ result: result });
});

// Servicio menoscaracteres - Retorna la cadena con menos caracteres entre las dos recibidas
app.post("/menoscaracteres", async function (req, res) {
  const str1 = req.body.str1;
  const str2 = req.body.str2;

  if (!str1 || !str2) {
    return res.status(400).json({ error: "Both str1 and str2 are required" });
  }

  const result = str1.length <= str2.length ? str1 : str2;

  res.json({ result: result });
});

// Servicio numcaracteres - Retorna el número de caracteres en la cadena recibida
app.post("/numcaracteres", async function (req, res) {
  const str = req.body.str;

  if (!str) {
    return res.status(400).json({ error: "str is required" });
  }

  const result = str.length;

  res.json({ result: result });
});

// Servicio palindroma - Verifica si la cadena recibida es un palíndromo
app.post("/palindroma", async function (req, res) {
  const str = req.body.str;

  if (!str) {
    return res.status(400).json({ error: "str is required" });
  }

  const reversedStr = str.split('').reverse().join('');
  const result = str === reversedStr;

  res.json({ result: result });
});

// Servicio concat - Concatenación de dos cadenas recibidas
app.post("/concat", async function (req, res) {
  const str1 = req.body.str1;
  const str2 = req.body.str2;

  if (!str1 || !str2) {
    return res.status(400).json({ error: "Both str1 and str2 are required" });
  }

  const result = str1 + str2;

  res.json({ result: result });
});

// Servicio applysha256 - Aplica SHA256 a la cadena recibida y la retorna junto con la cadena original
app.post("/applysha256", async function (req, res) {
  const str = req.body.str;

  if (!str) {
    return res.status(400).json({ error: "str is required" });
  }

  const hash = crypto.createHash('sha256').update(str).digest('hex');

  res.json({ original: str, encrypted: hash });
});

// Servicio verifysha256 - Verifica si una cadena encriptada con SHA256 coincide con otra cadena
app.post("/verifysha256", async function (req, res) {
  const encrypted = req.body.encrypted;
  const str = req.body.str;

  if (!encrypted || !str) {
    return res.status(400).json({ error: "Both encrypted and str are required" });
  }

  const hash = crypto.createHash('sha256').update(str).digest('hex');
  const result = hash === encrypted;

  res.json({ result: result });
});

// Iniciar servidor en puerto 3000
app.listen(3000, function() {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});

