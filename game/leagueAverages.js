// Calculate league averages

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

module.exports = {
  avgH: function() {
    return leagueTotals.H / leagueTotals.AB;
  },

  avgSO: function() {
    return leagueTotals.SO / leagueTotals.AB;
  },

  avgBB: function() {
    return leagueTotals.BB / leagueTotals.AB;
  },

  avg2B: function() {
    return leagueTotals['2B'] / leagueTotals.AB;
  },

  avg3B: function() {
    return leagueTotals['3B'] / leagueTotals.AB;
  },

  avgHR: function() {
    return leagueTotals.HR / leagueTotals.AB;
  },

};