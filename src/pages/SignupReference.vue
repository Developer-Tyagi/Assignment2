<template>
  <q-page class="custom-font full-height">
    <div class="row" style="height: calc(100vh - 1px)">
      <div
        class="col-md-6 col-sm-12 col-xs-12"
        :style="$q.screen.gt.sm ? 'background: #f9e7d8' : 'background:#fff'"
      >
        <div class="row justify-start q-mt-sm">
          <div class="col-3 q-pa-md">
            <q-img
              class="web-menu-claim-guru-logo"
              :src="getImage('Logo.svg')"
            />
          </div>
        </div>
        <div class="column justify-center text-h5 text-weight-bolder">
          <div class="q-px-xl q-mx-xl" style="text-align: center ">
            The First and Only Catastrophe -Proof Claim management System for
            Public Adjusters
          </div>
        </div>
        <div class="row q-ml-xl q-mt-xl">
          <div class="text-h5 text-weight-bolder">
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
        <div class="row justify-between q-mt-md q-px-xl q-mx-xl">
          <div class="col-5">
            <q-card
              class="my-card col-md-4 col-sm-12 col-xs-12"
              @click="onPackageSelection('Firm')"
              :class="{ 'card-highlighter': isPackageSelected.id1 }"
            >
              <div
                class="fit row wrap justify-around items-start content-start"
              >
                <q-btn
                  round
                  dense
                  flat
                  color="primary"
                  icon="business"
                  size="22px"
                />
              </div>

              <div
                class="text-h6 text-weight-bolder"
                style="text-align: center"
              >
                Firm Package
              </div>
              <div
                class="text-h6 text-weight-bolder"
                style="text-align: center"
              >
                $200/month
              </div>
              <div
                class="text-subtitle1 text-weight-bolder q-mb-sm"
                style="text-align: center; color: #ef5926"
              >
                Start your 30 day free trial
              </div>

              <div
                class=" row text-subtitle1 q-pl-xl col-md-4 col-xs-12 col-sm-12"
                style="text-align: justify"
                v-for="firmPackage in firmPackages"
                :key="firmPackage"
              >
                <q-btn round dense flat color="primary" icon="check_circle" />
                {{ firmPackage }}
              </div>

              <div class="q-ml-lg q-mt-sm text-blue-grey text-subtitle1">
                Additional licenses at $50/month
              </div>

              <div class="q-ml-lg q-mb-lg text-blue-grey text-caption">
                * Vendor roles are limited
              </div>
            </q-card>
          </div>
          <div class="col-5">
            <q-card
              id="IndividualPackage"
              class="my-card col-md-4 col-sm-12 col-xs-12"
              @click="onPackageSelection('Individual')"
              :class="{ 'card-highlighter': isPackageSelected.id2 }"
            >
              <div
                class="fit row wrap justify-around items-start content-start"
              >
                <q-btn
                  round
                  dense
                  flat
                  icon="portrait"
                  color="primary"
                  size="22px"
                />
              </div>

              <div
                class="text-h6 text-weight-bolder"
                style="text-align: center"
              >
                Individual Package
              </div>
              <div
                class="text-h6 text-weight-bolder"
                style="text-align: center"
              >
                $99/month
              </div>

              <div
                class="text-subtitle1 text-weight-bold"
                style="text-align: center; color: #ef5926"
              >
                Start your 30 day free trial
              </div>

              <q-card-section style="min-height: 180px">
                <div
                  class="q-ml-lg text-subtitle1 col-md-4 col-xs-12 col-sm-12"
                  v-for="individualPackage in individualPackages"
                  :key="individualPackage"
                >
                  <q-btn round dense flat color="primary" icon="check_circle" />
                  {{ individualPackage }}
                </div>
              </q-card-section>

              <q-card-section></q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row q-pt-md q-mt-md q-px-xl q-mx-xl full-width">
          <div class="col-1"></div>
          <div class="col-10">
            <q-card style="border-radius: 20px" class="row">
              <q-card-section class="col-2">
                <q-btn
                  round
                  dense
                  flat
                  color="primary"
                  icon="business"
                  size="22px"
                />
              </q-card-section>
              <q-card-section class="text-h5 q-mt-md col-8 text-weight-bolder"
                >Enterprise Subscription</q-card-section
              >
              <q-card-section class="q-mt-md q-ml-auto text-subtitle1 col-2">
                <a class="text-deep-orange" href="">Contact us</a>
              </q-card-section>
              <q-card-section>
                <q-btn round dense flat color="primary" icon="check_circle" />
                Custom setup for large firms with more than 8 paid roles custom
                pricing
              </q-card-section>
            </q-card>
          </div>
          <div class="col-1"></div>
        </div>
      </div>

      <!-- signup form -->
      <div
        v-if="continueClick === false"
        class="col-md-6 col-sm-12 col-xs-12 bg-white q-pt-lg content-center bg-white"
      >
        <div class="column full-height q-px-xl q-pt-xl">
          <div class="col">
            <q-linear-progress size="10px" :value="progress" />
            <div class="q-mt-xs">Step 1. Create an account</div>
            <q-form class="q-mt-lg" @submit="onContinue()" ref="orgInfo">
              <div class="text-h4 text-weight-bolder">Subscribe Now</div>
              <div class="q-mt-md"></div>
              <label class="text-subtitle1 text-weight-bolder"
                >First Name</label
              >
              <q-input
                dense
                name="firstName"
                v-model="data.user.contact.fname"
                color="primary"
                placeholder="Enter your First Name"
                outlined
                class="required"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 0) || 'Please fill your first name'
                ]"
              />

              <label class="text-subtitle1 text-weight-bolder">Last Name</label>
              <q-input
                v-model="data.user.contact.lname"
                name="lastName"
                dense
                color="primary"
                placeholder="Enter your Last Name"
                outlined
                class="required"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill your last name'
                ]"
              />

              <label class="text-subtitle1 text-weight-bolder"
                >Email Address</label
              >
              <q-input
                v-model="data.user.email"
                name="email"
                dense
                color="primary"
                placeholder="Enter Email Address"
                outlined
                class="required"
                lazy-rules
                :rules="[
                  val => validateEmail(val) || 'Please fill your email',
                  val => checkEmailExist(val) || 'This email is already in use'
                ]"
              />
              <span class="text-red text-caption">{{ errorMSG }}</span>

              <label class="text-subtitle1 text-weight-bolder">Password</label>
              <q-input
                color="primary"
                dense
                class="required full-width"
                placeholder="Enter your Password"
                v-model="data.user.password"
                outlined
                :type="isPwd ? 'password' : 'text'"
                :rules="[
                  val => (val && val.length > 0) || 'Please fill password'
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

              <label class="text-subtitle1 text-weight-bolder"
                >Company Name</label
              >
              <q-input
                v-model="data.company.name"
                name="businessName"
                dense
                color="primary"
                placeholder="Enter your Company Name"
                outlined
                class="required"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 0) || 'Please fill your company name'
                ]"
              />
              <div class="q-mt-sm row justify-start">
                <q-checkbox v-model="terms" lazy />
                <label class="q-mt-sm">I agree to Claimguru's</label>
                <a class="q-mt-sm q-ml-sm text-deep-orange" href=""
                  >Terms of use</a
                >
                <label class="q-mt-sm q-ml-sm q-mr-sm"> and</label>
                <a class="q-mt-sm text-deep-orange" href="">Privacy Policy</a>
              </div>

              <div class="row justify-center q-mt-lg">
                <q-btn
                  label="Continue"
                  no-caps
                  type="submit"
                  color="deep-orange"
                  size="22px"
                  class="full-width"
                  :disable="!terms"
                />
              </div>
              <div class="row justify-center q-mt-md">
                <div class="col-2"></div>
                <div class="col-8 q-ml-md">
                  <label class="text-h6 q-ml-xl"
                    >Already have an account?</label
                  >
                  <a href="/login" class="q-ml-sm text-deep-orange text-h6"
                    >Login</a
                  >
                </div>
                <div class="col-2"></div>
              </div>
            </q-form>
          </div>
          <div class="col-2"></div>
        </div>
      </div>
      <div
        v-else
        class="col-md-6 col-sm-12 col-xs-12 bg-white q-pt-lg content-center bg-white"
      >
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8">
            <q-linear-progress size="10px" :value="progress1" />
            <div class="q-mt-xs">Step 2. Payment</div>
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
              <label class="text-subtitle1 text-weight-bold">Card Number</label>
              <div
                id="card-number"
                class="cardInfo f-w-500 text-body1 border-top-left-right q-mt-xs q-mb-lg"
              >
                <!-- a Stripe Element will be inserted. -->
              </div>

              <label class="text-subtitle1 text-weight-bold"
                >Name on Card</label
              >
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
                  <label class="text-subtitle1 text-weight-bold"
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
                  <label class="text-subtitle1 text-weight-bold">CVC</label>
                  <div
                    id="card-cvc"
                    class="cardInfo text-body1 border-bottom-right q-mt-xs"
                  >
                    <!-- a Stripe Element will be inserted. -->
                  </div>
                </div>
              </div>

              <div class="q-mt-md"></div>
              <div class="row">
                <label class="column text-h5 text-weight-bolder"
                  >30 days free</label
                >
              </div>
              <div class="row">
                <div class="col-6">
                  <label class="text-h6 text-weight-bold">After 30 days</label>
                </div>
                <div class="col-6">
                  <div
                    v-if="isPackageSelected.id1 === true"
                    class="text-subtitle1 text-grey-white"
                  >
                    $200/month *
                  </div>
                  <div v-else class="text-subtitle1 text-grey-white">
                    $99/month *
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
                  size="22px"
                  class="full-width"
                />
              </div>
              <div class="q-mt-md"></div>
              <div>
                By clicking the ‘Subscribe’ button, you allow ClaimGuru to
                charge your card for this payment, and you agree to ClaimGuru’s
                <a href="" class="text-deep-orange">Terms of Use</a> and
                <a href="" class="text-deep-orange">Privacy Policy.</a>
              </div>
            </q-form>
          </div>
          <div class="col-2"></div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
