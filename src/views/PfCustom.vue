<template>
  <img src="/src/assets/background.png" alt="background" class="background">   

  <div class="setup-text">
    Let's set up your Profile
  </div>

  <div class="profile-setup">
    <p>My Birthday</p>
  <div class="birthday-inputs">
    <input type="number" placeholder="MM" min="1" max="12" required>
    <input type="number" placeholder="DD" required>
    <input type="number" placeholder="YYYY" min="1900" max="2025" required>
  </div>

  <p>I identify as ...</p>
  <div class="gender-options">
    <button class="gender-button" :class="{ selected: selectedGender === 'Female' }" @click="selectGender('Female')">Female</button>
    <button class="gender-button" :class="{ selected: selectedGender === 'Male' }" @click="selectGender('Male')">Male</button>
    <button class="gender-button" :class="{ selected: selectedGender === 'Non-Binary' }" @click="selectGender('Non-Binary')">Non-Binary</button>
    <button class="gender-button" :class="{ selected: selectedGender === 'Other' }" @click="selectGender('Other')">Other</button>
  </div>


  <p>Tell People More About You!</p>
  <textarea placeholder="Write something about yourself..."></textarea>

  <button class="continue-button" @click="navigateToNextPage">Continue</button>

  </div>


</template>
  
<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const navigateToNextPage = () => {
    router.push('/PfMixtape');
  };

  import { ref } from 'vue';
  const selectedGender = ref('');
  function selectGender(gender) {
    selectedGender.value = gender;
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

* {
  font-family: 'Fira Code', monospace;
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
  transform: rotate(180deg);
}

.setup-text {
  position: absolute;
  top: 4.5rem; 
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  color: #ffffff;
  text-align: center;
}

.profile-setup {
  background-color: #080d2a;
  width: 35rem;
  height: 30rem;
  padding: 2rem;
  border-radius: 15px;
  color: white;
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
}

p {
  font-size: 1.5rem;
  margin: 1rem;
  margin-bottom: 1.5rem;
}

.birthday-inputs {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.birthday-inputs input {
  background: rgba(235, 235, 235, 0.7);
  border: none;
  padding: 9px;
  width: 7rem;
  text-align: center;
  font-size: 1rem;
  color: #080d2a;
  border-radius: 5px;
}

.gender-options {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.gender-button {
  background: rgba(235, 235, 235, 0.7);
  border: none;
  padding: 9px 25px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
}

.gender-button.selected {
  background-color: #dbb4d7;
  color: #080d2a;
}

textarea {
  width: 470px !important;
  height: 90px;
  background: rgba(235, 235, 235, 0.7);
  border: none;
  padding: 10px;
  margin-left: 2rem;
  font-size: 1rem;
  border-radius: 5px;
  resize: none;
}

.continue-button {
  background: #dbb4d7;
  color: #080d2a;
  padding: 5px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  display: block; 
  margin-left: auto;
  margin-right: auto;
}

.continue-button:hover {
  background: #080d2a;
  color: #dbb4d7;
  border: 1px solid #ebebeb;
}

input:focus,
textarea:focus {
  outline: none;
  background-color: #dbb4d7;
}
</style>
  