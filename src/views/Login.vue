<template>
  <div>
    <div class="pt-8">
      <v-card pt-3 flat outlined max-width="550" class="mx-auto">
        <v-container>
          <v-card-title class="text-center justify-center py-10">
            <h1 class="font-weight-bold display-1 deep-purple--text">
              <i class="mdi mdi-lock pr-3"></i>Login
            </h1>
          </v-card-title>
          <v-form @submit.prevent="login" ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required outlined></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Pasword"
              hint="At least 8 characters"
              outlined
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn
              type="submit"
              block
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >Login</v-btn>
            <v-snackbar color="error" class="snackbar" v-model="snackbar" :timeout="timeout">
              {{ text }}
              <v-btn text @click="snackbar = false">CLOSE</v-btn>
            </v-snackbar>
          </v-form>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
  name: "Login",
  data: () => ({
    valid: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    show1: false,
    show2: true,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    },
    snackbar: false,
    text: "Wrong email or password",
    timeout: 4000
  }),
  methods: {
    login() {
      const { email, password } = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          return this.$router.push({ name: "Dashboard" });
        })
        .catch(() => {
          this.snackbar = true;
        });
    },
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>

<style>
.snackbar {
  color: white;
  margin-bottom: 15px;
}
</style>