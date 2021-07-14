<template>
    <div class="help">
        <button @click="isHelpHidden = !isHelpHidden">Help</button>
        <div v-if="!isHelpHidden">
            <h4>Rules:</h4>
            <p>Each player gets 6 dice.</p>
            <p>Roll all six, then choose dice to hold from that roll for points.
            <p>Choose to roll again with remaining dice or pass turn.</p>
            <p>If no dice in a roll yield points, then the turn is bust.</p>
            <p>First player to earn 2000 points wins.</p>
            <h4>Points system:</h4>
            <p>1 is worth 100 points, 5 is worth 50</p>
            <p>Three of a kind is worth that number x100 (i.e. three 2s is worth 200)</p>
            <p>Three 1s are worth 1000 points</p>
            <p>Four or more of a kind is worth double the points of three of a kind</p>
            <p>Four 4s is worth 800, five 4s is 1600</p>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return { 
            isHelpHidden: true,
        }
    },
    methods: {

    }
}
</script>

<style>

</style>