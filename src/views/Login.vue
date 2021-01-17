<template>
  <v-container fluid style="width: 50vw">
    <v-container class="justify-center align-center">
      <v-row justify="space-between">
        <v-col> Sign in </v-col>
        <v-col> or <a class="center-button"> create an account </a> </v-col>
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
        <v-col> <a class="center-button"> Forgot your password? </a> </v-col>
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
          window.console.log(err);
        });
    },
  },
  mounted: () => (document.title = "Othello - Sign in"),
};
</script>
<style scoped>
.example,
.screenshot {
  width: 500px;
}

.example {
  width: 480px;
}

.othello {
  width: 80%;
  box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.2);
}

@media (max-width: 767px) {
  .screenshot {
    width: 85%;
  }

  .example {
    width: 80%;
  }
}
</style>
