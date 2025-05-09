<template>
    <div class="side-nav">
      <div class="nav-section">
        <router-link
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.route"
          class="nav-item"
          active-class="active"
          exact
        >
          <i :class="item.icon"></i>
          <span>{{ item.text }}</span>
        </router-link>
      </div>
  
      <div class="mixtape-section">
        <div class="mixtape-header">
          <i class="fa-solid fa-compact-disc"></i>
          <span>Mixtapes</span>
          <i class="fa-solid fa-plus add-icon" @click="togglePopup"></i>
        </div>
  
        <div v-if="showPopup" class="popup-overlay">
          <div class="popup-box">
            <h2>Create your Mixtape</h2>
  
            <div class="upload-box" @click="triggerPhotoUpload">
              <img v-if="photoUrl" :src="photoUrl" class="photo-preview" />
              <span v-else>Add photo</span>
              <input type="file" ref="photoInput" @change="handlePhotoUpload" hidden />
            </div>
  
            <input type="text" v-model="mixtapeName" placeholder="Mixtape Name" class="mixtape-name" />
            <textarea
              v-model="mixtapeDescription"
              placeholder="Say something about your mixtape"
              class="description-box"
            ></textarea>
  
            <div v-for="(song, index) in songs" :key="index" class="song-item">
              <span>{{ song.name }} - {{ song.artist }}</span>
            </div>
  
            <div class="song-actions">
              <div v-if="songs.length < 5" class="add-song" @click="showSongModal = true">
              <i class="fa-solid fa-circle-plus"></i>
              <span>Add Song</span>
            </div>
            <div class="song-count">{{ songs.length }}/5 Songs</div>
            </div>


  
            <div class="popup-buttons">
              <button @click="createMixtape">Create Mixtape</button>
              <button @click="showConfirmCancel = true">Cancel</button>
            </div>
          </div>
        </div>
  
        <div v-if="showSongModal" class="modal-overlay">
          <div class="song-popup-box">
            <span class="exit-btn" @click="closeSongModal">×</span>
            <h3>Song Details</h3>
            <input type="text" v-model="songName" placeholder="Song Name" />
            <input type="text" v-model="artistName" placeholder="Artist Name" />
            <button @click="addSong">Add Song to Mixtape</button>
          </div>
        </div>
  
        <div v-if="showConfirmCancel" class="modal-overlay">
          <div class="confirm-box">
            <p>Confirm to close Mixtape Creation</p>
            <div class="confirm-buttons">
              <button @click="closePopup">Confirm</button>
              <button @click="showConfirmCancel = false">Decline</button>
            </div>
          </div>
        </div>
  
        <hr class="separator" />
  
        <div class="mixtape-search">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input type="text" class="mixtape-input" />
          <i class="fa-solid fa-list-ul sort-icon" @click="sortMixtapes"></i>
        </div>
  
        <div class="mixtape-list">
          <div class="mixtape-item" v-for="(mix, index) in mixtapes" :key="index">
            <img src="/src/assets/logo2.png" alt="Mixtape Image" class="mixtape-img" />
            <span>{{ mix }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
  
    const showPopup = ref(false);
    const showSongModal = ref(false);
    const showConfirmCancel = ref(false);
  
    const navItems = [
      { icon: 'fa-solid fa-user-plus', text: 'Discover', route: '/discover' },
      { icon: 'fa-solid fa-pen', text: 'Feed', route: '/feed' },
      { icon: 'fa-solid fa-trophy', text: 'Achievements', route: '/achievements' },
      { icon: 'fa-solid fa-heart', text: 'Favorites', route: '/favorites' }
    ];
  
    const mixtapes = ref([]); // get mixtapes from backend
    const isSortedByName = ref(true);
    const mixtapeName = ref('');
    const mixtapeDescription = ref('');
    const songName = ref('');
    const artistName = ref('');
    const songs = ref([]);
    const photoUrl = ref(null);
    const photoInput = ref(null);
  
    const togglePopup = () => {
      showPopup.value = true;
    };
  
    const closePopup = () => {
      showPopup.value = false;
      showConfirmCancel.value = false;
      mixtapeName.value = '';
      mixtapeDescription.value = '';
      songs.value = [];
      photoUrl.value = null;
    };
  
    function triggerPhotoUpload() {
      photoInput.value?.click();
    }
  
    function handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        photoUrl.value = URL.createObjectURL(file);
      }
    }
  
    const createMixtape = () => {
      console.log('Mixtape created:', mixtapeName.value, songs.value);
      closePopup();
    };
  
    const addSong = () => {
      if (songs.value.length < 5 && songName.value && artistName.value) {
        songs.value.push({ name: songName.value, artist: artistName.value });
        songName.value = '';
        artistName.value = '';
        showSongModal.value = false;
      }
    };
  
    const closeSongModal = () => {
      showSongModal.value = false;
      songName.value = '';
      artistName.value = '';
    };
  
    const sortMixtapes = () => {
      if (isSortedByName.value) {
        mixtapes.value.sort();
      } else {
        mixtapes.value.reverse();
      }
      isSortedByName.value = !isSortedByName.value;
    };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
  
  * {
    font-family: 'Fira Code', monospace;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .side-nav {
  position: fixed;
  top: 70px;
  left: 0;
  height: calc(100vh - 60px);
  width: 270px;
  background-color: #080d2a;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  z-index: 999;
}
  
  .nav-section,
  .mixtape-section {
    background-color: #1f0d3e;
    padding: 2rem;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    color: #cec3c3;
    margin-bottom: 1.5rem;
    text-decoration: none;
    transition: color 0.3s, font-weight 0.3s;
  }
  
  .nav-item.active,
  .nav-item.router-link-active {
    font-weight: bold;
    color: white;
  }
  
  .nav-item i {
    width: 35px;
    height: 35px;
    background-color: #322848;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
  }
  
  /* --- Mixtape Section --- */
  
  .mixtape-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .add-icon {
    background-color: #dbb4d7;
    color: #1f0d3e;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    margin-left: auto;
    cursor: pointer;
  }
  
  /* Popup for creating mixtape */
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 1000;
  }
  
  .popup-box {
    background-color: #080d2a;
    padding: 2rem;
    border-radius: 1rem;
    width: 600px;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .upload-box {
    background-color: #bebebe;
    width: 10rem;
    height: 10rem;
    margin: 0 auto 1rem;
    border: 5px solid #fffefd;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #444;
    cursor: pointer;
    overflow: hidden;
  }
  
  .photo-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .mixtape-name,
  .description-box {
    padding: 0.75rem;
    border: none;
    width: 100%;
    color: white;
    background: transparent;
    text-align: center;
  }
  
  .description-box {
    height: 60px;
    resize: none;
  }
  
  .song-item {
    padding: 0.2rem;
    text-align: center;
  }
  
.song-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  padding: 0 2rem;
}

