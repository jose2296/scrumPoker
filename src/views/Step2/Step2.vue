<template>
    <div class="step2">
        <h2>Select room {{ $store.state.userName }}</h2>
        <!-- <h5>Or create on</h5>
        <button v-on:click="createRoom">Create room</button> -->

        <h4>List of rooms</h4>
        <hr style="width: 100%">
        <div class="room" v-for="(room, index) in $store.state.rooms" v-bind:key="index">
            <div class="name">
                {{ room.name }} ({{ room.users.length }})
            </div>
            <button @click="joinRoom(room.name)">Join</button>
        </div>
    </div>
</template>

<script src="./Step2.ts"></script>
<style lang="sass">
    .step2
        width: 500px
        display: flex
        flex-direction: column
        align-items: center
        margin: auto
        .room
            display: flex
            width: 100%
            justify-content: space-between
            padding-bottom: 15px
            .name
                padding-right: 30px
            button
                padding: 5px 30px

</style>
