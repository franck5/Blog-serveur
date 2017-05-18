var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var nodefs = require('fs');
var validator = require('validator');
var isEmpty = require('lodash/isEmpty');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.set('views', './views')
app.set('view engine', 'jade');

function toAlpha(string){
  return string.replace('-','').split(" ").join('');
}

function check(coordinate){
  var errors = {};
  if(!validator.isAlpha(toAlpha(coordinate.titre))){
    errors.titre = "Pas de caractéres spéciaux";
  }
  if(!validator.isAlpha(toAlpha(coordinate.text))){
    errors.text = "Pas de caractéres spéciaux";
  }
   if(validator.isEmpty(coordinate.titre)){
    errors.titre = "Champ obligatoire";
  }
  if(validator.isEmpty(coordinate.text)){
    errors.text = "Champ obligatoire";
  }
  return errors;
};

app.get('/', function(req, res){
  
  res.render('admin', {errors : {}});
});

app.get('/test', function(req, res){
	nodefs.readFile('save.json','utf8', function (err, data) {
		if (err){ throw err; }
		res.send(data);
	});	
})

app.get('/delete', function(req, res){
  nodefs.readFile('save.json','utf8', function (err, data) {
    if (err){ throw err; }
    res.send(data);
  }); 
})

app.post('/result', function(req, res){
	nodefs.readFile('save.json','utf8', function (err, data) {
		if (err){ throw err; }
		var user = {titre : req.body.titre, text : req.body.text};
		var fichier = JSON.parse(data);
		fichier.push(user);
		console.log(fichier)
		  
		nodefs.writeFile('save.json', JSON.stringify(fichier) , function (err) {
			if (err) throw err;
			console.log('Enregistrement reussi');
  if(isEmpty(check(req.body))){
    res.render('result', {titre : req.body.titre, text : req.body.text});
  }else{
    console.log(check(req.body))
    res.render('admin', {
      titre: req.body.titre,
      text: req.body.text,
      errors: check(req.body)
    })
  }
    });
  });

  


});

app.use(express.static(__dirname + '/'));

app.listen(3000, function () {
  console.log('Serveur Ok');
});
