var game = require('./game');

// Example batter
var batter = {
  'name': "Kike Hernandez",
  'AB': 202,
  'R': 24,
  'H': 62,
  '2B': 12,
  '3B': 2,
  'HR': 7,
  'RBI': 22,
  'BB': 11,
  'SO': 46,
  'SB': 0,
  'CS': 2,
};

// Example pitcher
// I've included some advanced stats here that I need to figure out.
var pitcher = {
  'name': 'Clayton Kershaw',
  'IP': 232.2,
  'Hits': 163,
  '2B': 26,
  '3B': 2,
  'HR': 15,
  'BB': 42,
  'SO': 301,
  'HBP': 5,
  'BK': 3,
  'WP': 9,
  'BF': 890, 
};

// Use this to store results of multiple matchups to test that everything works.
var gameObject = {
  'SO' : 0,
  'BB' : 0,
  'HBP': 0,
  'H' : 0,
  '2B' : 0,
  '3B' : 0,
  'HR' : 0,
  'OUT' : 0,
};

var getResult = function(result) {
  if (result === 'SO') gameObject.OUT++;
  gameObject[result]++;
};

//console.log(pitcherCalc.probabilitySingle(pitcher));
//console.log('Single: ', batterProbabilitySingle(batter));
//console.log(game.getOutcome(batter, pitcher));

// Simulate 27 outs...
while (gameObject.OUT < 27) {
  getResult(game.getOutcome(batter, pitcher));
}

// Output the game object once the while-loop has completed.
console.log(gameObject);
