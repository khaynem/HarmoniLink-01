<template> 
<NavLayout> 
  <div class="profile-wrapper"> 
    <h1 class="page-title">Your Profile</h1> 
    <hr class="separator" />

  <div class="user-info-section">
    <div class="profile-image-container">
      <label v-if="isEditing" class="edit-image-label">
        <input type="file" accept="image/*" @change="handleProfileImageUpload" hidden />
        <img :src="profileImage" class="profile-image" />
      </label>
      <img
        v-else
        class="profile-image"
        :src="profileImage"
        alt="Profile Picture"
      />
    </div>

    <div class="info-box">
      <div class="info-header">
        <h2 class="user-name" v-if="!isEditing">{{ profile.name }}</h2>
        <div v-if="isEditing" class="labeled-input">
          <label>
            <span>Name:</span>
            <input
              type="text"
              v-model="editableProfile.name"
              class="edit-input"
              placeholder="Name"
            />
          </label>
        </div>
        <button class="edit-btn" @click="toggleEdit">
          <i v-if="!isEditing" class="fa-solid fa-pen"></i>
          <i v-else class="fa-solid fa-floppy-disk"></i>
          <span>{{ isEditing ? 'Save' : 'Edit Profile' }}</span>
        </button>
      </div>

      <template v-if="!isEditing">
        <p class="user-meta">{{ profile.age }}, {{ profile.gender }}</p>
        <p class="user-bio">{{ profile.bio }}</p>
      </template>

      <template v-else>
        <div class="labeled-input">
          <label>
            <span>Age:</span>
            <input
              type="text"
              v-model="editableProfile.age"
              class="edit-input"
              placeholder="Age"
            />
          </label>
        </div>
        <div class="labeled-input">
          <label>
            <span>Gender:</span>
            <input
              type="text"
              v-model="editableProfile.gender"
              class="edit-input"
              placeholder="Gender"
            />
          </label>
        </div>
        <div class="labeled-input">
          <label>
            <span>Bio:</span>
            <textarea
              v-model="editableProfile.bio"
              class="edit-textarea"
              placeholder="Bio"
              rows="3"
            ></textarea>
          </label>
        </div>
      </template>
    </div>
  </div>

  <hr class="separator" />

  <div class="mixtapes-header">
    <div class="mixtapes-title">
      <i class="fa-solid fa-compact-disc"></i>
      <span>My Mixtapes</span>
      <button class="add-btn" @click="togglePopup">＋</button>
    </div>

    <div class="profile-search-filter">
      <div class="search-input-wrapper">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input type="text" v-model="searchQuery" class="search-input" />
      </div>
      <i class="fa-solid fa-list-ul filter-icon" @click="toggleSortAndMaybeView"></i>
    </div>

  </div>

  <div class="mixtapes-list" :class="{ list: isListView, grid: !isListView }">
  <div
    v-for="mixtape in filteredMixtapes"
    :key="mixtape.id"
    class="mixtape-item editable-mixtape"
  >
    <div v-if="editingMixtapeId !== mixtape.id" class="mixtape-content-wrapper">
      <div class="mixtape-actions-top-right">
        <button @click="startEditMixtape(mixtape)">Edit</button>
        <button @click="confirmDeleteMixtape(mixtape)">Delete</button>
      </div>

      <img :src="mixtape.cover || '/src/assets/logo2.png'" alt="Mixtape Cover" class="mixtape-cover" />
      <div class="mixtape-info">
        <h3 class="mixtape-name">{{ mixtape.name }}</h3>
        <p class="mixtape-desc">{{ mixtape.description }}</p>
      </div>
    </div>

    <div v-else class="popup-box editing-popup">
      <h2>Edit your Mixtape</h2>

      <div class="upload-box" @click="triggerEditCoverUpload">
        <img v-if="editableMixtape.cover" :src="editableMixtape.cover" class="photo-preview" />
        <span v-else>Add photo</span>
        <input type="file" ref="editCoverInput" @change="handleEditCoverUpload" hidden />
      </div>

      <input
        type="text"
        v-model="editableMixtape.name"
        placeholder="Mixtape Name"
        class="mixtape-name"
      />

      <textarea
        v-model="editableMixtape.description"
        placeholder="Say something about your mixtape"
        class="description-box"
      ></textarea>

      <div class="song-list-scroll">
        <div
          v-for="(song, index) in editableMixtape.songs"
          :key="index"
          class="song-item song-item-flex"
        >
          <span>{{ song.name }} - {{ song.artist }}</span>
          <div class="song-actions-buttons">
            <i class="fa-solid fa-pen edit-icon" @click="editEditableSong(index)"></i>
            <i class="fa-solid fa-trash delete-icon" @click="removeSongFromEditable(index)"></i>
          </div>
        </div>
      </div>

      <div class="song-actions">
        <div class="add-song" @click="showSongModal = true">
          <i class="fa-solid fa-circle-plus"></i>
          <span>Add Song</span>
        </div>
      </div>

      <div v-if="showEditSongModal" class="modal-overlay">
        <div class="song-popup-box">
          <span class="exit-btn" @click="closeEditSongModal">×</span>
          <h3>Edit Song Details</h3>
          <input type="text" v-model="songName" placeholder="Song Name" />
          <input type="text" v-model="artistName" placeholder="Artist Name" />
          <input type="url" v-model="songUrl" placeholder="Song URL" />
          <button @click="saveEditedSong">Save Changes</button>
        </div>
      </div>

      <div class="popup-buttons">
        <button @click="saveEditedMixtape">Save</button>
        <button @click="cancelEditMixtape">Cancel</button>
      </div>
    </div>

  </div>
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

      <div class="song-list-scroll">
        <div v-for="(song, index) in songs" :key="index" class="song-item song-item-flex">
          <span>{{ song.name }} - {{ song.artist }}</span>
          <div class="song-actions-buttons">
            <i class="fa-solid fa-pen edit-icon" @click="editSong(index)"></i>
            <i class="fa-solid fa-trash delete-icon" @click="deleteSong(index)"></i>
          </div>
        </div>
      </div>

      <div class="song-actions">
        <div class="add-song" @click="showSongModal = true">
          <i class="fa-solid fa-circle-plus"></i>
          <span>Add Song</span>
        </div>
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
      <input type="url" v-model="songUrl" placeholder="Song URL" />
      <button @click="addSong">Add Song to Mixtape</button>
    </div>
  </div>

  <div v-if="showConfirmCancel" class="modal-overlay">
    <div class="confirm-box">
      <p>Are you sure you want to close it?</p>
      <div class="confirm-buttons">
        <button @click="showConfirmCancel = false">Stay</button>
        <button @click="closePopup">Close</button>
      </div>
    </div>
  </div>

  <div v-if="selectedMixtape" class="modal-overlay" @click="closeMixtapePopup"></div>
  <div v-if="selectedMixtape" class="mixtape-popup">
    <button class="exit-button" @click="closeMixtapePopup">✕</button>
    <div class="back-mixtape">
      <img :src="selectedMixtape.cover || '/src/assets/logo2.png'" alt="Mixtape Image" class="mixtape-image" />
      <h3 class="mixtape-title-back">{{ selectedMixtape.name }}</h3>
      <ol v-if="selectedMixtape.songs && selectedMixtape.songs.length" class="song-list">
        <li v-for="(song, index) in selectedMixtape.songs" :key="index">
          <span class="song-title">{{ song.name }}</span> by <span class="artist-name">{{ song.artist }}</span>
        </li>
      </ol>
      <p v-else class="song-list">(No songs listed)</p>
    </div>
  </div>
