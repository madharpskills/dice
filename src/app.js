var app = new Vue({
    el: '#app',
    data: {
        isHelpHidden: true,
        tempusername: '',
        playerOne: { id: 1, name: 'Player One', newName: '', heldScore: 0, roundScore: 0, totalScore: 0 },
        playerTwo: { id: 2, name: 'Player Two', newName: '', heldScore: 0, roundScore: 0, totalScore: 0 },
        renaming: { playerOne: false, playerTwo: false },
        newName: '',
        turn: { player: 'playerOne', name: 'Player One' },
        dice: [1, 2, 3, 4, 5, 6],
        heldDice: []
    },
    methods: {
        roll(num) {
            let rollResults = []
            for (var i = 0; i < num; i++) {
                rollResults.push((Math.floor(Math.random() * 6) + 1))
            }
            this.dice = rollResults
        },
        renamePlayer(player, newName) {
            this.renaming[player] = !this.renaming[player]
            this[player].name = newName
        },
        hold(die) {
            let heldDie = this.dice.find(targetDie => targetDie === die)
            let rm = this.dice.findIndex(targetDie => targetDie === die)

            this.heldDice.push(heldDie)
            this.dice.splice(rm, 1)
            this.calculateHeldScore(this.heldDice, this.turn.player)
        },
        returnDie(die) {
            let returnDie = this.heldDice.find(targetDie => targetDie === die)
            let rm = this.heldDice.findIndex(targetDie => targetDie === die)

            this.heldDice.splice(rm, 1)
            this.dice.push(returnDie)
            this.calculateHeldScore(this.heldDice, this.turn.player)
        },
        score(dice) {
            let score = 0
            let ones = dice.filter(die => die === 1)
            let twos = dice.filter(die => die === 2)
            let threes = dice.filter(die => die === 3)
            let fours = dice.filter(die => die === 4)
            let fives = dice.filter(die => die === 5)
            let sixes = dice.filter(die => die === 6)

            allDice = [ones, twos, threes, fours, fives, sixes]

            for (set of allDice) {
                if (set.length > 2) {
                    score += this.calculateScoreMultiples(set[0], set.length - 3)
                }

                if (set[0] === 1 && set.length < 3) {
                    for (die of set) {
                        score += 100
                    }
                }

                if (set[0] === 5 && set.length < 3) {
                    for (die of set) {
                        score += 50
                    }
                }
            }

            return score
        },
        calculateHeldScore(dice, player) {
            let score = this.score(dice)

            this[player].heldScore = score
        },
        calculateScoreMultiples(dieValue, multiplier) {
            if (dieValue === 1) {
                dieValue = 10
            }
            let value = ((dieValue * 100) * 2 ** multiplier)
            return value
        },
        reroll(player, numDice) {
            this[player].roundScore += this[player].heldScore
            this[player].heldScore = 0
            this.heldDice = []
            this.roll(numDice)
            if (player == 'playerOne') {
                this.checkBust(this.dice, player, { player: 'playerTwo', name: 'Player Two' })
            } else {
                this.checkBust(this.dice, player, { player: 'playerOne', name: 'Player One' })
            }
        },
        checkBust(dice, player, nextPlayer) {
            let score = this.score(dice)
            
            if (score == 0) {
                this.bust = true
                alert('Bust!')
                this[player].roundScore = 0
                this.turn.player = nextPlayer.player
                this.turn.name = nextPlayer.name
            }
        },
        endTurn(player) {
            this[player].roundScore += this[player].heldScore
            this[player].heldScore = 0
            this[player].totalScore += this[player].roundScore
            this[player].roundScore = 0

            this.dice = [1, 2, 3, 4, 5, 6]
            this.heldDice = []

            if (player == 'playerOne') {
                this.turn.player = 'playerTwo'
                this.turn.name = 'Player Two'
            } else {
                this.turn.player = 'playerOne'
                this.turn.name = 'Player One'
            }

            if (this[player].totalScore >= 2000) {
                alert(`${this[player].name} won!`)
                
                this.dice = [1, 2, 3, 4, 5, 6]
                this.heldDice = []

                this.playerOne.totalScore = 0
                this.playerTwo.totalScore = 0

                this.turn.player = 'playerOne'
                this.turn.name = 'Player One'
            }
        }
    }
})