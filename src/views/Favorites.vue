<template>
  <NavLayout>
    <div class="favorites-wrapper">
      <h1 class="favorites-title">Favorites</h1>
      <p class="favorites-description">
        Your personal playlist of connections! Keep track of the profiles that hit the right notes with you.
      </p>

      <div class="favorites-grid">
          <div class="favorite-box" v-for="(profile, index) in profiles" :key="index">
        <button class="heart-btn" @click="confirmRemove(index)">
          <i class="fa-solid fa-heart"></i>
        </button>

        <div class="profile-header">
          <img :src="profile.image" alt="Profile Image" class="profile-pic" />
          <div class="profile-info">
            <h2>{{ profile.name }}</h2>
            <p>{{ profile.age }}, {{ profile.gender }}</p>
          </div>
        </div>

        <hr class="separator" />
        
        <div class="mixtape-scroll">
          <button
            class="mixtape clickable-mixtape"
            v-for="(mixtape, mIndex) in profile.mixtapes"
            :key="mIndex"
            @click="handleMixtapeClick(profile, mixtape)"
          >
            <img :src="mixtape.image" alt="Mixtape Image" class="mixtape-image" />
            <div class="mixtape-details">
              <h3>{{ mixtape.name }}</h3>
              <p>{{ mixtape.description }}</p>
            </div>
          </button>
        </div>
      </div>

      </div>

          <div v-if="showConfirmIndex !== null">
            <div class="modal-overlay" @click="showConfirmIndex = null"></div>
            <div class="confirm-popup">
              <p>Are you sure you want to remove this user from your Favorites?</p>
              <div class="confirm-buttons">
                <button @click="removeFavorite(showConfirmIndex)">Confirm</button>
                <button @click="showConfirmIndex = null">Decline</button>
              </div>
            </div>
          </div>
      </div>
  </NavLayout>
</template>

<script setup>
import { ref } from 'vue'
import NavLayout from '../layouts/NavLayout.vue'

const profiles = ref([
  {
    name: 'Aso',
    age: 19,
    gender: 'Male',
    image: '/src/assets/test1.png',
    mixtapes: [
      { name: 'Mixtape 1 ng Aso', description: 'Arf arf', image: '/src/assets/test1.png' },
      { name: 'Side B ng Aso', description: 'Woof side', image: '/src/assets/test1.png' }
    ]
  },
  {
    name: 'Pusa',
    age: 20,
    gender: 'Male',
    image: '/src/assets/test2.png',
    mixtapes: [
      { name: 'Mixtape A', description: 'Chill vibes', image: '/src/assets/test2.png' },
      { name: 'Mixtape B', description: 'Lo-fi tunes', image: '/src/assets/test2.png' },
      { name: 'Mixtape C', description: 'Upbeat tracks', image: '/src/assets/test2.png' },
      { name: 'Mixtape D', description: 'Night drive feels', image: '/src/assets/test2.png' }
    ]
  },
  {
    name: 'Ibon',
    age: 21,
    gender: 'Male',
    image: '/src/assets/test3.png',
    mixtapes: [
      { name: 'Mixtape ng tropa', description: 'Tweet vibes', image: '/src/assets/test3.png' }
    ]
  },
  {
  name: 'Tigre',
  age: 22,
  gender: 'Female',
  image: '/src/assets/test1.png',
  mixtapes: [
    { name: 'Roar Tracks', description: 'Purr-fect energy', image: '/src/assets/test1.png' }
    ]
  },
  {
  name: 'Daga',
  age: 18,
  gender: 'Male',
  image: '/src/assets/test2.png',
  mixtapes: [
    { name: 'Sneaky Beats', description: 'Silent but deadly', image: '/src/assets/test2.png' },
    { name: 'Nibble Vibes', description: 'Tiny tunes', image: '/src/assets/test2.png' }
    ]
  },
  {
  name: 'Kabayo',
  age: 23,
  gender: 'Female',
  image: '/src/assets/test3.png',
  mixtapes: [
    { name: 'Gallop Grooves', description: 'Runaway rhythms', image: '/src/assets/test3.png' }
    ]
  },
  {
  name: 'Leon',
  age: 25,
  gender: 'Male',
  image: '/src/assets/test1.png',
  mixtapes: [
    { name: 'Jungle Jams', description: 'Roar louder', image: '/src/assets/test1.png' }
    ]
  },
  {
  name: 'Kuneho',
  age: 20,
  gender: 'Female',
  image: '/src/assets/test2.png',
  mixtapes: [
    { name: 'Hop-Hop Hits', description: 'Bounce to the beat', image: '/src/assets/test2.png' }
    ]
  }
])

const showConfirmIndex = ref(null)

function confirmRemove(index) {
  showConfirmIndex.value = index
}

function removeFavorite(index) {
  profiles.value.splice(index, 1)
  showConfirmIndex.value = null
}

function handleMixtapeClick(profile, mixtape) {
  console.log('Mixtape clicked:', profile.name, mixtape.name)
  // You can add more logic here later
}
</script>

<style scoped>
.favorites-wrapper {
  padding: 2rem;
  background-color: #dbb4d7;
  min-height: 100vh;
  overflow: auto;
  color: black;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.favorites-title {
  font-size: 2rem;
  font-weight: bold;
  color: black;
}

.favorites-description {
  font-size: 1rem;
  margin-bottom: 2rem;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding-right: 0.5rem;
  padding-bottom: 2rem;
}

.favorite-box {
  background-color: #080d2a;
  padding: 1rem;
  border-radius: 10px;
  color: white;
  position: relative;
  overflow: hidden;
  z-index: 1;
  width: 400px;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.heart-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  height: 55px;
  width: 55px;
  font-size: 2rem;
  background: radial-gradient(circle, #ff0045, #ffffff);
  color: #ff0045;
  border: none;
  border-radius: 50%;
  align-items: center;
  padding: 0;
  cursor: pointer;
  z-index: 1;
}

.heart-btn.clicked {
  transform: scale(1.2);
}

.profile-header {
  display: flex;
  gap: 1rem;
}

.profile-pic {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  object-fit: cover;
}

.separator {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%); 
  width: 90%;
  border: none;
  height: 1px;
  background-color: white;
  margin: 0;
}

.mixtape-scroll {
  max-height: 180px; 
  overflow-y: auto; 
  padding-right: 0.5rem;
  flex-grow: 0; 
  margin-top: 2rem;
}

.mixtape {
  display: flex;
  gap: 1rem; 
  margin-bottom: 1rem;
}

.clickable-mixtape {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: left;
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  color: inherit;
}

.clickable-mixtape:hover {
  transform: scale(1.02);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease-in-out;
}

.mixtape-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
  margin-left: 0.5rem;
}

.mixtape-details h3 {
  font-size: 1rem;
  margin: 0;
}

.mixtape-details p {
  font-size: 0.85rem;
  margin: 0.2rem 0 0 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 998; 
}

.confirm-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #dbb4d7;
  color: #080d2a;
  padding: 2rem;
  border-radius: 12px;
  z-index: 999; 
  width: 300px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
}

.confirm-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
}

.confirm-buttons button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
}

.confirm-buttons button:first-child:hover {
  background: #080d2a;
  color: #dbb4d7;
  border: 1px solid #ebebeb;
}

.confirm-buttons button:last-child:hover {
  background: red;
  color: white;
  border: 1px solid #ebebeb;
}
</style>
