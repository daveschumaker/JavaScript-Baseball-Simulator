const game = require('./game/index.js');
const GameClass = require('./classes/Game.js');
const players = require('./players/data.js');

// Example Players
const batter = players.batters.judge2017;
const pitcher = players.pitchers.kershaw2015;

// Work-In-Progress: New Game Class
const Game = new GameClass();

const getResult = function(result) {
  Game.processAction(result);
};

// Simulate 9 innings...
while (Game.isActive) {
  console.log('Current Inning', Game.currentInning);
  getResult(game.getOutcome(batter, pitcher));
}

// Output the game object once the while-loop has completed.
Game.getScore();
