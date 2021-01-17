import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import AnimateCSS from 'animate.css'
import vuetify from '@/plugins/vuetify'
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(AnimateCSS)
Vue.use(BootstrapVue)

Vue.config.devtools = false
Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyDWE6_UnTkirU70eK8P5FEJOtZIi_WH34s",
  authDomain: "auth-othello.firebaseapp.com",
  projectId: "auth-othello",
  storageBucket: "auth-othello.appspot.com",
  messagingSenderId: "74281176962",
  appId: "1:74281176962:web:2d757df1fe74063bcf099b",
  measurementId: "G-Q359Q5RE98"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
  user ? router.replace({ name: "Home" }) : router.replace({ name: "Register" });
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
