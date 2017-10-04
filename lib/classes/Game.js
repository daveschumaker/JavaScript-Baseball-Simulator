const Game = class Game {
    constructor(awayTeam, homeTeam) {
        this.awayTeam = awayTeam || '';
        this.homeTeam = homeTeam || '';

        // Who is on first, second, third. 0 = none, 1 = occupied
        this.baseRunners = [0,0,0];

        this.currentTeam = 'away';
        this.currentOuts = 0;
        this.currentInning = 1;
        this.isActive = true;

        this.awayStats = {
            'R': 0,
            'SO' : 0,
            'BB' : 0,
            'HBP': 0,
            'H' : 0,
            '2B' : 0,
            '3B' : 0,
            'HR' : 0,
        }
        this.homeStats = {
            'R': 0,
            'SO' : 0,
            'BB' : 0,
            'HBP': 0,
            'H' : 0,
            '2B' : 0,
            '3B' : 0,
            'HR' : 0,
        }
    };

    isActive() {
        return this.isActive;
    }

    addRuns(num = 1) {
        const currentTeam = `${this.currentTeam}Stats`;
        this[currentTeam].R = this[currentTeam].R + num;
    }

    addHit() {
        const currentTeam = `${this.currentTeam}Stats`;
        this[currentTeam].H++;
    }

    processBaseRunners(action) {
        if (action === '3B') {
            // Is baserunner on 3rd?
            if (this.baseRunners[2] === 1) {
                this.baseRunners[2] = 0;
                this.addRuns();
            }

            // Is baserunner on 2nd?
            if (this.baseRunners[1] === 1) {
                this.baseRunners[1] = 0;
                this.addRuns();
            }

            // Is baserunner on 1st?
            if (this.baseRunners[0] === 1) {
                this.baseRunners[0] = 0;
                this.addRuns();
            }
        }

        if (action === '2B') {
            // Is baserunner on 3rd?
            if (this.baseRunners[2] === 1) {
                this.baseRunners[2] = 0;
                this.addRuns();
            }

            // Is baserunner on 2nd?
            if (this.baseRunners[1] === 1) {
                this.baseRunners[1] = 0;
                this.addRuns();
            }

            // Is baserunner on 1st? Advances to 3rd
            if (this.baseRunners[0] === 1) {
                this.baseRunners[0] = 0;
                this.baseRunners[2] = 1;
            }
        }

        if (action === 'H') {
            // Is baserunner on 3rd?
            if (this.baseRunners[2] === 1) {
                this.baseRunners[2] = 0;
                this.addRuns();
            }

            // Is baserunner on 2nd?
            if (this.baseRunners[1] === 1) {
                this.baseRunners[1] = 0;
                this.baseRunners[2] = 1;
            }

            // Is baserunner on 1st?
            if (this.baseRunners[0] === 1) {
                this.baseRunners[0] = 0;
                this.baseRunners[1] = 1;
            }
        }
    }

    processAction(action) {
        const currentTeam = `${this.currentTeam}Stats`;

        if (action === 'BB' || action === 'HBP') {
            // TODO: Need a process baserunners function
            this.processBaseRunners(action);
            this.baseRunners = [1,0,0];
            this[currentTeam][action]++;
        } else if (action === 'SO') {
            this.processBaseRunners(action);
            this[currentTeam].SO++;
            this.outs();
        } else if (action === 'H') {
            this.processBaseRunners(action);
            this.baseRunners = [1,0,0];
            this[currentTeam].H++;
        } else if (action === '2B') {
            this.processBaseRunners(action);
            this.baseRunners = [0,1,0];
            this[currentTeam].H++;
            this[currentTeam]['2B']++;
        } else if (action === '3B') {
            this.processBaseRunners(action);
            this.baseRunners = [0,0,1];
            this[currentTeam].H++;
            this[currentTeam]['3B']++;
        } else if (action === 'HR') {
            const totalRuns = 1 + this.baseRunners.reduce((sum, value) => {
                return sum + value;
            });
            this[currentTeam].H++;
            this[currentTeam]['HR']++;
            this[currentTeam]['R'] = this[currentTeam]['R'] + totalRuns;
        } else if (action = 'OUT') {
            this.outs();
        }
    }

    getScore() {
        console.log('        R    H\n');
        console.log(`AWAY    ${this.awayStats.R}    ${this.awayStats.H}`);
        console.log(`HOME    ${this.homeStats.R}    ${this.homeStats.H}\n`);
        console.log(`Inning: ${this.currentInning}  Outs: ${this.currentOuts}`);
    }

    switchTeam() {
        if (this.currentTeam === 'away') {
            this.currentTeam = 'home';
        } else {
            this.currentTeam = 'away';
        }
    }

    newInning() {
        this.switchTeam();
        this.baseRunners = [0, 0, 0];
        this.currentOuts = 0;

        this.currentInning = this.currentInning + 0.5;
        if (this.currentInning >= 9.5) {
            this.isActive = false;
        }

        // if (this.awayStats.R !== this.homeStats.R && this.currentInning >= 9.5) {
        //     this.isActive = false;;
        // } else {
        //     this.currentInning = this.currentInning + 0.5;
        // }
    }

    outs(num = 1) {
        if (this.currentOuts + num >= 3) {
            this.newInning();
        } else {
            this.currentOuts = this.currentOuts + num;
        }
    }
}

module.exports = Game;