<template>
  <q-page>
    <div class="signup-container q-pa-xl">
      <div class="row justify-between">
        <div class="col-3">
          <q-carousel
            v-model="plan"
            swipeable
            animated
            height="130px"
            class="bg-yellow-9 text-white rounded-borders"
          >
            <q-carousel-slide :name="1" class="column no-wrap justify-between">
              <div class="text-h5 text-weight-medium">Individual</div>
              <div>
                <div>
                  <span class="text-h5 text-weight-medium">$99</span>/mo
                </div>
                <div>Starting Price</div>
              </div>
            </q-carousel-slide>
            <q-carousel-slide :name="2" class="column no-wrap justify-between">
              <div class="text-h5 text-weight-medium">Basic</div>
              <div>
                <div>
                  <span class="text-h5 text-weight-medium">$199</span>/mo
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
              :disable="plan === 2"
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
                    plan == 1 ? '$99' : '$199'
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
            <q-step :name="1" title="User Details">
              <q-form @submit="step++" class="q-gutter-lg row justify-center">
                <q-input
                  name="firstName"
                  v-model="user.firstName"
                  color="primary"
                  label="First Name"
                  filled
                  class="col-5"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '']"
                />
                <q-input
                  name="country"
                  v-model="user.country"
                  color="primary"
                  label="Country"
                  filled
                  class="col-5"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '']"
                />
                <q-input
                  name="lastName"
                  v-model="user.lastName"
                  color="primary"
                  label="Last Name"
                  filled
                  class="col-5"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '']"
                />
                <q-input
                  name="state"
                  v-model="user.state"
                  color="primary"
                  label="State"
                  filled
                  class="col-5"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '']"
                />
                <q-input
                  name="businessName"
                  v-model="user.businessName"
                  color="primary"
                  label="Business Name"
                  filled
                  class="col-5"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '']"
                />
                <div class="row col-5 justify-between">
                  <q-input
                    name="city"
                    v-model="user.city"
                    color="primary"
                    label="City"
                    filled
                    class="col-6"
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
                  <q-input
                    name="zip"
                    v-model="user.zip"
                    color="primary"
                    label="ZIP Code"
                    filled
                    class="col-5"
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || '']"
                  />
                </div>
                <q-input
                  name="phone"
                  v-model="user.phone"
                  color="primary"
                  label="Contact Number"
                  filled
                  class="col-5"
                  lazy-rules
                  :rules="[val => (val && val.length > 10) || '']"
                />
                <q-input
                  name="address1"
                  v-model="user.address1"
                  color="primary"
                  label="Address 1"
                  filled
                  class="col-5"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '']"
                />
                <q-input
                  name="email"
                  v-model="user.email"
                  color="primary"
                  label="Email"
                  type="email"
                  filled
                  class="col-5"
                />
                <q-input
                  name="address2"
                  v-model="user.address2"
                  color="primary"
                  label="Address 2"
                  filled
                  class="col-5"
                />
                <q-separator />
                <div class="full-width q-px-xl">
                  <q-btn
                    @click="$refs.stepper.next()"
                    color="primary"
                    label="Next"
                    class="float-right q-px-lg"
                  />
                </div>
              </q-form>
            </q-step>

            <q-step :name="2" title="Payment">
              <q-form
                @submit="onSubmit"
                @reset="step--"
                class="q-gutter-lg row justify-center"
              >
                <div class="q-gutter-y-lg col-5">
                  <div class="text-h5">Billing Info</div>
                  <q-input
                    name="fullName"
                    v-model="billingInfo.fullName"
                    color="primary"
                    label="First Name"
                    filled
                    class="col-5"
                  />
                  <q-input
                    name="address"
                    v-model="billingInfo.address"
                    color="primary"
                    label="Address"
                    filled
                    class="col-5"
                  />
                  <div class="row justify-between">
                    <q-input
                      name="city"
                      v-model="user.city"
                      color="primary"
                      label="City"
                      filled
                      class="col-6"
                    />
                    <q-input
                      name="zip"
                      v-model="user.zip"
                      color="primary"
                      label="ZIP Code"
                      filled
                      class="col-5"
                    />
                  </div>
                  <q-input
                    name="country"
                    v-model="billingInfo.country"
                    color="primary"
                    label="Country"
                    filled
                    class="col-5"
                  />
                </div>

                <div class="q-gutter-y-lg col-5">
                  <div class="text-h5">Credit Card Info</div>
                  <q-input
                    name="cardNumber"
                    v-model="billingInfo.cardNumber"
                    color="primary"
                    label="Card Number"
                    filled
                  />
                  <q-input
                    name="cardHolder"
                    v-model="billingInfo.cardHolder"
                    color="primary"
                    label="Cardholder Name"
                    filled
                  />
                  <q-input
                    name="expiry"
                    v-model="billingInfo.expiry"
                    color="primary"
                    label="Expiry Date"
                    filled
                  />
                  <q-input
                    name="cvv"
                    v-model="billingInfo.cvv"
                    color="primary"
                    label="CVV"
                    filled
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
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'Signup',

  data() {
    return {
      plan: 1,
      step: 1,
      user: {
        firstName: '',
        lastName: '',
        businessName: '',
        phone: '',
        email: '',
        country: '',
        state: '',
        city: '',
        zip: '',
        address1: '',
        address2: ''
      },
      selectedPlan: '',
      billingInfo: {
        fullName: '',
        country: '',
        state: '',
        city: '',
        zip: '',
        address: '',
        cardNumber: '',
        cardHolder: '',
        expiry: '',
        cvv: ''
      }
    };
  },
  methods: {
    onPrevPlan() {
      this.plan--;
    },
    onNextPlan() {
      this.plan++;
    },
    onSubmit() {
      this.$router.push('/forgot-password');
    }
  },

  created() {
    this.selectedPlan = this.$route.params.id;
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
