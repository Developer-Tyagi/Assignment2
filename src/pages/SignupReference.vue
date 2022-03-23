<template>
  <q-page class="column poppinsFont">
    <div class="col row">
      <div class="col-md-6 col-sm-12 col-xs-12 bgNewPrimary">
        <div class="q-pl-lg q-py-md">
          <q-img
            class="web-menu-claim-guru-logo"
            :src="getImage('Logo.svg')"
            width="20%"
          />
        </div>
        <div class="q-mt-md text-h5 text-center q-px-lg fontWeight600">
          <div
            class="q-px-lg"
            style="
              font-size: 28px;
              color: #101828;
              line-height: 36px;
              font-size: 28px;
            "
          >
            The First and Only Catastrophe-Proof Claim Management System For
            Public Adjusters
          </div>
        </div>
        <div class="q-pt-lg">
          <div class="text-h6 fontWeight600 q-px-xl q-py-md">
            <span
              v-if="
                isPackageSelected.id1 === '' && isPackageSelected.id2 === ''
              "
              >Pick Your Package</span
            >
            <span v-if="isPackageSelected.id1 === true"
              >Firm Package Selected</span
            >
            <span v-if="isPackageSelected.id2 === true"
              >Individual Package Selected</span
            >
          </div>
        </div>
        <div class="col row test q-px-xl">
          <!-- card 1 -->
          <div
            class="col-md-5 col-sm-12 col-xs-12 card-border q-mb-md col bg-white card-container"
            @click="onPackageSelection('Firm')"
            :class="{ 'card-highlighter': isPackageSelected.id1 }"
          >
            <div
              v-if="isPackageSelected.id1"
              class="text-center fontWeight500 text-subtitle1"
              style="
                border-bottom: 1px solid #ef5926 !important;
                color: #ef5926;
                border-radius: 10px 10px 0 0;
                background-color: #f9dfc8;
              "
            >
              Selected Package
            </div>
            <div
              v-else
              class="text-center fontWeight500 text-subtitle1 q-pt-lg"
              style="color: #ef5926; border-radius: 10px 10px 0 0"
            ></div>
            <div class="q-px-lg">
              <div class="row justify-center q-pt-md">
                <q-img :src="getImage('Featured icon (1).svg')" width="20%" />
              </div>
              <div class="text-h6 fontWeight500 text-center">Firm Package</div>
              <div class="text-h6 fontWeight500 text-center">
                $250
                <span class="text-grey fontWeight400 text-subtitle2"
                  >/ month</span
                >
              </div>
              <div
                class="text-subtitle1 text-center fontWeight600 q-my-sm"
                style="color: #ef5926"
              >
                Start your 30 Day Free Trial
              </div>
              <div
                class="q-ml-md row text-subtitle1 fontWeight400 col-md-4 col-xs-12 col-sm-12"
                v-for="firmPackage in firmPackages"
                :key="firmPackage"
              >
                <q-img
                  class="q-mt-xs check-img"
                  :src="getImage('check.svg')"
                  width="8%"
                  height="8%"
                />
                <span class="q-ml-sm"> {{ firmPackage }} </span>
              </div>

              <div class="q-pt-md text-blue-grey fontWeight400 text-subtitle1">
                Additional licenses at $50/mo
              </div>

              <div
                class="q-mt-lg q-mb-sm fontWeight400 text-blue-grey text-caption"
              >
                *Vendor roles are limited
              </div>
            </div>
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12"></div>
          <!-- card 2 -->
          <div
            class="col-md-5 col-sm-12 col-xs-12 card-border q-mb-md bg-white card-container"
            @click="onPackageSelection('Individual')"
            :class="{ 'card-highlighter': isPackageSelected.id2 }"
          >
            <div
              v-if="isPackageSelected.id2"
              class="text-center fontWeight500 text-subtitle1"
              style="
                border-bottom: 1px solid #ef5926 !important;
                color: #ef5926;
                border-radius: 10px 10px 0 0;
                background-color: #f9dfc8;
              "
            >
              Selected Package
            </div>
            <div
              v-else
              class="text-center fontWeight600 text-subtitle1 q-pt-lg"
              style="color: #ef5926; border-radius: 10px 10px 0 0"
            ></div>
            <div class="q-px-lg q-pb-lg">
              <div class="row justify-center q-pt-md">
                <q-img :src="getImage('Featured icon (2).svg')" width="20%" />
              </div>
              <div class="text-h6 fontWeight500 text-center">
                Individual Package
              </div>
              <div class="text-h6 fontWeight500 text-center">
                $125
                <span class="text-grey fontWeight400 text-subtitle2"
                  >/ month</span
                >
              </div>
              <div
                class="text-subtitle1 text-center fontWeight600 q-my-sm"
                style="font-family: Poppins; color: #ef5926"
              >
                Start your 30 Day Free Trial
              </div>
              <div
                class="q-ml-md row text-subtitle1 fontWeight400"
                v-for="individualPackage in individualPackages"
                :key="individualPackage"
              >
                <q-img
                  class="q-mt-xs check-img"
                  :src="getImage('check.svg')"
                  width="8%"
                  height="40%"
                />
                <span class="q-ml-sm"> {{ individualPackage }} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="test q-px-xl desktop-footer">
          <div class="card-border bg-white card-container-enterprice">
            <div class="row q-px-xl q-pt-md">
              <div class="col-md-9 col-sm-12 text-h6 text-left row">
                <div class="col-md-1 col-sm-12">
                  <q-img :src="getImage('enterprice.svg')" width="130%" />
                </div>
                <div
                  class="col-md-11 col-sm-12 fontWeight500 text-left q-pl-md q-pt-sm"
                >
                  Enterprise Package
                </div>
              </div>
              <div
                class="col text-subtitle1 fontWeight500 col-md-3 col-sm-12 q-pt-sm"
              >
                <a
                  class="text-deep-orange desktop-footer float-right"
                  href="mailto:subscription@claimguru.com"
                  target="_blank"
                  >Contact Us</a
                >
              </div>
            </div>
            <div class="col-auto row q-px-xl q-my-lg">
              <div class="col-1 text-center">
                <q-img
                  class="q-mt-xs check-img"
                  :src="getImage('check.svg')"
                  width="40%"
                />
              </div>
              <div class="col">
                <span class="q-ml-xs text-subtitle1 fontWeight400"
                  >Custom setup for large firms with more than 8 paid roles
                  custom pricing
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col row test q-px-xl">
          <div
            class="col-md-5 col-sm-12 col-xs-12 card-border q-mb-md col bg-white card-container mobile-footer"
          >
            <div class="q-px-lg">
              <div class="row justify-center q-pt-md">
                <q-img :src="getImage('enterprice.svg')" width="20%" />
              </div>
              <div class="text-h6 fontWeight500 text-center">
                Enterprise Package
              </div>
              <a
                class="mobile-footer text-subtitle1 text-center fontWeight600 q-my-sm"
                style="
                  font-family: Poppins;
                  color: #ef5926;
                  text-decoration: none;
                "
                href="mailto:subscription@claimguru.com"
                target="_blank"
              >
                Contact Us
              </a>
              <div
                class="q-ml-md row text-subtitle1 fontWeight400 col-md-4 col-xs-12 col-sm-12 q-pb-md"
              >
                <q-img
                  class="q-mt-xs check-img"
                  :src="getImage('check.svg')"
                  width="8%"
                  height="8%"
                />
                <span class="q-ml-sm">
                  Custom setup for large firms with more than 8 paid roles
                  custom pricing
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="q-mx-lg q-my-xl desktop-footer absolute-bottom">
          <span class=""> © ClaimGuru {{ new Date().getFullYear() }}</span>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <!-- signup form -->
        <div
          v-if="continueClick === false"
          class="q-pt-xl q-px-lg content-center bg-white"
        >
          <div class="q-pt-xl">
            <div class="col signup">
              <q-linear-progress
                size="5px"
                :value="progress"
                style="border-radius: 10px"
              />
              <div class="q-mt-sm text-subtitle1 fontWeight600 text-grey">
                Step 1. Create Account
              </div>

              <div class="q-mt-lg text-h4 fontWeight600">Subscribe Now</div>
              <q-form class="q-mt-lg" @submit="onContinue()" ref="orgInfo">
                <label class="text-subtitle1 fontWeight600">First Name</label>
                <q-input
                  name="firstName"
                  v-model="data.user.contact.fname"
                  color="primary"
                  placeholder="Enter Your First Name"
                  outlined
                  class="required"
                  lazy-rules
                  :rules="[
                    val => !!val || 'Please fill your first name',
                    val =>
                      validateNames(val) ||
                      'Only alphabets and $ . - characters allowed!'
                  ]"
                />

                <label class="text-subtitle1 fontWeight600">Last Name</label>
                <q-input
                  v-model="data.user.contact.lname"
                  name="lastName"
                  color="primary"
                  placeholder="Enter Your Last Name"
                  outlined
                  class="required"
                  lazy-rules
                  :rules="[
                    val => !!val || 'Please fill your last name',
                    val =>
                      validateNames(val) ||
                      'Only alphabets and $ . - characters allowed!'
                  ]"
                />

                <label class="text-subtitle1 fontWeight600"
                  >Email Address</label
                >
                <q-input
                  v-model="data.user.email"
                  name="email"
                  color="primary"
                  placeholder="Enter Email Address"
                  outlined
                  class="required"
                  lazy-rules
                  :rules="[
                    val => !!val || 'Please type something',
                    val =>
                      validateEmail(val) ||
                      'You have entered an invalid email address!',
                    val =>
                      checkEmailExist(val) ||
                      'This email is already in use. Please choose another'
                  ]"
                />
                <span class="text-red text-caption">{{ errorMSG }}</span>
                <br v-if="errorMSG" />
                <label class="text-subtitle1 fontWeight600">Password</label>
                <q-input
                  color="primary"
                  class="required full-width"
                  placeholder="Enter Your Password"
                  v-model="data.user.password"
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

                <label class="text-subtitle1 fontWeight600">Company Name</label>
                <q-input
                  v-model="data.company.name"
                  name="businessName"
                  color="primary"
                  placeholder="Enter Your Company Name"
                  outlined
                  class="required"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill your company name'
                  ]"
                />
                <div class="q-mt-sm row justify-start text-caption">
                  <q-checkbox v-model="terms" lazy />
                  <label class="q-mt-sm">I agree to ClaimGuru’s</label>
                  <a
                    class="q-mt-sm q-ml-sm text-deep-orange fontWeight600"
                    href=""
                    >Terms of Use</a
                  >
                  <label class="q-mt-sm q-ml-sm q-mr-sm"> and</label>
                  <a class="q-mt-sm text-deep-orange fontWeight600" href=""
                    >Privacy Policy</a
                  >
                  <label class="q-mt-sm q-ml-sm q-mr-sm">.</label>
                </div>

                <div class="row justify-center q-mt-lg">
                  <q-btn
                    label="Continue"
                    no-caps
                    type="submit"
                    color="deep-orange"
                    size="16px"
                    class="full-width fontWeight600"
                    :disable="!terms"
                  />
                </div>
                <div class="row justify-center q-my-md">
                  <div class="col-md-2"></div>
                  <div class="col-md-8 col-sm-12 q-ml-md">
                    <label class="text-subtitle1"
                      >Already have an account?
                    </label>
                    <a
                      href="/login"
                      class="text-deep-orange text-subtitle1 fontWeight600"
                      >Login</a
                    >
                  </div>
                  <div class="col-md-2"></div>
                </div>
              </q-form>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
        <div v-else class="q-pt-xl q-px-xl content-center bg-white">
          <div class="q-pt-xl signup">
            <div class="">
              <q-linear-progress
                size="5px"
                style="border-radius: 10px"
                :value="progress1"
              />
              <div class="q-mt-sm text-subtitle1 text-bold text-grey">
                Step 2. Payment
              </div>
              <q-form class="q-mt-xl" @submit="onPaymentClick()" ref="orgInfo">
                <div>{{ displayErrors }}</div>
                <div class="text-h4 text-weight-bolder">Pay with card for</div>
                <div
                  v-if="isPackageSelected.id1 === true"
                  class="text-h4 text-weight-bolder"
                >
                  Firm Package
                </div>
                <div v-else class="text-h4 text-weight-bolder">
                  Individual Package
                </div>
                <div class="q-mt-lg"></div>
                <div id="card-errors" class="q-my-lg"></div>
                <label class="text-subtitle1 text-weight-bold"
                  >Card Number</label
                >
                <div
                  id="card-number"
                  class="cardInfo f-w-500 text-body1 border-top-left-right q-mt-xs q-mb-lg"
                >
                  <!-- a Stripe Element will be inserted. -->
                </div>

                <label class="text-subtitle1 fontWeight600">Name on Card</label>
                <q-input
                  borderless
                  class="bg-white cardInfo text-body1 q-mt-xs q-mb-lg"
                  :class="
                    cardName == '' ? 'input-placeholder' : 'input-text-style'
                  "
                  ref="cardName"
                  name="name"
                  v-model="cardName"
                  maxlength="50"
                  id="card-name"
                  autocomplete="cc-name"
                  placeholder="Enter Name on Card"
                />

                <div class="row">
                  <div class="col q-pr-md">
                    <label class="text-subtitle1 fontWeight600"
                      >Expiry Date</label
                    >
                    <div
                      id="card-expiry"
                      class="cardInfo text-body1 border-bottom-right q-mt-xs"
                    >
                      <!-- a Stripe Element will be inserted. -->
                    </div>
                  </div>
                  <div class="col q-pl-xs">
                    <label class="text-subtitle1 fontWeight600">CVC</label>
                    <div
                      id="card-cvc"
                      class="cardInfo text-body1 border-bottom-right q-mt-xs"
                    >
                      <!-- a Stripe Element will be inserted. -->
                    </div>
                  </div>
                </div>

                <div class="q-mt-xl"></div>
                <div class="row">
                  <label class="column text-h5 fontWeight600"
                    >30 days Free</label
                  >
                </div>
                <div class="row q-mt-sm">
                  <div class="col-6">
                    <label class="text-h6 fontWeight600">After 30 days</label>
                  </div>
                  <div class="col-6 q-mt-xs text-right">
                    <div
                      v-if="isPackageSelected.id1 === true"
                      class="text-subtitle1 text-grey-white"
                    >
                      $250 / month *
                    </div>
                    <div v-else class="text-subtitle1 text-grey-white">
                      $125 / month *
                    </div>
                  </div>
                </div>
                <div class="q-mt-md"></div>
                <div class="row justify-center">
                  <q-btn
                    label="Subscribe"
                    no-caps
                    type="submit"
                    color="deep-orange"
                    size="16px"
                    class="full-width fontWeight600"
                  />
                </div>
                <div class="q-mt-md"></div>
                <div>
                  By clicking the ‘Subscribe’ button, you allow ClaimGuru to
                  charge your card for this payment, and you agree to
                  ClaimGuru’s
                  <a href="" class="text-deep-orange">Terms of Use</a> and
                  <a href="" class="text-deep-orange">Privacy Policy.</a>
                </div>
              </q-form>
              <div class="row justify-center q-my-md">
                <q-img :src="getImage('secure.svg')" width="20%" />
              </div>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-footer">
      <q-separator />
      <div class="" style="height: 60px; padding-top: 20px; margin: 0px 32px">
        <span class="" style="color: #667085">
          © ClaimGuru {{ new Date().getFullYear() }}</span
        >
      </div>
    </div>
  </q-page>
