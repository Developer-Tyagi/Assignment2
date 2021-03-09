<template>
  <q-page class="window-height bg-background full-width">
    <br />
    <div class="q-mx-xl q-mt-xs" style="height: 60%; width: 95%">
      <div class="full-width">
        <div class="text-bold q-mx-xl">Manage Users</div>
      </div>
      <div class="full-width">
        <div class="row justify-between my-font text-bold q-mx-xl">
          <div class="col-4">
            <q-input outlined v-model="searchText" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          ​
          <div class="justify-between row col-6">
            <div class="col-4">
              <q-card class="q-pl-lg q-pt-md q-mx-xs full-height" flat bordered
                >Licenses available-15</q-card
              >
            </div>
            <div class="col-3">
              <q-card class="q-pl-lg q-pt-md q-mx-xs full-height" flat bordered
                >Total Users - 1</q-card
              >
            </div>
            <div class="col-3 q-mr-xl">
              <q-card
                class="q-pl-lg q-pt-md q-mx-xs full-height text-primary"
                flat
                bordered
                @click="addUserDialogBox = true"
                >+ Add New User</q-card
              >
            </div>
          </div>
        </div>
      </div>
      <div class="q-mt-xs -xl row full-width full-height">
        <div class="col-11 q-mx-xl ">
          <div class=" row bg-primary text-bold text-h6 text-white">
            <div class="q-pl-xl col text-center">Contact Name</div>
            <div class="q-pl-xl col-2  text-center">Email</div>
            <div class="q-pl-xl col   text-center">Phone</div>
            <div class=" col text-left">Member Since</div>
            <div class="col ">Roles</div>
            <div class=" col text-left">Last Access</div>
            <div class="col text-left">Status</div>
            <div class="col ">Actions</div>
          </div>

          <q-markup-table style="height:500px;" flat bordered>
            <tbody scroll>
              <tr v-for="user in allUsers" v-if="">
                <td style="width:15%" class="  col-3 text-center">
                  {{
                    user.attributes.contact.fname
                      ? user.attributes.contact.fname
                      : '-'
                  }}
                  {{ user.attributes.contact.lname }}
                </td>
                <td class="text-center">
                  <span
                    v-if="user.attributes.email"
                    @click="onEmailClick(user.attributes.email, $event)"
                    >{{ user.attributes.email }}</span
                  ><span v-else> - </span>
                </td>
                <td class="text-left">
                  <span
                    v-if="5567656"
                    @click="onPhoneNumberClick(24355732, $event)"
                    >{{ 243557388 }}</span
                  ><span v-else> - </span>
                </td>
                <td class="text-left">{{ date }}</td>
                <td class="text-left">
                  {{ user.attributes.roles ? user.attributes.roles[0] : '-' }}
                </td>
                <td class="text-right">{{ lastAccess }}</td>
                <td class="text-right">{{ status }}</td>
                <td class="text-center">
                  <div class="q-pl-xl">
                    <q-btn-dropdown label="Action" style="width: 100px" outline>
                      <q-list>
                        <q-item clickable v-close-popup @click="onItemClick">
                          <q-item-section>
                            <q-item-label>View/Edit</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="onItemClick">
                          <q-item-section>
                            <q-item-label>Reset Password</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="onItemClick">
                          <q-item-section>
                            <q-item-label>Remove</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                  </div>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
        <div class=" q-mt-xl row justify-center full-width">
          <q-btn
            color="primary"
            style="height:40px;"
            label="Go To Dashboard"
            @click="SendToDashboard"
          />
        </div>
      </div>
    </div>
    <q-dialog v-model="addUserDialogBox" persistent>
      <q-card class=" q-pa-xs col-5 ">
        <q-bar class=" row justify-between " style="height: 50px">
          <div class="col-4 q-px-xl text-bold">
            Add User
          </div>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-form ref="addUserForm">
          <div class=" q-mt-xs row full-width">
            <div class="col-5 q-mx-md q-mt-lg required">First Name*</div>
            <div class="col-4 q-mx-xl q-mt-lg">Last Name *</div>
          </div>
          <div class="row q-mt-xs justify-between full-width">
            <div class="col-6">
              <q-input
                v-model="users.contact.fname"
                class="q-mx-md"
                style="width: 300px"
                outlined
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="users.contact.lname"
                class="q-mx-md"
                style="width: 300px"
                outlined
              />
            </div>
          </div>
          <div class="q-mt-xs row full-width">
            <div class="col-5 q-mx-md q-mt-lg">Email*</div>
            <div class="col-4 q-mx-xl q-mt-lg">Role *</div>
          </div>
          <div class=" row q-mt-xs justify-between full-width">
            <div class="col-6 q-mb-lg">
              <q-input
                v-model="users.email"
                class="q-mx-md"
                style="width: 300px"
                outlined
                lazy-rules
                :rules="[
                  val =>
                    validateEmail(val) ||
                    'You have entered an invalid email address!'
                ]"
              />
            </div>
            <div class="col-6 q-px-md ">
              <select
                v-model="users.roles[0]"
                class="q-ml-md full-width bg-white"
                style=" height:55px;border:2px solid lightgrey;"
              >
                <option value="ss" disabled selected>Selecttion</option
                ><optgroup label="Paid">
                  <option>User4</option>
                  <option>User1</option>
                  <option>User1</option>
                </optgroup>
                <optgroup label="Unpaid">
                  <option>User1 </option>
                  <option>User1</option>
                  <option>User1</option>
                </optgroup></select
              >
            </div>
          </div>
        </q-form>

        <div class=" row justify-center">
          <q-btn
            color="primary"
            label="submit and Proceed"
            class="q-mb-lg"
            @click="onSubmit"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { validateEmail } from '@utils/validation';

