<template>
    <nav class="top-nav">
      <img src="/src/assets/logo2.png" alt="Logo" class="logo" />
      <div class="search-container">
        <i class="fa-solid fa-microphone mic-icon"></i>
        <input type="text" placeholder="Search" class="search-input" />
      </div>
      <i class="fa-solid fa-circle-user user-icon"></i>
    </nav>
  </template>
  
  <script setup>
    import { ref } from 'vue';
  </script>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
  
    * {
      font-family: 'Fira Code', monospace;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      background-color: #dbb4d7;
      overflow: hidden;
    }
  
    .top-nav {
      background-color: #080d2a;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2.5rem 2rem;
      height: 60px;
      position: relative;
    }
  
    .logo {
      height: 40px;
    }
  
    .search-container {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      width: 30rem;
    }
  
    .mic-icon {
      position: absolute;
      left: 10px;
      color: white;
      z-index: 1;
    }
  
    .search-input {
      width: 100%;
      padding: 0.5rem 1rem 0.5rem 2.5rem;
      background-color: #432775;
      border: none;
      border-radius: 40px;
      color: white;
    }
  
    .user-icon {
      color: white;
      font-size: 35px;
    }
  </style>
  