<template>
    <div class="step3">
        <h1>Room: {{ $store.state.currentRoom }}</h1>
        <h4>Users:</h4>
        <div class="user" v-for="(user, index) in users" v-bind:key="index">{{ user.userName }}</div>
    </div>
</template>

<script src="./Step3.ts"></script>
