<template>
    <div class="step3" v-if="!!room">

        <hr>
        <h3>ME: {{ wsUser.id }} | {{ wsUser.name }}</h3>
        <hr>
        <h1>{{ room.status }}</h1>


        <h1>Room: {{ room.name }}</h1>
        <p>{{ room.adminUser}} </p>
        <h4>Users:</h4>
        <div
            class="user"
            v-for="(user, index) in room.users"
            v-bind:key="index"
        >
            {{ user.name }} {{ user.id === room.adminUser ? '(Admin)' : '' }}
        </div>


        <!-- VOTING -->
        <div v-if="room.status === 'voting'" class="wait-user">
            <div class="voting-container">
                <card v-for="(card, index) in cards" :data="card" :disabled="!!waitingUsers" v-bind:key="index" @cardClick="vote" />
            </div>

            <div v-if="waitingUsers" class="wait-user">
                <p>Waiting other users to finish votation...</p>
            </div>

            <div
                class="user"
                v-for="(user, index) in room.users"
                v-bind:key="index"
            >
                {{ user.name }} {{ user.id === room.adminUser ? '(Admin)' : '' }} {{
                    userVotes[user.id] ? '-> ' + 'Voted' : 'Pending to vote'
                }}
            </div>


            <div v-if="room.adminUser === wsUser.id" class="admin-options">
                <button @click="handleVoteButton(false)">Finish votation</button>
            </div>
        </div>

        <!-- VOTED -->
        <div v-if="room.status === 'voted'" class="wait-user">
            <h3>Vote results: </h3>
            <div
                class="user"
                v-for="(user, index) in room.users"
                v-bind:key="index"
            >
                {{ user.name }} {{ user.id === room.adminUser ? '(Admin)' : '' }} {{
                    room.userVotes[user.id] ? '-> ' + room.userVotes[user.id] : ''
                }}
            </div>

            <button v-if="room.adminUser === wsUser.id" @click="handleNewVote()">Start new vote</button>
        </div>

        <div v-if="room.status === 'ready-to-vote' && room.adminUser === wsUser.id" class="wait-user">

            <div class="admin-options">
                <button @click="handleVoteButton(true)">Start voting</button>
            </div>
        </div>
    </div>
</template>

<script src="./Step3.ts"></script>

<style lang="sass" scoped>
    .voting-container
        display: flex
        flex-wrap: wrap
        justify-content: center
        margin: 50px 0 100px 0
</style>
