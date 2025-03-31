<template>
  <img src="/src/assets/welcomebg.png" alt="background" class="background">

  <div class="logo">
    <img src="/src/assets/logo.png" alt="HarmoniLink Logo">
    <p>armonilink</p>
  </div>

  <div class="welcome-container">
    <div class="welcome-text">
      <h1>
        <span class="welcome-white">Welcome to</span>
        <span class="welcome-purple">HarmoniLink</span>
      </h1>
      <p class="subtitle">
        Where music guides us all, leading us to new friendships, melodies, and moments.
      </p>
    </div>

    <div class="image-container">
      <img 
        src="/src/assets/pulse.png" 
        alt="Pulsing Image" 
        class="pulsing-image" 
        @click="navigateToNextPage"
      >
    </div>

    <div class="bottom-text">
      <p>Harmonize your world, tap to begin.</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToNextPage = () => {
  router.push('/PfCustom');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Fira Code', monospace;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  position: absolute;
  top: 43px;
  left: 30px;
  gap: 5px; 
}

.logo img {
  width: 40px;
  height: 40px;
}

.logo p {
  font-size: 20px;
  font-weight: bold;
}

.welcome-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.welcome-text {
  margin-bottom: 3rem;
}

.welcome-text h1 {
  font-size: 3rem;
  font-weight: bold;
}

.welcome-white {
  color: #ffffff;
  margin-right: 2rem;
}

.welcome-purple {
  color: #1f0d3e;
}

.subtitle {
  color: #ffffff;
  font-size: 1rem;
  max-width: 40rem;
  margin-top: 2rem;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pulsing-image {
  width: 20rem;
  cursor: pointer;
  animation: pulse 1.5s infinite ease-in-out;
  position: relative;
  top: -2rem;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.bottom-text {
  margin-top: 2rem;
  color: #ffffff;
  font-size: 1.3rem;
}
</style>
