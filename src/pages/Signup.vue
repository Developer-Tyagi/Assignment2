<template>
  <q-page style="min-height: calc(100vh - 77px)">
    <div class="signup-container q-px-md q-py-lg">
      <div v-if="isValidPlan">
        <div
          class=" q-mb-md text-capitalize"
          style="margin-left:60%;"
          v-if="
            planInfo.attributes &&
            planInfo.attributes.coupons[0] &&
            planInfo.attributes.coupons[0].amtAfterDicount
              ? planInfo.attributes.coupons[0].amtAfterDicount
              : ''
          "
        >
          <q-badge color="green">
            Coupon Applied Successfully
          </q-badge>
        </div>
        <div class="row justify-between ">
          <div class="col-3">
            <q-carousel
              v-model="plan"
              swipeable
              animated
              height="130px"
              class="bg-yellow-9 text-white rounded-borders"
            >
              <q-carousel-slide
                v-for="(plan, index) in plans"
                :key="plan.id"
                :name="index + 1"
                class="column no-wrap justify-between"
              >
                <div class="text-h5 text-weight-medium">
                  {{ plan.name ? plan.name : '-' }}
                </div>

                <div>
                  <div class="row">
                    <span class="text-h5 text-weight-medium">
                      ${{ plan.plans[0] ? plan.plans[0].amount / 100 : '-' }}
                    </span>
                    /month
                    <span
                      class="q-ml-auto text-capitalize"
                      v-if="
                        planInfo.attributes &&
                        planInfo.attributes.coupons[0] &&
                        planInfo.attributes.coupons[0].amtAfterDicount
                          ? planInfo.attributes.coupons[0].amtAfterDicount
                          : ''
                      "
                      >Amount to Pay after Discount</span
                    >
                  </div>

                  <div class="row">
                    Starting Price
                    <span
                      class="q-ml-auto"
                      v-if="
                        planInfo.attributes &&
                        planInfo.attributes.coupons[0] &&
                        planInfo.attributes.coupons[0].amtAfterDicount
                          ? planInfo.attributes.coupons[0].amtAfterDicount
                          : ''
                      "
                    >
                      $ {{ planInfo.attributes.coupons[0].amtAfterDicount }}
                    </span>
                  </div>
                </div>
              </q-carousel-slide>
            </q-carousel>
            <div class="row justify-between q-mt-lg">
              <q-btn
                flat
                color="black"
                size="sm"
                padding="none"
                dense
                no-caps
                @click="onPrevPlan"
                :disable="plan === 1"
              >
                <q-icon left size="2em" name="arrow_back" />
                <div class="text-subtitle2 text-weight-regular">Previous</div>
              </q-btn>
              <q-btn
                flat
                color="black"
                size="sm"
                padding="none"
                dense
                no-caps
                @click="onNextPlan"
                :disable="plan === plans.length"
              >
                <div class="text-subtitle2 text-weight-regular">
                  Next Package
                </div>
                <q-icon right size="2em" name="arrow_forward" />
              </q-btn>
            </div>

            <q-card class="q-mt-lg">
              <q-card-section>
                <div class="row justify-between">
                  <div class="text-h6 text-weight-medium">Total</div>
                  <div>
                    <span class="text-h5 text-weight-medium">
                      ${{
                        plans[this.plan - 1]
                          ? plans[this.plan - 1].plans[0].amount / 100
                          : '-'
                      }} </span
                    >/month
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <q-card class="q-mt-lg">
              <q-card-section> List </q-card-section>
            </q-card>
          </div>

          <div class="col-8">
            <q-stepper
              v-model="step"
              ref="stepper"
              active-color="primary"
              animated
              alternative-labels
            >
              <q-step :name="1" :done="step > 1" title="Company Information">
                <q-form
                  @submit="onSubmitCompanyInfo"
                  ref="companyInfo"
                  class="q-gutter-md justify-between row wrap"
                >
                  <div class="column col-5">
                    <q-input
                      dense
                      name="firstName"
                      v-model="user.contact.fname"
                      color="primary"
                      label="Contact First Name"
                      class="required"
                      filled
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please fill first name'
                      ]"
                    />

                    <q-input
                      dense
                      v-model="user.contact.lname"
                      name="lastName"
                      color="primary"
                      label="Contact Last Name"
                      class="required"
                      filled
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please fill last name'
                      ]"
                    />
                    <q-input
                      dense
                      v-model="user.photoIDEmail"
                      color="primary"
                      label="Photo Id Email"
                      class="q-pb-md"
                      filled
                    />
                    <q-input
                      dense
                      v-model="user.contact.phoneNumber[0].number"
                      label="Contact Phone Number"
                      mask="(###) ###-####"
                      class="required"
                      filled
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length == 14) ||
                          'Please fill contact number'
                      ]"
                    />
                    <q-input
                      dense
                      v-model="user.name"
                      name="businessName"
                      color="primary"
                      label="Business Name"
                      class="required"
                      filled
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) ||
                          'Please fill bussiness name'
                      ]"
                    />

                    <q-input
                      dense
                      v-model="user.email"
                      name="email"
                      color="primary"
                      label="Bussiness Email"
                      class="required"
                      filled
                      lazy-rules
                      :rules="[
                        val => validateEmail(val) || 'Please fill your email'
                      ]"
                    />

                    <q-input
                      dense
                      v-model="user.phoneNumber.number"
                      label="Bussiness Phone Number"
                      mask="(###) ###-####"
                      class="required"
                      filled
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length == 14) ||
                          'Please fill your bussiness number'
                      ]"
                    />
                  </div>

                  <div class="column col-5">
                    <input
                      v-model="autocompleteAddress"
                      id="autocomplete1"
                      class="autocomplete-input--signUp"
                      name="autcomplete"
                      color="primary"
                      placeholder=" Auto-complete address"
                      autocomplete="off"
                    />
                    <q-input
                      dense
                      v-model="user.mailingAddress.houseNumber"
                      name="address2"
                      color="primary"
                      label="House Number"
                      class="required"
                      filled
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please fill house number'
                      ]"
                    />
                    <q-input
                      dense
                      v-model="user.mailingAddress.address1"
                      name="address1"
                      color="primary"
                      label="Address 1"
                      class="required"
                      filled
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please fill Address 1'
                      ]"
                    />
                    <q-input
                      dense
                      v-model="user.mailingAddress.address2"
                      name="address2"
                      class="q-mb-md"
                      color="primary"
                      label="Address 2"
                      filled
                    />
                    <div class="row justify-between">
                      <q-input
                        dense
                        v-model="user.mailingAddress.addressLocality"
                        name="city"
                        color="primary"
                        label="City"
                        filled
                        class="col-6 required"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length > 0) || 'Please fill your city'
                        ]"
                      />

                      <q-input
                        dense
                        v-model="user.mailingAddress.postalCode"
                        name="zip"
                        color="primary"
                        label="ZIP Code"
                        type="number"
                        filled
                        class="col-5 required"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length > 0) ||
                            'Please fill your zipcode'
                        ]"
                      />
                    </div>
                    <div class="row justify-between">
                      <q-select
                        dense
                        v-model="user.mailingAddress.addressRegion"
                        filled
                        :options="states"
                        class="col-6 required"
                        label="State"
                        behavior="menu"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length > 0) || 'Please fill your State'
                        ]"
                      />
                      <q-input
                        dense
                        v-model="user.mailingAddress.addressCountry"
                        name="country"
                        color="primary"
                        label="Country"
                        class="col-5 required"
                        filled
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length > 0) ||
                            'Please fill your country'
                        ]"
                      />
                    </div>
                    <q-input
                      dense
                      v-model="user.website"
                      name="website"
                      color="primary"
                      label="Website"
                      class="required"
                      filled
                      lazy-rules
                      :rules="[
                        val => validateUrl(val) || 'Please fill your website'
                      ]"
                    />
                  </div>

                  <q-separator />
                  <div class="full-width q-px-xl col-12">
                    <q-btn
                      type="submit"
                      color="primary"
                      label="Next"
                      class="float-right q-px-lg"
                    />
                  </div>
                </q-form>
              </q-step>

              <q-step :name="2" title="Company Billing & Payment">
                <q-form
                  @submit="onSubmit"
                  ref="billingInfo"
                  @reset="step--"
                  class="q-gutter-lg justify-between row wrap"
                >
                  <div class="column col-5">
                    <div class="text-h5">Billing Info</div>

                    <div class="row align-center">
                      <span class="form-heading">
                        Is billing address same as mailing address
                      </span>
                      <q-toggle
                        class="q-ml-auto"
                        v-model="isBillingAddressSame"
                        @input="onMailingAddressSameToggle"
                      />
                    </div>
                    <input
                      v-model="autocompleteAddress"
                      id="autocomplete2"
                      class="autocomplete-input--signUp"
                      name="autocomplete"
                      color="primary"
                      :disabled="isBillingAddressSame == true"
                      placeholder=" Auto-complete address"
                      autocomplete="off"
                      :class="{
                        'input-margin--40 no-visibility ':
                          isBillingAddressSame == true
                      }"
                    />
                    <q-input
                      dense
                      v-model="user.billingInfo.address.houseNumber"
                      name="address2"
                      color="primary"
                      label="House Number"
                      class="required"
                      filled
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please fill house number'
                      ]"
                      :disable="isBillingAddressSame"
                    />
                    <q-input
                      dense
                      v-model="user.billingInfo.address.address1"
                      name="address1"
                      color="primary"
                      label="Address 1"
                      class="required"
                      filled
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please fill Address 1'
                      ]"
                      :disable="isBillingAddressSame"
                    />
                    <q-input
                      dense
                      v-model="user.billingInfo.address.address2"
                      name="address2"
                      color="primary"
                      class="q-mb-md"
                      label="Address 2"
                      filled
                      :disable="isBillingAddressSame"
                    />
                    <div class="row justify-between">
                      <q-input
                        dense
                        v-model="user.billingInfo.address.addressLocality"
                        name="city"
                        color="primary"
                        label="City"
                        filled
                        class="col-6 required"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length > 0) || 'Please fill your city'
                        ]"
                        :disable="isBillingAddressSame"
                      />
                      <q-input
                        dense
                        v-model="user.billingInfo.address.postalCode"
                        name="zip"
                        color="primary"
                        label="ZIP Code"
                        type="number"
                        filled
                        class="col-5 required"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length > 0) ||
                            'Please fill your zipcode'
                        ]"
                        :disable="isBillingAddressSame"
                      />
                    </div>
                    <div class="row justify-between">
                      <q-select
                        dense
                        v-model="user.billingInfo.address.addressRegion"
                        filled
                        :options="states"
                        class="col-6 required"
                        label="State"
                        behavior="menu"
                        lazy-rules
                        :disable="isBillingAddressSame"
                        :rules="[
                          val =>
                            (val && val.length > 0) || 'Please fill your State'
                        ]"
                      />
                      <q-input
                        dense
                        v-model="user.billingInfo.address.addressCountry"
                        name="country"
                        color="primary"
                        label="Country"
                        class="col-5 required"
                        filled
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length > 0) ||
                            'Please fill your country'
                        ]"
                        :disable="isBillingAddressSame"
                      />
                    </div>

                    <div class="row">
                      <p class="q-my-auto text-bold">Are you a beta user ?</p>
                      <q-checkbox
                        class="q-ml-auto"
                        v-model="isBeta"
                        color="$primary"
                      />
                    </div>
                  </div>

                  <div class="column col-5">
                    <q-input
                      dense
                      v-model="user.SSN"
                      name="ssNumber"
                      color="primary"
                      label="SSN/EID"
                      class="required"
                      filled
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length == 11) || 'Please fill SSN or EID'
                      ]"
                      mask="###-##-####"
                    />
                    <div v-if="!isBeta">
                      <div class="text-h5">Credit Card Info</div>
                      <PaymentCard
                        @cardDetailsAdded="cardDetailsAdded"
                        ref="card"
                      />
                    </div>
                  </div>

                  <q-separator />
                  <div class="row justify-between full-width q-px-xl">
                    <q-btn
                      v-if="step > 1"
                      color="primary"
                      label="Back"
                      class="q-px-lg"
                      outline
                      type="reset"
                    />
                    <q-btn
                      color="primary"
                      label="Buy"
                      class="q-px-lg"
                      type="submit"
                      :disabled="isBuyButtonEnable || isBeta ? false : true"
                    />
                  </div>
                </q-form>
              </q-step>
            </q-stepper>
          </div>
        </div>
      </div>

      <div v-else class="column justify-between">
        <img src="~assets/404-error.jpg" width="60%" class="q-mx-auto" />
        <h3 class="q-mx-auto">Plan Not Found</h3>
        <q-btn
          color="primary"
          label="Back"
          class="q-px-lg q-mx-auto"
          style="width: 20%"
          to="login"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { constants } from '@utils/constant';