</div>
  </NavLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import NavLayout from '../layouts/NavLayout.vue'

const profile = ref({
  name: 'Pusa',
  age: 19,
  gender: 'Female',
  bio: "I'm here to find new connections through my music taste! The future is bright...",
})
const editableProfile = ref({ ...profile.value })
const profileImage = ref('/src/assets/test1.png')

const isEditing = ref(false)
const searchQuery = ref('')
const isListView = ref(true)

const showPopup = ref(false)
const showSongModal = ref(false)
const showEditSongModal = ref(false) 
const showConfirmCancel = ref(false)
const selectedMixtape = ref(null)

const mixtapes = ref([
  {
    id: 1,
    name: 'Mixtape 1',
    description: 'A cool collection of my favorite jams',
    cover: '/src/assets/test2.png',
    songs: [
      { name: 'Song A', artist: 'Artist X', url: '#' },
      { name: 'Song B', artist: 'Artist Y', url: '#' },
    ],
  },
  {
    id: 2,
    name: 'Chill Vibes',
    description: 'Relax and unwind with these tunes',
    cover: '/src/assets/test3.png',
    songs: [
      { name: 'Track 1', artist: 'Cool Dude', url: '#' },
      { name: 'Track 2', artist: 'Chill Girl', url: '#' },
      { name: 'Track 3', artist: 'Lazy Fellow', url: '#' },
    ],
  },
])

