<template>
    <img src="/src/assets/background.png" alt="background" class="background">

  <div class="logo">
    <img src="/src/assets/logo.png" alt="Harmonilink Logo">
    <p>armonilink</p>
  </div>

  <div class="cd">
    <img src="/src/assets/cd.png" alt="CD" class="CD">
    <img src="/src/assets/cdbg.png" alt="CD Background" class="cdbg">
  </div>

  <div class="signup">
    <h2>SIGN UP</h2>
    <form action="/Welcome">
      <div class="input-group">
        <input type="text" placeholder="Username" required>
        <span class="icon"><i class="fa-solid fa-user"></i></span>
      </div>
      <div class="input-group">
        <input type="email" placeholder="Email" required>
        <span class="icon"><i class="fa-solid fa-envelope"></i></span>
      </div>
      <div class="input-group">
        <input type="password" placeholder="Password" required>
        <span class="icon"><i class="fa-solid fa-eye-slash"></i></span>
      </div>
      <div class="input-group">
        <input type="password" placeholder="Confirm Password" required>
        <span class="icon"><i class="fa-solid fa-eye"></i></span>
      </div>

      <div class="checkbox-group">
        <input type="checkbox" id="terms" required>
        <label for="terms">By checking this box, you are agreeing to our <span class="terms">Terms of Service.</span></label>
      </div>
        <button type="submit">Sign Up</button>

      <p class="login-text">Create an account or <router-link to="/Login" class="signin-link">Sign in</router-link></p>
    </form>
  </div>
  </template>
  
  <script setup>
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
}

.logo {
  display: flex;
  align-items: center;
  position: absolute;
  top: 30px;
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

.cdbg {
  display: flex;
  align-items: center;
  position: absolute;
  top: 5.5rem;
  right: 0px;
  height: 38rem;
  width: 50rem;
  border-radius: 10px;
}

.CD {
  position: absolute;
  top: 10rem;
  right: 9rem;
  z-index: 10;
  height: 30rem;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.signup {
  width: 30rem;
  height: 30rem;
  padding: 20px;
  background: linear-gradient(to right, #c697bd, #dbb4d7 80%, #1f0d3e);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: absolute;
  top: 50%;
  left: 588px;
  transform: translate(-50%, -50%);
  color: #322848;
}

h2 {
  margin-bottom: 3rem;
  color: #322848;
  font-size: 40px;
}

.input-group {
  position: relative;
  margin: 1rem 0;
}

.input-group input {
  width: 24rem;
  height: 1.5rem;
  padding: 8px;
  padding-right: 40px;
  background: rgba(235, 235, 235, 0.4);
  border: none;
  border-radius: 5px;
  font-size: 15px;
  color: #333;
}

.input-group input:focus {
  border: 2px solid #1f0d3e;
  outline: none;
}

.input-group .icon {
  position: absolute;
  right: 2.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: 080d2a;
}

.checkbox-group {
  display: flex;
  align-items: center;
  font-size: 10px;
  margin: 10px 0;
  margin-left: 36px;
}

.checkbox-group input {
  margin-right: 8px;
}

button {
  width: 20rem;
  height: 2.5rem;
  padding: 10px;
  background: #1f0d3e;
  color: #ebebeb;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}

button:hover {
  background: #14092b;
}

.login-text {
  margin-top: 15px;
  font-size: 13px;
}

.signin-link {
  text-decoration: underline;
  color: #322848;
  cursor: pointer;
  font-weight: bold;
}
  </style>