export default {
  name: 'Manage-User',
  // components: {
  //   SetConfiguration
  // },
  data() {
    return {
      OnboardingStatus: { isCompleted: true },
      isShowRemoveButton: false,

      optionsRole: ['Manager', 'Staff'],
      typeOfUser: ['User', 'Office Staff', 'Sales'],
      users: {
        type: 'user',
        contact: {
          fname: '',
          lname: ''
        },
        email: '',
        roles: []
      },
      options: [
        'View/Edit',
        'Reset Password',
        'Change/Modify Plan',
        'Remove',
        'Inactive'
      ],
      addUserDialogBox: false,
      searchText: '',
      name: 'Himanshu',
      bussiness: 'Bussiness-1',
      contactNo: +909098987,
      date: '20/02/1998',
      roles: 'Super Admin',
      lastAccess: '20/01/2020 ',
      status: 'Active'
    };
  },
  computed: {
    ...mapGetters(['contactTypes', 'allUsers'])
  },
  mounted() {
    this.getAllUsers();
  },

  methods: {
    validateEmail,
    ...mapActions(['addUser', 'setOnboard', 'getAllUsers']),
    onEmailClick(email, e) {
      e.stopPropagation();
      if (email) {
        window.open('mailto:' + email);
      }
    },
    onPhoneNumberClick(number, e) {
      e.stopPropagation();
      if (number) {
        window.open('tel:' + number);
      }
    },
    //this is important dont remove this function
    onItemClick() {},

    //fThis is for Updating the  Onboarding status
    SendToDashboard() {
      this.setOnboard(this.OnboardingStatus);
      this.$router.push('/dashboard');
    },

    async onSubmit() {
      const success = await this.$refs.addUserForm.validate();

      if (success) {
        await this.addUser(this.users);
        this.users = {
          type: 'user',
          contact: {
            fname: '',
            lname: ''
          },
          email: '',
          roles: []
        };

        this.addUserDialogBox = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
tr:nth-child(even) {
  background-color: $grey-3 !important;
}
</style>