const editingMixtapeId = ref(null)
const editableMixtape = ref({
  id: null,
  name: '',
  description: '',
  cover: null,
  songs: [],
})

//creating new mixtape
const mixtapeName = ref('')
const mixtapeDescription = ref('')
const songs = ref([])

// song ( both create and edit)
const songName = ref('')
const artistName = ref('')
const songUrl = ref('')

// song edit index (for edit mixtape songs)
const editingSongIndex = ref(null)

const photoUrl = ref(null)

const photoInput = ref(null)
const editCoverInput = ref(null)

const filteredMixtapes = computed(() =>
  mixtapes.value.filter((mixtape) =>
    mixtape.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const togglePopup = () => {
  showPopup.value = !showPopup.value
}

const toggleSortAndMaybeView = () => {
  isListView.value = !isListView.value
}

const triggerPhotoUpload = () => {
  photoInput.value.click()
}

const handlePhotoUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    photoUrl.value = URL.createObjectURL(file)
  }
}

const createMixtape = () => {
  if (!mixtapeName.value.trim()) {
    alert('Please enter a mixtape name')
    return
  }
  mixtapes.value.push({
    id: Date.now(),
    name: mixtapeName.value,
    description: mixtapeDescription.value,
    cover: photoUrl.value,
    songs: [...songs.value],
  })
  resetCreateForm()
  showPopup.value = false
}

const resetCreateForm = () => {
  mixtapeName.value = ''
  mixtapeDescription.value = ''
  songs.value = []
  photoUrl.value = null
}

const closePopup = () => {
  showConfirmCancel.value = false
  showPopup.value = false
  resetCreateForm()
}

const closeSongModal = () => {
  showSongModal.value = false
  songName.value = ''
  artistName.value = ''
  songUrl.value = ''
  editingSongIndex.value = null
}

const closeEditSongModal = () => {
  showEditSongModal.value = false
  songName.value = ''
  artistName.value = ''
  songUrl.value = ''
  editingSongIndex.value = null
}

const addSong = () => {
  if (!songName.value.trim() || !artistName.value.trim()) {
    alert('Please enter both song name and artist')
    return
  }

  const newSong = {
    name: songName.value.trim(),
    artist: artistName.value.trim(),
    url: songUrl.value.trim() || '#',
  }

  if (editingMixtapeId.value !== null) {
    if (editingSongIndex.value !== null) {
      editableMixtape.value.songs[editingSongIndex.value] = newSong
    } else {
      editableMixtape.value.songs.push(newSong)
    }
    editingSongIndex.value = null
    closeEditSongModal()
  } else {
    if (editingSongIndex.value !== null) {
      songs.value[editingSongIndex.value] = newSong
    } else {
      songs.value.push(newSong)
    }
    editingSongIndex.value = null
    closeSongModal()
  }

  songName.value = ''
  artistName.value = ''
  songUrl.value = ''
}

const deleteSong = (index) => {
  songs.value.splice(index, 1)
}

const removeSongFromEditable = (index) => {
  editableMixtape.value.songs.splice(index, 1)
}

const editSong = (index) => {
  const song = songs.value[index]
  songName.value = song.name
  artistName.value = song.artist
  songUrl.value = song.url
  editingSongIndex.value = index
  showSongModal.value = true
}

const editEditableSong = (index) => {
  editingSongIndex.value = index;
  const song = editableMixtape.value.songs[index];
  songName.value = song.name;
  artistName.value = song.artist;
  songUrl.value = song.url;
  showEditSongModal.value = true;
}

