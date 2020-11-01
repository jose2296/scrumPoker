<template>
    <div v-if="state.loading" class="loading">
        Loading...
    </div>

    <router-view />
</template>

<script src="./MainApp.ts"></script>

<style lang="sass">
body
    box-sizing: border-box
    margin: 0
    padding: 0
    background-color: #282a36
*
    box-sizing: border-box
    margin: 0
    padding: 0
    color: #f8f8f2
    font-family: 'Rubik', sans-serif

button
    color: var(--color3)
    background-color: #6272a4
    border: 0
    outline: none
    padding: 10px 30px
    cursor: pointer
    border-radius: 6px
    transition: 0.5s
    &:hover
        opacity: 0.6

img
    width: 100%

input
    outline: 0
    border: 0
    padding: 5px 10px
    color: var(--color4)

.loading
    left: 0
    top: 0
    position: absolute
    display: flex
    width: 100vw
    height: 100vh
    background: #fff
    justify-content: center
    align-items: center
    font-size: 50px


</style>
