<template>
  <q-page class="column poppinsFont">
    <div class="col row custom-cols">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 bgNewPrimary">
        <div class="q-pb-md">
          <q-img src="~assets/Logo.svg" class="web-menu-claim-guru-logo" />
        </div>
        <div
          class="mobile-view q-mt-md outer-padding"
          v-if="continueClick === false"
        >
          <q-linear-progress
            size="5px"
            :value="progress"
            style="border-radius: 10px"
          />
          <div class="q-mt-sm text-subtitle1 fontWeight600 text-grey">
            Step 1. Create Account
          </div>
        </div>
        <div class="mobile-view q-mt-md q-px-lg" v-if="continueClick === true">
          <q-linear-progress
            size="5px"
            style="border-radius: 10px"
            :value="progress1"
          />
          <div class="q-mt-sm text-subtitle1 text-bold text-grey">
            Step 2. Payment
          </div>
        </div>
        <div class="q-mt-md text-h5 text-center fontWeight600 outer-padding">
          <div
            class=""
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
          <div
            class="text-h6 fontWeight600 outer-padding q-py-md main-pack-heading package-section"
            style="justify-content: left !important"
          >
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
        <div class="col row test outer-padding package-section">
          <!-- card 1 -->
          <div
            class="col-md-5 col-sm-12 col-xs-12 card-border q-mb-md col bg-white card-container"
            @click="onPackageSelection('Firm')"
            :class="{
              'card-highlighter': isPackageSelected.id1,
              'card-disabled': !div1 && continueClick
            }"
          >
            <div
              v-if="isPackageSelected.id1"
              class="text-center fontWeight500 text-subtitle1"
              style="
                border-bottom: 1px solid #ef5926 !important;
                color: #ef5926;
                border-radius: 10px 10px 0 0;
                background-color: #f9dfc8;
                height: 32px !important; ;
              "
            >
              Selected Package
            </div>
            <div
              v-else
              class="text-center fontWeight500 text-subtitle1"
              style="
                color: #ef5926;
                border-radius: 10px 10px 0 0;
                height: 32px !important; ;
              "
            ></div>
            <div class="q-px-lg">
              <div class="row justify-center q-pt-md">
                <q-img
                  :src="getImage('Featured icon (1).svg')"
                  width="20%"
                  class="package-icon"
                />
              </div>
              <div class="text-h6 fontWeight500 text-center pack-heading">
                Firm Package
              </div>
              <div class="text-h6 fontWeight500 text-center">
                $250
                <span class="text-grey fontWeight400 text-subtitle2"
                  >/ month</span
                >
              </div>
              <div
                class="text-subtitle1 text-center fontWeight600 q-my-sm period-heading"
                style="color: #ef5926"
              >
                Start your {{ firmPackages.trialPeriodDays }} Day Free Trial
              </div>
              <div
                class="q-ml-md text-subtitle1 fontWeight400 col-md-4 col-xs-12 col-sm-12"
                v-for="key in firmPackages.plandata"
                :key="key"
              >
                <q-img
                  class="q-mt-xs check-img"
                  :src="getImage('check.svg')"
                  width="8%"
                  height="8%"
                />
                <span class="q-ml-sm">
                  {{ key.tempvalue }} {{ key.tempkey }}</span
                >
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
          <div class="col-md-2 col-sm-12 col-xs-12 middle-col"></div>
          <!-- card 2 -->
          <div
            class="col-md-5 col-sm-12 col-xs-12 card-border q-mb-md bg-white card-container"
            @click="onPackageSelection('Individual')"
            :class="{
              'card-highlighter': isPackageSelected.id2,
              'card-disabled': !div2 && continueClick
            }"
          >
            <div
              v-if="isPackageSelected.id2"
              class="text-center fontWeight500 text-subtitle1"
              style="
                border-bottom: 1px solid #ef5926 !important;
                color: #ef5926;
                border-radius: 10px 10px 0 0;
                background-color: #f9dfc8;
                height: 32px !important; ;
              "
            >
              Selected Package
            </div>
            <div
              v-else
              class="text-center fontWeight600 text-subtitle1"
              style="
                color: #ef5926;
                border-radius: 10px 10px 0 0;
                height: 32px !important; ;
              "
            ></div>
            <div class="q-px-lg q-pb-lg">
              <div class="row justify-center q-pt-md">
                <q-img
                  :src="getImage('Featured icon (2).svg')"
                  width="20%"
                  class="package-icon"
                />
              </div>
              <div class="text-h6 fontWeight500 text-center pack-heading">
                Individual Package
              </div>
              <div class="text-h6 fontWeight500 text-center">
                $125
                <span class="text-grey fontWeight400 text-subtitle2"
                  >/ month</span
                >
              </div>
              <div
                class="text-subtitle1 text-center fontWeight600 q-my-sm period-heading"
                style="font-family: Poppins; color: #ef5926"
              >
                Start your {{ individualPackages.trialPeriodDays }} Day Free
                Trial
              </div>
              <div
                class="q-ml-md text-subtitle1 fontWeight400"
                v-for="key in individualPackages.plandata"
                :key="key"
              >
                <q-img
                  class="q-mt-xs check-img"
                  :src="getImage('check.svg')"
                  width="8%"
                  height="40%"
                />
                <span class="q-ml-sm"
                  >{{ key.tempvalue }} {{ key.tempkey }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="test desktop-view outer-padding package-section">
          <div class="card-border bg-white card-container-enterprice">
            <div class="row q-px-xl q-pt-md">
              <div class="col-md-9 col-sm-12 text-h6 text-left row">
                <div class="col-md-1 col-sm-12">
                  <q-img
                    :src="getImage('enterprice.svg')"
                    width="130%"
                    class="enterprice-img"
                  />
                </div>
                <div
                  class="col-md-11 col-sm-12 fontWeight500 text-left q-pl-md q-pt-sm pack-heading"
                >
                  Enterprise Package
                </div>
              </div>
              <div
                class="col text-subtitle1 fontWeight500 col-md-3 col-sm-12 q-pt-sm"
              >
                <a
                  class="text-deep-orange float-right contact-us"
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
        <div
          class="col row test outer-padding package-section"
          :class="{ 'card-disabled': !div3 && continueClick }"
        >
          <div
            class="col-md-5 col-sm-12 col-xs-12 card-border q-mb-md col bg-white card-container mobile-view"
          >
            <div class="q-px-lg">
              <div class="row justify-center q-pt-md">
                <q-img
                  :src="getImage('enterprice.svg')"
                  width="20%"
                  class="package-icon"
                />
              </div>
              <div class="text-h6 fontWeight500 text-center pack-heading">
                Enterprise Package
              </div>
              <div
                class="text-subtitle1 text-center fontWeight600 q-my-sm period-heading"
              >
                <a
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
              </div>
              <div class="q-ml-md text-subtitle1 fontWeight400 q-pb-md">
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
        <div class="q-mx-lg q-my-xl desktop-view fontWeight400">
          <span class=""> © ClaimGuru {{ new Date().getFullYear() }}</span>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pb-lg">
        <!-- signup form -->
        <div
          v-if="continueClick === false"
          class="q-pt-xl content-center bg-white signup-main signup-section"
        >
          <div class="signup-sub">
            <div class="col signup">
              <div class="desktop-view">
                <q-linear-progress
                  size="5px"
                  :value="progress"
                  style="border-radius: 10px"
                />
                <div class="q-mt-sm text-subtitle1 fontWeight600 text-grey">
                  Step 1. Create Account
                </div>
              </div>

              <div class="text-h4 fontWeight600 signup-head">Subscribe Now</div>
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
                    val => !!val || 'Please fill your email address',
                    val =>
                      validateEmail(val) ||
                      'You have entered an invalid email address',
                    val =>
                      checkEmailExist(val) ||
                      'This email is already in use. Please choose another'
                  ]"
                />
                <span class="error-msg">{{ errorMSG }}</span>
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
                  <label class="q-mt-sm login-text" style="margin-top: 10px"
                    >I agree to ClaimGuru’s</label
                  >
                  <a
                    class="q-mt-sm q-ml-sm text-deep-orange fontWeight600"
                    href="/terms-conditions"
                    style="margin-top: 10px"
                    target="_blank"
                    >Terms of Use</a
                  >
                  <label
                    class="q-mt-sm q-ml-sm q-mr-sm"
                    style="margin-top: 10px"
                  >
                    and</label
                  >
                  <a
                    class="q-mt-sm text-deep-orange fontWeight600"
                    href="privacy-policy"
                    style="margin-top: 10px"
                    target="_blank"
                    >Privacy Policy</a
                  >
                  <label class="q-mt-sm q-mr-sm">.</label>
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
                    style="border-radius: 10px; height: 50px"
                  />
                </div>
                <div class="row justify-center q-my-md">
                  <div
                    class="col-lg-12 col-md-12 col-sm-12 col-xm-12 q-ml-md text-center"
                  >
                    <label class="text-subtitle1"
                      >Already have an account?
                    </label>
                    <a
                      href="/login"
                      class="text-deep-orange text-subtitle1 fontWeight600"
                      >Login</a
                    >
                  </div>
                </div>
              </q-form>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
        <div
          v-else
          class="q-pt-xl content-center bg-white signup-main payment-section"
        >
          <div class="q-pt-xl signup">
            <div class="">
              <div class="desktop-view">
                <q-linear-progress
                  size="5px"
                  style="border-radius: 10px"
                  :value="progress1"
                />
                <div class="q-mt-sm text-subtitle1 text-bold text-grey">
                  Step 2. Payment
                </div>
              </div>
              <div
                v-if="showSeeAllPackages"
                class="text-subtitle1 text-right fontWeight500 q-my-sm period-heading mobile-view"
                style="
                  font-family: Poppins;
                  color: #ef5926;
                  text-decoration: underline;
                  font-size: 16px;
                  line-height: 20px;
                "
                @click="showAllPlans"
              >
                See all package
              </div>
              <q-form class="q-mt-xl" @submit="onPaymentClick()" ref="orgInfo">
                <div>{{ displayErrors }}</div>
                <div class="main-pack-heading signup-head">
                  <div class="text-h4 text-weight-bolder">
                    Pay with card for
                  </div>
                  <div
                    v-if="isPackageSelected.id1 === true"
                    class="text-h4 text-weight-bolder"
                  >
                    Firm Package
                  </div>
                  <div v-else class="text-h4 text-weight-bolder">
                    Individual Package
                  </div>
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
                    >30 Days Free</label
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
                      $250/month*
                    </div>
                    <div v-else class="text-subtitle1 text-grey-white">
                      $125/month*
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
                    style="border-radius: 10px; height: 50px"
                  />
                </div>
                <div class="q-mt-md"></div>
                <div
                  class="fontWeight400"
                  style="font-size: 12px; line-height: 18px"
                >
                  By clicking the ‘Subscribe’ button, you allow ClaimGuru to
                  charge your card for this payment, and you agree to
                  ClaimGuru’s
                  <a
                    href="/terms-conditions"
                    class="text-deep-orange fontWeight600"
                    target="_blank"
                    >Terms of Use</a
                  >
                  and
                  <a
                    href="/privacy-policy"
                    class="text-deep-orange fontWeight600"
                    target="_blank"
                    >Privacy Policy.</a
                  >
                </div>
              </q-form>
              <div class="row justify-center q-my-md" style="margin-top: 30px">
                <q-img src="~assets/secure.svg" class="secure-logo" />
              </div>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-view">
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { constants } from '@utils/constant';
import { validateEmail, validateNames } from '@utils/validation';
import { isMobile } from '@utils/common';

