<template>
  <v-container fluid style="width: 50vw">
    <v-container class="justify-center align-center">
      <v-row justify="space-between">
        <v-col> <h2>Sign in</h2> </v-col>
        <v-col>
          or
          <router-link to="/register" class="">create an account</router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-btn tile color="error" @click="loginWithGoogle">
          <v-icon left> mdi-google </v-icon>
          Sign in with Google
        </v-btn>
      </v-row>
      <v-row>
        <v-btn tile color="success" @click="loginWithGithub">
          <v-icon left> mdi-github </v-icon>
          Sign in with Github
        </v-btn>
      </v-row>
      <v-divider />
      <v-form v-model="isFormValid">
        <v-row>
          <v-text-field
            label="Email"
            v-model="email"
            :rules="[rules.required, rules.email]"
            validate-on-blur
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            counter
            validate-on-blur
            @click:append="show = !show"
          ></v-text-field>
        </v-row>
      </v-form>
      <v-row v-if="error">
        <v-alert dense outlined type="error">
          {{ error }}
        </v-alert>
      </v-row>
      <v-row justify="space-between">
        <v-col>
          <router-link to="/forgot" class="">Forgot your password?</router-link>
        </v-col>
        <v-col>
          <v-btn color="primary" @click="login" :disabled="!isFormValid">
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: null,
      password: null,
      isFormValid: false,
      error: null,
      show: false,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },
    };
  },
  computed: {},
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.$router.replace({ name: "Home" });
        })
        .catch((err) => {
          this.error = err;
        });
    },
    loginWithGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      this.loginWith(provider);
    },
    loginWithGithub() {
      let provider = new firebase.auth.GithubAuthProvider();
      this.loginWith(provider);
    },
    loginWith(provider) {
      firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = credential.accessToken;

    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
    },
  },
  mounted: () => (document.title = "Othello - Sign in"),
};
</script>
<style scoped>
.login-provider {
  cursor: pointer;
}
</style>
