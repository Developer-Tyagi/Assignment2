<template>
  <q-page>
    <div class="q-pa-md height-without-header">
      <div class="row justify-between">
        <div class="col-4">
          <q-input
            dense
            outlined
            v-model="searchText"
            dense
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-4 row justify-between text-bold">
          <q-card flat bordered class="q-pa-sm"
            >Licenses available- {{ '5' }}</q-card
          >

          <q-card flat bordered class="q-pa-sm"
            >Total Users - {{ allUsers.length }}</q-card
          >

          <q-btn color="primary" @click="addUserDialogBox = true">
            Add New User
          </q-btn>
        </div>
      </div>

      <div class="q-mt-md" style="height: calc(100vh - 150px); overflow: auto">
        <table>
          <thead>
            <tr class="text-bold text-h6 text-white" style="height: 30px">
              <th style="width: 15%">Contact Name</th>
              <th style="width: 15%">Email</th>
              <th>Phone</th>
              <th>Member Since</th>
              <th>Roles</th>
              <th>Last Access</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in allUsers" v-if="">
              <td class="text-center">
                {{
                  user.attributes.contact.fname
                    ? user.attributes.contact.fname
                    : '-'
                }}
                {{ user.attributes.contact.lname }}
              </td>
              <td class="  text-primary text-center">
                <span
                  class="clickable"
                  v-if="user.attributes.email"
                  @click="onEmailClick(user.attributes.email, $event)"
                  >{{ user.attributes.email }}</span
                ><span v-else> - </span>
              </td>
              <td class=" text-primary text-center">
                <span
                  class="clickable"
                  v-if="5567656"
                  @click="onPhoneNumberClick(24355732, $event)"
                  >{{ 243557388 }}</span
                ><span v-else> - </span>
              </td>
              <td class="text-center">{{ date }}</td>
              <td class="text-center">
                {{ user.attributes.roles ? user.attributes.roles[0] : '-' }}
              </td>
              <td class="text-center">{{ lastAccess }}</td>

              <td class="text-center">
                {{ status }}
              </td>
              <td class="text-center">
                <div>
                  <q-btn-dropdown label="Action" style="width: 100px" outline>
                    <q-list style="width: 100px;">
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
        </table>
      </div>
    </div>

    <q-dialog v-model="addUserDialogBox" persistent>
      <q-card class="col-5">
        <q-bar class="row justify-between bg-primary" style="height: 50px">
          <div class="col-4 q-px-xs text-bold text-white">Add User</div>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-form ref="addUserForm">
          <div class="q-mt-xs row full-width">
            <div class="col-5 q-mx-md q-mt-lg required">First Name</div>
            <div class="col-4 q-mx-xl q-mt-lg">Last Name</div>
          </div>
          <div class="row q-mt-xs justify-between full-width">
            <div class="col-6">
              <q-input
                dense
                v-model="users.contact.fname"
                class="q-mx-md"
                style="width: 300px"
                outlined
              />
            </div>
            <div class="col-6">
              <q-input
                dense
                v-model="users.contact.lname"
                class="q-mx-md"
                style="width: 300px"
                outlined
              />
            </div>
          </div>
          <div class="q-mt-xs row full-width">
            <div class="col-5 q-mx-md q-mt-lg">
              Email <span class="text-red"> * </span>
            </div>
            <div class="col-4 q-mx-xl q-mt-lg">
              Role <span class="text-red"> * </span>
            </div>
          </div>
          <div class="row q-mt-xs justify-between full-width">
            <div class="col-6 q-mb-lg">
              <q-input
                dense
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
            <div class="col-6 q-px-md">
              <select
                v-model="selectedRole"
                class="q-ml-md full-width bg-white"
                style="height: 55px; border: 2px solid lightgrey"
                @change="onChangingUserRole()"
              >
                <optgroup label="Paid">
                  <option v-for="paid in paidUser">{{ paid.name }}</option>
                </optgroup>
                <optgroup label="Unpaid">
                  <option v-for="paid in unpaidUser">{{ paid.name }}</option>
                </optgroup>
              </select>
            </div>
          </div>
        </q-form>

        <div class="row justify-center">
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

  data() {
    return {
      OnboardingStatus: { isCompleted: true },
      isShowRemoveButton: false,
      paidUser: [],
      unpaidUser: [],
      optionsRole: ['Manager', 'Staff'],
      typeOfUser: ['User', 'Office Staff', 'Sales'],
      selectedRole: '',
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
    ...mapGetters(['contactTypes', 'allUsers', 'roleTypes'])
  },

  created() {
    this.getAllUsers();
    this.getRoles().then(async () => {
      this.roleTypes.forEach(val => {
        if (val.isPaid) {
          this.paidUser.push(val);
        } else {
          this.unpaidUser.push(val);
        }
      });
    });
  },

  methods: {
    validateEmail,

    ...mapActions(['addUser', 'setOnboard', 'getAllUsers', 'getRoles']),

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
        if (this.users.roles[0]) {
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
          this.selectedRole = '';
          await this.getAllUsers();
          this.addUserDialogBox = false;
        } else {
          this.$q.notify({
            message: ' Role Is  Mandatory',
            position: 'top',
            type: 'negative'
          });
        }
      }
    },

    onChangingUserRole(e) {
      var user = this.roleTypes.find(o => o.name === this.selectedRole);

      this.users.roles[0] = user.machineValue;
    }
  }
};
</script>
<style lang="scss" scoped>
tr:nth-child(even) {
  background-color: $grey-3 !important;
}

table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
}
table {
  border-collapse: collapse;
  width: 99.9%;
}
th {
  background: red;
}
td {
  padding: 8px 16px;
  border: 1px solid #ccc;
}
</style>
