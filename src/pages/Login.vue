<template>
  <q-page class="bg-login">
    <div class="q-pa-lg">
      <div class="flex column" style="height: 50vh">
        <img
          v-if="$q.screen.width < 624"
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
          v-if="$q.screen.width < 624"
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
      <q-form class="column" autocapitalize="off" @submit="onUserLogin">
        <div class="row">
          <div class="q-mt-md" style="width: 20px">
            <img src="~assets/icon_user.svg" class="q-mr-lg" />
          </div>
          <div class="q-pl-md col-10">
            <q-input
              dense
              class="login-input full-width"
              v-model="login.email"
              placeholder="Username"
              borderless
            />
          </div>
          <q-separator :color="$q.screen.width < 624 ? 'grey' : 'white'" />
        </div>
        <div class="row">
          <div class="q-mt-md" style="width: 20px">
            <img src="~assets/lock.svg" class="q-mr-lg" />
          </div>
          <div class="q-pl-md col-10" style="width: 90%">
            <q-input
              dense
              class="login-input full-width"
              v-model="login.password"
              placeholder="Password"
              type="password"
              borderless
              :type="isPasswordVisible ? 'text' : 'password'"
              @keyup.enter="onUserLogin"
            >
              <template v-slot:append>
                <q-avatar>
                  <q-icon
                    :name="isPasswordVisible ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="isPasswordVisible = !isPasswordVisible"
                  ></q-icon>
                </q-avatar>
              </template>
            </q-input>
          </div>
          <q-separator :color="$q.screen.width < 624 ? 'grey' : 'white'" />
        </div>
        <div>
          <q-btn
            :color="$q.screen.width < 624 ? 'secondary' : 'white'"
            :outline="$q.screen.width > 624 ? true : false"
            label="Login"
            type="submit"
            class="full-width q-my-md"
          ></q-btn>
        </div>
        <a
          href
          :class="$q.screen.width < 624 ? 'text-primary' : 'text-white'"
          style="text-decoration: none"
          >Forgot Password</a
        >
      </q-form>
    </div>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';
import { getToken, getCurrentUser } from '@utils/auth';
import {
  Capacitor,
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/core';
import { Mutation, Screen } from 'quasar';

const isPushNotificationsAvailable = Capacitor.isPluginAvailable(
  'PushNotifications'
);
const { PushNotifications } = Plugins;

export default {
  name: 'Login',
  data() {
    return {
      isPasswordVisible: false,
      login: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions(['userLogin', 'getUserInfo', 'sendPushNotificationToken']),
    ...mapMutations('setSelectedClaimId'),

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
          await this.getUserInfo();
          if (isPushNotificationsAvailable) {
            PushNotifications.requestPermission().then(result => {
              if (result.granted) {
                PushNotifications.register();
              }
            });
            PushNotifications.addListener(
              'registration',
              PushNotificationToken => {
                this.sendPushNotificationToken({
                  token: PushNotificationToken.value
                });
              }
            );
            PushNotifications.addListener(
              'pushNotificationActionPerformed',
              PushNotificationActionPerformed => {
                if (
                  PushNotificationActionPerformed.notification.data.action ==
                  'uploadEstimateDoc'
                ) {
                  this.setSelectedClaimId(
                    PushNotificationActionPerformed.notification.data.claimID
                  );
                  this.$router.push('/document-upload');
                }
              }
            );
            PushNotifications.addListener('registrationError', any => {
              alert('Error on registration: ' + JSON.stringify(any));
            });
          }
          this.$router.push('/dashboard');
        }
      }
    }
  },

  created() {
    if (getToken() && getCurrentUser()) {
      this.$router.push('/dashboard');
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

@media screen and (max-width: 624px) {
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
