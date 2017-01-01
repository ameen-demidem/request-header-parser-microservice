const express = require('express');

const app = express();
app
  .set('port', process.env.PORT || 3000)
  .get('*', (req, res) => {
    res.type('application/json');
    res.end(JSON.stringify({
      ipaddress: req.ip,
      language: figureoutLang(req),
      os: figureoutOS(req)
    }));
  })
  .listen(app.get('port'));

console.log('Server listening on port', app.get('port'));

function figureoutOS(req) {
  const userAgent = req.get('user-agent');
  const openingParens = userAgent.indexOf('(')+1;
  const closingParens = userAgent.indexOf(')');
  return userAgent.slice(openingParens, closingParens); 
}

function figureoutLang(req) {
  return req.get('accept-language').split(',')[0];
}
