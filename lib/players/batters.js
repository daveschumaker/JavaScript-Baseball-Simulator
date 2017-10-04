module.exports = {
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