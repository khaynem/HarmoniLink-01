<template>
  <NavLayout>
    <div class="discover-wrapper">
      <div class="discover-scroll">
        <div class="discover-container" :class="{ flipped: isFlipped }">
          <button class="nav-button left" @click="prevProfile">←</button>
          <button class="nav-button right" @click="nextProfile">→</button>

          <!-- No Profiles Message -->
          <div v-if="profiles.length === 0" class="no-profiles">
            <p>No profiles available. Please check back later.</p>
          </div>

          <div class="front" v-if="currentProfile">
            <div class="discover-top">
              <div class="refresh-wrapper">
                <span class="refresh-label">Next Refresh:</span><br />
                <span class="refresh-time">{{ refreshTime }}</span>
              </div>
              <div class="profile-count-wrapper">
                <span class="profile-count">Profiles Viewed: {{ viewedProfiles }}/10</span>
              </div>
            </div>

            <div class="profile-card" v-if="currentProfile">
              <h2 class="profile-name">{{ currentProfile.name }}</h2>
              <p class="profile-info">{{ currentProfile.age }}, {{ currentProfile.gender }}</p>
              <img :src="currentProfile.image" alt="Profile Image" class="profile-image" />
              <h3 class="mixtape-title">{{ currentProfile.mixtapeName }}</h3>
              <p class="mixtape-description">{{ currentProfile.description }}</p>
              <button class="unpack-button" @click="flipCard">
                Unpack <span class="arrow">▶</span>
              </button>
            </div>
          </div>

          <div class="back">
            <div class="back-button" @click="flipCard">
              <i class="fa-solid fa-arrow-left"></i>
            </div>
            
            <div class="back-mixtape" v-if="currentProfile">
              <img :src="currentProfile.mixtapeImage" alt="Mixtape Image" class="mixtape-image" />
              <h3 class="mixtape-title-back">{{ currentProfile.mixtapeName }}</h3>
              <ol class="song-list">
                <li v-for="(song, index) in currentProfile.songs" :key="index">{{ song }}</li>
              </ol>
            </div>

            <!-- Fallback message if no mixtapes are available -->
            <div class="no-mixtape-message" v-else>
              <p>No mixtapes yet. Wanna give them a chance?</p>
            </div>

            <div class="action-section">
            <div class="buttons">
              <button class="heart-btn" @click="animateHeart">
                <i class="fa-solid fa-heart"></i>
              </button>
              <button class="x-btn" @click="animateX">
                <i class="fa-solid fa-x"></i>
              </button>
            </div>
            <p class="action-message">
              If you both vibe with each other, tap the heart button!
            </p>
          </div>

          </div>
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
    mixtapeImage: '/src/assets/test1.png',
    songs: [
      'Before I Do by Sevyn Streeter',
      'All or Nothing (feat. Ella Mai) by Queen Naija',
      'Now or Never - Bonus Track by Kendrick Lamar',
      'No Guidance (feat. Drake) by Kendrick Lamar',
      'Luther (with Sza) by Kendrick Lamar'
    ]
  },
  {
    name: 'Pusa',
    age: 20,
    gender: 'Male',
    image: '/src/assets/test2.png',
    mixtapeName: 'Test Mixtape',
    description: 'Meow weow',
    mixtapeImage: '/src/assets/test2.png',
    songs: [
      'Song 1 by Artist',
      'Song 2 by Artist'
    ]
  },
  {
    name: 'Ibon',
    age: 21,
    gender: 'Male',
    image: '/src/assets/test3.png',
    mixtapeName: 'Mixtape ng tropa',
    description: 'Woof woof',
    mixtapeImage: '/src/assets/test3.png',
    songs: [
      'Song A by Artist',
      'Song B by Artist'
    ]
  },
])

const currentIndex = ref(0)
const currentProfile = computed(() => profiles.value[currentIndex.value])
const isFlipped = ref(false)

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

function flipCard() {
  isFlipped.value = !isFlipped.value
}

// These are your methods refactored to be standalone functions
function animateHeart(event) {
  const btn = event.currentTarget;
  btn.classList.add('clicked');
  setTimeout(() => btn.classList.remove('clicked'), 300);
  // Add your heart logic here
}

function animateX(event) {
  const btn = event.currentTarget;
  btn.classList.add('clicked');
  setTimeout(() => btn.classList.remove('clicked'), 300);
  // Add your X logic here
}
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
  perspective: 1500px;
  user-select: none;
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
  user-select: none;
}

.nav-button.left {
  left: -100px;
}

.nav-button.right {
  right: -100px;
}

/* front and back container */
.front, .back {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 3rem;
  box-sizing: border-box;
}

.front {
  background-color: rgba(8, 13, 42, 0.85);
  color: #fff;
  z-index: 2;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.back {
  background-color: rgba(8, 13, 42, 0.85);
  color: white;
  transform: rotateY(180deg);
  text-align: center;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensures the action section goes to the bottom */
  padding: 1rem;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  user-select: none;
  height: 100%; /* Ensure it takes full height */
}

.discover-container.flipped .front {
  transform: rotateY(180deg);
  z-index: 1;
}

.discover-container.flipped .back {
  transform: rotateY(0deg);
  z-index: 2;
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
  background-color: rgba(108, 119, 178, 0.35);
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
  user-select: none;
}

.unpack-button:hover {
  background-color: #dbb4d7;
  color: #1f0d3e;
}

.back-button{
  position: absolute;
  top: 30px;
  left: 30px;
  color: white;
}

.back-button:hover {
  color: #dbb4d7;
}

.back-mixtape {
  background-color: rgba(108, 119, 178, 0.35);
  position: relative;
  padding: 1.5rem;
  border-radius: 10px;
  width: 31rem;
  height: 380px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: left;
}

.mixtape-image {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
  margin: 0 auto;
}

.mixtape-title-back {
  position: absolute; 
  top: 145px; 
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0; 
}

.song-list {
  text-align: left;
  font-size: 0.9rem;
  line-height: 1.4;
  max-height: 250px;
  overflow-y: auto;
  margin: 3.5rem auto 0; 
  padding: 0 1.5rem; 
  list-style-type: decimal; 
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  width: 90%;
  flex: 1;
}

.no-mixtape-message {
  background-color: rgba(108, 119, 178, 0.35);
  position: relative;
  padding: 9rem;
  border-radius: 10px;
  width: 31rem;
  height: 380px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: center;
  font-size: 1.2rem;
}

.action-section {
  margin-top: 1rem;
  padding: 0.8rem;
  background-color: #5c5e78;
  border: 2px solid #a7a5a5c2;
  border-radius: 10px;
  text-align: center;
  width: 31rem;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 7rem;
  margin-bottom: 0.5rem;
}

.heart-btn, .x-btn {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.heart-btn {
  background: radial-gradient(circle, #ff0045, #ffffff);
}

.x-btn {
  background: radial-gradient(circle, #0075ff, #ffffff);
}

.heart-btn.clicked, .x-btn.clicked {
  transform: scale(1.2);
}

.action-message {
  font-size: 14px;
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
}

.arrow {
  margin-left: 0.5rem;
}

.no-profiles {
  text-align: center;
  color: #fff;
  font-size: 1.2rem;
  margin-top: 2rem;
}

</style>
