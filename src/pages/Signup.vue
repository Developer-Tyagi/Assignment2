<template>
  <q-page>
    <div class="signup-container q-px-xl q-py-lg">
      <div v-if="isValidPlan" class="row justify-between">
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
              <div class="text-h5 text-weight-medium">{{ plan.name }}</div>
              <div>
                <div>
                  <span class="text-h5 text-weight-medium"></span
                  >{{ plan.price }}/mo
                </div>
                <div>Starting Price</div>
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
              <div class="text-subtitle2 text-weight-regular">Next Package</div>
              <q-icon right size="2em" name="arrow_forward" />
            </q-btn>
          </div>

          <q-card class="q-mt-lg">
            <q-card-section>
              <div class="row justify-between">
                <div class="text-h6 text-weight-medium">Total</div>
                <div>
                  <span class="text-h5 text-weight-medium">{{
                    plans[this.plan - 1].price
                  }}</span
                  >/mo
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
            :active-icon="`img:${require('../assets/step-active-icon.svg')}`"
            :inactive-icon="
              `img:${require('../assets/step-inactive-icon.svg')}`
            "
            active-color="black"
            animated
            alternative-labels
          >
            <q-step :name="1" title="Company Information">
              <q-form
                @submit="onSubmitCompanyInfo"
                ref="companyInfo"
                class="q-gutter-lg justify-between row wrap"
              >
                <div class="column col-5">
                  <q-input
                    name="firstName"
                    v-model="user.contact.fname"
                    color="primary"
                    label="Contact First Name *"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
                  <q-input
                    v-model="user.contact.lname"
                    name="lastName"
                    color="primary"
                    label="Contact Last Name *"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />

                  <div class="row justify-between" style="padding-bottom: 20px">
                    <q-select
                      filled
                      v-model="user.contact.phoneNumber[0].type"
                      :options="contactTypes"
                      option-value="machineValue"
                      option-label="name"
                      label="Type"
                      style="width: 40%; margin-right: auto"
                      emit-value
                      map-options
                    />
                    <q-input
                      v-model="user.contact.phoneNumber[0].number"
                      label="Contact Phone Number"
                      type="number"
                      style="width: 55%"
                      filled
                    />
                  </div>

                  <q-input
                    v-model="user.name"
                    name="businessName"
                    color="primary"
                    label="Business Name *"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />

                  <q-input
                    v-model="user.email"
                    name="email"
                    color="primary"
                    label="Bussiness Email *"
                    type="email"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />

                  <div class="row justify-between">
                    <q-select
                      filled
                      v-model="user.phoneNumber.type"
                      :options="contactTypes"
                      option-value="machineValue"
                      option-label="name"
                      label="Type"
                      style="width: 40%; margin-right: auto"
                      emit-value
                      map-options
                    />
                    <q-input
                      v-model="user.phoneNumber.number"
                      label="Bussiness Phone Number"
                      type="number"
                      style="width: 55%"
                      filled
                    />
                  </div>
                </div>

                <div class="column col-5">
                  <q-input
                    v-model="user.mailingAddress.houseNumber"
                    name="address2"
                    color="primary"
                    label="House Number"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
                  <input
                    v-model="user.mailingAddress.streetAddress"
                    id="autocomplete1"
                    class="autocomplete-input"
                    name="address1"
                    color="primary"
                    label="Street Address"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                    placeholder="Street Address"
                  />
                  <div class="row justify-between">
                    <q-input
                      v-model="user.mailingAddress.addressLocality"
                      name="city"
                      :disable="!isAddressFieldEnable"
                      color="primary"
                      label="City"
                      filled
                      class="col-6"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || '']"
                    />
                    <q-input
                      v-model="user.mailingAddress.postalCode"
                      name="zip"
                      color="primary"
                      label="ZIP Code"
                      type="number"
                      filled
                      class="col-5"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || '']"
                      :disable="!isAddressFieldEnable"
                    />
                  </div>
                  <q-input
                    v-model="user.mailingAddress.addressRegion"
                    name="state"
                    color="primary"
                    label="State"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                    :disable="!isAddressFieldEnable"
                  />
                  <q-input
                    v-model="user.mailingAddress.addressCountry"
                    name="country"
                    color="primary"
                    label="Country"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                    :disable="!isAddressFieldEnable"
                  />
                  <q-input
                    v-model="user.website"
                    name="website"
                    color="primary"
                    label="Website *"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
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

                  <div class="row">
                    <span class="form-heading">
                      Is billing address same as mailing address
                    </span>
                    <q-toggle
                      class="q-ml-auto"
                      v-model="isBillingAddressSame"
                      @input="onMailingAddressSameToggle"
                    />
                  </div>

                  <q-input
                    v-model="user.billingInfo.address.houseNumber"
                    name="address2"
                    color="primary"
                    label="House Number"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                    :disable="isBillingAddressSame"
                  />
                  <input
                    v-model="user.billingInfo.address.streetAddress"
                    id="autocomplete2"
                    class="autocomplete-input"
                    name="address1"
                    color="primary"
                    label="Street Address"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                    :disabled="isBillingAddressSame == true"
                    placeholder="Street Address"
                  />
                  <div class="row justify-between">
                    <q-input
                      v-model="user.billingInfo.address.addressLocality"
                      name="city"
                      color="primary"
                      label="City"
                      filled
                      class="col-6"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || '']"
                      :disable="isBillingAddressSame"
                    />
                    <q-input
                      v-model="user.billingInfo.address.postalCode"
                      name="zip"
                      color="primary"
                      label="ZIP Code"
                      type="number"
                      filled
                      class="col-5"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || '']"
                      :disable="isBillingAddressSame"
                    />
                  </div>
                  <q-input
                    v-model="user.billingInfo.address.addressRegion"
                    name="state"
                    color="primary"
                    label="State"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                    :disable="isBillingAddressSame"
                  />
                  <q-input
                    v-model="user.billingInfo.address.addressCountry"
                    name="country"
                    color="primary"
                    label="Country"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                    :disable="isBillingAddressSame"
                  />
                </div>

                <div class="column col-5">
                  <div class="text-h5">Credit Card Info</div>
                  <q-input
                    name="cardNumber"
                    color="primary"
                    label="Card Number"
                    v-model="paymentInfo.cardNumber"
                    type="number"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
                  <q-input
                    name="cardHolder"
                    color="primary"
                    label="Cardholder Name"
                    v-model="paymentInfo.name"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
                  <q-input
                    name="expiry"
                    v-model="paymentInfo.expiryDate"
                    color="primary"
                    label="Expiry Date (MM/YY)"
                    mask="##/##"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
                  <q-input
                    name="cvv"
                    v-model="paymentInfo.cvv"
                    color="primary"
                    label="CVV"
                    type="password"
                    mask="###"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
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
                  />
                </div>
              </q-form>
            </q-step>
          </q-stepper>
        </div>
      </div>
      <div v-else class="column justify-between">
        <img src="~assets/404-error.jpg" width="60%" class="q-mx-auto" />
        <h3 class="q-mx-auto">Plan Not Found</h3>
        <q-btn
          color="primary"
          label="Back"
          class="q-px-lg q-mx-auto"
          type="submit"
          style="width: 20%"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { constants } from '@utils/constant';

