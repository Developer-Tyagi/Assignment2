<template>
  <q-page class="poppinsFont">
    <div class="text-h5 fontWeight600">Billing</div>
    <AddNewUser
      @closeUserDialog="CloseDialog($event)"
      :showDialog="addAdditionalUser"
    />
    <div class="row">
      <!-- package div -->
      <div
        class="col q-mt-lg q-mr-xl q-pt-md q-px-md q-pb-md"
        style="
          min-width: 345px;

          border: 1px solid #e8e9ec;
          border-radius: 10px;
          box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
          box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.1);
        "
      >
        <div class="row justify-between">
          <div class="col fontWeight500" style="font-size: 20px">
            {{ organization.plan.value }}
          </div>
          <div class="col row justify-end q-pr-lg q-mt-sm">
            <span class="fontWeight600 text-h5 q-mr-xs">$</span
            ><span
              v-if="organization.plan.value == 'Firm Package'"
              class="fontWeight600 text-h4"
              >250</span
            ><span
              v-if="organization.plan.value == 'Individual Package'"
              class="fontWeight600 text-h4"
              >125</span
            ><span class="fontWeight500 text-subtitle1 q-pt-sm">/mos</span>
          </div>
        </div>
        <div
          class="q-mt-md"
          v-for="role in organization.plan.roles"
          :key="role.machineValue"
        >
          <div>
            <q-img
              class="q-mb-xs q-mr-sm"
              :src="getImage('Check_icon_billing.svg')"
              width="3%"
              height="3%"
            />
            <span class="q-ml-xs">{{
              role.count == -1 ? 'Unlimited' : role.count
            }}</span>
            <span class="q-ml-xs">{{ role.value }}</span>
          </div>
        </div>

        <div
          class="q-mt-lg"
          v-if="organization.plan.value == 'Individual Package'"
        >
          <q-separator />
          <div
            class="q-mt-md text-primary text-right cursor-pointer"
            @click="openUpgradePlanDialog()"
          >
            Upgrade to Firm Package <q-icon name="north_east" color="primary" />
          </div>
        </div>
      </div>
      <!-- payment method -->
      <div
        class="col q-mt-lg q-pt-md q-px-md q-pb-md"
        style="
          min-width: 345px;
          border: 1px solid #e8e9ec;
          border-radius: 10px;
          box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
          box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.1);
        "
      >
        <div class="fontWeight500" style="font-size: 20px">Payment method</div>
        <div class="q-mt-xs" style="color: #667085">
          Change how you pay for your package.
        </div>
        <div
          class="q-mt-md q-py-lg q-px-sm"
          style="border: 1px solid #e4e7ec; border-radius: 10px"
        >
          <div class="row q-pa-sm">
            <q-img
              class="col-2"
              src="~assets/visa_logo.svg"
              style="height: 15%; width: 13%"
            />
            <div class="col-8 q-pl-xl">
              <span class="fontWeight500"
                >{{ cardData.brand }} ending in
                {{ cardData.lastFourDigits }}</span
              >
              <br />
              <span class="fontWeight400" style="color: #667085"
                >Expiry {{ cardData.expMonth }}/{{ cardData.expYear }}</span
              >
            </div>
            <q-btn
              flat
              class="col-2 text-black"
              color="white"
              label="Edit"
              @click="openEditDialog()"
              style="border: 1px solid #d0d5dd; border-radius: 10px"
            />
          </div>
          <div class="row q-mt-md q-ml-lg q-pl-sm" style="color: #667085">
            <div class="col-2"></div>
            <div class="col-8">
              <q-icon class="q-mr-xs q-mt-xs" size="sm"
                ><q-img
                  class="q-mb-xs q-mr-sm"
                  :src="getImage('mailbox.svg')"
                /> </q-icon
              >{{ organization.email }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- additional user -->
    <div
      v-if="organization.plan.value == 'Firm Package'"
      class="col q-mt-lg q-pt-lg q-px-md"
      style="
        min-width: 345px;

        border: 1px solid #e8e9ec;
        border-radius: 10px;
        box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
        box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.1);
      "
    >
      <div class="row q-px-xl q-pb-md fontWeight600">
        <q-btn
          class="q-mr-md fontWeight600 text-subtitle1"
          outline
          no-caps
          icon="add_circle"
          color="primary"
          label="Add an Additional User"
          @click="openAdditionalUserDialog()"
          style="border-radius: 10px; min-width: 280px; max-width: 540px"
        />
        <div
          class="row justify-start q-pl-sm q-mt-md"
          style="min-width: 345px; max-width: 540px"
        >
          <span class="fontWeight600 text-h5 q-mr-xs">$</span
          ><span class="fontWeight600 text-h4">50</span
          ><span
            class="fontWeight500 text-subtitle1 q-pt-sm"
            style="color: #667085"
            >/month per user*</span
          >
        </div>
      </div>
    </div>

    <!-- billing history -->
    <div class="text-h5 fontWeight600 q-mt-xl">Billing history</div>

    <div class="q-mt-md" style="border: 1px solid #e4e7ec; border-radius: 8px">
      <div
        class="col-12"
        v-if="$q.screen.gt.sm"
        style="border-bottom: 1px solid #e4e7ec"
      >
        <div class="row text-caption">
          <span class="col-4 q-pl-md q-py-md fontWeight500 text-grey1"
            >Order</span
          >
          <span class="col-2 q-pl-md q-py-md fontWeight500 text-grey1"
            >Amount</span
          >
          <span class="col-3 q-pl-md q-py-md fontWeight500 text-grey1"
            >Date</span
          >
          <span class="col-2 q-pl-md q-py-md fontWeight500 text-grey1"
            >Status</span
          >
          <span class="col-1 q-pl-md q-py-md fontWeight500 text-grey1"></span>
        </div>
      </div>
      <div
        class="col-12"
        v-if="$q.screen.gt.sm"
        style="border-bottom: 1px solid #e4e7ec"
      >
        <div v-for="(bill, index) in billingData" :key="index">
          <div class="row" style="border-bottom: 1px solid #e4e7ec">
            <span class="col-4 q-pl-md q-py-md fontWeight500">{{
              '# ' + bill.id
            }}</span>
            <span class="col-2 q-pl-md q-py-md fontWeight500 text-grey1">{{
              bill.attributes.amountPaid
            }}</span>
            <span class="col-3 q-pl-md q-py-md fontWeight500 text-grey1">{{
              createDate(bill.attributes.created)
            }}</span>
            <span
              class="col-2 q-pl-md q-py-md fontWeight500 text-grey1 text-caption"
              >{{ bill.attributes.status }}</span
            >
            <span class="col-1 q-pl-lg q-py-md fontWeight500">
              <a :href="bill.attributes.downloadLink">
                <q-icon size="sm">
                  <q-img
                    class="q-mb-xs q-mr-sm"
                    :src="getImage('download_cloud.svg')"
                  />
                </q-icon>
              </a>
            </span>
          </div>
        </div>
      </div>
      <div v-else class="col-12">
        <div v-for="(bill, index) in billingData" :key="index">
          <div>{{ '# ' + bill.id }}</div>
          <div class="q-mt-md" style="border-bottom: 1px solid #e4e7ec">
            <span class="q-mr-md">{{ bill.attributes.amountPaid }}</span>
            <span class="q-mr-md">{{ bill.attributes.created }}</span>
            <span class="q-mr-md">{{ bill.attributes.status }}</span>
            <span class="col-1 q-mr-md q-pl-lg q-py-md fontWeight500">
              <a :href="bill.attributes.downloadLink">
                <q-icon size="sm">
                  <q-img
                    class="q-mb-xs q-mr-sm"
                    :src="getImage('download_cloud.svg')"
                  />
                </q-icon>
              </a>
            </span>
          </div>
        </div>
      </div>

      <div class="col-12 row justify-between q-pt-sm">
        <div class="col-1 q-pl-md">
          <q-icon
            @click="paginationValue > 1 ? decreasePaginationValue() : ''"
            size="md"
          >
            <q-img
              class="q-mb-xs q-mr-sm"
              :src="getImage('arrow_circle_left.svg')"
          /></q-icon>
        </div>
        <div class="col-10 text-center q-pt-xs">
          Page {{ this.paginationValue }}
        </div>
        <div class="col-1" @click="hasMore ? increasePaginationValue() : ''">
          <q-icon class="float-right q-pr-md" size="md">
            <q-img
              class="q-mb-xs q-mr-sm"
              :src="getImage('arrow_circle_right.svg')"
            />
          </q-icon>
        </div>
      </div>
    </div>

    <!-- Edit payment Dialog -->
    <q-dialog v-model="icon">
      <q-card class="full-width" style="max-width: 600px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 fontWeight600">Edit Payment</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form class="q-mt-md" @submit="onPaymentClick()" ref="orgInfo">
            <div>{{ displayErrors }}</div>
            <div class="q-mt-lg"></div>
            <div id="card-errors" class="q-my-lg"></div>
            <label class="text-subtitle1 text-weight-bold">Card Number</label>
            <div
              id="card-number"
              class="cardInfo f-w-500 text-body1 border-top-left-right q-mt-xs q-mb-lg"
            >
              <!-- a Stripe Element will be inserted. -->
            </div>

            <label class="text-subtitle1 text-weight-bold">Name on Card</label>
            <q-input
              borderless
              class="bg-white cardInfo text-body1 q-mt-xs q-mb-lg"
              :class="cardName == '' ? 'input-placeholder' : 'input-text-style'"
              ref="cardName"
              name="name"
              v-model="cardName"
              maxlength="50"
              id="card-name"
              autocomplete="cc-name"
              placeholder="Enter Name on Card"
            />

            <div class="row justify-between">
              <div class="col-6 q-pr-md">
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
              <div class="col-6 q-pl-xs">
                <label class="text-subtitle1 text-weight-bold">CVC</label>
                <div
                  id="card-cvc"
                  class="cardInfo text-body1 border-bottom-right q-mt-xs"
                >
                  <!-- a Stripe Element will be inserted. -->
                </div>
              </div>
            </div>

            <div class="row justify-between q-mt-xl">
              <q-btn
                label="Cancel"
                v-close-popup
                no-caps
                outline
                color="deep-orange"
                size="1rem"
              />
              <q-btn
                label="Save Payment"
                no-caps
                type="submit"
                color="deep-orange"
                size="1rem"
              />
            </div>
            <div class="q-mt-md"></div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Upgrade Plan Dialog -->
    <q-dialog v-model="upgradePlanDialog">
      <q-card class="full-width" style="max-width: 400px">
        <q-card-section class="text-center q-pb-none">
          <div class="text-h6 fontWeight500">
            Do you wish to upgrade your account?
          </div>
        </q-card-section>
        <q-card-section
          class="q-mx-xl q-my-lg"
          style="border: 1px solid black; border-radius: 8px"
        >
          <div class="row justify-center q-pb-md q-pt-sm">
            <div class="row justify-center">
              <q-icon class="" size="3em">
                <q-img :src="getImage('Featured icon (1).svg')" />
              </q-icon>
            </div>
          </div>
          <div class="text-subtitle1 fontWeight600 text-bold text-center">
            Firm Package
          </div>
          <div class="text-subtitle1 fontWeight600 text-bold text-center">
            $250
            <span class="text-grey text-subtitle2 fontWeight400">/month</span>
          </div>
          <div
            class="q-my-sm q-ml-xl"
            v-for="firmPackage in firmPackages"
            :key="firmPackage"
          >
            <div class="row justify-start">
              <q-icon size="xs">
                <q-img :src="getImage('check.svg')" />
              </q-icon>
              <span class="text-center q-ml-sm">
                {{ firmPackage }}
              </span>
            </div>
          </div>
          <div
            class="q-pt-md text-blue-grey text-center fontWeight400 text-caption"
          >
            Additional licenses at $50/month
          </div>

          <div
            class="q-mt-sm q-pl-lg q-ml-md q-mb-sm fontWeight400 text-blue-grey"
            style="font-size: 10px"
          >
            * Vendor roles are limited
          </div>
        </q-card-section>

        <div class="q-mx-xl q-mb-lg">
          <div class="row justify-between">
            <q-btn
              class="col q-mr-md"
              v-close-popup
              label="Cancel"
              no-caps
              outline
              color="deep-orange"
              size="1rem"
            />
            <q-btn
              class="col"
              label="Confirm"
              no-caps
              @click="upgradePackage()"
              color="deep-orange"
              size="1rem"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
