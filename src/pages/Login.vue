<template>
  <q-page class="column poppinsFont page-content">
    <div class="col row login-main">
      <div
        class="col-lg-6 col-md-6 col-sm-12 col-xs-12 bgNewPrimary login-mobile-banner"
      >
        <div class="">
          <a @click="goHome" style="cursor: pointer">
            <q-img
              spinner-color="primary"
              src="~assets/Logo.svg"
              class="web-menu-claim-guru-logo"
            ></q-img>
          </a>
        </div>
        <div class="text-h5 text-center fontWeight600 content-center">
          <div class="claimguru-tagline login-section login-main-title">
            The First and Only Catastrophe-Proof Claim Management System For
            Public Adjusters
          </div>
        </div>
        <div class="desktop-footer">
          <q-img
            spinner-color="primary"
            spinner-size="82px"
            src="~assets/login_banner.svg"
            style="width: 75%"
          />
        </div>
        <div
          class="claimguru-copy desktop-footer fontWeight400 footer-fix"
          style=""
        >
          <span class=""> © ClaimGuru {{ new Date().getFullYear() }}</span>
        </div>
      </div>
      <div
        class="col-lg-6 col-md-6 col-sm-12 col-xs-12 loginform-mobile-banner"
      >
        <!-- login form -->
        <div class="content-center login-section">
          <div class="login-up">
            <div class="">
              <div class="text-h4 fontWeight600 login-head">Login</div>
              <q-form class="" @submit="onUserLogin" ref="orgInfo">
                <label class="text-subtitle1 fontWeight600 input-label"
                  >Email</label
                >
                <q-input
                  v-model="login.email"
                  name="email"
                  color="primary"
                  placeholder="Enter Registered Email Address"
                  @blur="removeWhiteSpace($event, 'email')"
                  outlined
                  class="required input-class"
                  lazy-rules
                  :rules="[
                    val => !!val || 'Please fill your email address',
                    val =>
                      validateEmail(val) ||
                      'You have entered an invalid email address'
                  ]"
                />
                <span class="text-red text-caption">{{ errorMSG }}</span>
                <br v-if="errorMSG" />
                <label class="text-subtitle1 fontWeight600 input-label"
                  >Password</label
                >
                <q-input
                  color="primary"
                  class="required full-width input-class"
                  placeholder="Enter Your Password"
                  @blur="removeWhiteSpace($event, 'password')"
                  v-model="login.password"
                  outlined
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[
                    val => (val && val.length > 0) || 'Please fill password',
                    val =>
                      (val && val.length > 7) ||
                      'Minimum password length is 8 character'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <div class="row justify-center">
                  <q-btn
                    label="Login"
                    no-caps
                    type="submit"
                    color="deep-orange"
                    size="16px"
                    class="full-width fontWeight600 btn-submit"
                    style="line-height: 24px"
                  />
                </div>
                <div class="row justify-center">
                  <div
                    class="col-lg-12 col-md-12 col-sm-12 text-center signup-text lineHeight24"
                  >
                    <label class="text-subtitle1 lineHeight24"
                      >Don’t have an account?
                    </label>
                    <a href="/signup" class="text-subtitle1 fontWeight500"
                      >Sign Up</a
                    >
                  </div>
                </div>
              </q-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-footer">
      <q-separator />
      <div
        class="fontWeight400"
        style="height: 60px; padding-top: 20px; margin: 0px 32px"
      >
        <span class="" style="color: #667085">
          © ClaimGuru {{ new Date().getFullYear() }}</span
        >
      </div>
    </div>
  </q-page>
</template>
<script>
const stripe = Stripe(`${process.env.STRIPE_API_KEY}`);
const home_page = process.env.HOME_PAGE_URL;
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { constants } from '@utils/constant';
import {
  Capacitor,
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/core';
import { validateEmail, validateNames } from '@utils/validation';
import { isMobile } from '@utils/common';
import { Screen } from 'quasar';
import { notification } from 'src/store/common/getters';
import { appVersion } from '../Version';
import { getToken, getCurrentUser } from '@utils/auth';
const isPushNotificationsAvailable =
  Capacitor.isPluginAvailable('PushNotifications');
const { PushNotifications } = Plugins;

export default {
  meta() {
    return {
      title: this.metaTitle
    };
  },
  data() {
    return {
      version: appVersion,
      metaTitle: 'Login - claimguru',
      isPasswordVisible: false,
      login: {
        email: '',
        password: ''
      },
      isPwd: true,
      errorMSG: '',
      data: {
        type: constants.ORGANIZATION,
        company: {
          name: '',
          plan: {}
        },
        user: {
          email: '',
          password: '',
          contact: {
            fname: '',
            lname: ''
          }
        },
        stripeToken: '',
        isTermsAccepted: false
      },
      terms: false,
      displayErrors: '',
      div1: false,
      div2: false,
      div3: false,
      showSeeAllPackages: true
    };
  },
  methods: {
    ...mapActions(['userLogin', 'getUserInfo', 'sendPushNotificationToken']),
    ...mapMutations(['setSelectedClaimId', 'setNotificationRouteTo']),
    removeWhiteSpace(event, elementName) {
      const value = event.target.value;
      let result = '';
      if (String(value).length >= 0) {
        let wsRegex = /^\s+|\s+$/g;
        result = value.replace(wsRegex, '');
        if (elementName == 'email') {
          this.login.email = result;
        } else if (elementName == 'password') {
          this.login.password = result;
        }
      } else {
        if (elementName == 'email') {
          this.login.email = event.target.value;
        } else if (elementName == 'password') {
          this.login.password = event.target.value;
        }
      }

      this.$forceUpdate();
    },
    goHome() {
      window.location.href = home_page;
    },
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
          this.$router.push('/admin');
        }
      }
    },
    onClickSignupButton() {
      this.$router.push('/signup');
    },
    getImage(icon) {
      return require('../assets/' + icon);
    },
    validateEmail,

    createToken() {
      // Gather additional customer data we may have collected in our form.
      var additionalData = { name: this.cardName };
      // Important: Although we're submitting several fields, use cardNumber here instead of 'elements'.
      return stripe.createToken(this.cardNumber, additionalData);
    }
  },

  computed: {
    ...mapGetters([])
  },

  async created() {
    if (getToken() && getCurrentUser()) {
      if (isMobile()) {
        this.$router.push('/dashboard');
      } else {
        this.$router.push('/admin');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.poppinsFont {
  font-family: poppins;
}
.fontWeight600 {
  font-weight: 600;
}
.fontWeight500 {
  font-weight: 500;
}
.fontWeight400 {
  font-weight: 400;
}
.signup-text {
  font-size: 16px !important;
  margin-top: 40px;

  @media only screen and (min-height: 500px) and (max-height: 800px) {
    margin-bottom: 20px;
    margin-top: 20px;
  }
}
.login-section {
  @media only screen and (min-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 680px;
    margin-left: auto;
    margin-right: auto;
  }
  @media only screen and (max-width: 601px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
    margin-right: 15px;
  }
}
.input-label {
  @media only screen and (max-width: 1023px) {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin-top: 16px;
  }
  @media only screen and (min-width: 1024px) {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin-top: 24px;
  }
}
.claimguru-tagline {
  @media only screen and (max-width: 1023px) {
    font-size: 28px;
    color: #101828;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    margin-top: 28px;
  }
  @media only screen and (min-width: 1024px) {
    color: #101828;
    font-weight: 600;
    font-size: 28px;
    line-height: 36px;
    margin: 101px 59px 10px 31px;
  }
}
.login-head {
  @media only screen and (max-width: 1023px) {
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    padding-bottom: 20px;
    padding-top: 40px;
  }
  @media only screen and (min-width: 1024px) {
    font-weight: 600;
    font-size: 32px;
    line-height: 36px;
    padding-bottom: 30px;
  }
}
.btn-submit {
  @media only screen and (max-width: 1023px) {
    border-radius: 5px;
    height: 40px;
    margin-top: 6px;
  }
  @media only screen and (min-width: 1024px) {
    border-radius: 10px;
    height: 50px;
    margin-top: 8px;
  }
}
.web-menu-claim-guru-logo {
  width: 151px;
  height: 51px;
  @media only screen and (max-width: 1023px) {
    margin-left: 15px;
    margin-top: 9.5px;
  }
  @media only screen and (min-width: 1024px) {
    margin-left: 32px;
    margin-top: 16px;
  }
}
.claimguru-copy {
  @media only screen and (max-height: 1023px) {
    font-size: 14px;
    line-height: 20px;
    margin: 62px 0px 38px 32px;
    // position: static;
    // bottom: 0px;
  }
  @media only screen and (min-height: 1024px) {
    font-size: 14px;
    line-height: 20px;
    margin: 62px 0px 38px 32px;
    // position: absolute;
    // bottom: 0px;
  }
}
.mobile-footer {
  @media only screen and (max-width: 1023px) {
    display: block;
  }
  @media only screen and (min-width: 1024px) {
    display: none;
  }
}
.desktop-footer {
  @media only screen and (max-width: 1023px) {
    display: none;
  }
  @media only screen and (min-width: 1024px) {
    display: block;
  }
}
// .login {
//   @media only screen and (max-width: 400px) {
//     padding-left: 10px;
//     padding-right: 10px;
//     margin-left: 15px;
//     margin-right: 15px;
//   }

//   @media only screen and (min-width: 1024px) {
//     padding-left: 48px;
//     padding-right: 48px;
//   }
// }

.test {
  @media only screen and (max-width: 1500px) {
    padding-left: 48px;
    padding-right: 48px;
  }
  @media only screen and (min-width: 1500px) {
    padding-left: 80px;
    padding-right: 80px;
  }
}
.my-card {
  border-radius: 10px;
  @media only screen and (max-width: $breakpoint-md-max) {
    max-width: 450px;
    box-sizing: border-box;
    max-height: 530px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-width: 350px;
    box-sizing: border-box;
    max-height: 530px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 300px;
    box-sizing: border-box;
    max-height: 530px;
  }
}
.card-highlighter {
  border-radius: 10px;
  border: 1px solid #ef5926 !important;
}
.cardItems {
  width: 30%;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 60%;
  }
}
.card-border {
  border-radius: 10px;
  border: 1px solid #b9bcc6;
}

#card-errors {
  color: red;
  margin-top: 10px;
  max-width: 431px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-width: 900px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 431px;
  }
}

