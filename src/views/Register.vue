<template>
  <v-container fluid style="width: 50vw">
    <v-container class="justify-center align-center">
      <v-row justify="space-between">
        <h2>Register</h2>
      </v-row>
      <v-form v-model="isFormValid">
        <v-row>
          <v-text-field
            label="Name"
            v-model="name"
            :rules="[rules.required]"
          ></v-text-field>
        </v-row>
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
      <v-row justify="center">
          <v-btn color="primary" @click="register" :disabled="!isFormValid">
            Register
          </v-btn>
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
      name: null,
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
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
           data.user
            .updateProfile({
              displayName: this.name
            })
            .then(() => {
                this.$router.replace({ name: "Home" });
            });
        })
        .catch((err) => {
          this.error = err;
        });
    },
  },
  mounted: () => {
        (document.title = "Othello - Register");
  } 
};
</script>
<style scoped>
</style>
