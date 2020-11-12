<template>
  <q-page-container class="bg-login">
    <q-page class="q-pa-lg">
      <div>
        <div class="flex" style="height: 55vh">
          <img
            alt="Claimguru"
            src="~assets/app-icon2.png"
            class="q-mx-auto q-my-auto"
            width="150"
            height="150"
          />
        </div>
        <div class="column" style="height: 40vh">
          <q-input v-model="username" placeholder="Username" borderless>
            <template v-slot:prepend>
              <q-icon name="person_outline" color="orange" />
            </template>
          </q-input>
          <q-input
            v-model="userpwd"
            placeholder="Password"
            type="password"
            borderless
          >
            <template v-slot:prepend>
              <q-icon name="lock_outline" color="orange" />
            </template>
          </q-input>
          <q-btn
            color="secondary"
            label="Login"
            class="full-width q-my-md"
            @click="onLogin"
          ></q-btn>
          <a href style="color: #d64d25; text-decoration: none"
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

export default {
  name: "Login",
  data() {
    return {
      username: "",
      userpwd: "",
    };
  },
  methods: {
    onLogin() {
      axios
        .post(
          "https://api.claimguru.cilalabs.dev/v1/users/login",
          {
            data: {
              type: "users",
              attributes: {
                email: this.username,
                password: this.userpwd,
              },
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          localStorage.setItem(
            "token",
            JSON.stringify(response["data"]["data"]["idToken"])
          );
          this.$router.push("/dashboard");
        })
        .catch(() => {
          this.showNotification();
          this.userpwd = "";
        });
    },

    showNotification() {
      this.userpwd = "";
      this.$q.notify({
        message: "Please check your credentials",
        icon: "announcement",
        position: "top",
        timeout: 2000,
      });
    },
  },

  beforeMount() {
    if (localStorage.getItem("token")) {
      this.$router.push("/dashboard");
    }
  },
};
</script>
<style>
input::placeholder {
  color: #aeaeae;
}
.bg-login {
  background-color: #ededed;
}
</style>
