<template>
  <q-page :class="isMobile() ? 'bg-login-mobile' : 'bg-login'">
    <div class="q-pa-lg">
      <div class="flex column" style="height: 50vh">
        <img
          v-if="isMobile()"
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
          v-if="isMobile()"
          alt="Claimguru"
          src="~assets/claimguru_text.png"
          class="q-mx-auto q-mb-auto"
          width="190"
          height="90"
        />
        <img
          v-else
          alt="Claimguru"
          src="~assets/cg_text_white.png"
          class="q-mx-auto q-mb-auto"
          width="190"
          height="90"
        />
      </div>
      <q-form class="column" autocapitalize="off" @submit="onUserLogin">
        <q-card class="rounded row">
          <div class="q-ml-xs column justify-center" style="width: 20px">
            <q-icon name="person" color="primary" size="sm" />
          </div>
          <div class="q-pl-md col-10">
            <q-input
              dense
              class="q-py-xs login-input full-width"
              v-model="login.email"
              placeholder="Username"
              borderless
            />
          </div>
        </q-card>
        <q-card class="q-mt-sm rounded row">
          <div class="q-ml-xs column justify-center" style="width: 20px">
            <q-icon name="lock" color="primary" size="sm" />
          </div>
          <div class="q-pl-md col-10">
            <q-input
              dense
              class="q-py-xs login-input full-width"
              v-model="login.password"
              placeholder="Password"
              type="password"
              borderless
              :type="isPasswordVisible ? 'text' : 'password'"
              @keyup.enter="onUserLogin"
            >
            </q-input>
          </div>
          <div class="col">
            <q-icon
              :name="isPasswordVisible ? 'visibility' : 'visibility_off'"
              class="cursor-pointer q-mt-md"
              @click="isPasswordVisible = !isPasswordVisible"
            ></q-icon>
          </div>
        </q-card>
        <div>
          <q-btn
            :color="isMobile() ? 'secondary' : 'white'"
            :outline="!isMobile() ? true : false"
            label="Login"
            type="submit"
            class="rounded full-width q-my-md"
          ></q-btn>
        </div>

        <div
          v-if="!isMobile()"
          class="row justify-center cursor-pointer"
          @click="onClickSignupButton"
        >
          <a class="text-white" style="text-decoration: none">Sign Up</a>
        </div>
        <div
          class="row justify-center q-mt-sm cursor-pointer"
          @click="$router.push('/forget-password')"
        >
          <a
            :class="isMobile() ? 'text-primary' : 'text-white'"
            style="text-decoration: none"
            >Forgot Password</a
          >
        </div>

        <div class="text-center footer-style">Version {{ this.version }}</div>
      </q-form>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
import { isMobile } from '@utils/common';
import { getToken, getCurrentUser } from '@utils/auth';
import {
  Capacitor,
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/core';
import { Screen } from 'quasar';
import { constants } from '@utils/constant';
import { notification } from 'src/store/common/getters';
import { appVersion } from '../Version';
const isPushNotificationsAvailable =
  Capacitor.isPluginAvailable('PushNotifications');
const { PushNotifications } = Plugins;

export default {
  name: 'Login',
  data() {
    return {
      version: appVersion,
      isPasswordVisible: false,
      login: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions(['userLogin', 'getUserInfo', 'sendPushNotificationToken']),
    ...mapMutations(['setSelectedClaimId', 'setNotificationRouteTo']),
    isMobile,
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
                  PushNotificationActionPerformed.notification.data.action ===
                  constants.Notification.VIEW_CLAIM_TASKS
                ) {
                  this.setSelectedClaimId(
                    PushNotificationActionPerformed.notification.data.claimID
                  );
                  this.setNotificationRouteTo('task');
                  this.$router.push('/claim-details');
                }
                if (
                  PushNotificationActionPerformed.notification.data.action ===
                  constants.Notification.VIEW_CLAIM
                ) {
                  this.setSelectedClaimId(
                    PushNotificationActionPerformed.notification.data.claimID
                  );
                  this.setNotificationRouteTo('summary');
                  this.$router.push('/claim-details');
                }
              }
            );
            PushNotifications.addListener('registrationError', any => {});
          }

          //below function is use for checking login routing for mobile and web screen,

          if (isMobile()) {
            this.$router.push('/dashboard');
          } else {
            this.$router.push('/claimstats');
          }
        }
      }
    },
    onClickSignupButton() {
      window.location = process.env.LP_APP_URL;
    }
  },

  created() {
    if (getToken() && getCurrentUser()) {
      if (isMobile()) {
        this.$router.push('/dashboard');
      } else {
        this.$router.push('/claimstats');
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
.bg-login-mobile {
  background-color: #ededed;
  width: 100%;
}
.rounded {
  border-radius: 15px 15px 15px 15px;
}
.footer-style {
  margin-top: 80px;
}
</style>
