<template>
  <q-page class="poppinsFont">
    <div class="text-h5 fontWeight600">Manage Users</div>
    <AddNewUser
      @closeUserDialog="CloseDialog($event)"
      :showDialog="addAdditionalUser"
    />
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
            @click="openAdditionalUserDialog()"
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
        <div v-for="user in allUsers" :key="user.id">
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
                    <q-item clickable v-close-popup @click="viewUser(user)">
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

                    <q-item
                      clickable
                      v-close-popup
                      v-if="user.attributes.isEnabled"
                    >
                      <q-item-section side>
                        <q-icon size="sm">
                          <q-img class="" :src="getImage('user-x.svg')" />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Disable User</q-item-section>
                    </q-item>
                    <!-- Add vif -->
                    <q-item
                      clickable
                      v-close-popup
                      v-if="!user.attributes.isEnabled"
                    >
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
        <div v-for="user in allUsers" :key="user.id">
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

            <span class="col-1 q-mr-md q-pl-md q-py-md fontWeight500">
              <q-btn flat round icon="more_vert">
                <q-menu>
                  <q-list
                    style="min-width: 100px"
                    class="poppinsFont fontWeight400"
                  >
                    <q-item clickable v-close-popup @click="viewUser(user)">
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

                    <q-item
                      clickable
                      v-close-popup
                      v-if="user.attributes.isEnabled"
                    >
                      <q-item-section side>
                        <q-icon size="sm">
                          <q-img class="" :src="getImage('user-x.svg')" />
                        </q-icon>
                      </q-item-section>
                      <q-item-section>Disable User</q-item-section>
                    </q-item>
                    <!-- Add vif -->
                    <q-item
                      clickable
                      v-close-popup
                      v-if="!user.attributes.isEnabled"
                    >
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
        <q-card class="poppinsFont viewUser">
          <q-card-section class="items-center viewUserHeader">
            <span class="fontWeight600 fontSize20">User Details</span>
            <q-btn
              icon="close"
              flat
              round
              dense
              v-close-popup
              class=""
              style="float: right"
            />
          </q-card-section>
          <q-card-section
            class="row items-center fontSize16 lineHeight24 viewUserRows"
          >
            <span class="col-4 fontWeight600">First name</span>
            <span class="col-7 fontWeight400">{{
              currentSelectdUser.firstName ? currentSelectdUser.firstName : '-'
            }}</span>
          </q-card-section>
          <q-card-section
            class="row items-center fontSize16 lineHeight24 viewUserRows"
          >
            <span class="col-4 fontWeight600">Last name</span>
            <span class="col-7 fontWeight400">{{
              currentSelectdUser.lastName ? currentSelectdUser.lastName : '-'
            }}</span>
          </q-card-section>
          <!-- <q-card-section class="row items-center fontSize16 lineHeight24 viewUserRows">
            <span class="col-4 fontWeight600">Contact</span>
            <span class="col-7 fontWeight400">{{currentSelectdUser.contactNumber ? currentSelectdUser.contactNumber : '-'}}</span>
          </q-card-section> -->
          <q-card-section
            class="row items-center fontSize16 lineHeight24 viewUserRows"
          >
            <span class="col-4 fontWeight600">Email</span>
            <span class="col-7 fontWeight400">{{
              currentSelectdUser.email ? currentSelectdUser.email : '-'
            }}</span>
          </q-card-section>
          <q-card-section
            class="row items-center fontSize16 lineHeight24 viewUserRows"
          >
            <span class="col-4 fontWeight600">User Role</span>
            <span class="col-7 fontWeight400"
              >{{ currentSelectdUser.role ? currentSelectdUser.role : '-'
              }}<span class="q-pl-md"
                ><span
                  v-if="!this.currentSelectdUser.paidStatus"
                  class="q-px-sm fontWeight500 fontSize16 lineHeight20"
                  style="
                    color: #027a48;
                    background-color: #ecfdf3;
                    border-radius: 10px;
                  "
                  >Free Role</span
                >
                <span
                  v-else
                  class="q-px-sm fontWeight500 fontSize16 lineHeight20"
                  style="
                    color: #c4320a;
                    background-color: #f7e6e1;
                    border-radius: 10px;
                  "
                  >Paid Role</span
                ></span
              ></span
            >
          </q-card-section>
          <q-card-section
            class="row items-center fontSize16 lineHeight24 viewUserRows"
            v-if="currentSelectdUser.subRole"
          >
            <span class="col-4 fontWeight600">Role Title</span>
            <span class="col-7 fontWeight400">{{
              currentSelectdUser.subRole ? currentSelectdUser.subRole : '-'
            }}</span>
          </q-card-section>
          <q-card-section
            class="row items-center fontSize16 lineHeight24 viewUserRows"
            v-if="currentSelectdUser.license_state"
          >
            <span class="col-4 fontWeight600">PIA License</span>
            <span class="col-7 fontWeight400">{{
              currentSelectdUser.license_state +
              '-' +
              currentSelectdUser.license_number
            }}</span>
          </q-card-section>
          <div class="row justify-between q-pa-lg">
            <q-btn
              class="fontWeight600 fontSize16 lineHeight24"
              label="Cancel"
              no-caps
              v-close-popup
              outline
              color="deep-orange"
              size="1rem"
              style="border-radius: 10px"
            />
            <q-btn
              class="fontWeight600 fontSize16 lineHeight24"
              label="Edit User Details"
              no-caps
              style="border-radius: 10px; float: right"
              color="deep-orange"
              size="1rem"
            />
          </div>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import AddNewUser from '../components/AddNewUser.vue';
