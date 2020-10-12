<template>
    <div class="step3" v-if="!!room">
        <h1>Room: {{ room.name }}</h1>
        <h4>Users:</h4>
        <div
            class="user"
            v-for="(user, index) in room.users"
            v-bind:key="index"
        >
            {{ user.userName }} {{ user.id === room.userAdmin ? '(Admin)' : '' }} {{
                room.userVotes[user.id] ? '-> ' + room.userVotes[user.id] : ''
            }}
        </div>

        <div v-if="isVoting" class="voting-container">
            <div v-for="card in cards" v-bind:key="card.points" @click="vote(card.points)" class="card">{{ card .label }}</div>
        </div>

        <div v-if="room.userAdmin === wsUser.id" class="admin-options">
            <button @click="handleVoteButton()">{{ !room.isVoting ? 'Start voting' : 'Finish votation' }}</button>
        </div>
    </div>
</template>

<script src="./Step3.ts"></script>
