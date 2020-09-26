<template>
    <div class='home'>
        <h1>This is an home page</h1>
        <div>
            <h3>Users list</h3>
            <div class="user" v-for="user in users" v-bind:key="user" v-bind:style="{ color: user === me ? 'red' : 'black' }">{{ user }}</div>
        </div>

        <input type="text" v-model="roomName">
        <button v-on:click="createRoom">Create room</button>
        <button v-on:click="joinRoom">Join room</button>

        <div style="width: 300px">
            <h2>Messages</h2>
            <div v-for="(message, index) in messages" v-bind:key="index">
                <div class="message" v-bind:style="{ 'text-align': message.user === me ? 'left' : 'right' }">{{ message.content }} ({{ message.user }})</div>
            </div>
            <br>
            <br>

            <input type="text" v-model="messageText">
            <button v-on:click="sendMessage">Send</button>

        </div>
    </div>
</template>

<script src="./Home.ts"></script>
