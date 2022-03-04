<template>
  <q-page class="poppinsFont">
    <div class="text-h5 fontWeight600">Manage Users</div>

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
        <div class="col-md-2 col-sm-12 col-xs-12">
          <span class="fontWeight600 text-h5 q-mr-xs" style="color: #667085">
            Paid User
          </span>
          <span class="fontWeight600 text-h5 q-mr-xs">4/6</span>
        </div>
        <div class="col-md-2 col-sm-12 col-xs-12">
          <span class="fontWeight600 text-h5 q-mr-xs" style="color: #667085">
            Office Staff
          </span>
          <span class="fontWeight600 text-h5 q-mr-xs">2/4</span>
        </div>
        <div class="col-md-2 col-sm-12 col-xs-12">
          <span class="fontWeight600 text-h5 q-mr-xs" style="color: #667085"
            >Vendors</span
          >
          <span class="fontWeight600 text-h5 q-mr-xs">3</span>
        </div>
        <div class="col-md-2 col-sm-12 col-xs-12">
          <span class="fontWeight600 text-h5 q-mr-xs" style="color: #667085">
            Total User
          </span>
          <span class="fontWeight600 text-h5 q-mr-xs">9</span>
        </div>
        <div class="col-md-3 col-sm-12 col-xs-12">
          <q-btn
            class="q-mr-md fontWeight600 text-subtitle1"
            no-caps
            icon="add_circle"
            color="primary"
            label="Add an Additional User"
            style="border-radius: 10px; min-width: 280px; max-width: 540px"
          />
        </div>
      </div>
    </div>

    <div class="q-mt-md" style="border: 1px solid #e4e7ec; border-radius: 8px">
      <div
        class="col-12"
        v-if="$q.screen.gt.sm"
        style="border-bottom: 1px solid #e4e7ec"
      >
        <div class="row text-caption">
          <span class="col-3 q-mr-md q-pl-md q-py-md fontWeight500 text-grey1"
            >Name</span
          >
          <span class="col-3 q-pl-md q-mr-md q-py-md fontWeight500 text-grey1"
            >Email</span
          >
          <span class="col-2 q-pl-md q-mr-md q-py-md fontWeight500 text-grey1"
            >Role</span
          >
          <span class="col-2 q-pl-md q-mr-md q-py-md fontWeight500 text-grey1"
            >Action</span
          >
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
            <!-- <span
              class="col-2 q-mr-md q-pl-md q-py-md fontWeight500 text-grey1 text-caption"
              >{{ order[3] }}</span
            > -->
            <span class="col-1 q-mr-md q-pl-lg q-py-md fontWeight500">
              <q-btn flat>
                <q-icon size="12px">
                  <q-img
                    class="q-mb-xs q-mr-sm"
                    :src="getImage('showModalPopup.svg')"
                  />
                </q-icon>
                <q-menu style="border-radius: 10px">
                  <q-list style="min-width: 120px">
                    <q-item clickable v-close-popup>
                      <q-item-section avatar>
                        <q-icon size="30px">
                          <q-img
                            class="q-mb-xs q-mr-sm"
                            :src="getImage('ViewDetails.svg')"
                          />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>View Details</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                      <q-item-section avatar>
                        <q-icon size="30px">
                          <q-img
                            class="q-mb-xs q-mr-sm"
                            :src="getImage('EditDetails.svg')"
                          />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Edit Details</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                      <q-item-section avatar>
                        <q-icon size="30px">
                          <q-img
                            class="q-mb-xs q-mr-sm"
                            :src="getImage('DisableUser.svg')"
                          />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Disable user</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                      <q-item-section avatar>
                        <q-icon size="30px">
                          <q-img
                            class="q-mb-xs q-mr-sm"
                            :src="getImage('ResetPassword.svg')"
                          />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Reset Password</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
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
            <span class="col-1 q-mr-md q-pl-lg q-py-md fontWeight500">
              <q-btn flat>
                <q-icon size="12px">
                  <q-img
                    class="q-mb-xs q-mr-sm"
                    :src="getImage('showModalPopup.svg')"
                  />
                </q-icon>
                <q-menu style="border-radius: 10px">
                  <q-list style="min-width: 120px">
                    <q-item clickable v-close-popup>
                      <q-item-section avatar>
                        <q-icon size="30px">
                          <q-img
                            class="q-mb-xs q-mr-sm"
                            :src="getImage('ViewDetails.svg')"
                          />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>View Details</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                      <q-item-section avatar>
                        <q-icon size="30px">
                          <q-img
                            class="q-mb-xs q-mr-sm"
                            :src="getImage('EditDetails.svg')"
                          />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Edit Details</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                      <q-item-section avatar>
                        <q-icon size="30px">
                          <q-img
                            class="q-mb-xs q-mr-sm"
                            :src="getImage('DisableUser.svg')"
                          />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Disable user</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                      <q-item-section avatar>
                        <q-icon size="30px">
                          <q-img
                            class="q-mb-xs q-mr-sm"
                            :src="getImage('ResetPassword.svg')"
                          />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Reset Password</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <!-- <q-btn>
                <img
                  class="profile"
                  size="12px"
                  :src="getImage('showModalPopup.svg')"
                />
              </q-btn> -->
            </span>
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
        ['Jason Rhye', 'jason@10xincubators.com', 'Owner'],
        ['Jason Rhye', 'jason@10xincubators.com', 'Owner'],
        ['Jason Rhye', 'jason@10xincubators.com', 'Owner'],
        ['Jason Rhye', 'jason@10xincubators.com', 'Owner'],
        ['Jason Rhye', 'jason@10xincubators.com', 'Owner'],
        ['Jason Rhye', 'jason@10xincubators.com', 'Owner'],
        ['Jason Rhye', 'jason@10xincubators.com', 'Owner'],
        ['Jason Rhye', 'jason@10xincubators.com', 'Owner'],
        ['Jason Rhye', 'jason@10xincubators.com', 'Owner']
      ],
      cardData: {},
      paginationValue: 1,
      totalPaginationPages: 10,
      totalRecordsPerPage: 8,
      showing: false
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
