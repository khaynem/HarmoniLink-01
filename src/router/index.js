import { createRouter, createWebHistory } from 'vue-router';

import SignUp from '../views/SignUp.vue';
import Welcome from '../views/Welcome.vue';
import PfCustom from '../views/PfCustom.vue';
import PfMixtape from '../views/PfMixtape.vue';
import Login from '../views/Login.vue';
import Discover from '../views/Discover.vue';
import Feed from '../views/Feed.vue';
import Achievements from '../views/Achievements.vue';
import Favorites from '../views/Favorites.vue';
import Profile from '../views/Profile.vue';

const routes = [
  { path: '/signup', component: SignUp },
  { path: '/welcome', component: Welcome },
  { path: '/pfcustom', component: PfCustom },
  { path: '/pfmixtape', component: PfMixtape },
  { path: '/login', component: Login },
  { path: '/discover', component: Discover },
  { path: '/feed', component: Feed },
  { path: '/achievements', component: Achievements },
  { path: '/favorites', component: Favorites },
  { path: '/profile', component: Profile }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
