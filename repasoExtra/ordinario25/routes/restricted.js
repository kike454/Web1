var express = require('express');
var router = express.Router();
const database  = require('../database');
const games = require('../database/models/games.model'); 
require('dotenv').config(); 

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    res.render('restricted', { title: 'Restricted', user: req.session.user, db: database.users.data });
} else {
    res.redirect('/login');
}
});


router.post('/gamesScore', (req, res) => {
  const { game, score } = req.body;

  // Obtener la lista de juegos desde la variable de entorno
  const validGames = process.env.GAMES.split(',');
  
  // Validar que el juego sea válido
  if (!validGames.includes(game)) {
    return res.status(400).json({ message: `El juego ${game} no está permitido.` });
  }

  // Validar que el score sea un entero positivo
  if (!Number.isInteger(score) || score < 0) {
    return res.status(400).json({ message: `El score debe ser un entero positivo.` });
  }

  // Registrar el juego y el score
  try {
    games.save(game, score);
    database.users.data[req.session.user].score += score;
/*
    console.log(req.session.user);
    console.log(database.users.data);

    console.log(database.users.data[req.session.user]);
    console.log(database.users.data[req.session.user].score);
*/

    console.log(`Juego registrado: ${game}, Score: ${score}`);
    res.status(200).json({ message: 'Juego y score registrados correctamente.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});
router.get('/getScores',  function(req, res, next) {
  try{
//refrecar la pagina
  const usuarios =  database.users.get();

  res.status(200).json({ message: 'Datos recuperdos tras perder' , usuarios});
  }catch(error){

  }
});



module.exports = router;