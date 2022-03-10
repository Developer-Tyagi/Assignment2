<template>
  <q-page class="poppinsFont">
    <div class="text-h5 fontWeight600">Manage Users</div>

    <div class="row">
      <!-- payment method -->
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
        <div class="col-md-2 col-sm-12 col-xs-12">
          <span class="fontWeight600 text-h5 q-mr-xs" style="color: #667085">
            Paid User
          </span>
          <span class="fontWeight600 text-h5 q-mr-xs">4/6</span>
        </div>
        <div class="col-md-3 col-sm-12 col-xs-12">
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
        <div class="col-md-2 col-sm-12 col-xs-12">
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
          <span class="col-4 q-pl-md q-mr-md q-py-md fontWeight500 text-grey1"
            >Email</span
          >
          <span class="col-3 q-pl-md q-mr-md q-py-md fontWeight500 text-grey1"
            >Role</span
          >
          <span class="col-1 q-pl-md q-mr-md q-py-md fontWeight500 text-grey1"
            >Action</span
          >
        </div>
      </div>
      <div
        class="col-12"
        v-if="$q.screen.gt.sm"
        style="border-bottom: 1px solid #e4e7ec"
      >
        <div v-for="user in allUsers">
          <div class="row" style="border-bottom: 1px solid #e4e7ec">
            <span class="col-3 q-mr-md q-mt-md q-pl-md q-py-sm fontWeight500"
              >{{
                user.attributes.contact.fname
                  ? user.attributes.contact.fname
                  : '-'
              }}
              {{ user.attributes.contact.lname }}</span
            >
            <span
              class="col-4 q-mr-md q-mt-md q-pl-md q-py-sm fontWeight500 text-grey1"
              >{{ user.attributes.email }}</span
            >
            <span
              class="col-3 q-mr-md q-mt-md q-pl-md q-py-sm fontWeight500 text-grey1"
              >{{
                user.attributes.roles ? user.attributes.roles[0].value : '-'
              }}</span
            >
            <span class="col-1 q-mr-md q-pl-md q-py-md fontWeight500">
              <q-btn flat round icon="more_vert">
                <q-menu>
                  <q-list
                    style="min-width: 100px"
                    class="poppinsFont fontWeight400"
                  >
                    <q-item clickable v-close-popup @click="confirm_dia = true">
                      <q-item-section side>
                        <q-icon size="sm">
                          <q-img class="" :src="getImage('eye.svg')" />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>View Details</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section side>
                        <q-icon size="sm">
                          <q-img class="" :src="getImage('edit-3.svg')" />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Edit Details</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section side>
                        <q-icon size="sm">
                          <q-img class="" :src="getImage('user-x.svg')" />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Disable User</q-item-section>
                    </q-item>
                    <!-- Add vif -->
                    <q-item clickable v-close-popup>
                      <q-item-section side>
                        <q-icon size="sm">
                          <q-img class="" :src="getImage('user-check.svg')" />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Activate User</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section side>
                        <q-icon size="sm">
                          <q-img class="" :src="getImage('lock.svg')" />
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
        <div v-for="user in allUsers">
          <div>
            {{
              user.attributes.contact.fname
                ? user.attributes.contact.fname
                : '-'
            }}
            {{ user.attributes.contact.lname }}
          </div>
          <div class="q-mt-md" style="border-bottom: 1px solid #e4e7ec">
            <span class="q-mr-md">{{ user.attributes.email }}</span>
            <span class="q-mr-md">{{
              user.attributes.roles ? user.attributes.roles[0].value : '-'
            }}</span>
            <span class="q-mr-md">{{ order[3] }}</span>
            <span class="col-1 q-mr-md q-pl-md q-py-md fontWeight500">
              <q-btn flat round icon="more_vert">
                <q-menu>
                  <q-list
                    style="min-width: 100px"
                    class="poppinsFont fontWeight400"
                  >
                    <q-item clickable v-close-popup @click="confirm_dia = true">
                      <q-item-section side>
                        <q-icon size="sm">
                          <q-img class="" :src="getImage('eye.svg')" />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>View Details</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section side>
                        <q-icon size="sm">
                          <q-img class="" :src="getImage('edit-3.svg')" />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Edit Details</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section side>
                        <q-icon size="sm">
                          <q-img class="" :src="getImage('user-x.svg')" />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Disable User</q-item-section>
                    </q-item>
                    <!-- Add vif -->
                    <q-item clickable v-close-popup>
                      <q-item-section side>
                        <q-icon size="sm">
                          <q-img class="" :src="getImage('user-check.svg')" />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Activate User</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section side>
                        <q-icon size="sm">
                          <q-img class="" :src="getImage('lock.svg')" />
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
      <q-dialog v-model="confirm_dia" persistent>
        <q-card class="poppinsFont">
          <q-card-section class="col-2 items-center">
            <span class="q-ml-sm fontWeight600 fontSize20">User Details</span>
          </q-card-section>
          <q-card-section class="row items-center fontSize16 q-pa-sm">
            <span class="col-4 q-ml-sm fontWeight600">First name</span>
            <span class="col-7 q-ml-sm fontWeight400">Austin</span>
          </q-card-section>
          <q-card-section class="row items-center fontSize16 q-pa-sm">
            <span class="col-4 q-ml-sm fontWeight600">Last name</span>
            <span class="col-7 q-ml-sm fontWeight400">McBroom</span>
          </q-card-section>
          <q-card-section class="row items-center fontSize16 q-pa-sm">
            <span class="col-4 q-ml-sm fontWeight600">Contact</span>
            <span class="col-7 q-ml-sm fontWeight400">+1 (123) 456 7890</span>
          </q-card-section>
          <q-card-section class="row items-center fontSize16 q-pa-sm">
            <span class="col-4 q-ml-sm fontWeight600">Email</span>
            <span class="col-7 q-ml-sm fontWeight400"
              >austin@10xincubator.com</span
            >
          </q-card-section>
          <q-card-section class="row items-center fontSize16 q-pa-sm">
            <span class="col-4 q-ml-sm fontWeight600">User Role</span>
            <span class="col-7 q-ml-sm fontWeight400">Claim Manager</span>
          </q-card-section>
          <q-card-section class="row items-center fontSize16 q-pa-sm">
            <span class="col-4 q-ml-sm fontWeight600">Role Title</span>
            <span class="col-7 q-ml-sm fontWeight400">Adjuster</span>
          </q-card-section>
          <q-card-section class="row items-center fontSize16 q-pa-sm">
            <span class="col-4 q-ml-sm fontWeight600">PIA License</span>
            <span class="col-7 q-ml-sm fontWeight400"
              >GA-123456, TX-456789, NY-5478956</span
            >
          </q-card-section>

          <q-card-actions>
            <q-btn
              outline
              label="Cancel"
              class="on-left"
              color="primary"
              v-close-popup
            />
            <q-btn
              filled
              label="Edit User Details"
              class="on-right"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
      cardData: {},
      paginationValue: 1,
      totalPaginationPages: 10,
      totalRecordsPerPage: 7,
      confirm_dia: false
    };
  },
  methods: {
    ...mapActions(['getAllUsers', 'getCardInfo']),
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
    },
    openMore() {}
  },
  computed: {
    ...mapGetters(['allUsers', 'organization'])
  },
  async created() {
    this.getAllUsers();
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
.fontSize14 {
  font-size: 14px;
}
.fontSize16 {
  font-size: 16px;
}
.fontSize20 {
  font-size: 20px;
}
</style>
