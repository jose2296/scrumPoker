<template>
  <div class="card" v-bind:class="{ 'flip': flipped, 'disabled': disabled, [data.type]: true }" @click="cardClick()">
    <div class="inner">
      <div class="front">
        <div class="text">{{ data.label }}</div>
      </div>
      <div class="back"></div>
    </div>
  </div>
</template>

<script src="./Card.ts"></script>

<style scoped>

.card {
  --front-card-background-color: linear-gradient(
    to bottom right,
    #15ffa5,
    #00ced1
  );
  --back-card-background-color: #242c62;
  --card-width: 100px;
  --card-height: 150px;
  width: var(--card-width);
  height: var(--card-height);
  position: relative;
  cursor: pointer;
  display: flex;
  margin: 20px;
  perspective: 1000px;
}
.card.disabled {
    pointer-events: none;
}
.card:hover {
  animation: none;
}
.card .inner {
  transition: 1s;
  display: flex;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  box-shadow: 5px 5px 20px black;
  border-radius: 12px;
  transform: scale(1.15);
}
.card .inner .front,
.card .inner .back {
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  border: 3px solid black;
  border-radius: 12px;
}
.card .inner .back {
  background-color: var(--back-card-background-color);
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 25px;
  background-color: #ffffff;
  background-size: 100% 100%;
}

.card.type-1 .inner .back {
  background-image: url('../../assets/images/cactus.png');

}
.card.type-2 .inner .back {
  background-image: url('../../assets/images/bolos.png');
}

.card.type-3 .inner .back {
  background-image: url('../../assets/images/halloween.png');
  background-size: 105% 105%;
  background-position: -3px -5px;
}
.card.type-4 .inner .back {
  background-image: url('../../assets/images/planet.jpeg');
  background-size: 105% 105%;
  background-position: -3px -5px;
}
.card.type-5 .inner .back {
  background-image: url('../../assets/images/planet1.jpeg');
  background-size: 105% 105%;
  background-position: -3px -5px;
}
.card.type-6 .inner .back {
  background-image: url('../../assets/images/design-1.jpeg');
  background-size: 105% 105%;
  background-position: -3px -5px;
}
.card.type-7 .inner .back {
  background-image: url('../../assets/images/design-2.jpeg');
  background-size: 105% 105%;
  background-position: -3px -5px;
}
.card.type-8 .inner .back {
  background-image: url('../../assets/images/design-3.jpeg');
  background-size: 105% 105%;
  background-position: -3px -5px;
}

.card .inner .back .image {
  transform: rotate(-60deg);
  width: 125px;
}
.card .inner .front {
  background-color: white;
  display: flex;
}
.card .inner .front::before {
  content: "";
  position: absolute;
  width: 75%;
  height: 85%;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
  top: 50%;
  background: var(--front-card-background-color);
  border-radius: 12px;
  border: 3px solid black;
}
.card .inner .front .text {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
  position: relative;
  user-select: none;
}
.card.flip:hover {
  animation: card-pulse 1s infinite linear;
}
.card.flip .inner {
  transform: scale(1) rotateY(180deg);
  box-shadow: 5px 5px 25px black;
}
.container .buttons-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
}
.container .buttons-container button {
  margin-right: 20px;
  outline: 0;
  padding: 10px 30px;
  border: 0;
  background: #222222;
  color: #ffffff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: 0.5s;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}
.container .buttons-container button span {
  color: #ffffff;
  transition: 0.2s;
  transition-delay: 0.2s;
  font-weight: 800;
  position: relative;
  z-index: 2;
}
.container .buttons-container button:hover {
  background: rgba(34, 34, 34, 0.8);
}
.container .buttons-container button:hover span {
  color: #111111;
}
.container .buttons-container button:hover::after {
  left: 50%;
  top: 50%;
}
.container .buttons-container button::after {
  content: "";
  position: absolute;
  z-index: 1;
  background-color: #78c7d2;
  transition: 1.3s;
  width: 300px;
  height: 300px;
  left: -180px;
  top: 50px;
  transform: translateX(-50%) translateY(-50%) rotateZ(-45deg);
}

@keyframes hover {
  0% {
    transform: scale(1);
    box-shadow: 5px 5px 20px black;
  }
  50% {
    transform: scale(1.05);
    box-shadow: 10px 10px 40px black;
  }
  100% {
    transform: scale(1);
    box-shadow: 5px 5px 20px black;
  }
}
@keyframes card-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