.song-count {
  font-size: 0.9rem;
  color: #fff;
}

.add-song {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #fff;
  margin: 0;
}

  
  .popup-buttons {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  
  .popup-buttons button {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #dbb4d7;
    color: #1f0d3e;
    cursor: pointer;
    font-size: 15px;
  }
  
  .popup-buttons button:hover {
    background: #080d2a;
    color: #dbb4d7;
    border: 1px solid #ebebeb;
  }
  
  /* Song details modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(5, 5, 5, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1100;
  }
  
  .song-popup-box {
    background-color: #dbb4d7;
    padding: 1.5rem;
    border-radius: 1rem;
    width: 350px;
    text-align: center;
    color: #1f0d3e;
    position: relative;
  }
  
  .song-popup-box h3 {
    margin-bottom: 1rem;
  }
  
  .song-popup-box input {
    width: 90%;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 0.3rem;
    border: none;
  }
  
  .song-popup-box button {
    padding: 0.75rem;
    border: none;
    border-radius: 30px;
    background-color: #1f0d3e;
    color: white;
    cursor: pointer;
    width: 60%;
  }
  
  .exit-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    color: #1f0d3e;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  /* Confirm close popup */
  .confirm-box {
    background-color: #dbb4d7;
    padding: 1rem;
    border-radius: 0.75rem;
    text-align: center;
    width: 250px;
    color: #1f0d3e;
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
  
  /* Mixtape list and search */
  .separator {
    border: none;
    border-top: 1px solid white;
    margin: 1rem 0;
  }
  
  .mixtape-search {
    position: relative;
    margin-bottom: 1rem;
  }
  
  .search-icon,
  .sort-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .search-icon { left: 7px; }
  .sort-icon  { right: 0px; cursor: pointer; }
  
  .mixtape-input {
    width: 85%;
    padding: 0.2rem 1rem 0.2rem 2.5rem;
    background-color: #432775;
    border: none;
    border-radius: 30px;
    color: white;
  }
  
  .mixtape-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .mixtape-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;
    padding: 0.5rem;
  }
  
  .mixtape-img {
    width: 25px;
    object-fit: cover;
    border-radius: 6px;
  }
  </style>
  
  