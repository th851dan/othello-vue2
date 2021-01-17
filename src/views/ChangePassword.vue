<template>
  <v-container fluid style="width: 50vw">
    <v-container class="justify-center align-center">
      <v-row justify="space-between">
        <v-col> <h2>Change your password</h2> </v-col>
      </v-row>
      <v-form v-model="isFormValid">
        <v-row>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            label="Enter your current password"
            hint="At least 8 characters"
            counter
            validate-on-blur
            @click:append="showOld = !showOld"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="newPassword"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            label="Enter new password"
            hint="At least 8 characters"
            counter
            validate-on-blur
            @click:append="showNew = !showNew"
          ></v-text-field>
        </v-row>
      </v-form>
      <v-row v-if="error">
        <v-alert dense outlined type="error">
          {{ error }}
        </v-alert>
      </v-row>
      <v-row v-else-if="success">
        <v-alert dense outlined type="success">
          Password updated succesfully.
        </v-alert>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" @click="change" :disabled="!isFormValid">
            Change password
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
      password: null,
      newPassword: null,
      isFormValid: false,
      error: null,
      showOld: false,
      showNew: false,
      success: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },
    };
  },
  computed: {},
  methods: {
    change() {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.password
      );
      user
        .reauthenticateWithCredential(credential)
        .then(() => this.updatePassword(user))
        .catch((err) => (this.error = err));
    },
    updatePassword(user){
        user.updatePassword(this.newPassword).then(() => {
            this.error = null;
            this.success = true;
        }).catch(err => this.error = err);
    },
  },
  mounted: () => (document.title = "Othello - Change Password"),
};
</script>
<style scoped>
</style>
