<template>
  <q-page class="container bg-background">
    <div class="flex row q-pa-xl justify-between" v-if="!isLinkExpired">
      <div class="bg-grey col-7"></div>
      <div class="col-4">
        <div class="full-height" style="border: 1px solid #dddddd">
          <center>
            <div class="my-font text-uppercase text-bold text-black q-mt-xl">
              Choose Your Password
            </div>
          </center>
          <div class="my-font q-mx-xl q-mt-lg">Password</div>
          <q-input
            dense
            :type="isPasswordVisible ? 'text' : 'password'"
            class="q-mx-xl"
            filled
            v-model="password.password"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 8) || 'Password should be more than 8 char'
            ]"
          >
            <q-icon
              :name="isPasswordVisible ? 'visibility' : 'visibility_off'"
              class="cursor-pointer q-mt-md"
              @click="isPasswordVisible = !isPasswordVisible"
            ></q-icon>
          </q-input>

          <div class="my-font q-mx-xl q-mt-lg">Confirm Password</div>
          <q-input
            dense
            :type="isPasswordVisible ? 'text' : 'password'"
            class="q-mx-xl"
            filled
            v-model="password.confirm"
            lazy-rules
            :rules="[
              val =>
                (val &&
                  val == password.password &&
                  val.length == password.password.length) ||
                'Password should be same'
            ]"
            @input="checkConfirmPassword"
          >
            <q-icon
              :name="isPasswordVisible ? 'visibility' : 'visibility_off'"
              class="cursor-pointer q-mt-md"
              @click="isPasswordVisible = !isPasswordVisible"
            ></q-icon
          ></q-input>
          <q-separator class="q-mt-lg" />
          <center>
            <q-btn
              style="width: 30%"
              color="primary"
              label="Submit"
              class="q-my-md"
              @click="onSubmitPassword"
              :disabled="isSubmitDisabled"
            />
          </center>
        </div>
      </div>
    </div>
    <div v-else class="column justify-between">
      <img src="~assets/link_expired.svg" width="50%" class="q-mx-auto" />
      <h3 class="q-mx-auto">This link is expired.</h3>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';

import {
  Capacitor,
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/core';
import { Screen } from 'quasar';
import { setNotification } from 'src/store/common/mutations';
import { isMobile } from 'src/utils/common';

const isPushNotificationsAvailable = Capacitor.isPluginAvailable(
  'PushNotifications'
);
const { PushNotifications } = Plugins;
export default {
  name: 'SetPassword',
  data() {
    return {
      isPasswordVisible: false,
      userId: '',
      userEmail: '',
      isSubmitDisabled: true,
      password: { password: '', confirm: '' },
      isLinkExpired: false
    };
  },
  methods: {
    ...mapActions([
      'verifyOobCode',
      'setPassword',
      'resetPassword',
      'userLogin',
      'getUserInfo'
    ]),
    ...mapMutations(['setSelectedClaimId', 'setNotificationRouteTo']),

    checkConfirmPassword() {
      if (this.password.password === this.password.confirm) {
        this.isSubmitDisabled = false;
      } else {
        this.isSubmitDisabled = true;
      }
    },

    async onSubmitPassword() {
      if (this.$route.query.mode == 'resetPassword') {
        const payload = {
          oobCode: this.$route.query.oobCode,
          password: this.password.password
        };
        const setPass = await this.resetPassword(payload);
        if (setPass) {
          const loginData = {
            data: {
              type: 'users',
              attributes: {
                email: this.userEmail,
                password: this.password.password
              }
            }
          };
          const res = await this.userLogin(loginData);
          if (res) {
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
            if (isMobile()) {
              this.$router.push('/dashboard');
            } else {
              this.$router.push('/admin');
            }
          }
        }
      } else {
        const payload = {
          uid: this.userId,
          password: this.password.password
        };
        const setPass = await this.setPassword(payload);
        if (setPass) {
          const loginData = {
            data: {
              type: 'users',
              attributes: {
                email: this.userEmail,
                password: this.password.password
              }
            }
          };
          const res = await this.userLogin(loginData);
          if (res) {
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
            if (isMobile()) {
              this.$router.push('/dashboard');
            } else {
              this.$router.push('/admin');
            }
          }
        }
      }
    }
  },

  created() {
    this.verifyOobCode(this.$route.query).then(response => {
      if (response && response.data.id && response.data.attributes.email) {
        this.userId = response.data.id;
        this.userEmail = response.data.attributes.email;
        this.isLinkExpired = false;
      } else {
        this.isLinkExpired = true;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 100%;
  width: 100%;
  height: 100vh;
}

.my-font {
  font-family: 'Lato';
}
</style>
