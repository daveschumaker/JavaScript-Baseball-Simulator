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

// 2015 League Totals
// From: http://www.baseball-reference.com/leagues/MLB/2015.shtml
var leagueTotals = {
  'AB': 183628,
  'H': 42107,
  '2B': 8242,
  '3B': 8242,
  'HR': 4909,
  'SO': 37446,
  'BB': 14073,
};

// Calculate league averages
var leagueAvg = {
  avgH: function(obj) {
    return obj.H / obj.AB;
  },

  avgSO: function(obj) {
    return obj.SO / obj.AB;
  },

  avgBB: function(obj) {
    return obj.BB / obj.AB;
  },

  avg2B: function(obj) {
    return obj['2B'] / obj.AB;
  },

  avg3B: function(obj) {
    return obj['3B'] / obj.AB;
  },

  avgHR: function(obj) {
    return obj.HR / obj.AB;
  },

};


var batterCalc = {
  // Calculate the total number of plate appearances.
  totalPAs: function(obj) {
    // PA = AB + BB;
    return obj['AB'] + obj['BB'];
  },
  
  // Calculate batter's walk probability
  probabilityBB: function(obj) {
    return obj['BB'] / this.totalPAs(obj);
  },

  // Calculate batter's strike out probability
  probabilitySO: function(obj) {
    return obj['SO'] / this.totalPAs(obj);
  },  

  // Calculate batter's probability of hitting a single.
  probabilitySingle: function(obj) {
    return ((obj['H'] - (obj['2B'] + obj['3B'] + obj['HR'])) / this.totalPAs(obj));
  },

  // Calculate batter's probability of hitting a double.
  probabilityDouble: function(obj) {
    return obj['2B'] / this.totalPAs(obj);
  },

  // Calculate batter's probability of hitting a triple.
  probabilityTriple: function(obj) {
    return obj['3B'] / this.totalPAs(obj);
  },

  // Calculate batter's probability of hitting a homerun.
  probabilityHR: function(obj) {
    return obj['HR'] / this.totalPAs(obj);
  },

};

var pitcherCalc = {
  // Total number of batters faced.
  battersFaced: function(obj) {
    //console.log('Real BF:', obj.BF);
    //console.log('Calc BF:', (obj.IP * 3) + obj.Hits + obj.BB);

    if (obj.BF) return obj.BF;

    // Alternative calculation for batters faced
    // (IP x 3) + Hits + BB
    return (obj.IP * 3) + obj.Hits + obj.BB;
  },

  probabilitySO: function(obj) {
    return obj.SO / this.battersFaced(obj);
  },

  probabilityBB: function(obj) {
    return obj.BB / this.battersFaced(obj);
  },

  // Calculate probability of giving up a home run
  probabilityHR: function(obj) {
    return obj.HR / this.battersFaced(obj);
  },

  // Calculate probability of giving up a single
  probabilitySingle: function(obj) {
    return (obj.Hits - obj['2B'] - obj['3B'] - obj.HR) / this.battersFaced(obj);
  },

  probabilityDouble: function(obj) {
    return obj['2B'] / this.battersFaced(obj);
  },

  probabilityTriple: function(obj) {
    return obj['3B'] / this.battersFaced(obj);
  },
};

// Address differences between batters and pitchers
var matchupCalc = function(batter, pitcher, leagueAverage, calcType) {
  var calcProbability = (batter * pitcher) / leagueAverage;
  console.log('Calculation for', calcType, calcProbability);
  return calcProbability;
};

var whatHappens = function() {
  var rollDice = Math.random();
  console.log('Dice Roll:', rollDice);

  // Probabilities for certain events.
  var walkProbability = matchupCalc(batterCalc.probabilityBB(batter), pitcherCalc.probabilityBB(pitcher), leagueAvg.avgBB(leagueTotals), 'BB');
  var strikeOutProbability = walkProbability + matchupCalc(batterCalc.probabilitySO(batter), pitcherCalc.probabilitySO(pitcher), leagueAvg.avgSO(leagueTotals), 'SO');
  var singleProbability = strikeOutProbability + matchupCalc(batterCalc.probabilitySingle(batter), pitcherCalc.probabilitySingle(pitcher), leagueAvg.avgH(leagueTotals), 'H');
  var doubleProbability = singleProbability + matchupCalc(batterCalc.probabilityDouble(batter), pitcherCalc.probabilityDouble(pitcher), leagueAvg.avg2B(leagueTotals), '2B');
  var tripleProbability = doubleProbability + matchupCalc(batterCalc.probabilityTriple(batter), pitcherCalc.probabilityTriple(pitcher), leagueAvg.avg3B(leagueTotals), '3B');
  var homerunProbability = tripleProbability + matchupCalc(batterCalc.probabilityHR(batter), pitcherCalc.probabilityHR(pitcher), leagueAvg.avgHR(leagueTotals), 'HR');

  switch(true) {
    // Batter walks
    case (rollDice < walkProbability):
      console.log('Batter Walked!');
      break;
    // Batter strikes out
    case (rollDice < strikeOutProbability):
      console.log('Batter struck out!');
      break;
    // Batter hits a single
    case (rollDice < singleProbability):
      console.log('Batter hits a single.');
      break;
    // Batter hits a double
    case (rollDice < doubleProbability):
      console.log('Batter hits a double.');
      break;
    // Batter hits a triple
    case (rollDice < tripleProbability):
      console.log('Batter hits a triple.');
      break;
    // Batter hits a homerun!
    case (rollDice < homerunProbability):
      console.log('Batter hits a DINGER!.');
      break;
    default:
      console.log('Batter grounded out. Oops.');
      break;
  }
};

console.log(pitcherCalc.probabilitySingle(pitcher));
//console.log('Single: ', batterProbabilitySingle(batter));
console.log(whatHappens());