</template>
<script>
const stripe = Stripe(`${process.env.STRIPE_API_KEY}`);
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { constants } from '@utils/constant';
import { validateEmail, validateNames } from '@utils/validation';
import { isMobile } from '@utils/common';
import { getToken, getCurrentUser } from '@utils/auth';

export default {
  data() {
    return {
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
      firmPackages: [
        '3 Claims Manager',
        '1 Office Manager',
        '3 Office Staff',
        'Unlimited Vendors*'
      ],
      individualPackages: ['1 Claims Manager', '1 Office Manager'],
      progress: 0.5,
      progress1: 1,
      terms: false,
      continueClick: false,
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      isPackageSelected: {
        id1: '',
        id2: ''
      },
      displayErrors: '',
      div1: false,
      div2: false,
      div3: false,
      showSeeAllPackages: true
    };
  },
  methods: {
    ...mapActions([
      'getAllPlans',
      'createUserForOrganization',
      'checkExistingEmail'
    ]),

    isMobile,
    ...mapMutations(['setLoading', 'setNotifications']),
    getImage(icon) {
      return require('../assets/' + icon);
    },

    async checkEmailExist(val) {
      let res = await this.checkExistingEmail(val);
      if (res) {
        this.errorMSG = '';
      } else {
        this.errorMSG =
          'This email is already in use. Please choose another or login from your mobile';
      }
      return res;
    },
    validateEmail,
    validateNames,
    async onContinue() {
      if (
        !(
          this.isPackageSelected.id1 === true ||
          this.isPackageSelected.id2 === true
        )
      ) {
        this.$q.notify({
          message: 'Please select a package to continue',
          position: 'center'
        });
      } else {
        if (this.isPackageSelected.id1 === true) {
          this.div1 = true;
          this.div2 = false;
          this.div3 = false;
        }
        if (this.isPackageSelected.id2 === true) {
          this.div1 = false;
          this.div2 = true;
          this.div3 = false;
        }
        this.continueClick = true;
        this.data.isTermsAccepted = true;
        let interval = setTimeout(() => {
          this.setPaymentPage();
          clearTimeout(interval);
        }, 0);
      }
    },
    onPackageSelection(id) {
      if (id === 'Firm') {
        this.isPackageSelected.id1 = true;
        this.isPackageSelected.id2 = false;
        // if(this.continueClick == true){
        //   this.div1 = true;
        //   this.div2 = false;
        //   this.div3 = false;
        // }
        this.data.company.plan = {
          value: 'Firm Package',
          machineValue: 'firm_package',
          stripePriceID: 'price_1KRbkoEK8DUf1aFSK6zeWcfk',
          stripeProductID: 'prod_L7rTDXkekxbZsk',
          trialPeriodDays: 30
        };
      } else {
        // if(this.continueClick == true){
        //   this.div1 = false;
        //   this.div2 = true;
        //   this.div3 = false;
        // }
        this.isPackageSelected.id1 = false;
        this.isPackageSelected.id2 = true;
        this.data.company.plan = {
          value: 'Individual Package',
          machineValue: 'individual_package',
          stripePriceID: 'price_1KRblCEK8DUf1aFSJIkhcVoG',
          stripeProductID: 'prod_L7rU5fIcFUNOPr',
          trialPeriodDays: 30
        };
      }
    },
    setPaymentPage() {
      const elements = stripe.elements();
      const style = {
        base: {
          iconColor: '#0057d2',
          color: '#525151',
          fontWeight: 500,
          fontSize: '16px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          '::placeholder': {
            color: '#aaaaaa'
          }
        },
        complete: {
          color: '#525151'
        },
        invalid: {
          color: 'red',
          iconColor: 'red'
        }
      };
      this.cardNumber = elements.create('cardNumber', {
        style: style,
        showIcon: true
      });
      this.cardNumber.mount('#card-number');

      this.cardExpiry = elements.create('cardExpiry', {
        style: style
      });

      this.cardExpiry.mount('#card-expiry');

      this.cardCvc = elements.create('cardCvc', {
        style: style
      });
      this.cardCvc.mount('#card-cvc');

      const displayErrors = document.getElementById('card-errors', {
        style: style
      });

      this.contentClass = '';
    },
    onPaymentClick() {
      this.checkCardValidity();
    },
    async checkCardValidity() {
      this.setLoading(true);
      var token = '';
      var displayError;
      await this.createToken().then(function (result) {
        if (result.error) {
          displayError = document.getElementById('card-errors');
          if (result.error) {
            displayError.textContent = result.error.message;
          } else {
            displayError.textContent = '';
          }
        } else {
          // Send the token to your server
          token = result.token.id;
        }
      });
      // console.log('TEst', displayError);
      if (displayError !== undefined) {
        this.setLoading(false);
        return;
      }
      this.data.stripeToken = token;
      const res = await this.createUserForOrganization(this.data);
      if (res) {
        this.$router.push('/setup');
      }
      //this.setLoading(false);
    },
    createToken() {
      // Gather additional customer data we may have collected in our form.
      var additionalData = { name: this.cardName };
      // Important: Although we're submitting several fields, use cardNumber here instead of 'elements'.
      return stripe.createToken(this.cardNumber, additionalData);
    },
    showAllPlans() {
      this.div1 = true;
      this.div2 = true;
      this.div3 = true;
      this.showSeeAllPackages = false;
    },
    showSelectedPackage() {
      if (this.isPackageSelected.id1 == true) {
        this.div1 = true;
        this.div2 = false;
        this.div3 = false;
      } else {
        this.div1 = false;
        this.div2 = true;
        this.div3 = false;
      }
      this.showSeeAllPackages = true;
    }
  },

  computed: {
    ...mapGetters(['plans', 'contactTypes', 'planInfo'])
  },

  async created() {
    if (getToken() && getCurrentUser()) {
      if (isMobile()) {
        this.$router.push('/dashboard');
      } else {
        this.$router.push('/admin');
      }
    }
    await this.getAllPlans();
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
.check-img {
  @media only screen and (min-width: 450px) and (max-width: 700px) {
    width: 5% !important;
  }
  @media only screen and (min-width: 701px) and (max-width: 1023px) {
    width: 3% !important;
  }
}
// .test {
//   @media only screen and (max-width: 1500px) {
//     padding-left: 48px;
//     padding-right: 48px;
//   }
//   @media only screen and (min-width: 1500px) {
//     padding-left: 80px;
//     padding-right: 80px;
//   }
// }
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
.bgNewPrimary {
  @media only screen and (max-width: 1023px) {
    background: #ffff;
  }
}
.card-container {
  // // @media only screen and (min-width: 1024px) and (max-width: 2400px) {
  // //   width: 44%;
  // // }
  // // @media only screen and (min-width: 2401px) {
  // //   width: 46%;
  // // }
  // @media only screen and (min-width: 1024px) and (max-width: 1201px){
  //   width: 44%;
  // }
  // @media only screen and (min-width: 1202px) and (max-width: 1600px){
  //   width: 47%;
  // }
  // @media only screen and (min-width: 1601px) and (max-width: 1849px){
  //   width: 46%;
  // }
  // @media only screen and (min-width: 1850px) and (max-width: 2400px){
  //   width: 46%;
  // }
  //  @media only screen and (min-width: 2401px) {
  //   width: 47%;
  // }

  @media only screen and (max-width: 1023px) {
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
}
.card-container-enterprice {
  // @media only screen and (min-width: 1024px) and (max-width: 1201px){
  //   width: 95%;
  // }
  // @media only screen and (min-width: 1202px) and (max-width: 1600px){
  //   width: 94%;
  // }
  // @media only screen and (min-width: 1601px) and (max-width: 1849px){
  //   width: 93%;
  // }
  // @media only screen and (min-width: 1850px) and (max-width: 2400px){
  //   width: 92%;
  // }
  //  @media only screen and (min-width: 2401px) {
  //   width: 95%;
  // }
  width: 100%;
}
.signup {
  @media only screen and (min-width: 1024px) {
    margin-left: 48px;
    margin-right: 48px;
    padding-left: 48px;
    padding-right: 48px;
  }
  @media only screen and (max-width: 1023px) {
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
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
<style lang="scss">
.q-checkbox__bg {
  border-radius: 6px !important;
}
.q-field--error .q-field__bottom {
  color: #c10015 !important;
  font-weight: 500 !important;
  font-size: 12px !important;
  line-height: 12px !important;
}
</style>
