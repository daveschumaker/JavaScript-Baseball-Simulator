// Game Calculations
const batterCalc = require('../players/batters.js');
const pitcherCalc = require('../players/pitchers.js');
const leagueAvg = require('./leagueAverages.js');

module.exports = {
  // Address differences between batters and pitchers
  matchupCalc: function(batter, pitcher, leagueAverage, calcType) {
    var calcProbability = (batter * pitcher) / leagueAverage;
    //console.log('Calculation for', calcType, calcProbability);
    return calcProbability;
  },

  // Calculate the outcome of a particular batter-pitcher matchup.
  getOutcome: function(batter, pitcher) {
    var rollDice = Math.random();
    //console.log('Dice Roll:', rollDice);

    // Probabilities for certain events.
    var walkProbability = this.matchupCalc(batterCalc.probabilityBB(batter), pitcherCalc.probabilityBB(pitcher), leagueAvg.avgBB(), 'BB');
    var strikeOutProbability = walkProbability + this.matchupCalc(batterCalc.probabilitySO(batter), pitcherCalc.probabilitySO(pitcher), leagueAvg.avgSO(), 'SO');
    var hitByPitchProbability = strikeOutProbability + pitcherCalc.probabilityHBP(pitcher);
    var singleProbability = hitByPitchProbability + this.matchupCalc(batterCalc.probabilitySingle(batter), pitcherCalc.probabilitySingle(pitcher), leagueAvg.avgH(), 'H');
    var doubleProbability = singleProbability + this.matchupCalc(batterCalc.probabilityDouble(batter), pitcherCalc.probabilityDouble(pitcher), leagueAvg.avg2B(), '2B');
    var tripleProbability = doubleProbability + this.matchupCalc(batterCalc.probabilityTriple(batter), pitcherCalc.probabilityTriple(pitcher), leagueAvg.avg3B(), '3B');
    var homerunProbability = tripleProbability + this.matchupCalc(batterCalc.probabilityHR(batter), pitcherCalc.probabilityHR(pitcher), leagueAvg.avgHR(), 'HR');

    switch(true) {
      // Batter walks
      case (rollDice < walkProbability):
        console.log('Batter Walked!');
        return 'BB';
        break;
      // Batter strikes out
      case (rollDice < strikeOutProbability):
        console.log('Batter struck out!');
        return 'SO';
        break;
      // Batter hit by a pitch!
      case (rollDice < hitByPitchProbability):
        console.log('Batter hit by a pitch!');
        return  'HBP';
        break;
      // Batter hits a single
      case (rollDice < singleProbability):
        console.log('Batter hits a single.');
        return 'H';
        break;
      // Batter hits a double
      case (rollDice < doubleProbability):
        console.log('Batter hits a double.');
        return '2B';
        break;
      // Batter hits a triple
      case (rollDice < tripleProbability):
        console.log('Batter hits a triple.');
        return '3B';
        break;
      // Batter hits a homerun!
      case (rollDice < homerunProbability):
        console.log('Batter hits a DINGER!.');
        return 'HR';
        break;
      default:
        console.log('Batter grounded out. Oops.');
        return 'OUT';
        break;
    }
  },

};