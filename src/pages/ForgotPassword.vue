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
            type="password"
            class="q-mx-xl"
            filled
            v-model="password.password"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 8) || 'Password should be more than 8 char'
            ]"
          />
          <div class="my-font q-mx-xl q-mt-lg">Confirm Password</div>
          <q-input
            dense
            type="password"
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
          />
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
      <img src="~assets/link-expired.svg" width="50%" class="q-mx-auto" />
      <h3 class="q-mx-auto">This link is expired.</h3>
    </div>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';
import {
  Capacitor,
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/core';
import { Screen } from 'quasar';

const isPushNotificationsAvailable = Capacitor.isPluginAvailable(
  'PushNotifications'
);
const { PushNotifications } = Plugins;
export default {
  name: 'forgotPassword',
  data() {
    return {
      userId: '',
      userEmail: '',
      isSubmitDisabled: true,
      password: { password: '', confirm: '' },
      isLinkExpired: false
    };
  },
  methods: {
    ...mapActions(['verifyOobCode', 'setPassword', 'userLogin', 'getUserInfo']),

    checkConfirmPassword() {
      if (this.password.password === this.password.confirm) {
        this.isSubmitDisabled = false;
      } else {
        this.isSubmitDisabled = true;
      }
    },

    async onSubmitPassword() {
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
