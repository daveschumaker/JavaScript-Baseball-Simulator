module.exports = {

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

  // Pitcher hits batter with a pitch!
  probabilityHBP: function(obj) {
    return obj.HBP / this.battersFaced(obj);
  },

  // Wild Pitch!
  probabilityWP: function(obj) {
    return obj.HBP / this.battersFaced(obj);
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