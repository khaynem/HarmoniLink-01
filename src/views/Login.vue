<template>
  <img src="/src/assets/background.png" alt="background" class="background">

<div class="cd">
  <img src="/src/assets/cd.png" alt="CD" class="CD">
</div>

<div class="login">
  <h2>LOG IN</h2>
  <img src="/src/assets/logo.png" alt="Harmonilink Logo">

  <p class="quote-text">Bringing people together through the power of music.</p>

  <form>
    <div class="input-group">
      <input type="email" placeholder="Email" required>
      <span class="email-domain">@gmail.com</span>
    </div>
    <div class="input-group">
      <input type="password" placeholder="Password" required>
      <span class="icon"><i class="fa-solid fa-eye-slash"></i></span>
    </div>

  <div class="checkbox-container">
    <div class="checkbox-group">
      <input type="checkbox" id="terms" required>
      <label for="keep">Keep me logged in</label>
    </div>
      <p class="forgot-password">Forget password?</p>
  </div>

    <button type="submit">Log In</button>

    <p class="login-text">Don't have an account? <router-link to="/SignUp" class="signin-link">Sign Up</router-link></p>
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
transform: rotate(180deg);
}

.CD {
position: absolute;
top: 8.5rem;
right: 26rem;
height: 32rem;
transform: rotate(120deg);
animation: moveRight 1s ease-out;
}

@keyframes moveRight {
  from {
    right: 30rem;
    opacity: 0;
  }
  to {
    right: 26rem;
    opacity: 1;
  }
}

.login {
width: 29em;
height: 35rem;
padding: 20px;
background: linear-gradient(to bottom, #c697bd, #dbb4d7 50%, #1f0d3e);
border-radius: 25px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
text-align: center;
position: absolute;
top: 50%;
left: 750px;
transform: translate(-50%, -50%);
color: #322848;
}

.login img {
  width: 8rem;
}

h2 {
margin-top: 0.5rem;
margin-bottom: 1.5rem;
color: #322848;
font-size: 40px;
}

.quote-text {
  font-size: 12px;
  margin-top: 3rem;
  color: #333;
}

.input-group {
position: relative;
margin: 1rem 0;
top: 1rem;
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

.email-domain {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  color: #888;
}

.checkbox-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 89%;
  font-size: 11px;
  margin-top: 20px;
  margin-left: 1.5rem;
  color: #ebebeb;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group input {
  margin-right: 8px;
}

.forgot-password {
  cursor: pointer;
  text-decoration: underline;
  color: #ebebeb;
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
margin-top: 20px;
font-size: 18px;
font-weight: bold;
}

button:hover {
background: #14092b;
}

.login-text {
margin-top: 15px;
font-size: 13px;
color: #ebebeb;
}

.signin-link {
text-decoration: underline;
color: #ebebeb;
cursor: pointer;
font-weight: bold;
}
</style>