<template>
  <q-page-container class="bg-login">
    <q-page class="q-pa-lg">
      <div>
        <div class="flex column" style="height: 50vh">
          <img
            alt="Claimguru"
            src="~assets/claimguru_icon.png"
            class="q-mx-auto q-mt-auto"
            width="95"
            height="95"
          />
          <img
            alt="Claimguru"
            src="~assets/claimguru_text.png"
            class="q-mx-auto q-mb-auto"
            width="190"
            height="90"
          />
        </div>
        <div class="column" style="height: 50vh">
          <div class="row" style="height: 10vh">
            <img src="~assets/icon_user.svg" class="q-mr-lg" />
            <q-input
              class="login-input"
              v-model="login.email"
              placeholder="Username"
              borderless
            />
            <q-separator />
          </div>
          <div class="row" style="height: 10vh">
            <img src="~assets/lock.svg" class="q-mr-lg" />
            <q-input
              class="login-input"
              v-model="login.password"
              placeholder="Password"
              type="password"
              borderless
            />
            <q-separator />
          </div>
          <div style="height: 10vh">
            <q-btn
              color="secondary"
              label="Login"
              class="full-width q-my-md"
              @click="onUserLogin"
            ></q-btn>
          </div>
          <a href class="text-primary" style="text-decoration: none"
            >Forgot Password</a
          >
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>
<script>
import axios from "axios";
import { Notify } from "quasar";
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["userLogin"]),

    onUserLogin() {
      const loginData = {
        data: {
          type: "users",
          attributes: {
            ...this.login,
          },
        },
      };
      if (this.login.email && this.login.password) {
        this.userLogin(loginData);
      }
    },
  },

  beforeMount() {
    if (localStorage.getItem("token")) {
      this.$router.push("/dashboard");
    }
  },
};
</script>
<style lang="scss" scoped>
.login-input {
  color: #999999 !important;
  font-size: 14px;
}
.bg-login {
  background-color: #ededed;
}
</style>
