<template>
    <div class="main-content">
        <div class="turn-indicator">
            It's <b>{{turn.name}}'s</b> turn!
        </div>
        <div class="dice-area">
            <button v-for="die in dice" class="die" title="Hold" @click="hold(die)" id="die" v-bind:key="die">{{die}}</button>
        </div>
        <div v-if="heldDice.length == 0 && dice.length == 0 || this.bust" class="roll-button">
            <button @click="roll(6)" class="roll">Roll</button>
        </div>
        <div v-if="true" class="hold">
            <h2>Held</h2>
            <button v-for="die in heldDice" class="die" title="Return" @click="returnDie(die)" v-bind:key="die">{{die}}</button>
        </div>
        <div class="game-buttons">
            <button v-if="heldDice.length > 0" @click="reroll(turn.player, dice.length)">Score and roll again</button>
            <button @click="endTurn(turn.player)">End Turn</button>
        </div>
    </div>
</template>

<script>

export default {
    components: {
        // Dice
    },
    data: () => {
        let dieOne = './img/die1.png'
        let dieTwo = './img/die2.png'
        let dieThree = './img/die3.png'
        let dieFour = './img/die4.png'
        let dieFive = './img/die5.png'
        let dieSix = './img/die6.png'
        let diceImages = [dieOne, dieTwo, dieThree, dieFour, dieFive, dieSix]
        return { 
            turn: { player: 'playerOne', name: 'Player One' },
            // dice: [],
            dice: diceImages,
            heldDice: [],
            bust: false
        }
    },
    methods: {
        roll(num) {
            let rollResults = []
            for (var i = 0; i < num; i++) {
                rollResults.push((Math.floor(Math.random() * 6) + 1))
            }
            this.dice = rollResults
            this.bust = false
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
        reroll(player, numDice) {
            this[player].roundScore += this[player].heldScore
            this[player].heldScore = 0
            this.heldDice = []
            if (numDice == 0) {
                this.roll(6)
            } else {
                this.roll(numDice)
            }
            if (player == 'playerOne') {
                this.checkBust(this.dice, player, { player: 'playerTwo', name: 'Player Two' })
            } else {
                this.checkBust(this.dice, player, { player: 'playerOne', name: 'Player One' })
            }
        },
        score(dice) {
            let score = 0
            let ones = dice.filter(die => die === 1)
            let twos = dice.filter(die => die === 2)
            let threes = dice.filter(die => die === 3)
            let fours = dice.filter(die => die === 4)
            let fives = dice.filter(die => die === 5)
            let sixes = dice.filter(die => die === 6)

            let allDice = [ones, twos, threes, fours, fives, sixes]

            for (let set of allDice) {
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
        calculateScoreMultiples(dieValue, multiplier) {
            if (dieValue === 1) {
                dieValue = 10
            }
            let value = ((dieValue * 100) * 2 ** multiplier)
            return value
        },
        endTurn(player) {
            this[player].roundScore += this[player].heldScore
            this[player].heldScore = 0
            this[player].totalScore += this[player].roundScore
            this[player].roundScore = 0

            this.dice = []
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
                
                this.dice = []
                this.heldDice = []

                this.playerOne.totalScore = 0
                this.playerTwo.totalScore = 0

                this.turn.player = 'playerOne'
                this.turn.name = 'Player One'
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
        calculateHeldScore(dice, player) {
            let score = this.score(dice)

            this[player].heldScore = score
        }
    }
}
</script>

<style>
.turn-indicator {
    padding: 10%
}

.dice-area {
    float: left;
}

.roll-button {
    position: relative;
    float: left;
}

.hold {
    position: relative;
    clear: both;
    padding: 5% 0%;
}

.game-buttons {
    padding: 33% 0% 0%
}

.die {
    position: relative;
    width: 50px;
    height: 50px;
    float: left;
    background: #ffffff;
    color: rgb(0, 0, 0);
    border: 2px solid rgb(0, 0, 0);
    padding: 4px;
    margin: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>