const stripe = Stripe(`${process.env.STRIPE_API_KEY}`);
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { constants } from '@utils/constant';
import { validateEmail } from '@utils/validation';

import { event } from 'quasar';

export default {
  data() {
    return {
      isPwd: true,
      errorMSG: '',
      data: {
        type: constants.ORGANIZATION,
        company: {
          name: '',
          plan: {
            value: 'Firm Package',
            machineValue: 'firm_package',
            stripePriceID: 'price_1KRblCEK8DUf1aFSJIkhcVoG',
            stripeProductID: 'prod_L7rU5fIcFUNOPr',
            trialPeriodDays: 5
          }
        },
        user: {
          email: '',
          password: '',
          contact: {
            fname: '',
            lname: ''
          }
        },
        stripeToken: ''
      },
      firmPackages: [
        '3 Claims Manager',
        '1 Office Manager',
        '3 Office Staff',
        'Unlimited Vendors *'
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
      displayErrors: ''
    };
  },
  methods: {
    ...mapActions([
      'getAllPlans',
      'createUserForOrganization',
      'checkExistingEmail'
    ]),
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

    // async onSubmit() {
    //   this.user.contact.email = this.user.email;
    //   if (this.user.heardCGFrom.length < 1) {
    //     this.user.heardCGFrom[0] = 'not-specified';
    //   }
    //   const res = await this.createUserForOrganization(this.user);
    //   if (res) {
    //     this.$router.push('/admin');
    //   }
    // },
    validateEmail,
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
        //const res = await this.createUserForOrganization(this.data);
        this.continueClick = true;
        let interval = setTimeout(() => {
          this.setPaymentPage();
          clearTimeout(interval);
        }, 0);
      }
    },
    onPackageSelection(id) {
      console.log(id);
      if (id === 'Firm') {
        this.isPackageSelected.id1 = true;
        this.isPackageSelected.id2 = false;
      } else {
        this.isPackageSelected.id1 = false;
        this.isPackageSelected.id2 = true;
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
      await this.createToken().then(function(result) {
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
    }
  },

  computed: {
    ...mapGetters(['plans', 'contactTypes', 'planInfo'])
  },

  async created() {
    await this.getAllPlans();
  }
};
</script>
<style lang="scss" scoped>
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
  border: 2px solid #ef5926;
}
.custom-font {
  font-family: Poppins;
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
    height: 44px;
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
