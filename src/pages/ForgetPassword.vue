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
      <q-form class="column" autocapitalize="off" ref="forgetPasswordForm">
        <q-card class="rounded row">
          <div class="q-ml-xs column justify-center" style="width: 20px">
            <q-icon name="person" color="primary" size="sm" />
          </div>
          <div class="q-pl-md col-10">
            <q-input
              dense
              class="q-py-xs login-input full-width"
              v-model="email"
              placeholder="Email"
              borderless
            />
          </div>
        </q-card>
      </q-form>
      <div>
        <q-btn
          :color="$q.screen.width < 624 ? 'secondary' : 'white'"
          :outline="$q.screen.width > 624 ? true : false"
          label="Reset Password"
          class="rounded full-width q-my-md"
          @click="onSubmitClick"
        ></q-btn>
      </div>
      <div class="row justify-center">
        <a
          href
          :class="$q.screen.width < 624 ? 'text-primary' : 'text-white'"
          style="text-decoration: none"
          >LOGIN</a
        >
      </div>
    </div>
  </q-page>
</template>
<script>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { successMessage } from '@utils/validation';
import { errorMessage } from '@utils/validation';
import { constants } from '@utils/constant';
import 'firebase/auth';
import firebase from 'firebase/app';
export default {
  name: 'ForgetPassword',
  data() {
    return { email: '', constants: constants };
  },
  methods: {
    successMessage,
    errorMessage,
    async onSubmitClick() {
      const success = await this.$refs.forgetPasswordForm.validate();

      if (success) {
        const auth = firebase.auth();
        auth
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.successMessage(constants.successMessages.FORGOT_PASSWORD);
          })
          .catch(error => {
            this.errorMessage(error.message);
          });
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

@media screen and (max-width: 624px) {
  .bg-login {
    background-color: #ededed;
    width: 100%;
  }

  .login-input {
    font-size: 14px;
    width: 80%;
  }
  .rounded {
    border-radius: 15px 15px 15px 15px;
  }
}
.rounded {
  border-radius: 15px 15px 15px 15px;
}
</style>
