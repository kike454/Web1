games = {};

games.data = {}; 


games.save = function (game, score) {
  if (!games.data[game]) {
    games.data[game] = [];
  }
    games.data[game] = { game, score };
    console.log(games.data) // Almacena el juego y su score
  };





  module.exports = games;