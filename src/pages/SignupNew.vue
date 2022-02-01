<template>
  <q-page class="full-height ">
    <div class="row" style="height: calc(100vh - 1px);">
      <div class="col-6  q-pt-xl" style="background-color: #f9e7d8">
        <div class=" row justify-center q-mt-xl ">
          <div class="col-3 bg-white q-pa-md">
            <q-img
              class="web-menu-claim-guru-logo"
              :src="getImage('claimguru_new_logo.png')"
            />
          </div>
        </div>
        <div class="row justify-center q-mt-xl text-h2">
          Start a free 30 day trial Today!
        </div>
        <div class="q-mt-xl text text-h5 q-px-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          quidem cupiditate voluptatum similique assumenda Lorem ipsum dolor sit
          amet consectetur adipisicing elit.
        </div>
        <div class=" column q-mt-lg q-px-xl">
          <div class="col">
            <q-icon name="check_box" color="green" size="lg" />
            <span class="text-green text-h6">
              Get full access to ClaimGuru for 30 days.</span
            >
          </div>
          <div class="col q-mt-md">
            <q-icon name="check_box" color="green" size="lg" />
            <span class="text-green text-h6"> No Credit Card required.</span>
          </div>
          <div class="col q-mt-md">
            <q-icon name="check_box" color="green" size="lg" />
            <span class="text-green text-h6">
              No auto-charge after the trial ends.</span
            >
          </div>
        </div>
        <div class="row justify-center text-h6 q-my-xl">
          <span
            >Want to learn more about our
            <a href="" class="text-blue">pricing</a>? Need
            <a class="text-blue" href=""> support</a>?
          </span>
        </div>
      </div>
      <!-- signup form -->
      <div class="col-6 q-pa-xl bg-white ">
        <q-form class="q-mt-xl" @submit="onSubmit()" ref="orgInfo">
          <div class="row q-mb-lg q-mt-xl">
            <div class="col q-mr-lg">
              <q-input
                name="firstName"
                v-model="user.contact.fname"
                color="primary"
                label="First Name"
                class="required"
                input-class=""
                outlined
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill first name'
                ]"
              />
            </div>

            <div class="col">
              <q-input
                v-model="user.contact.lname"
                name="lastName"
                color="primary"
                label="Last Name"
                class="required"
                outlined
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill last name'
                ]"
              />
            </div>
          </div>
          <div class="row q-mb-lg">
            <q-input
              v-model="user.email"
              name="email"
              color="primary"
              label="Email"
              class="required full-width"
              outlined
              lazy-rules
              :rules="[
                val => validateEmail(val) || 'Please fill your email',
                val => checkEmailExist(val) || 'This email is already in use'
              ]"
            />
            <span class="text-red text-caption">{{ errorMSG }}</span>
          </div>
          <div class="row q-mb-lg">
            <q-input
              v-model="user.name"
              name="businessName"
              color="primary"
              label="Company"
              class="required full-width"
              outlined
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please fill company name'
              ]"
            />
          </div>
          <div class="row q-mb-lg text-h6">
            <div class="col-1 q-pt-sm text-bold">Role *</div>
            <div class="col">
              <q-option-group
                v-model="group"
                :options="options"
                color="primary"
                type="radio"
                class=""
              />
            </div>
          </div>
          <div class="row q-mb-xl text-h6">
            <div class="row full-width q-mb-lg text-bold">
              How did you hear about ClaimGuru?
            </div>
            <div class="row">
              <q-option-group
                v-model="user.heardCGFrom"
                :options="hearOptions"
                inline
                color="primary"
                type="checkbox"
              />
            </div>
          </div>
          <div class="row justify-center">
            <q-btn
              label="Start your Free Trial"
              no-caps
              size="lg"
              type="submit"
              color="green"
            />
          </div>
        </q-form>
        <!-- app links -->
        <div class="row justify-center q-mt-lg">
          <div class="text-h5">Already signed up? Grab the mobile app!!!</div>
        </div>

        <div class="row justify-center q-mt-xl">
          <div class="col-3 bg-white q-pa-md q-mr-md">
            <q-img
              class="web-menu-claim-guru-logo"
              :src="getImage('Mobile_app_store_badge.svg')"
            />
          </div>
          <div class="col-3 bg-white q-pa-md">
            <a
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.claimguru.app"
            >
              <q-img
                class="web-menu-claim-guru-logo"
                :src="getImage('Mobile_app_store_badge-1.svg')"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { constants } from '@utils/constant';
import { validateEmail } from '@utils/validation';

export default {
  data() {
    return {
      errorMSG: '',
      user: {
        type: constants.ORGANIZATION,
        name: '',
        email: '',
        contact: {
          fname: '',
          lname: '',
          email: ''
        },
        plan: {
          name: 'Beta',
          machineValue: 'beta'
        },
        heardCGFrom: [],
        roles: []
      },
      group: {},
      options: [
        {
          label: 'Private Adjuster',
          value: {
            value: 'Private Adjuster',
            machineValue: 'private_adjuster',
            isPaid: true
          }
        },
        {
          label: 'Owner of Adjusting Firm',
          value: {
            value: 'Owner',
            machineValue: 'owner',
            isPaid: true
          }
        }
      ],
      hearOptions: [
        {
          label: 'Online Ad',
          value: 'Online Ad'
        },
        {
          label: 'Podcast',
          value: 'Podcast'
        },
        {
          label: 'Social Media',
          value: 'Social Media'
        },
        {
          label: 'Friend/CoWorker',
          value: 'Friend/CoWorker'
        },
        {
          label: 'Web Search',
          value: 'Web Search'
        },
        {
          label: 'Online Community',
          value: 'Online Community'
        }
      ]
    };
  },
  methods: {
    ...mapActions([
      'getAllPlans',
      'createUserForOrganization',
      'checkExistingEmail'
    ]),
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

    onSubmit() {
      this.user.contact.email = this.user.email;

      this.user.roles.push(this.group);
      if (this.user.heardCGFrom.length < 1) {
        this.user.heardCGFrom[0] = 'not-specified';
      }
      this.createUserForOrganization(this.user);
    },
    validateEmail
  },

  computed: {
    ...mapGetters(['plans', 'contactTypes', 'planInfo'])
  },

  async created() {
    await this.getAllPlans();
  },

  mounted() {
    // if (this.isValidPlan) {
    //   this.user.mailingAddress.addressCountry = 'United States';
    //   this.user.billingInfo.address.addressCountry = 'United States';
    //   this.states = addressService.getStates(
    //     this.user.mailingAddress.addressCountry
    //   );
    //   this.autocomplete1 = new google.maps.places.Autocomplete(
    //     document.getElementById('autocomplete1'),
    //     { types: ['geocode'], componentRestrictions: { country: 'us' } }
    //   );
    //   this.autocomplete1.addListener('place_changed', this.fillInAddress);
    // }
  },

  watch: {
    // step(newValue, oldValue) {
    //   if (newValue === 2) {
    //     this.user.billingInfo.address = { ...this.user.mailingAddress };
    //   }
    // }
  }
};
</script>