const saveEditedSong = () => {
  if (!songName.value.trim() || !artistName.value.trim()) {
    alert('Please enter both song name and artist');
    return;
  }

  const updatedSong = {
    name: songName.value.trim(),
    artist: artistName.value.trim(),
    url: songUrl.value.trim() || '#',
  };

  if (editingSongIndex.value !== null) {
    editableMixtape.value.songs[editingSongIndex.value] = updatedSong;
  }

  closeEditSongModal();
}

const startEditMixtape = (mixtape) => {
  editingMixtapeId.value = mixtape.id
  editableMixtape.value = JSON.parse(JSON.stringify(mixtape)) // Deep copy
}

const saveEditedMixtape = () => {
  const index = mixtapes.value.findIndex((m) => m.id === editingMixtapeId.value)
  if (index !== -1) {
    mixtapes.value[index] = { ...editableMixtape.value }
  }
  editingMixtapeId.value = null
  editableMixtape.value = {
    id: null,
    name: '',
    description: '',
    cover: null,
    songs: [],
  }
}

const cancelEditMixtape = () => {
  editingMixtapeId.value = null
  editableMixtape.value = {
    id: null,
    name: '',
    description: '',
    cover: null,
    songs: [],
  }
  editingSongIndex.value = null
  showEditSongModal.value = false
}

const confirmDeleteMixtape = (mixtape) => {
  if (confirm(`Are you sure you want to delete "${mixtape.name}"?`)) {
    mixtapes.value = mixtapes.value.filter((m) => m.id !== mixtape.id)
  }
}

const triggerEditCoverUpload = () => {
  editCoverInput.value.click()
}

const handleEditCoverUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    editableMixtape.value.cover = URL.createObjectURL(file)
  }
}

const toggleEdit = () => {
  if (isEditing.value) {
    profile.value = { ...editableProfile.value }
  } else {
    editableProfile.value = { ...profile.value }
  }
  isEditing.value = !isEditing.value
}

const closeMixtapePopup = () => {
  selectedMixtape.value = null
}
</script>


<style scoped>
.profile-wrapper {
  background-color: #ddb0d7;
  overflow-y: auto;
  padding: 2rem 1rem;
}

