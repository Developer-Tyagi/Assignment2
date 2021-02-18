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
    ...mapActions(['verifyOobCode', 'setPassword']),

    checkConfirmPassword() {
      if (this.password.password === this.password.confirm) {
        this.isSubmitDisabled = false;
      } else {
        this.isSubmitDisabled = true;
      }
    },

    async onSubmitPassword() {
      const payload = {
        id: this.userId,
        password: { password: this.password.password }
      };
      const setPass = await this.setPassword(payload);
      if (sestPass) {
        const loginData = {
          data: {
            type: 'users',
            attributes: {
              email: this.userEmail,
              password: this.password.password
            }
          }
        };
        if (res) {
          const res = await this.userLogin(loginData);
          if (res) {
            this.getUserInfo();
          }
        }
      }
    }
  },

  created() {
    this.verifyOobCode(this.$route.query).then(response => {
      if (response && response.status === 200) {
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