import { isMobile } from '@utils/common';
import { validateEmail } from '@utils/validation';
export default {
  components: { AddNewUser },
  data() {
    return {
      cardData: {},
      paginationValue: 1,
      totalPaginationPages: 10,
      totalRecordsPerPage: 8,
      confirm_dia: false,
      showing: false,
      addAdditionalUser: false,
      currentSelectdUser: {
        firstName: '',
        lastName: '',
        contactNumber: '',
        role: '',
        subRole: '',
        email: '',
        license_state: '',
        license_number: '',
        paidStatus: ''
      },
      org: ''
    };
  },
  methods: {
    ...mapActions([
      'getAllUsers',
      'getCardInfo',
      'getRoles',
      'getOrganization'
    ]),
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
    viewUser(sel_user) {
      this.confirm_dia = true;
      // console.log(this.organizationId)
      this.currentSelectdUser.firstName = sel_user.attributes.contact.fname;
      this.currentSelectdUser.lastName = sel_user.attributes.contact.lname;
      this.currentSelectdUser.email = sel_user.attributes.email;
      this.currentSelectdUser.role = sel_user.attributes.roles[0].value;
      this.currentSelectdUser.paidStatus = sel_user.attributes.roles[0].isPaid;

      if (sel_user.attributes.subRole) {
        this.currentSelectdUser.subRole = sel_user.attributes.subRole.value;
      } else {
        this.currentSelectdUser.subRole = '';
      }
      if (sel_user.attributes.licenses) {
        this.currentSelectdUser.license_state =
          sel_user.attributes.licenses[0].state;
        this.currentSelectdUser.license_number =
          sel_user.attributes.licenses[0].number;
      } else {
        this.currentSelectdUser.license_state = '';
        this.currentSelectdUser.license_number = '';
      }
    },
    openMore() {}
  },
  computed: {
    ...mapGetters(['allUsers', 'organization', 'organizationId'])
  },
  async created() {
    this.getAllUsers();
    this.getOrganization();
    this.step = 0;
    let cardInfo = await this.getCardInfo();
    this.cardData = cardInfo.attributes.cards[0];
    await this.getRoles('hideLoader');
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
.lineHeight24 {
  line-height: 24px;
}
.lineHeight20 {
  line-height: 20px;
}
.viewUser {
  @media only screen and (min-width: 1024px) {
    width: 50%;
    max-width: 560px;
  }
  @media only screen and (max-width: 1023px) {
    width: 90% !important;
    min-width: 300px;
    max-width: 560px;
  }
}
.viewUserRows {
  @media only screen and (min-width: 1024px) {
    padding: 10px 0px 10px 24px;
  }
  @media only screen and (max-width: 1023px) {
    padding: 10px 0px 10px 24px;
  }
}
.viewUserHeader {
  @media only screen and (min-width: 1024px) {
    padding: 24px 24px 14px 24px;
  }
  @media only screen and (max-width: 1023px) {
    padding: 19px 16px 17px 16px;
  }
}
</style>
