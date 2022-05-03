<template>
  <q-page class="column poppinsFont page-content">
    <div class="col row custom-cols">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 bgNewPrimary">
        <div class="q-pb-md">
          <a @click="goHome" style="cursor: pointer">
            <q-img
              src="~assets/Logo.svg"
              class="web-menu-claim-guru-logo"
            ></q-img>
          </a>
        </div>
        <div
          class="mobile-view outer-padding package-section"
          v-if="continueClick === false"
        >
          <q-linear-progress
            size="5px"
            :value="progress"
            style="border-radius: 5px; margin-top: 10px"
          />
          <div
            class="text-subtitle1 fontWeight600 step-text lineHeight24"
            style="color: #5b647a; margin-top: 10px"
          >
            Step 1. Create Account
          </div>
        </div>
        <div
          class="mobile-view q-mt-md payment-section"
          v-if="continueClick === true"
        >
          <q-linear-progress
            size="5px"
            style="border-radius: 5px; margin-top: 9.5px"
            :value="progress1"
          />
          <div
            class="q-mt-sm text-subtitle1 text-bold fontWeight600 step-text"
            style="color: #5b647a"
          >
            Step 2. Payment
          </div>
        </div>
        <div
          class="text-h5 text-center claimguru-tagline fontWeight600 package-section q-py-md"
        >
          The First and Only Catastrophe-Proof Claim Management System For
          Public Adjusters
        </div>
        <div class="">
          <div
            class="text-h6 fontWeight600 outer-padding main-pack-heading package-section signup-package-selected"
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
            class="col-md-5 col-sm-12 col-xs-12 card-border card-bottom col bg-white card-container"
            @click="onPackageSelection('Firm')"
            :class="{
              'card-highlighter': isPackageSelected.id1,
              'card-disabled': !div1 && continueClick
            }"
          >
            <div
              v-if="isPackageSelected.id1"
              class="text-center fontWeight500 text-subtitle1 text-primary bg-sidePanel"
              style="
                border-bottom: 1px solid #ef5926 !important;
                border-radius: 10px 10px 0 0;
                height: 32px !important;
                padding: 4px 0px;
                font-size: 16px;
                line-height: 24px;
                font-weight: 600;
              "
            >
              Selected Package
            </div>
            <div
              v-else
              class="text-center fontWeight500 text-subtitle1 text-primary"
              style="border-radius: 10px 10px 0 0; height: 32px !important"
            ></div>
            <div class="q-px-lg manage-mob-width">
              <div class="row justify-center q-pt-md">
                <q-img
                  :src="getImage('Featured icon (1).svg')"
                  width="20%"
                  class="package-icon"
                />
              </div>
              <div
                class="text-h6 fontWeight600 text-center pack-heading package-title"
              >
                Firm Package
              </div>
              <div class="text-h6 fontWeight600 text-center pack-heading">
                <span class="amt">$250</span>
                <span
                  class="text-grey fontWeight400 text-subtitle2"
                  style="
                    font-size: 14px;
                    font-weight: 400 !important;
                    line-height: 14px;
                    color: #667085 !important;
                    letter-spacing: 0.15px;
                  "
                  >/ month</span
                >
              </div>
              <div
                class="text-subtitle1 text-center period-heading text-primary"
                v-if="firmPackages.plandata.length > 0"
              >
                Start your {{ firmPackages.trialPeriodDays }} Day Free Trial
              </div>

              <div
                v-if="firmPackages.plandata.length == 0"
                class="firm-plan-details"
              >
                <q-card-actions align="center">
                  <q-skeleton type="text" width="100%" class="q-mb-sm" />
                  <q-skeleton type="text" width="80%" />
                  <q-skeleton type="text" width="80%" />
                  <q-skeleton type="text" width="80%" />
                  <q-skeleton type="text" width="80%" />
                </q-card-actions>
              </div>
              <div
                class="q-ml-md pack-data fontWeight400 col-md-4 col-xs-12 col-sm-12 pkg-details"
                v-for="key in firmPackages.plandata"
                :key="key.tempkey"
              >
                <q-img
                  class="check-img"
                  :src="getImage('check.svg')"
                  width="8%"
                  height="8%"
                />
                <span class="q-ml-sm">
                  {{ key.tempvalue }} {{ key.tempkey }}</span
                >
              </div>

              <div
                class="q-ml-md q-mb-md q-pt-md text-blue-grey fontWeight400 text-subtitle1 aditional-licence"
              >
                Additional licenses at $50/mo
              </div>

              <div
                class="q-ml-md q-mb-md fontWeight400 text-blue-grey text-caption vendor-terms"
              >
                *Vendor roles are limited
              </div>
            </div>
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12 middle-col"></div>
          <!-- card 2 -->
          <div
            class="col-md-5 col-sm-12 col-xs-12 card-border card-bottom bg-white card-container"
            @click="onPackageSelection('Individual')"
            :class="{
              'card-highlighter': isPackageSelected.id2,
              'card-disabled': !div2 && continueClick
            }"
          >
            <div
              v-if="isPackageSelected.id2"
              class="text-center fontWeight500 text-subtitle1 text-primary bg-sidePanel"
              style="
                border-bottom: 1px solid #ef5926 !important;
                border-radius: 10px 10px 0 0;
                height: 32px !important;
                padding: 4px 0px;
                font-size: 16px;
                line-height: 24px;
                font-weight: 600;
              "
            >
              Selected Package
            </div>
            <div
              v-else
              class="text-center fontWeight600 text-subtitle1 text-primary"
              style="border-radius: 10px 10px 0 0; height: 32px !important"
            ></div>
            <div class="q-px-lg q-pb-lg manage-package-mob-width">
              <div class="row justify-center q-pt-md">
                <q-img
                  :src="getImage('Featured icon (2).svg')"
                  width="20%"
                  class="package-icon"
                />
              </div>
              <div
                class="text-h6 fontWeight600 text-center pack-heading package-title"
              >
                Individual Package
              </div>
              <div class="text-h6 fontWeight600 text-center pack-heading">
                <span class="amt">$125</span>
                <span
                  class="text-grey fontWeight400 text-subtitle2"
                  style="
                    font-size: 14px;
                    font-weight: 400 !important;
                    line-height: 14px;
                    color: #667085 !important;
                    letter-spacing: 0.15px;
                  "
                  >/ month</span
                >
              </div>
              <div
                class="text-subtitle1 text-center fontWeight600 q-my-sm period-heading text-primary"
                style="font-family: Poppins"
                v-if="individualPackages.plandata.length > 0"
              >
                Start your {{ individualPackages.trialPeriodDays }} Day Free
                Trial
              </div>
              <div
                v-if="individualPackages.plandata.length == 0"
                class="firm-plan-details"
              >
                <q-card-actions align="center">
                  <q-skeleton type="text" width="100%" class="q-mb-sm" />
                  <q-skeleton type="text" width="80%" />
                  <q-skeleton type="text" width="80%" />
                </q-card-actions>
              </div>
              <div
                class="q-ml-md fontWeight400 pack-data pkg-details"
                v-for="key2 in individualPackages.plandata"
                :key="key2.tempkey2"
              >
                <q-img
                  class="check-img"
                  :src="getImage('check.svg')"
                  width="8%"
                  height="40%"
                />
                <span class="q-ml-sm"
                  >{{ key2.tempvalue2 }} {{ key2.tempkey2 }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="test desktop-view outer-padding package-section">
          <div class="card-border bg-white card-container-enterprice">
            <div class="row q-px-lg q-mx-md">
              <div class="col-md-9 col-sm-12 text-h6 text-left row">
                <div
                  class="col-md-12 col-sm-12 fontWeight500 text-left pack-heading enterprise-title"
                >
                  <q-img
                    :src="getImage('enterprice.svg')"
                    width="50px"
                    class="enterprice-img"
                  />

                  <span class="package-title">Enterprise Package</span>
                </div>
              </div>
              <div
                class="col text-subtitle1 fontWeight500 col-md-3 col-sm-12 q-pr-md"
              >
                <a
                  class="text-deep-orange float-right contact-us text-primary"
                  style="font-family: Poppins"
                  href="mailto:subscription@claimguru.com"
                  target="_blank"
                  >Contact Us</a
                >
              </div>
            </div>
            <div class="col-auto row q-px-md q-mt-md q-ml-md custom-setup">
              <div class="text-center">
                <q-img
                  class="q-mt-xs check-img"
                  :src="getImage('check.svg')"
                  width="40%"
                />
              </div>
              <div class="col custom-setup-text">
                <span class="text-subtitle1 fontWeight400 pack-data"
                  >Custom setup for large firms with more than 8 paid roles
                  custom pricing
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col row test outer-padding package-section enterprise-mob-package"
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
              <div
                class="text-h6 fontWeight500 text-center pack-heading enterprise-mob-title"
              >
                Enterprise Package
              </div>
              <div
                class="text-subtitle1 text-center fontWeight600 mob-contact-us text-primary"
              >
                <a
                  class="text-primary"
                  style="font-family: Poppins; text-decoration: none"
                  href="mailto:subscription@claimguru.com"
                  target="_blank"
                >
                  Contact Us
                </a>
              </div>
              <div
                class="text-subtitle1 fontWeight400 q-pb-md pack-data pkg-details"
              >
                <q-img
                  class="q-mt-xs check-img"
                  :src="getImage('check.svg')"
                  width="8%"
                  height="8%"
                />
                <span class="">
                  Custom setup for large firms with more than 8 paid roles
                  custom pricing
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="desktop-view claimguru-copy fontWeight400">
          <span class=""> © ClaimGuru {{ new Date().getFullYear() }}</span>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pb-lg">
        <!-- signup form -->
        <div
          v-if="continueClick === false"
          class="content-center bg-white signup-main signup-section"
        >
          <div class="signup-sub subscribe">
            <div class="col signup">
              <div class="desktop-view">
                <q-linear-progress
                  size="5px"
                  :value="progress"
                  style="border-radius: 5px; margin-top: 10px"
                />
                <div
                  class="q-mt-sm text-subtitle1 fontWeight600 lineHeight24"
                  style="color: #5b647a"
                >
                  Step 1. Create Account
                </div>
              </div>

              <div class="text-h4 fontWeight600 signup-head">Subscribe Now</div>
              <q-form class="q-mt-lg" @submit="onContinue()" ref="orgInfo">
                <label class="text-subtitle1 fontWeight600 input-label"
                  >First Name</label
                >
                <q-input
                  name="firstName"
                  v-model="data.user.contact.fname"
                  color="primary"
                  placeholder="Enter Your First Name"
                  outlined
                  class="required"
                  :maxlength="maxlengthConstants.firstName"
                  lazy-rules
                  :rules="[
                    val => !!val || 'Please fill your first name',
                    val =>
                      validateNames(val) ||
                      'Only alphabets and $ . - characters allowed!'
                  ]"
                />

                <label class="text-subtitle1 fontWeight600 input-label"
                  >Last Name</label
                >
                <q-input
                  v-model="data.user.contact.lname"
                  name="lastName"
                  color="primary"
                  placeholder="Enter Your Last Name"
                  outlined
                  class="required"
                  :maxlength="maxlengthConstants.lastName"
                  lazy-rules
                  :rules="[
                    val => !!val || 'Please fill your last name',
                    val =>
                      validateNames(val) ||
                      'Only alphabets and $ . - characters allowed!'
                  ]"
                />

                <label class="text-subtitle1 fontWeight600 input-label"
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
                  :rules="[val => validateEmailid(val)]"
                />
                <span class="error-msg">{{ errorMSG }}</span>

                <label class="text-subtitle1 fontWeight600 input-label"
                  >Password</label
                >
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

                <label class="text-subtitle1 fontWeight600 input-label"
                  >Company Name</label
                >
                <q-input
                  v-model="data.company.name"
                  name="businessName"
                  color="primary"
                  placeholder="Enter Your Company Name"
                  outlined
                  class="required"
                  :maxlength="maxlengthConstants.companyName"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill your company name'
                  ]"
                />
                <div class="row justify-start text-caption term-policy-text">
                  <q-checkbox v-model="terms" lazy />
                  <label class="q-mt-sm login-text" style="margin-top: 10px"
                    >I agree to ClaimGuru’s</label
                  >
                  <a
                    class="q-mt-sm q-ml-xs q-mr-xs text-deep-orange fontWeight400 term_of_use"
                    href="/terms-conditions"
                    style="margin-top: 10px"
                    target="_blank"
                    >Terms of Use</a
                  >
                  <label class="q-mt-sm" style="margin-top: 10px"> and</label>
                  <a
                    class="q-mt-sm q-ml-xs q-mr-xs text-deep-orange fontWeight400 term_of_use"
                    href="privacy-policy"
                    style="margin-top: 10px"
                    target="_blank"
                    >Privacy Policy.</a
                  >
                </div>

                <div class="row justify-center">
                  <q-btn
                    label="Continue"
                    no-caps
                    type="submit"
                    color="deep-orange"
                    size="16px"
                    class="full-width fontWeight600 btn-submit"
                    :disable="!terms"
                    style=""
                  />
                </div>
                <div class="row justify-center">
                  <div
                    class="col-lg-12 col-md-12 col-sm-12 col-xm-12 q-ml-md text-center signup-text"
                  >
                    <label>Already have an account?</label>
                    <a
                      href="/login"
                      class="text-primary text-subtitle1 fontWeight500 lineHeight24"
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
          <div class="signup-sub">
            <div class="signup">
              <div class="">
                <div class="desktop-view">
                  <q-linear-progress
                    size="5px"
                    style="border-radius: 5px"
                    :value="progress1"
                  />
                  <div
                    class="q-mt-sm text-subtitle1 text-bold 138,2: lineHeight24 {"
                    style="color: #5b647a; font-weight: 600"
                  >
                    Step 2. Payment
                  </div>
                </div>
                <div
                  v-if="showSeeAllPackages"
                  class="text-subtitle1 text-right fontWeight500 q-my-sm mobile-view text-primary see-all-package"
                  style="
                    font-family: Poppins;
                    text-decoration: underline;
                    font-size: 16px;
                    line-height: 20px;
                    cursor: pointer;
                  "
                  @click="showAllPlans"
                >
                  See all package
                </div>
                <q-form class="" @submit="onPaymentClick()" ref="orgInfo">
                  <div>{{ displayErrors }}</div>
                  <div class="payment-pack-heading fontWeight600 signup-head">
                    <div class="">Pay with card for</div>
                    <div v-if="isPackageSelected.id1 === true" class="">
                      Firm Package
                    </div>
                    <div v-else class="">Individual Package</div>
                  </div>
                  <div style="margin-top: 30px"></div>
                  <div id="card-errors" class="q-my-lg"></div>
                  <label class="text-subtitle1 text-weight-bold input-label"
                    >Card Number</label
                  >
                  <div
                    id="card-number"
                    class="cardInfo f-w-500 text-body1 border-top-left-right q-mt-xs q-mb-lg"
                  >
                    <!-- a Stripe Element will be inserted. -->
                  </div>

                  <label class="text-subtitle1 fontWeight600 input-label"
                    >Name on Card</label
                  >
                  <q-input
                    ref="cardName"
                    name="name"
                    v-model="cardName"
                    placeholder="Enter Name on Card"
                    outlined
                    class="required full-width"
                    lazy-rules
                    :rules="[
                      val =>
                        validateNames(val) ||
                        'Only alphabets and $ . - characters allowed!'
                    ]"
                  />
                  <!-- <q-input
                  borderless
                  class="bg-white cardInfo text-body1 q-mt-xs q-mb-lg required"
                  lazy-rules
                  ref="cardName"
                  name="name"
                  color="primary"
                  v-model="cardName"
                  maxlength="50"
                  id="card-name"
                  placeholder="Enter Name on Card"
                /> -->

                  <div class="row">
                    <div class="col q-pr-md">
                      <label class="text-subtitle1 fontWeight600 input-label"
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
                      <label class="text-subtitle1 fontWeight600 input-label"
                        >CVC</label
                      >
                      <div
                        id="card-cvc"
                        class="cardInfo text-body1 border-bottom-right q-mt-xs"
                      >
                        <!-- a Stripe Element will be inserted. -->
                      </div>
                    </div>
                  </div>

                  <div class="duration-text"></div>
                  <div class="row">
                    <label class="column text-h5 fontWeight600"
                      >30 Days Free</label
                    >
                  </div>
                  <div class="row q-mt-sm">
                    <div class="col-6">
                      <label
                        class="text-h6 fontWeight600 after_30_days lineHeight24"
                        >After 30 days</label
                      >
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
                      class="full-width fontWeight600 btn-submit"
                      style=""
                    />
                  </div>

                  <div
                    class="fontWeight400"
                    style="font-size: 12px; line-height: 18px; margin-top: 20px"
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
                <div
                  class="row justify-center q-my-md"
                  style="margin-top: 30px"
                >
                  <q-img src="~assets/secure.svg" class="secure-logo" />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
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
const home_page = process.env.HOME_PAGE_URL;
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
        id1: true,
        id2: ''
      },
      displayErrors: '',
      div1: false,
      div2: false,
      div3: false,
      showSeeAllPackages: true,
      plans_fetched: [],
      maxlengthConstants: constants.maxLength
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
    goHome() {
      window.location.href = home_page;
    },
    isMobile,
    ...mapMutations(['setLoading', 'setNotifications']),
    getImage(icon) {
      return require('../assets/' + icon);
    },

    async validateEmailid(val) {
      let email_exist = await this.checkExistingEmail(val);
      let email_valid = await this.validateEmail(val);
      let go_exist = false;
      let go_valid = false;
      let go_empty = false;

      if (email_exist) {
        go_exist = true;
      } else {
        go_exist = false;
        this.errorMSG = 'This email is already in use. Please choose another';
      }
      if (email_valid) {
        go_valid = true;
      } else {
        go_valid = false;
        this.errorMSG = 'You have entered an invalid email address';
      }
      if (val == '') {
        go_empty = false;
        this.errorMSG = 'Please fill your email address';
      } else {
        go_empty = true;
      }
      if (go_exist && go_valid && go_empty) {
        this.errorMSG = '';
        return true;
      } else {
        return false;
      }

      //return true
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
      // if (this.cardName != '') {
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
          this.$router.push('/onboarding');
        }
      }
      // } else {
      //   this.$q.notify({
      //     type: 'negative',
      //     message: 'Please Enter Name on Card',
      //     position: 'top'
      //   });
      // }

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
          let index2 = 0;
          index2 < Object.keys(this.individualPackages.metadata).length;
          index2++
        ) {
          var tempkey2 = Object.keys(this.individualPackages.metadata)[index2];
          var tempvalue2 = Object.values(this.individualPackages.metadata)[
            index2
          ];
          if (tempvalue2 == '-1') {
            tempvalue2 = 'Unlimited';
          }
          if (tempkey2 == 'isRoleBased') {
            this.individualPackages.isRoleBased = tempvalue2;
          } else if (tempkey2 == 'trialPeriod') {
            this.individualPackages.trialPeriodDays = tempvalue2;
          } else {
            var finalkey2 = tempkey2.split('|');
            tempkey2 = finalkey2[0];
            var temparray2 = { tempkey2, tempvalue2 };
            this.individualPackages.plandata.push(temparray2);
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
.btn-submit {
  @media only screen and (max-width: 1023px) {
    border-radius: 5px;
    height: 40px;
    background-color: $primary !important;
  }
  @media only screen and (min-width: 1024px) {
    border-radius: 10px;
    height: 50px;
    background-color: $primary !important;
  }
}
.claimguru-copy {
  @media only screen and (max-height: 1023px) {
    font-size: 14px;
    line-height: 20px;
    margin: 62px 0px 38px 32px;
    bottom: 0px;
    letter-spacing: 0.15px;
  }
  @media only screen and (min-height: 1024px) {
    font-size: 14px;
    line-height: 20px;
    margin: 62px 0px 38px 32px;
    bottom: 0px;
    letter-spacing: 0.15px;
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
.aditional-licence {
  font-size: 14px;
  line-height: 26px;
  margin-bottom: 30px;
  color: #667085 !important;
}

.pkg-details {
  padding: 0 0 0 20px;
  color: #000;
}
.card-bottom {
  @media only screen and (max-width: 1023px) {
    margin-bottom: 8px;
  }
  @media only screen and (min-width: 1024px) {
    margin-bottom: 24px;
  }
}
.vendor-terms {
  @media only screen and (max-width: 1023px) {
    font-size: 10px;
    line-height: 14px;
    margin-top: 10px;
    color: #8a90a0 !important;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 12px;
    line-height: 16px;
    margin-top: 2px;
    color: #8a90a0 !important;
  }
}
.pack-data {
  @media only screen and (max-width: 1023px) {
    font-size: 14px;
    line-height: 20px;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 16px;
    line-height: 26px;
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
    height: 50px !important;
    width: 50px !important;
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
  height: 50px !important;
  width: 50px !important;
}
.claimguru-tagline {
  @media only screen and (max-width: 1023px) {
    font-size: 28px;
    color: #101828;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
  }
  @media only screen and (min-width: 1024px) {
    color: #101828;
    font-weight: 600;
    font-size: 28px;
    line-height: 36px;
  }
}
.signup-text {
  font-size: 16px !important;
  line-height: 24px;
  a {
    margin-left: 10px;
  }

  @media only screen and (min-height: 500px) and (max-height: 800px) {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  @media only screen and (min-height: 1024px) {
    margin-top: 30px;
  }
  @media only screen and (max-height: 1023px) {
    margin-top: 40px;
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
    padding-top: 90px;
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
    padding-top: 90px;
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
  @media only screen and (max-width: 1023px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 510px;
    margin-left: auto;
    margin-right: auto;
  }
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 510px;
    margin-left: auto;
    margin-right: auto;
  }
}
.signup-head {
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
  margin-top: 70px;
  margin-bottom: 30px;
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
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
}

a.term_of_use {
  font-weight: 600;
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
  color: $primary !important;
  margin-top: 23px;
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

  span.amt {
    font-size: 20px;
    line-height: 24px;
  }
}
.period-heading {
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  margin: 20px 0 18px 0;
}
.main-pack-heading {
  @media only screen and (min-width: 1024px) {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    padding: 16px 15px 20px 48px;
  }
  @media only screen and (max-width: 1023px) {
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    padding: 10px 0 20px 0;
  }
}
.payment-pack-heading {
  @media only screen and (min-width: 1024px) {
    font-weight: 600;
    font-size: 32px;
    line-height: 36px;
  }
  @media only screen and (max-width: 1023px) {
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
  }
}
.duration-text {
  @media only screen and (min-width: 1024px) {
    margin-top: 40px;
  }
  @media only screen and (max-width: 1023px) {
    margin-top: 30px;
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
    padding-left: 0;
    padding-right: 0;
    max-width: 430px;
    margin: 0 auto;
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
  border: 1px solid $primary !important;
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
  .StripeElement--invalid {
    height: 44px;
    max-width: 100%;
    outline: none;
    border-radius: 8px;
    border: 2px solid #d64d25 !important;
    padding: 0 12px;
  }
  .StripeElement--focus {
    height: 44px;
    max-width: 100%;
    border: 2px solid $primary !important;
    outline: none;
    border-radius: 8px;
    padding: 0 12px;
  }
  .cardInfo {
    padding: 12.5px 14px;
    border: 1px solid #b9bcc6;
    border-radius: 8px;
    height: 44px;
    .q-field__native {
      font-weight: 500 !important;
      font-size: 16px !important;
      line-height: 24px !important;
    }
    .q-field__control,
    .q-field__marginal {
      height: 20px;
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
  max-width: 430px;
}
.q-field__marginal {
  height: 44px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 24px;
}
.q-page-container {
  margin: 0 auto;
  max-width: 120rem;
}

.page-content {
  max-width: 1920px;
  margin: 0 auto;
}

.claimguru-tagline {
  max-width: 600px;
  margin: 0 auto;
  letter-spacing: 0.75px;
}
.main-pack-heading,
.pack-heading,
.period-heading,
.signup-head {
  letter-spacing: 0.75px !important;
}

.pack-data,
.aditional-licence,
.vendor-terms,
.input-label,
.term-policy-text,
.signup-text,
a {
  letter-spacing: 0.15px !important;
}

.q-field {
  @media only screen and (min-width: 1024px) {
    //width: 431px;
  }
}

.signup-sub.subscribe {
  .q-field--with-bottom {
    padding-bottom: 25px !important;
  }
}

.package-title {
  padding-top: 10px;
}

.enterprise-title {
  margin-top: 16px;
  span {
    margin-left: 10px;
  }
}

@media (max-width: 1300px) {
  .claimguru-tagline,
  .main-pack-heading {
    max-width: 460px;
  }

  .pack-heading {
    font-size: 18px !important;
  }

  .pack-data {
    margin-left: 0 !important;
    font-size: 14px;
  }

  .card-container-enterprice .q-px-lg {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .card-container-enterprice .q-ml-md {
    margin-left: 0;
  }
}

@media (min-width: 1024px) and (max-width: 1300px) {
  .package-section {
    flex-direction: column;
    .col-md-5 {
      min-width: 100% !important;
    }
  }

  .signup-sub.subscribe .signup {
    margin-left: 0;
    margin-right: 0;
  }

  .card-container-enterprice .row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .col-md-9,
    .col-md-1,
    .col-md-12,
    .col-md-3 {
      width: 100% !important;
    }
    .col-md-3 {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .col-md-12 {
      text-align: center;
      margin: 0;
      padding: 0;
    }

    .enterprise-title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .enterprice-img {
      width: 50px !important;
      height: 50px !important;
    }
  }

  .card-container-enterprice {
    .col.col-md-3.col-sm-12.q-pt-sm.q-pr-md {
      padding-top: 0 !important;
    }
  }

  .custom-setup {
    display: flex !important;
    flex-direction: row !important;
    justify-content: flex-start !important;
    align-items: flex-start !important;
    margin-top: 0;
  }

  .pkg-details {
    padding: 0 0 0 18px !important;
    .check-img {
      top: 3px !important;
    }
  }

  .period-heading {
    margin: 0;
  }
  .aditional-licence {
    margin-bottom: 0;
    padding-top: 0;
  }

  .manage-mob-width {
    .row.justify-center.q-pt-md.q-pb-md {
      margin: 0 !important;
      padding: 5px 0 0 0 !important;
    }
  }

  .manage-package-mob-width {
    .row.justify-center.q-pt-md.q-pb-md {
      margin: 0 !important;
      padding: 5px 0 0 0 !important;
    }
  }

  .vendor-terms {
    margin-bottom: 10px;
  }

  .package-section .card-bottom {
    margin-bottom: 10px;
  }
  .claimguru-copy {
    margin: 15px 0px 15px 32px;
  }

  .signup {
    padding-left: 35px;
    padding-right: 35px;
  }

  .package-title {
    padding-top: 0;
  }

  .enterprice-img {
    margin-top: 10px;
  }

  .contact-us {
    margin-top: 0;
  }
}

@media (min-width: 1300px) {
  .manage-package-mob-width {
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media (min-width: 320px) {
  .pkg-details {
    position: relative;
    padding: 2px 0 2px 18px;
    left: 6px;
    top: 2px;
    .check-img {
      height: 20px !important;
      width: 20px !important;
      position: absolute;
      left: 0;
      top: 3px;
    }
  }
}

@media (max-width: 1023px) {
  .check-img {
    height: 20px !important;
    width: 20px !important;
  }

  .enterprise-mob-package .pkg-details {
    display: flex;
    padding: 2px 0 15px 30px;
  }

  .contact-us {
    color: $primary !important;
  }

  .enterprise-mob-title {
    margin-top: 10px;
  }

  .mob-contact-us {
    padding: 12px 0;
  }
}

input {
  font-size: 16px !important;
}
.subscribe input::placeholder {
  font-family: Poppins;
  font-weight: 500;
  font-size: 16px !important;
  line-height: 24px;
  color: #8a90a0 !important;
  opacity: 1; /* Firefox */
}

.subscribe input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  font-family: Poppins;
  font-weight: 500;
  font-size: 16px !important;
  line-height: 24px;
  color: #8a90a0 !important;
}

.subscribe input::-ms-input-placeholder {
  /* Microsoft Edge */
  font-family: Poppins;
  font-weight: 500;
  font-size: 16px !important;
  line-height: 24px;
  color: #8a90a0 !important;
}

.term-policy-text {
  margin-bottom: 30px;
}

.custom-setup .check-img {
  height: 20px !important;
  width: 20px !important;
  margin: 0 10px 0 10px;
}

.custom-setup-text {
  padding-bottom: 12px;
}

.step-text {
  line-height: 24px;
}

@media (max-width: 600px) {
  .claimguru-tagline {
    max-width: 345px !important;
    padding: 25px 0 10px 0;
    font-size: 24px !important;
  }
  // .manage-mob-width{
  //   padding: 0 60px;
  // }

  // .manage-package-mob-width{
  //   padding: 0 60px 30px 60px;
  // }

  .main-pack-heading {
    font-size: 24px !important;
  }
  .manage-mob-width,
  .manage-package-mob-width,
  .enterprise-mob-package {
    .pack-heading {
      font-size: 16px !important;
      span.amt {
        font-size: 16px !important;
      }
    }

    .period-heading {
      font-size: 14px !important;
      margin: 12px 0 8px 0;
      line-height: 20px;
    }
    .pkg-details {
      margin: 0 auto !important;
      width: 240px;
    }

    .package-icon {
      width: 40px !important;
      height: 40px !important;
    }
  }
  .aditional-licence {
    margin-bottom: 10px !important;
  }

  .enterprise-mob-package {
    .pack-data.pkg-details {
      padding: 0 0 15px 0;
      .check-img {
        margin-left: -28px;
        top: -2px;
      }
    }
  }

  .enterprise-mob-package .pkg-details {
    margin: 0 auto !important;
    width: 184px;
  }

  .signup-head {
    font-size: 24px !important;
    margin-top: 10px !important;
    margin-bottom: 0 !important;
  }

  .signup-sub.subscribe .q-field--with-bottom {
    padding-bottom: 15px !important;
  }

  .term-policy-text {
    margin-top: 10px;
    position: relative;
    margin-bottom: 20px;
    padding: 0 0 0 32px;
    .q-checkbox {
      position: absolute;
      left: -7px;
      top: -10px;
    }

    a,
    label {
      margin-top: 0 !important;
    }
  }

  .signup-text {
    margin-top: 30px;
  }

  .aditional-licence,
  .vendor-terms {
    width: 220px;
    margin: 0 auto;
  }

  .vendor-terms {
    padding-bottom: 15px;
  }

  .pack-data span {
    font-size: 14px;
    line-height: 20px;
  }

  .pack-heading span.amt {
    line-height: 20px;
  }

  .pack-heading span.text-grey {
    font-size: 12px !important;
    line-height: 12px !important;
  }

  .signup-package-selected {
    padding: 10px 15px 20px 15px;
  }
  // .outer-padding.package-section {
  //   padding-left: 0;
  //   padding-right: 0;
  // }

  .see-all-package {
    margin: 22px 0 30px 0 !important;
  }
}
</style>
