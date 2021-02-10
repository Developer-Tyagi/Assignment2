<template>
  <q-page>
    <div class="signup-container q-px-xl q-py-lg">
      <div class="row justify-between">
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
                    v-model="user.contact.email"
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
                      label="Bussiness Phone Number"
                      type="number"
                      style="width: 55%"
                      filled
                    />
                  </div>
                </div>

                <div class="column col-5">
                  <q-input
                    v-model="user.malingAddress.addressCountry"
                    name="country"
                    color="primary"
                    label="Country"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />

                  <q-input
                    v-model="user.malingAddress.addressRegion"
                    name="state"
                    color="primary"
                    label="State"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />

                  <div class="row justify-between">
                    <q-input
                      v-model="user.malingAddress.postOfficeBoxNumber"
                      name="city"
                      color="primary"
                      label="City"
                      filled
                      class="col-6"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || '']"
                    />
                    <q-input
                      v-model="user.malingAddress.postalCode"
                      name="zip"
                      color="primary"
                      label="ZIP Code"
                      filled
                      class="col-5"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || '']"
                    />
                  </div>

                  <q-input
                    v-model="user.malingAddress.streetAddress"
                    name="address1"
                    color="primary"
                    label="Address 1"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />

                  <q-input
                    v-model="user.malingAddress.addressLocality"
                    name="address2"
                    color="primary"
                    label="Address 2"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
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

            <q-step
              :name="2"
              ref="billingInfo"
              title="Company Billing & Payment"
            >
              <q-form
                @submit="onSubmit"
                @reset="step--"
                class="q-gutter-lg justify-between row wrap"
              >
                <div class="column col-5">
                  <div class="text-h5">Billing Info</div>

                  <q-input
                    v-model="user.billingInfo.name"
                    name="fullName"
                    color="primary"
                    label="First Name"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
                  <q-input
                    v-model="user.billingInfo.address.streetAddress"
                    name="address"
                    color="primary"
                    label="Address"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
                  <div class="row justify-between">
                    <q-input
                      v-model="user.billingInfo.address.addressRegion"
                      name="city"
                      color="primary"
                      label="City"
                      filled
                      class="col-6"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || '']"
                    />
                    <q-input
                      v-model="user.billingInfo.address.postalCode"
                      name="zip"
                      color="primary"
                      label="ZIP Code"
                      filled
                      class="col-5"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || '']"
                    />
                  </div>
                  <q-input
                    v-model="user.billingInfo.address.addressCountry"
                    name="country"
                    color="primary"
                    label="Country"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
                </div>

                <div class="column col-5">
                  <div class="text-h5">Credit Card Info</div>
                  <q-input
                    name="cardNumber"
                    color="primary"
                    label="Card Number"
                    type="number"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
                  <q-input
                    name="cardHolder"
                    color="primary"
                    label="Cardholder Name"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
                  <q-input
                    name="expiry"
                    color="primary"
                    label="Expiry Date"
                    type="month"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
                  <q-input
                    name="cvv"
                    color="primary"
                    label="CVV"
                    filled
                    lazy-rules
                    :rules="[val => (val && val.length === 3) || '']"
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
                    @click="bill"
                  />
                </div>
              </q-form>
            </q-step>
          </q-stepper>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Signup',

  data() {
    return {
      plan: 1,
      step: 2,
      selectedPlan: {
        id: '',
        name: '',
        machineName: '',
        price: ''
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
          phoneNumber: [{ type: 'mobile', number: '' }]
        },
        malingAddress: {
          addressCountry: '',
          addressLocality: '',
          addressRegion: '',
          postOfficeBoxNumber: '',
          postalCode: '',
          streetAddress: ''
        },
        billingInfo: {
          name: '',
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
    ...mapActions(['getPlansInfo', 'getContactTypes']),

    onPrevPlan() {
      this.plan--;
    },

    onNextPlan() {
      this.plan++;
    },

    onSubmitCompanyInfo() {
      this.$refs.companyInfo.validate().then(() => {
        this.step++;
      });
    },

    onSubmit() {
      // this.$router.push('/forgot-password');
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
    this.this.plan = index + 1;
    this.getContactTypes();
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
</style>
