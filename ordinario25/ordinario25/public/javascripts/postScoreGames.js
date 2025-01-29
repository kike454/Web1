export async function postScoreAndGame(game, score) {
  try {
    // Validación inicial en el cliente
    console.log(`Game recibido: ${game}`);
    console.log(`Score recibido: ${score}`);

    const response = await fetch('http://localhost:3000/restricted/gamesScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ game, score }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Respuesta del servidor:', data);
  } catch (error) {
    console.error('Error en postScoreAndGame:', error);
  }
}



export async function getScoreAndGame() {
  try {
    // Validación inicial en el cliente
    console.log(`Game recibido: ${game}`);
    console.log(`Score recibido: ${score}`);

    const response = await fetch('http://localhost:3000/restricted/getScores');

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Respuesta del servidor:', data);
  } catch (error) {
    console.error('Error en postScoreAndGame:', error);
  }
}


//module.exports = { postScoreAndGame };  