import { getToken, getCurrentUser } from '@utils/auth.js';
import PaymentCard from 'components/PaymentCard';
import { validateEmail, validateUrl } from '@utils/validation';
import AddressService from '@utils/country';
const addressService = new AddressService();

export default {
  components: { PaymentCard },

  data() {
    return {
      isBeta: false,
      plan: 1,
      step: 1,
      autocompleteAddress: '',
      autocomplete1: {},
      autocomplete2: {},
      countries: [],
      states: [],
      isValidPlan: true,
      isBillingAddressSame: true,
      isAddressFieldEnable: false,
      isBuyButtonEnable: false,
      selectedPlan: {
        id: '',
        name: '',
        machineValue: '',
        price: ''
      },
      user: {
        type: constants.ORGANIZATION,
        email: '',
        name: '',
        website: '',
        photoIDEmail: '',
        phoneNumber: {
          number: ''
        },
        contact: {
          fname: '',
          lname: '',
          email: '',
          phoneNumber: [{ number: '' }]
        },

        mailingAddress: {
          addressCountry: '',
          addressLocality: '',
          addressRegion: '',
          postalCode: '',
          address1: '',
          address2: '',
          houseNumber: ''
        },
        billingInfo: {
          address: {
            addressCountry: '',
            addressLocality: '',
            addressRegion: '',
            postOfficeBoxNumber: '',
            postalCode: '',
            address1: '',
            address2: ''
          }
        },
        plan: {
          id: '',
          name: '',
          machineValue: ''
        },
        stripeToken: ''
      }
    };
  },
  methods: {
    ...mapActions([
      'getPlanInfo',
      'getAllPlans',
      'getContactTypes',
      'createUserForOrganization'
    ]),

    onPrevPlan() {
      this.plan--;
      this.$router.push({
        path: 'signup',
        query: { plan: this.plans[this.plan - 1].machineValue }
      });
      const index = this.plans.findIndex(
        o => o.machineValue === this.$route.query.plan
      );
      if (index > -1) {
        this.plan = index + 1;
        this.user.plan.id = this.plans[index].id;
        this.user.plan.name = this.plans[index].name;
        this.user.plan.machineValue = this.plans[index].machineValue;
        if (this.$route.query.coupon) {
          this.user.plan.coupon = this.$route.query.coupon;
        }
        if (this.$route.query.trial) {
          this.user.plan.trial = this.$route.query.trial;
        }
      }
    },

    onNextPlan() {
      this.plan++;
      this.$router.push({
        path: 'signup',
        query: { plan: this.plans[this.plan - 1].machineValue }
      });
      const index = this.plans.findIndex(
        o => o.machineValue === this.$route.query.plan
      );

      if (index > -1) {
        this.plan = index + 1;
        this.user.plan.id = this.plans[index].id;
        this.user.plan.name = this.plans[index].name;
        this.user.plan.machineValue = this.plans[index].machineValue;
        if (this.$route.query.coupon) {
          this.user.plan.coupon = this.$route.query.coupon;
        }
        if (this.$route.query.trial) {
          this.user.plan.trial = this.$route.query.trial;
        }
      }
    },

    fillInAddress() {
      const autoPopulateAddress =
        this.step === 1
          ? this.user.mailingAddress
          : this.user.billingInfo.address;
      const addressField =
        this.step === 1 ? this.autocomplete1 : this.autocomplete2;
      const place = addressField.getPlace().address_components;
      autoPopulateAddress.address1 =
        this.getPlaceName('route', place) >= 0
          ? place[this.getPlaceName('route', place)].long_name
          : '';
      autoPopulateAddress.addressLocality = this.getPlaceName(
        'administrative_area_level_2',
        place
      )
        ? place[this.getPlaceName('administrative_area_level_2', place)]
            .long_name
        : '';
      autoPopulateAddress.addressRegion = this.getPlaceName(
        'administrative_area_level_1',
        place
      )
        ? place[this.getPlaceName('administrative_area_level_1', place)]
            .long_name
        : '';
      autoPopulateAddress.addressCountry = this.getPlaceName('country', place)
        ? place[this.getPlaceName('country', place)].long_name
        : '';

      autoPopulateAddress.postalCode = this.getPlaceName('postal_code', place)
        ? place[this.getPlaceName('postal_code', place)].long_name
        : '';
      if (this.getPlaceName('street_number', place) >= 0) {
        autoPopulateAddress.houseNumber =
          place[this.getPlaceName('street_number', place)].long_name;
      }

      this.isAddressFieldEnable = true;
      this.autocompleteAddress = '';
    },

    getPlaceName(key, value) {
      for (let i = 0; i < value.length; i++) {
        let index = value[i].types.indexOf(key);
        if (index != -1) {
          return i;
        }
      }
    },

    onSubmitCompanyInfo() {
      this.$refs.companyInfo.validate().then(() => {
        this.step++;
      });
    },

    onMailingAddressSameToggle() {
      if (this.isBillingAddressSame) {
        this.user.billingInfo.address = { ...this.user.mailingAddress };
      } else {
        this.autocomplete2 = new google.maps.places.Autocomplete(
          document.getElementById('autocomplete2'),
          { types: ['geocode'], componentRestrictions: { country: 'us' } }
        );

        this.autocomplete2.addListener('place_changed', this.fillInAddress);
        this.user.billingInfo.address = {
          addressCountry: 'United States',
          addressLocality: '',
          addressRegion: '',
          postOfficeBoxNumber: '',
          postalCode: '',
          address1: '',
          address2: ''
        };
      }
    },

    onSubmit() {
      this.$refs.billingInfo.validate();
      this.createUserForOrganization(this.user).then(res => {
        if (!res) {
          this.$refs.card.clearCard();
        }
      });
    },

    cardDetailsAdded(e) {
      if (e) {
        this.isBuyButtonEnable = true;
        this.user.stripeToken = e;
      } else {
        this.isBuyButtonEnable = false;
        this.stripeToken = '';
      }
    },

    validateEmail,

    validateUrl
  },

  computed: {
    ...mapGetters(['plans', 'contactTypes', 'planInfo'])
  },

  async created() {
    // if we are getting coupon and trial value in Url Query Params then only we'll call the plan info API with Query Params
    if (this.$route.query.coupon || this.$route.query.trial) {
      if (this.$route.query.coupon) {
        this.user.plan.coupon = this.$route.query.coupon;
      }
      if (this.$route.query.trial) {
        this.user.plan.trial = this.$route.query.trial;
      }

      const payload = {
        plan: this.$route.query.plan,
        coupon: this.user.plan.coupon,
        trial: this.user.plan.trial
      };
      this.getPlanInfo(payload);
    }

    if (getToken()) {
      this.$router.push('/dashboard');
    } else {
      await this.getAllPlans();

      const index = this.plans.findIndex(
        o => o.machineValue === this.$route.query.plan
      );

      if (index > -1) {
        this.plan = index + 1;
        this.user.plan.id = this.plans[index].id;
        this.user.plan.name = this.plans[index].name;
        this.user.plan.machineValue = this.plans[index].machineValue;
        if (this.$route.query.coupon) {
          this.user.plan.coupon = this.$route.query.coupon;
        }
        if (this.$route.query.trial) {
          this.user.plan.trial = this.$route.query.trial;
        }
      } else {
        this.isValidPlan = false;
      }
    }
  },

  mounted() {
    if (this.isValidPlan) {
      this.user.mailingAddress.addressCountry = 'United States';
      this.user.billingInfo.address.addressCountry = 'United States';
      this.states = addressService.getStates(
        this.user.mailingAddress.addressCountry
      );
      this.autocomplete1 = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete1'),
        { types: ['geocode'], componentRestrictions: { country: 'us' } }
      );
      this.autocomplete1.addListener('place_changed', this.fillInAddress);
    }
  },

  watch: {
    step(newValue, oldValue) {
      if (newValue === 2) {
        this.user.billingInfo.address = { ...this.user.mailingAddress };
      }
    }
  }
};
</script>

<style lang="scss">
.signup-container {
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
}

.q-field--with-bottom {
  padding-bottom: 25px;
}
</style>