export default {
  meta() {
    return {
      title: this.metaTitle
    };
  },
  data() {
    return {
      isPwd: true,
      errorMSG: '',
      metaTitle: 'Signup - claimguru',
      data: {
        type: constants.ORGANIZATION,
        company: {
          name: '',
          plan: {
            value: 'Firm Package',
            machineValue: 'firm_package',
            stripePriceID: 'price_1KRbkoEK8DUf1aFSK6zeWcfk',
            stripeProductID: 'prod_L7rTDXkekxbZsk',
            trialPeriodDays: 30
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
        stripeToken: '',
        isTermsAccepted: false
      },
      firmPackages: {
        packid: '',
        machineValue: '',
        metadata: [],
        plandata: [],
        packname: '',
        packplan: [],
        isRoleBased: '',
        trialPeriodDays: ''
      },
      individualPackages: {
        packid: '',
        machineValue: '',
        metadata: [],
        plandata: [],
        packname: '',
        packplan: [],
        isRoleBased: '',
        trialPeriodDays: ''
      },
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
      showSeeAllPackages: true,
      plans_fetched: []
    };
  },
  computed: {},

  mounted() {},
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
        this.errorMSG = 'This email is already in use. Please choose another';
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
          type: 'negative',
          message: 'Please select a package to continue',
          position: 'top'
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
        this.metaTitle = 'Payment - claimguru';
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
      //this.setLoading(true);
      var token = '';
      var displayError;
      if (this.cardName != '') {
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
          //this.setLoading(false);
          return;
        }
        if (token) {
          this.data.stripeToken = token;
          const res = await this.createUserForOrganization(this.data);
          if (res) {
            this.$router.push('/setup');
          }
        }
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Please Enter Name on Card',
          position: 'top'
        });
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
    ...mapGetters(['plans', 'contactTypes', 'planInfo', 'setPlans'])
  },

  async created() {
    // if (getToken() && getCurrentUser()) {
    //   if (isMobile()) {
    //     this.$router.push('/dashboard');
    //   } else {
    //     this.$router.push('/admin');
    //   }
    // }
    await this.getAllPlans();
    this.plans_fetched = this.plans;
    this.plans_fetched.forEach(element => {
      if (element.machineValue == 'firm_package') {
        this.firmPackages.packid = element.id;
        this.firmPackages.packname = element.name;
        this.firmPackages.machineValue = element.machineValue;
        this.firmPackages.metadata = element.metadata;
        Object.keys(this.firmPackages.metadata);
        for (
          let index = 0;
          index < Object.keys(this.firmPackages.metadata).length;
          index++
        ) {
          var tempkey = Object.keys(this.firmPackages.metadata)[index];
          var tempvalue = Object.values(this.firmPackages.metadata)[index];
          if (tempvalue == '-1') {
            tempvalue = 'Unlimited';
          }
          if (tempkey == 'isRoleBased') {
            this.firmPackages.isRoleBased = tempvalue;
          } else if (tempkey == 'trialPeriod') {
            this.firmPackages.trialPeriodDays = tempvalue;
          } else {
            var finalkey = tempkey.split('|');
            tempkey = finalkey[0];
            var temparray = { tempkey, tempvalue };
            this.firmPackages.plandata.push(temparray);
          }
        }
        this.firmPackages.packplan = element.plans;
      } else if (element.machineValue == 'individual_package') {
        this.individualPackages.packid = element.id;
        this.individualPackages.packname = element.name;
        this.individualPackages.machineValue = element.machineValue;
        this.individualPackages.metadata = element.metadata;
        Object.keys(this.individualPackages.metadata);
        for (
          let index = 0;
          index < Object.keys(this.individualPackages.metadata).length;
          index++
        ) {
          var tempkey = Object.keys(this.individualPackages.metadata)[index];
          var tempvalue = Object.values(this.individualPackages.metadata)[
            index
          ];
          if (tempvalue == '-1') {
            tempvalue = 'Unlimited';
          }
          if (tempkey == 'isRoleBased') {
            this.individualPackages.isRoleBased = tempvalue;
          } else if (tempkey == 'trialPeriod') {
            this.individualPackages.trialPeriodDays = tempvalue;
          } else {
            var finalkey = tempkey.split('|');
            tempkey = finalkey[0];
            var temparray = { tempkey, tempvalue };
            this.individualPackages.plandata.push(temparray);
          }
        }
        this.individualPackages.packplan = element.plans;
      }
    });
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
.text-grey-white {
  color: #667085;
  font-weight: 600;
  @media only screen and (max-width: 1023px) {
    font-size: 16px;
    line-height: 28px;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 18px;
    line-height: 28px;
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
.error-msg {
  position: absolute;
  color: #c10015 !important;
  font-weight: 500 !important;
  font-size: 12px !important;
  line-height: 12px !important;
  margin-left: 8px;
  margin-top: -12px;
}
.enterprice-img {
  @media only screen and (min-width: 1475px) {
    height: 44px !important;
    width: 44px !important;
  }
  @media only screen and (min-width: 1150px) and (max-width: 1250px) {
    margin-top: 8px;
  }
  @media only screen and (min-width: 1024px) and (max-width: 1150px) {
    margin-top: 10px;
  }
  @media only screen and (max-width: 1024px) {
    height: 36px !important;
    width: 36px !important;
  }
}
.package-icon {
  @media only screen and (max-width: 1023px) {
    height: 36px !important;
    width: 36px !important;
  }
  @media only screen and (min-width: 1024px) {
    height: 40px !important;
    width: 40px !important;
  }
}
.signup-section {
  @media only screen and (min-width: 700px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 680px;
    margin-left: auto;
    margin-right: auto;
  }
  @media only screen and (max-width: 700px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }
  @media only screen and (max-width: 500px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 480px;
    margin-left: 15px;
    margin-right: 15px;
  }
}
.payment-section {
  @media only screen and (min-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 680px;
    margin-left: auto;
    margin-right: auto;
  }
  @media only screen and (max-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }
  @media only screen and (max-width: 700px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }
  @media only screen and (max-width: 500px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 480px;
    margin-left: 15px;
    margin-right: 15px;
  }
}
.package-section {
  @media only screen and (max-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }
  @media only screen and (max-width: 700px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }
  @media only screen and (max-width: 500px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 480px;
    margin-left: 15px;
    margin-right: 15px;
  }
}
.signup-head {
  @media only screen and (max-width: 1023px) {
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    margin-top: 30px;
  }
  @media only screen and (min-width: 1024px) {
    font-weight: 600;
    font-size: 32px;
    line-height: 36px;
    margin-top: 70px;
  }
}
.outer-padding {
  @media only screen and (max-width: 1023px) {
    padding-left: 15px;
    padding-right: 15px;
  }
  @media only screen and (min-width: 1024px) {
    padding-left: 48px;
    padding-right: 48px;
  }
}
.secure-logo {
  @media only screen and (max-width: 1023px) {
    width: 83.72px;
    height: 32px;
  }
  @media only screen and (min-width: 1024px) {
    width: 112.5px;
    height: 43px;
  }
}
.check-img {
  // @media only screen and (min-width: 450px) and (max-width: 700px) {
  //   width: 5% !important;
  // }
  // @media only screen and (min-width: 701px) and (max-width: 1023px) {
  //   width: 3% !important;
  // }
  height: 20px !important;
  width: 20px !important;
}
.custom-cols {
  @media only screen and (min-width: 1024px) {
    .col-md-2 {
      width: 4.6667% !important;
    }
    .col-md-5 {
      width: 47.6667% !important;
    }
  }
}
.login-text {
  @media only screen and (max-width: 1023px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
  }
  @media only screen and (min-width: 1024px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
  }
}
.signup-main {
  @media only screen and (max-width: 1023px) {
    padding-top: 0px !important;
  }
}
.signup-sub {
  @media only screen and (max-width: 1023px) {
    padding-top: 0px !important;
  }
}

.mobile-view {
  @media only screen and (max-width: 1023px) {
    display: block;
  }
  @media only screen and (min-width: 1024px) {
    display: none;
  }
}
.desktop-view {
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
.card-disabled {
  @media only screen and (max-width: 1023px) {
    display: none;
  }
}
.contact-us {
  @media only screen and (min-width: 1024px) {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    text-decoration-line: underline;
  }
}
.pack-heading {
  @media only screen and (min-width: 1024px) {
    font-size: 22px;
    line-height: 32px;
    font-weight: 500;
  }
  @media only screen and (max-width: 1023px) {
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
  }
}
.period-heading {
  @media only screen and (min-width: 1024px) {
    font-size: 16px;
    line-height: 20px;
  }
  @media only screen and (max-width: 1023px) {
    font-size: 14px;
    line-height: 20px;
  }
}
.main-pack-heading {
  @media only screen and (min-width: 1024px) {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  }
  @media only screen and (max-width: 1023px) {
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
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
    padding-top: 0px;
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
}
.q-page-container {
  margin: 0 auto;
  max-width: 120rem;
}
</style>
