<template>
    <div class="step1">
        <h1>Type your name</h1>
        <h1>UserName: {{ $store.state.userName }}</h1>
        <input type="text" v-on:keyup="setUserName" v-model="userName" />
        <button @click="nextStep()" :disabled="!userName.length">Continue</button>
    </div>
</template>

<script src="./Step1.ts"></script>