::v-deep {
  .input-placeholder {
    .q-placeholder {
      color: grey !important;
    }
  }
  .input-text-style {
    .q-field__native {
      color: #525151 !important;
    }
  }
  .cardInfo {
    padding: 12.5px 14px;
    border: 1px solid;
    border-radius: 8px;
    height: 50px;
    .q-field__native {
      font-weight: 500 !important;
      font-size: 16px !important;
      line-height: 24px !important;
    }
    .q-field__control,
    .q-field__marginal {
      height: 26px;
    }
    .q-field--auto-height,
    .q-field__native {
      min-height: 0px;
    }
  }
}
</style>
<style lang="scss" scoped>
.q-checkbox__bg {
  border-radius: 6px !important;
}
.q-field--error .q-field__bottom {
  color: #c10015 !important;
  font-weight: 500 !important;
  font-size: 12px !important;
  line-height: 12px !important;
}
.q-checkbox__inner {
  font-size: 40px;
  width: 1em;
  min-width: 1em;
  height: 1em;
  outline: 0;
  border-radius: 50%;
  color: #0c0c0c !important;
}
.q-btn__wrapper:before {
  box-shadow: none;
}
.q-field__messages {
  line-height: 12px !important;
}
.q-field--outlined .q-field__control {
  border-radius: 8px;
  padding: 0 12px;
  height: 44px;
}
.q-field__marginal {
  height: 44px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 24px;
}

