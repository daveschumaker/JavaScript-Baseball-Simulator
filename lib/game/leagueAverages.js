// Calculate league averages

// 2015 League Totals
// From: http://www.baseball-reference.com/leagues/MLB/2015.shtml
const leagueTotals2015 = {
    'AB': 183628,
    'H': 42107,
    '2B': 8242,
    '3B': 939,
    'HR': 4909,
    'SO': 37446,
    'BB': 14073,
};

// 2017 League Totals
// https://www.baseball-reference.com/leagues/MLB/2017.shtml
const leagueTotals = {
    'AB': 165567,
    'H': 42214,
    '2B': 8397,
    '3B': 795,
    'HR': 6105,
    'SO': 40104,
    'BB': 15829,
};

const calcLeagueAverage = {
    avgH() {
        return leagueTotals.H / leagueTotals.AB;
    },

    avgSO() {
        return leagueTotals.SO / leagueTotals.AB;
    },

    avgBB() {
        return leagueTotals.BB / leagueTotals.AB;
    },

    avg2B() {
        return leagueTotals['2B'] / leagueTotals.AB;
    },

    avg3B() {
        return leagueTotals['3B'] / leagueTotals.AB;
    },

    avgHR() {
        return leagueTotals.HR / leagueTotals.AB;
    }
};

module.exports = calcLeagueAverage;