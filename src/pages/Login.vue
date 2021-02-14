<template>
  <q-page class="bg-login">
    <div class="q-pa-lg">
      <div class="flex column" style="height: 50vh">
        <img
          v-if="$q.screen.width < 600"
          alt="Claimguru"
          src="~assets/claimguru_icon.png"
          class="q-mt-auto q-mx-auto"
          width="95"
          height="95"
        />
        <img
          v-else
          alt="Claimguru"
          src="~assets/logo.png"
          class="q-mx-auto q-mt-auto"
          width="95"
          height="95"
        />
        <img
          v-if="$q.screen.width < 600"
          alt="Claimguru"
          src="~assets/claimguru_text.png"
          class="q-mx-auto q-mb-auto"
          width="190"
          height="90"
        />
        <img
          v-else
          alt="Claimguru"
          src="~assets/CG_Text_White.png"
          class="q-mx-auto q-mb-auto"
          width="190"
          height="90"
        />
      </div>
      <div class="column">
        <div class="row">
          <img src="~assets/icon_user.svg" class="q-mr-lg" />
          <q-input
            class="login-input"
            v-model="login.email"
            placeholder="Username"
            borderless
          />
          <q-separator :color="$q.screen.width < 600 ? 'grey' : 'white'" />
        </div>
        <div class="row">
          <img src="~assets/lock.svg" class="q-mr-lg" />
          <q-input
            class="login-input"
            v-model="login.password"
            placeholder="Password"
            type="password"
            borderless
          />
          <q-separator :color="$q.screen.width < 600 ? 'grey' : 'white'" />
        </div>
        <div>
          <q-btn
            :color="$q.screen.width < 600 ? 'secondary' : 'white'"
            :outline="$q.screen.width > 600 ? true : false"
            label="Login"
            class="full-width q-my-md"
            @click="onUserLogin"
          ></q-btn>
        </div>
        <a
          href
          :class="$q.screen.width < 600 ? 'text-primary' : 'text-white'"
          style="text-decoration: none"
          >Forgot Password</a
        >
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { getToken } from '@utils/auth';
export default {
  name: 'Login',
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions(['userLogin', 'getUserInfo']),

    async onUserLogin() {
      const loginData = {
        data: {
          type: 'users',
          attributes: {
            ...this.login
          }
        }
      };
      if (this.login.email && this.login.password) {
        const response = await this.userLogin(loginData);
        if (response) {
          this.getUserInfo();
        }
      }
    }
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  created() {
    if (getToken()) {
      this.getUserInfo();
      if (userInfo.onboard.isCompleted) {
        this.$router.push('/dashboard');
      } else {
        this.$router.push('/onboarding');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login-input {
  font-size: 14px;
  width: 80%;
}

.bg-login {
  background: #f05a26;
  width: 40%;
  margin-left: auto;
  margin-right: 10%;
}

@media screen and (max-width: 600px) {
  .bg-login {
    background-color: #ededed;
    width: 100%;
  }

  .login-input {
    font-size: 14px;
    width: 80%;
  }
}
</style>
;