.q-field {
  // @media only screen and (min-width: 365px) and (max-width: 379px) {
  //   width: 347px;
  // }
  @media only screen and (min-width: 380px) and (max-width: 1023px) {
    max-width: 357px;
  }
  @media only screen and (min-width: 1024px) {
    width: 431px;
  }
}

.login-main-title,
.login-head {
  letter-spacing: 0.75px;
}

.input-label,
.login-section .signup-text label,
.login-section .signup-text a,
.login-section .btn-submit,
.desktop-footer span {
  letter-spacing: 0.15px;
}

.q-page-container {
  margin: 0 auto;
  max-width: 120rem;
}

.page-content {
  max-width: 1920px;
  margin: 0 auto;
}

.login-section {
  margin: 0 auto !important;
  max-width: 630px !important;
}

.login-up .q-field--with-bottom {
  padding-bottom: 24px !important;
}

.loginform-mobile-banner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-main-title {
  padding: 100px 15px 84px 15px;
}

.btn-submit {
  background-color: #ef5926 !important;
}

.signup-text a {
  color: #ef5926 !important;
  margin-left: 10px;
}

@media (min-width: 1200px) {
  .loginform-mobile-banner {
    max-height: 950px;
  }
}

@media (min-width: 1024px) and (max-width: 1199px) {
  .loginform-mobile-banner {
    max-height: 950px;
  }
}

@media (max-width: 1023px) {
  .login-mobile-banner {
    height: 400px;
  }

  .loginform-mobile-banner {
    padding: 0 0 40px 0;
  }

  .login-main.col {
    display: block;
  }
}

@media (max-width: 767px) {
  .web-menu-claim-guru-logo {
    margin-top: 15px !important;
  }
  .login-mobile-banner {
    height: 278px;
  }
  .login-main-title {
    padding: 40px 0 40px 0;
    font-size: 24px;
    line-height: 36px;
    max-width: 75% !important;
  }

  .loginform-mobile-banner {
    display: block;
    padding: 50px 0 50px 0;
  }

  .loginform-mobile-banner .login-up .login-head {
    padding-top: 0;
  }

  .btn-submit {
    margin-top: 0;
  }

  .login-up .q-field--with-bottom {
    padding-bottom: 16px !important;
  }

  .signup-text {
    margin-top: 20px;
    margin-left: 0;
  }
  .login-section .btn-submit {
    margin-top: 10px;
  }
}

@media (max-width: 600px) {
  .login-main-title {
    padding: 27px 15px 40px 15px;
    line-height: 28px;
    max-width: 420px !important;
    height: 210px;
  }

  .loginform-mobile-banner {
    padding: 40px 15px 50px 15px;
  }
}

// @media (max-width: 400px) {
//     .loginform-mobile-banner{
//       .q-field{
//         width: 100% !important;
//       }
//       .login-up{
//         width: 100% !important;
//       }
//     }
//   }
</style>
