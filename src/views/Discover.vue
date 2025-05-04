<template>
  <NavLayout>
    <div class="discover-wrapper">
      <div class="discover-scroll">
        <div class="discover-container">

          <button class="nav-button left" @click="prevProfile">←</button>

          <div class="discover-top">
            <div class="refresh-wrapper">
              <span class="refresh-label">Next Refresh:</span><br />
              <span class="refresh-time">03:00:00</span>
            </div>
            <div class="profile-count-wrapper">
              <span class="profile-count">Profile today: 3</span>
            </div>
          </div>

          <div class="profile-card" v-if="currentProfile">
            <h2 class="profile-name">{{ currentProfile.name }}</h2>
            <p class="profile-info">{{ currentProfile.age }}, {{ currentProfile.gender }}</p>
            <img :src="currentProfile.image" alt="Profile Image" class="profile-image" />
            <h3 class="mixtape-title">{{ currentProfile.mixtapeName }}</h3>
            <p class="mixtape-description">{{ currentProfile.description }}</p>
            <button class="unpack-button">
              Unpack <span class="arrow">▶</span>
            </button>
          </div>

          <button class="nav-button right" @click="nextProfile">→</button>
        </div>
      </div>
    </div>
  </NavLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import NavLayout from '../layouts/NavLayout.vue'

// temporary placeholders
const profiles = ref([
  {
    name: 'Aso',
    age: 19,
    gender: 'Male',
    image: '/src/assets/test1.png',
    mixtapeName: 'Mixtape 1 ng Aso',
    description: 'Arf arf',
  },
  {
    name: 'Pusa',
    age: 20,
    gender: 'Male',
    image: '/src/assets/test2.png',
    mixtapeName: 'Test Mixtape',
    description: 'Meow weow',
  },
  {
    name: 'Ibon',
    age: 21,
    gender: 'Male',
    image: '/src/assets/test3.png',
    mixtapeName: 'Mixtape ng tropa',
    description: 'Woof woof',
  },
])

const currentIndex = ref(0)
const currentProfile = computed(() => profiles.value[currentIndex.value])

// next arrows
function nextProfile() {
  if (currentIndex.value < profiles.value.length - 1) {
    currentIndex.value++
  }
}

function prevProfile() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// replace placeholders with data
</script>

<style scoped>
.discover-wrapper {
  background-color: #ddb0d7;
  height: calc(100vh - 60px);
  overflow-y: auto;
  padding: 2rem 1rem;
}

.discover-scroll {
  display: flex;
  justify-content: center;
}

.discover-container {
  background-color: rgba(8, 13, 42, 0.85);
  border-radius: 12px;
  padding: 3rem;
  width: 900px;
  height: 550px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.discover-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #ffffff;
  flex-grow: 0;
}

.refresh-label {
  font-weight: bold;
  font-size: 0.9rem;
}

.refresh-time {
  font-size: 0.9rem;
}

.profile-count {
  background-color: #1c1b2e;
  padding: 0.3rem 0.7rem;
  border-radius: 30px;
  font-size: 0.8rem;
  display: inline-block;
}

.profile-card {
  background-color: #43456d;
  padding: 1.5rem;
  border-radius: 10px;
  width: 390px;
  height: 440px;
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: -60px;
}

.profile-name {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.profile-info {
  font-size: 0.9rem;
  color: white;
  margin-bottom: 1rem;
}

.profile-image {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin: 0 auto 1rem auto;
}

.mixtape-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.mixtape-description {
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.unpack-button {
  background-color: #080d2a;
  color: white;
  width: 10rem;
  padding: 0.3rem;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto; 
  display: block;
}

.unpack-button:hover {
  background-color: #dbb4d7;
  color: #1f0d3e;
}

.arrow {
  margin-left: 0.5rem;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: 2px solid #080d2a;
  color: #080d2a;
  font-size: 2rem;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 10;
}

.nav-button.left {
  left: -100px;
}

.nav-button.right {
  right: -100px;
}
</style>
