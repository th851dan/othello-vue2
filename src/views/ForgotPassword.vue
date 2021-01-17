<template>
  <v-container fluid style="width: 50vw">
    <v-container class="justify-center align-center">
      <v-row justify="space-between">
        <v-col> <h2> Forgot Password </h2> </v-col> 
      </v-row>
      <v-form v-model="isFormValid">
        <v-row>
          <v-text-field
            label="Email"
            v-model="email"
            :rules="[rules.required, rules.email]"
            validate-on-blur
          ></v-text-field>
        </v-row>
      </v-form>
      <v-row v-if="error">
        <v-alert dense outlined type="error">
          {{ error }}
        </v-alert>
      </v-row>
      <v-row v-if="emailSent">
        <v-alert dense outlined type="success">
          An email has been sent to "{{email}}". Please check your inbox to reset your password.
        </v-alert>
      </v-row>
      <v-row justify="space-between">
          <v-btn color="primary" @click="resetPassword" :disabled="!isFormValid">
            Reset your password
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
      isFormValid: false,
      error: null,
      emailSent: false,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  computed: {},
  methods: {
    resetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.emailSent = true;
          this.error = null;
        })
        .catch(err => {
          this.emailSent = false;
          this.error = err;
        });
    },
  },
  mounted: () => (document.title = "Othello - Forgot password"),
};
</script>
<style scoped>

</style>