const stripe = Stripe(`${process.env.STRIPE_API_KEY}`);
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { isMobile } from '@utils/common';
import { validateEmail } from '@utils/validation';
import { getToken } from '@utils/auth';
import AddNewUser from '../components/AddNewUser.vue';

export default {
  components: { AddNewUser },
  data() {
    return {
      firmPackages: [
        '3 Claims Manager',
        '1 Office Manager',
        '3 Office Staff',
        'Unlimited Vendors *'
      ],
      displayErrors: '',
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      cardData: {},
      paginationValue: 1,
      totalRecordsPerPage: 8,
      icon: false,
      upgradePlanDialog: false,
      addAdditionalUser: false,
      stripeToken: '',
      billingData: [],
      userRole: [
        {
          label: 'Paid',
          children: []
        },
        {
          label: 'Unpaid',
          children: []
        }
      ],
      user: {
        firstName: '',
        lastName: '',
        role: '',
        email: ''
      },
      hasMore: false
    };
  },
  methods: {
    ...mapActions([
      'getCardInfo',
      'addNewCard',
      'upgradePlan',
      'getOrgInvoices',
      'getRoles',
      'getAllPlans',
      'addAdditionalLicense'
    ]),
    ...mapMutations(['setLoading', 'setNotifications']),
    isMobile,
    validateEmail,
    getImage(icon) {
      return require('../assets/' + icon);
    },
    async increasePaginationValue() {
      this.paginationValue++;
      const payload = {
        limit: 8,
        startingAfter: this.billingData[7].id,
        endingBefore: ''
      };
      this.getInvoices(payload);
    },
    async decreasePaginationValue() {
      this.paginationValue--;
      const payload = {
        limit: 8,
        startingAfter: '',
        endingBefore: this.billingData[1].id
      };
      this.getInvoices(payload);
    },
    openEditDialog() {
      this.icon = true;
      const myTimeout = setTimeout(this.setPaymentPage, 0);
    },
    openAdditionalUserDialog() {
      if (this.addAdditionalUser == true) {
        this.addAdditionalUser = false;
      }
      this.addAdditionalUser = true;
    },
    CloseDialog(val) {
      if (val == false) {
        this.addAdditionalUser = false;
      } else {
        this.addAdditionalUser = true;
      }
    },
    openUpgradePlanDialog() {
      this.upgradePlanDialog = true;
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
      if (displayError !== undefined) {
        this.setLoading(false);
        return;
      }
      this.stripeToken = token;
      const payload = {
        stripeToken: this.stripeToken
      };
      const res = await this.addNewCard(payload);
      this.setLoading(false);
      // show confirmation toast msg
      this.icon = false;
    },
    createToken() {
      // Gather additional customer data we may have collected in our form.
      var additionalData = { name: this.cardName };
      // Important: Although we're submitting several fields, use cardNumber here instead of 'elements'.
      return stripe.createToken(this.cardNumber, additionalData);
    },
    async upgradePackage() {
      const payload = {
        plan: {
          value: 'Firm Package',
          machineValue: 'firm_package',
          stripePriceID: 'price_1KRbkoEK8DUf1aFSK6zeWcfk',
          stripeProductID: 'prod_L7rTDXkekxbZsk'
        }
      };
      await this.upgradePlan(payload);
      this.upgradePlanDialog = false;
    },
    async addExtraUser() {
      const success = await this.$refs.userInfo.validate();

      // if (success) {
      //   await this.addUser(this.users);
      //   await this.getAllUsers();
      //   this.addUserDialogBox = false;
      //   this.users = {
      //     type: 'user',
      //     contact: {
      //       fname: '',
      //       lname: ''
      //     },
      //     email: '',
      //     roles: [{ value: '', machineValue: '', isPaid: '' }]
      //   };
      //   this.selectedRole = '';
      // }
    },
    async getInvoices(payload) {
      let result = await this.getOrgInvoices(payload);
      this.billingData = result.data;
      this.hasMore = result.meta.hasMore;
    },
    createDate(date1) {
      const month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      var date = new Date(date1);
      return (
        month[date.getMonth() + 1] +
        ' ' +
        date.getDate() +
        ', ' +
        date.getFullYear()
      );
    }
  },
  computed: {
    ...mapGetters(['organization'])
  },
  async created() {
    let cardInfo = await this.getCardInfo();
    this.cardData = cardInfo.attributes.cards[0];
    const payload = {
      limit: 8,
      startingAfter: '',
      endingBefore: ''
    };
    this.getInvoices(payload);
    await this.getRoles();
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
