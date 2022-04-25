<template>
  <q-page class="poppinsFont">
    <div class="text-h5 fontWeight600 q-mt-md">Billing</div>
    <AddNewUser
      @closeUserDialog="CloseDialog($event)"
      :showDialog="addAdditionalUser"
    />
    <div class="row q-gutter-lg" style="margin-top: 30px">
      <!-- package div -->
      <div
        class="col q-mt-lg q-pb-sm"
        style="
          padding: 24px 24px;
          min-width: 345px;
          border: 1px solid #e8e9ec;
          border-radius: 8px;
          box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
          box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.1);
        "
      >
        <div class="row justify-between">
          <div
            class="col fontWeight500"
            style="font-size: 18px; line-height: 28px; color: #101828"
          >
            {{ organization.plan.value }}
          </div>
          <div class="col row justify-end">
            <span
              class="fontWeight600 text-h5 q-mr-xs"
              style="font-size: 30px; line-height: 44px; margin: 6px 0px"
              >$</span
            ><span
              v-if="organization.plan.value == 'Firm Package'"
              class="fontWeight600"
              style="
                color: #101828;
                font-size: 36px;
                line-height: 60px;
                margin: 0px 2px;
              "
              >250</span
            ><span
              v-if="organization.plan.value == 'Individual Package'"
              class="fontWeight600 text-h4"
              style="
                color: #101828;
                font-size: 36px;
                line-height: 60px;
                margin: 0px 2px;
              "
              >125</span
            ><span
              class="fontWeight500 text-subtitle1 q-pt-sm"
              style="margin-top: 15px; color: #667085"
              >/mo</span
            >
          </div>
        </div>
        <div
          style="margin-top: 2px"
          v-for="role in organization.plan.roles"
          :key="role.machineValue"
        >
          <div>
            <q-img
              class="q-mb-xs q-mr-sm"
              :src="getImage('Check_icon_billing.svg')"
              width="4%"
              height="4%"
              style="max-width: 20px; max-height: 20px"
            />
            <span
              class="q-ml-xs text-grey1"
              style="line-height: 28px; color: #667085"
              >{{ role.count == -1 ? 'Unlimited' : role.count }}</span
            >
            <span
              class="q-ml-xs text-grey1"
              style="line-height: 28px; color: #667085"
              >{{ role.value }}</span
            >
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
        class="col q-mt-lg q-pb-md"
        style="
          padding: 24px;
          min-width: 345px;
          border: 1px solid #e8e9ec;
          border-radius: 8px;
          box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
          box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.1);
        "
      >
        <div
          class="fontWeight500"
          style="font-size: 18px; line-height: 28px; color: #101828"
        >
          Payment method
        </div>
        <div
          class="q-mt-xs"
          style="
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #667085;
          "
        >
          Change how you pay for your package.
        </div>
        <div
          class="q-py-sm q-px-sm"
          style="
            border: 1px solid #e4e7ec;
            border-radius: 10px;
            margin: 20px 0px;
          "
        >
          <div class="row q-px-sm q-pt-sm">
            <div class="col-2">
              <q-img
                v-if="cardData.brand == 'Visa'"
                src="~assets/visa_logo.svg"
                style="border: 1px solid #f2f4f7; height: 40px; width: 60px"
              />

              <q-img
                v-if="cardData.brand == 'MasterCard'"
                src="~assets/mc_symbol.svg"
                style="border: 1px solid #f2f4f7; height: 40px; width: 60px"
              />
              <q-img
                v-if="cardData.brand == 'American Express'"
                src="~assets/90120_card_512x512.png"
                style="border: 1px solid #f2f4f7; height: 40px; width: 60px"
              />
            </div>

            <div class="col-8 row q-pl-lg">
              <div class="col-12">
                <span
                  class="fontWeight500"
                  style="font-size: 14px; line-height: 20px; color: #344054"
                  >{{ cardData.brand }} ending in
                  {{ cardData.lastFourDigits }}</span
                >
                <br />
                <span
                  class="fontWeight400"
                  style="font-size: 14px; line-height: 20px; color: #667085"
                >
                  Expiry {{ expMonth }}/{{ cardData.expYear }}</span
                >
              </div>
            </div>
            <div class="col-2">
              <q-btn
                flat
                no-caps
                class="text-black float-right"
                color="white"
                label="Edit"
                @click="openEditDialog()"
                style="
                  border: 1px solid #d0d5dd;
                  border-radius: 8px;
                  max-width: 58px;
                "
              />
            </div>
          </div>
          <div class="row text-grey1 q-px-sm no-wrap">
            <div class="col-2"></div>
            <div class="col-10 q-pl-lg ellipsis">
              <q-icon class="q-mr-xs q-pt-xs" size="1em"
                ><q-img
                  class="q-mb-xs"
                  :src="getImage('mailbox.svg')"
                /> </q-icon
              ><span
                style="font-size: 14px; line-height: 20px; color: #667085"
                >{{ organization.email }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- additional user -->
    <div
      v-if="organization.plan.value == 'Firm Package'"
      class="col q-mt-lg q-pt-md q-px-md"
      style="
        min-width: 345px;
        border: 1px solid #e8e9ec;
        border-radius: 10px;
        box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
        box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.1);
      "
    >
      <div class="row q-px-lg q-pb-md fontWeight600">
        <q-btn
          class="col-3 q-mr-md fontWeight600 text-subtitle1"
          outline
          no-caps
          color="primary"
          @click="openAdditionalUserDialog()"
          style="
            border-radius: 10px;
            min-width: 280px;
            max-width: 540px;
            height: 44px;
          "
        >
          <q-icon class="q-mr-sm" style="height: 17px; width: 17px">
            <q-img :src="getImage('addIconNew.svg')" />
          </q-icon>
          Add an Additional User
        </q-btn>
        <div
          class="col-2 row justify-start q-pl-sm"
          style="min-width: 300px; max-width: 540px"
        >
          <span class="fontWeight600 text-h5 q-mr-xs">$</span
          ><span class="fontWeight600 text-h4">50</span
          ><span class="fontWeight500 text-subtitle1 q-pt-sm text-grey1 q-pt-md"
            >/month per user*</span
          >
        </div>
      </div>
    </div>

    <!-- billing history -->
    <div class="text-h5 fontWeight600 q-mt-xl">Billing history</div>

    <div
      style="
        box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
        box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.1);
        border: 1px solid #e4e7ec;
        border-radius: 8px;
        margin-top: 30px;
      "
    >
      <div
        class="col-12"
        v-if="$q.screen.gt.sm"
        style="border-bottom: 1px solid #e4e7ec; background: #f9fafb"
      >
        <div class="row">
          <span
            class="col-4 q-pl-md q-py-md fontWeight500"
            style="font-size: 12px; line-height: 18px; color: #667085"
            >Order</span
          >
          <span
            class="col-2 q-pl-md q-py-md fontWeight500"
            style="font-size: 12px; line-height: 18px; color: #667085"
            >Amount</span
          >
          <span
            class="col-3 q-pl-md q-py-md fontWeight500"
            style="font-size: 12px; line-height: 18px; color: #667085"
            >Date</span
          >
          <span
            class="col-2 q-pl-md q-py-md fontWeight500"
            style="font-size: 12px; line-height: 18px; color: #667085"
            >Status</span
          >
          <span
            class="col-1 q-pl-md q-py-md fontWeight500"
            style="font-size: 12px; line-height: 18px; color: #667085"
          ></span>
        </div>
      </div>
      <div
        class="col-12"
        v-if="$q.screen.gt.sm"
        style="border-bottom: 1px solid #e4e7ec"
      >
        <div v-for="(bill, index) in billingData" :key="index">
          <div
            class="row"
            style="
              border-bottom: 1px solid #e4e7ec;
              padding-top: 26px;
              padding-bottom: 26px;
            "
          >
            <span
              class="col-4 q-pl-md fontWeight500"
              style="font-size: 14px; line-height: 20px; color: #101828"
              >{{ '# ' + bill.id }}</span
            >
            <span
              class="col-2 q-pl-md fontWeight500"
              style="font-size: 14px; line-height: 20px; color: #667085"
              >USD ${{ (bill.attributes.amountPaid / 100).toFixed(2) }}</span
            >
            <span
              class="col-3 q-pl-md fontWeight500"
              style="font-size: 14px; line-height: 20px; color: #667085"
              >{{ createDate(bill.attributes.created) }}</span
            >
            <span
              class="col-2 q-pl-md fontWeight500 text-grey1 text-capitalize text-caption"
              style="color: #027a48"
              ><span
                class="q-px-sm"
                style="
                  color: #027a48;
                  background-color: #ecfdf3;
                  border-radius: 16px;
                  line-height: 18px;
                "
              >
                <q-icon name="check" size="1em" style="color: #12b76a" />
                {{ bill.attributes.status }}</span
              ></span
            >
            <span class="col-1 q-pl-lg fontWeight500">
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
        <div
          v-for="(bill, index) in billingData"
          :key="index"
          class="row q-pb-xs"
        >
          <div class="col-12 q-px-md q-mt-md text-bold">
            <div>{{ '# ' + bill.id }}</div>
          </div>

          <div
            class="col-12 row q-pb-sm q-px-md q-mt-sm"
            style="border-bottom: 1px solid #e4e7ec"
          >
            <span class="col-4 text-left"
              >USD ${{ (bill.attributes.amountPaid / 100).toFixed(2) }}</span
            >
            <span class="col-4">{{ createDate(bill.attributes.created) }}</span>
            <span class="col-3"
              ><span
                class="q-px-sm"
                style="
                  color: #027a48;
                  background-color: #ecfdf3;
                  border-radius: 16px;
                  line-height: 18px;
                "
              >
                <q-icon name="check" size="1em" style="color: #12b76a" />
                {{ bill.attributes.status }}</span
              ></span
            >
            <span class="col-1 text-center">
              <a :href="bill.attributes.downloadLink">
                <q-icon size="xs">
                  <q-img class="" :src="getImage('download_cloud.svg')" />
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
        <div
          class="col-10 text-center q-pt-xs"
          style="font-size: 14px; line-height: 20px; color: #667085"
        >
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

    <div
      class="text-grey1 fontWeight400"
      v-if="$q.screen.gt.sm"
      style="font-size: 16px; line-height: 20px; margin-top: 20px"
    >
      *You will be charged a pro-rated for the current month
    </div>

    <!-- Edit payment Dialog -->
    <q-dialog v-model="icon" persistent>
      <q-card
        class="full-width poppinsFont"
        style="
          max-width: 600px;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
            0px 8px 8px -4px rgba(16, 24, 40, 0.04);
        "
      >
        <div class="row items-center q-pb-none">
          <div
            class="fontWeight600"
            style="font-size: 20px; line-height: 24px; color: #101828"
          >
            Edit Payment
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </div>

        <div>
          <q-form
            style="margin-top: 24px"
            @submit="onPaymentClick()"
            ref="orgInfo"
          >
            <!-- <div class="" style="color:#D92D20">{{ displayErrors }}</div> -->
            <div class=""></div>
            <div id="card-errors" class="q-my-lg" style="color: #d92d20">
              {{ displayErrors }}
            </div>
            <label
              class="fontWeight600"
              style="font-size: 16px; line-height: 24px; color: #152141"
              >Card Number</label
            >
            <div
              id="card-number"
              class="cardInfo f-w-500 text-body1 border-top-left-right q-mt-xs q-mb-lg"
            >
              <!-- a Stripe Element will be inserted. -->
            </div>

            <label
              class="fontWeight600"
              style="font-size: 16px; line-height: 24px; color: #152141"
              >Name on Card</label
            >
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
                <label
                  class="fontWeight600"
                  style="font-size: 16px; line-height: 24px; color: #152141"
                  >Expiration Date</label
                >
                <div
                  id="card-expiry"
                  class="cardInfo text-body1 border-bottom-right q-mt-xs"
                >
                  <!-- a Stripe Element will be inserted. -->
                </div>
              </div>
              <div class="col-6 q-pl-xs">
                <label
                  class="fontWeight600"
                  style="font-size: 16px; line-height: 24px; color: #152141"
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

            <div class="row justify-between q-mt-xl">
              <q-btn
                label="Cancel"
                v-close-popup
                no-caps
                outline
                color="deep-orange"
                size="1rem"
                style="border-radius: 10px; width: 118px; height: 50px"
                @click="closeEditPayment()"
              />
              <q-btn
                label="Save Payment"
                no-caps
                type="submit"
                color="deep-orange"
                size="1rem"
                style="border-radius: 10px; width: 190px; height: 50px"
              />
            </div>
            <div class=""></div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>

    <!-- Upgrade Plan Dialog -->
    <q-dialog v-model="upgradePlanDialog" persistent>
      <q-card
        class="full-width poppinsFont"
        style="max-width: 400px; border-radius: 12px; padding: 24px"
      >
        <div class="text-center q-pb-none">
          <div class="fontWeight500" style="font-size: 18px; line-height: 28px">
            Do you wish to upgrade your account?
          </div>
        </div>
        <div
          class=""
          style="border: 1px solid black; border-radius: 10px; margin: 32px 0"
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
            Additional licenses at $50/mo
          </div>

          <div
            class="q-mt-sm q-pl-lg q-ml-md q-mb-sm fontWeight400 text-blue-grey"
            style="font-size: 10px"
          >
            *Vendor roles are limited
          </div>
        </div>

        <div class=" ">
          <div class="row justify-between">
            <q-btn
              class="col q-mr-md fontWeight600"
              v-close-popup
              label="Cancel"
              no-caps
              outline
              color="deep-orange"
              size="1rem"
              style="border-radius: 8px; width: 170px; height: 44px"
            />
            <q-btn
              class="col fontWeight600"
              label="Confirm"
              no-caps
              @click="upgradePackage()"
              color="deep-orange"
              size="1rem"
              style="border-radius: 8px; width: 170px; height: 44px"
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
        'Unlimited Vendors*'
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
      'addAdditionalLicense',
      'getOrganization'
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
    closeEditPayment() {
      this.cardName = '';
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
      let cardInfo = await this.getCardInfo();
      this.cardData = cardInfo.attributes.cards[0];
      this.setLoading(false);
      if (res) {
        this.icon = false;
      }
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
      await this.getOrganization();
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
    ...mapGetters(['organization', 'setPlans']),
    expMonth() {
      if (this.cardData.expMonth && this.cardData.expMonth > 9) {
        return this.cardData.expMonth;
      } else {
        return '0' + this.cardData.expMonth;
      }
    }
  },
  async created() {
    // this.$q.screen.setSizes({ sm: 1100, md: 1160, lg: 1000, xl: 2000 })
    this.setLoading(true);
    let cardInfo = await this.getCardInfo();
    this.cardData = cardInfo.attributes.cards[0];
    const payload = {
      limit: 8,
      startingAfter: '',
      endingBefore: ''
    };
    await this.getInvoices(payload);
    await this.getRoles('hideLoader');
    await this.getAllPlans();
    this.setLoading(false);
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
      height: 26px;
    }
    .q-field--auto-height,
    .q-field__native {
      min-height: 0px;
    }
  }
}
</style>