.page-title {
  font-weight: 700;
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.separator {
  border: 1px solid #9877a0;
  margin: 10px 0 20px;
}

.user-info-section {
  display: flex;
  gap: 15px;
  align-items: center;
}

.profile-image {
  width: 170px;
  height: 170px;
  border-radius: 12px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #4a2c6f;
}

.profile-image.editable {
  outline: 2px dashed #c69df4;
  opacity: 0.9;
}

.info-box {
  flex: 1;
  background-color: #080d2a;
  border-radius: 12px;
  padding: 20px;
  color: white;
  position: relative;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.user-name {
  font-weight: 700;
  font-size: 1.8rem;
  margin: 0;
}

.edit-btn {
  background-color: #5e4a87;
  border: none;
  border-radius: 6px;
  color: #ddd;
  font-family: monospace;
  font-weight: 600;
  padding: 6px 10px;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.edit-btn i {
  margin-right: 10px;
}

.edit-btn:hover {
  background-color: #7b62b5;
}

.user-meta {
  margin-bottom: 12px;
  font-size: 1rem;
}

.user-bio {
  white-space: pre-wrap;
  font-size: 1rem;
}

/* Editing inputs */
.edit-input,
.edit-textarea {
  width: 100%;
  background: #5e4a87;
  border: none;
  border-radius: 6px;
  color: #eee;
  font-family: monospace;
  font-size: 1rem;
  padding: 6px 8px;
  margin: 6px 0;
  resize: none;
}

.save-btn {
  margin-top: 10px;
  background-color: #8259b0;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 700;
  padding: 8px 16px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #9b79d2;
}

.mixtapes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.mixtapes-title {
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 700;
  font-size: 1.3rem;
}

.mixtapes-title .icon {
  font-size: 1.4rem;
}

.add-btn {
  background: none;
  border: none;
  padding: 0;
  color: #080d2a;
  font-size: 2rem;
  cursor: pointer;
}

.add-btn:hover {
  color: #7b62b5;
}

.profile-search-filter {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 1rem;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 8px 12px 8px 40px; 
  border: 1px solid #ccc;
  border-radius: 50px;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: white;
  pointer-events: none;
}

.filter-icon {
  font-size: 1.5rem;
  cursor: pointer;
}

.mixtape-content-wrapper {
  display: flex;
  align-items: flex-start; 
  gap: 12px;
}

.mixtapes-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding-bottom: 40px;
}

.mixtapes-list.list {
  flex-direction: column;
}

.mixtape-item {
  background-color: #080d2a;
  border-radius: 12px;
  color: #ddd;
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  width: 100%;
  max-width: 50rem;
  transition: background-color 0.3s ease;
  position: relative;
}

.mixtape-actions-top-right {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
  z-index: 10;
}

.mixtape-actions-top-right button {
  background-color: #6a5acd;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.15);
}

.mixtape-actions-top-right button:hover {
  background-color: #483d8b; 
}

.mixtape-actions-top-right button:active {
  background-color: #2f2b60; 
}

.editable-mixtape {
  position: relative;
}

.mixtape-cover {
  border-radius: 12px;
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.mixtape-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.mixtape-name, .mixtape-desc {
  padding: 0.75rem;
  border: none;
  width: 100%;
  color: white;
  background: transparent;
  text-align: center;
}

.mixtape-name {
  font-weight: 700;
  font-size: 1.1rem;
}

.mixtape-desc {
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.no-results {
  font-style: italic;
  color: #6b587b;
  margin-top: 20px;
  width: 100%;
  text-align: center;
}

/* mixtape edit mode */
.edit-mixtape-container {
  background-color: #6a4fcf;
  border-radius: 1.5rem;
  padding: 14px 16px;
  width: 100%;
  max-width: 50rem;
  margin: 3rem auto;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.edit-form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.edit-form-section label {
  font-weight: 500;
}

.edit-form-section input[type="text"],
.edit-form-section textarea {
  width: 100%;
  background-color: #2a2a2a;
  border: none;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  resize: none;
}

.edit-form-section input[type="file"] {
  background-color: transparent;
  color: white;
}

.mixtape-cover-preview {
  width: 100%;
  max-width: 200px;
  margin-top: 0.5rem;
  border-radius: 1rem;
  object-fit: cover;
}

.song-list-scroll {
  max-height: 250px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.song-item-flex {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  padding: 8px 2px;
}

.song-item-flex input {
  background-color: #3a3a3a;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.95rem;
}

button {
  background-color: #6a4fcf;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #8b6eff;
}

.add-song-btn {
  align-self: flex-start;
}

.popup-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* mixtape creation (same sa Sidebar) */
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
  width: 750px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 90vh;
  overflow-y: auto;
  padding-right: 1rem;
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

/* song list popup */
.mixtape-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1200;
  background-color: #1a1f4a;
  border-radius: 12px;
  padding: 1.5rem;
  width: 35rem;
  height: 25rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.mixtape-popup img {
  display: block;
  margin: 0 auto 1rem auto;
  height: 130px;
  width: 130px;
  object-fit: cover;
  border-radius: 8px;
}

.mixtape-title-back {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.song-list {
  margin-top: 1rem;
  overflow-y: auto;
  max-height: 180px;
  flex-grow: 1;
  text-align: left;
  padding-left: 2.5rem;
}

.song-list li {
  margin-bottom: 0.5rem;
}

.song-number {
  font-weight: bold;
  margin-right: 0.5rem;
}

.song-title {
  font-weight: bold;
}

.mixtape-popup .exit-button {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}

.popup-box .song-list-scroll {
  max-height: 150px;
  overflow-y: auto;
  background-color: #2e1f45;
  padding: 0.5rem;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.song-item-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c1a40;
  padding: 0.5rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  color: white;
}

.song-actions-buttons i {
  margin-left: 0.5rem;
  cursor: pointer;
  color: #c2b4d6;
}

.song-actions-buttons i:hover {
  color: #ffffff;
}
</style>