export default {
  name: 'Signup',

  data() {
    return {
      plan: 1,
      step: 1,
      autocomplete1: {},
      autocomplete2: {},
      isValidPlan: true,
      isBillingAddressSame: false,
      isAddressFieldEnable: false,
      selectedPlan: {
        id: '',
        name: '',
        machineName: '',
        price: ''
      },
      paymentInfo: {
        name: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      },
      user: {
        type: constants.ORGANIZATION,
        email: '',
        name: '',
        website: '',
        phoneNumber: {
          type: '',
          number: ''
        },
        contact: {
          fname: '',
          lname: '',
          email: '',
          phoneNumber: [{ type: '', number: '' }]
        },
        mailingAddress: {
          addressCountry: '',
          addressLocality: '',
          addressRegion: '',
          postalCode: '',
          streetAddress: '',
          houseNumber: ''
        },
        billingInfo: {
          address: {
            addressCountry: '',
            addressLocality: '',
            addressRegion: '',
            postOfficeBoxNumber: '',
            postalCode: '',
            streetAddress: ''
          },
          planInfo: {
            id: '',
            name: '',
            machineName: ''
          }
        }
      }
    };
  },
  methods: {
    ...mapActions([
      'getPlansInfo',
      'getContactTypes',
      'createUserForOrganization'
    ]),

    onPrevPlan() {
      this.plan--;
      this.$router.push({
        path: 'signup',
        query: { plan: this.plans[this.plan - 1].machineName }
      });
    },

    onNextPlan() {
      this.plan++;
      this.$router.push({
        path: 'signup',
        query: { plan: this.plans[this.plan - 1].machineName }
      });
    },

    fillInAddress() {
      const autoPopulateAddress =
        this.step === 1
          ? this.user.mailingAddress
          : this.user.billingInfo.address;
      const addressField =
        this.step === 1 ? this.autocomplete1 : this.autocomplete2;
      const place = addressField.getPlace().address_components;
      autoPopulateAddress.streetAddress =
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
      this.isAddressFieldEnable = true;
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
        this.user.billingInfo.address = {
          addressCountry: '',
          addressLocality: '',
          addressRegion: '',
          postOfficeBoxNumber: '',
          postalCode: '',
          streetAddress: ''
        };
      }
    },

    onSubmit() {
      this.$refs.billingInfo.validate().then(() => {
        this.createUserForOrganization(this.user);
      });
    }
  },

  computed: {
    ...mapGetters(['plans', 'contactTypes'])
  },

  created() {
    // this.getPlansInfo();
    const index = this.plans.findIndex(
      o => o.machineName === this.$route.query.plan
    );
    if (index > -1) {
      this.plan = index + 1;
      this.user.billingInfo.planInfo.id = this.plans[index].id;
      this.user.billingInfo.planInfo.name = this.plans[index].name;
      this.user.billingInfo.planInfo.machineName = this.plans[
        index
      ].machineName;
      // this.getContactTypes();
    } else {
      this.isValidPlan = false;
    }
  },

  mounted() {
    if (this.isValidPlan) {
      this.autocomplete1 = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete1'),
        { types: ['geocode'] }
      );
      this.autocomplete1.addListener('place_changed', this.fillInAddress);
    }
  },

  watch: {
    step(newValue, oldValue) {
      if (newValue === 2) {
        this.autocomplete2 = new google.maps.places.Autocomplete(
          document.getElementById('autocomplete2'),
          { types: ['geocode'] }
        );
        this.autocomplete2.addListener('place_changed', this.fillInAddress);
      }
    }
  }
};
</script>

<style lang="scss">
.signup-container {
  $size: 16px;
  $active-size: 36px;
  .q-stepper__dot {
    color: transparent !important;
    height: $active-size;

    .q-icon {
      height: $size;
      width: $size;
    }
  }

  .q-stepper__tab--active {
    .q-stepper__dot {
      height: $active-size;
      width: $active-size;

      .q-icon {
        height: $active-size;
        width: $active-size;
      }
    }
  }
}
.autocomplete-input {
  height: 56px;
  padding: 0 12px;
  margin-bottom: 20px;
  background: #f2f2f2;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.00937em;
  border: none;
  color: rgba(0, 0, 0, 0.87);
  outline: none;
}
</style>
