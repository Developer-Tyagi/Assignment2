<template>
  <q-page class="poppinsFont">
    <div class="text-h5 fontWeight600">Billing</div>

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
            Firm Package
          </div>
          <div class="col row justify-end q-pr-lg q-mt-sm">
            <span class="fontWeight600 text-h5 q-mr-xs">$</span
            ><span class="fontWeight600 text-h4">250</span
            ><span class="fontWeight500 text-subtitle1 q-pt-sm">/mos</span>
          </div>
        </div>
        <div class="q-mt-md">
          <div>
            <q-img
              class="q-mb-xs q-mr-sm"
              :src="getImage('Check_icon_billing.svg')"
              width="3%"
              height="3%"
            />
            3 Claims Manager
          </div>
          <div class="q-mt-sm">
            <q-img
              class="q-mb-xs q-mr-sm"
              :src="getImage('Check_icon_billing.svg')"
              width="3%"
              height="3%"
            />
            1 Claims Manager
          </div>
          <div class="q-mt-sm">
            <q-img
              class="q-mb-xs q-mr-sm"
              :src="getImage('Check_icon_billing.svg')"
              width="3%"
              height="3%"
            />3 Office Staff
          </div>
          <div class="q-mt-sm">
            <q-img
              class="q-mb-xs q-mr-sm"
              :src="getImage('Check_icon_billing.svg')"
              width="3%"
              height="3%"
            />4 Vendors
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
              class="col-2 text-black"
              color="white"
              label="Edit"
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
              >jason@10xincubator.com
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- additional user -->
    <div
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
          <span class="col-3 q-mr-md q-pl-md q-py-md fontWeight500 text-grey1"
            >Order</span
          >
          <span class="col-3 q-pl-md q-mr-md q-py-md fontWeight500 text-grey1"
            >Amount</span
          >
          <span class="col-2 q-pl-md q-mr-md q-py-md fontWeight500 text-grey1"
            >Date</span
          >
          <span class="col-2 q-pl-md q-mr-md q-py-md fontWeight500 text-grey1"
            >Status</span
          >
          <span
            class="col-1 q-pl-md q-mr-md q-py-md fontWeight500 text-grey1"
          ></span>
        </div>
      </div>
      <div
        class="col-12"
        v-if="$q.screen.gt.sm"
        style="border-bottom: 1px solid #e4e7ec"
      >
        <div v-for="(order, index) in orders" :key="index">
          <div class="row" style="border-bottom: 1px solid #e4e7ec">
            <span class="col-3 q-mr-md q-pl-md q-py-md fontWeight500">{{
              order[0]
            }}</span>
            <span
              class="col-3 q-mr-md q-pl-md q-py-md fontWeight500 text-grey1"
              >{{ order[1] }}</span
            >
            <span
              class="col-2 q-mr-md q-pl-md q-py-md fontWeight500 text-grey1"
              >{{ order[2] }}</span
            >
            <span
              class="col-2 q-mr-md q-pl-md q-py-md fontWeight500 text-grey1 text-caption"
              >{{ order[3] }}</span
            >
            <span class="col-1 q-mr-md q-pl-lg q-py-md fontWeight500">
              <q-icon size="sm">
                <q-img
                  class="q-mb-xs q-mr-sm"
                  :src="getImage('download_cloud.svg')"
                />
              </q-icon>
            </span>
          </div>
        </div>
      </div>
      <div v-else class="col-12">
        <div v-for="order in orders" :key="order[0]">
          <div>{{ order[0] }}</div>
          <div class="q-mt-md" style="border-bottom: 1px solid #e4e7ec">
            <span class="q-mr-md">{{ order[1] }}</span>
            <span class="q-mr-md">{{ order[2] }}</span>
            <span class="q-mr-md">{{ order[3] }}</span>
            <span>{{ order[4] }}</span>
          </div>
        </div>
      </div>

      <div class="col-12 row justify-between q-pt-sm">
        <div class="col-1 q-pl-md" v-if="this.paginationValue > 1">
          <q-icon @click="decreasePaginationValue()" size="md">
            <q-img
              class="q-mb-xs q-mr-sm"
              :src="getImage('arrow_circle_left.svg')"
          /></q-icon>
        </div>
        <div class="col-10 text-center q-pt-xs">
          Page {{ this.paginationValue }} of {{ this.totalPaginationPages }}
        </div>
        <div
          class="col-1"
          @click="increasePaginationValue()"
          v-if="this.paginationValue < totalPaginationPages"
        >
          <q-icon class="float-right q-pr-md" size="md">
            <q-img
              class="q-mb-xs q-mr-sm"
              :src="getImage('arrow_circle_right.svg')"
            />
          </q-icon>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { isMobile } from '@utils/common';
import { validateEmail } from '@utils/validation';
export default {
  components: {},
  data() {
    return {
      orders: [
        ['Order #123456', 'USD $10.00', 'Dec 1, 2022', 'Paid', 'download'],
        ['Order #123456', 'USD $10.00', 'Dec 1, 2022', 'Paid', 'download'],
        ['Order #123456', 'USD $10.00', 'Dec 1, 2022', 'Paid', 'download'],
        ['Order #123456', 'USD $10.00', 'Dec 1, 2022', 'Paid', 'download'],
        ['Order #123456', 'USD $10.00', 'Dec 1, 2022', 'Paid', 'download'],
        ['Order #123456', 'USD $10.00', 'Dec 1, 2022', 'Paid', 'download'],
        ['Order #123456', 'USD $10.00', 'Dec 1, 2022', 'Paid', 'download'],
        ['Order #123456', 'USD $10.00', 'Dec 1, 2022', 'Paid', 'download'],
        ['Order #123456', 'USD $10.00', 'Dec 1, 2022', 'Paid', 'download'],
        ['Order #123456', 'USD $10.00', 'Dec 1, 2022', 'Paid', 'download']
      ],
      cardData: {},
      paginationValue: 1,
      totalPaginationPages: 10,
      totalRecordsPerPage: 8
    };
  },
  methods: {
    ...mapActions(['getCardInfo']),
    isMobile,
    validateEmail,
    getImage(icon) {
      return require('../assets/' + icon);
    },
    increasePaginationValue() {
      this.paginationValue++;
    },
    decreasePaginationValue() {
      this.paginationValue--;
    }
  },
  computed: {
    ...mapGetters(['organization'])
  },
  async created() {
    this.step = 0;
    let cardInfo = await this.getCardInfo();
    this.cardData = cardInfo.attributes.cards[0];
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
</style>
