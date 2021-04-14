<template>
  <q-page>
    <div class="q-pa-md height-without-header">
      <div class="row justify-between">
        <div class="row justify-between text-bold q-ml-auto">
          <q-card flat bordered class="q-pa-sm q-ml-md q-mt-sm"
            >Licenses available- {{ '5' }}</q-card
          >
          <q-card flat bordered class="q-pa-sm q-ml-md q-mt-sm"
            >Total Users - {{ allUsers.length }}</q-card
          >
          <q-btn
            color="primary"
            class="q-ml-md q-mt-sm"
            @click="addUserDialogBox = true"
          >
            Add New User
          </q-btn>
        </div>
      </div>

      <div class="q-mt-sm" style="height: calc(100% - 47px); overflow: auto">
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
              <td class="text-primary text-center">
                <span
                  class="clickable"
                  v-if="user.attributes.email"
                  @click="onEmailClick(user.attributes.email, $event)"
                  >{{ user.attributes.email }}</span
                ><span v-else> - </span>
              </td>
              <td class="text-primary text-center">
                <span
                  class="clickable"
                  v-if="
                    user.attributes['phoneNumber'] &&
                      user.attributes['phoneNumber']['number']
                  "
                  @click="
                    onPhoneNumberClick(user.attributes.phoneNumber, $event)
                  "
                  >{{ user.attributes.phoneNumber['number'] }}</span
                ><span v-else> - </span>
              </td>
              <td class="text-center">-</td>
              <td class="text-center">
                {{ user.attributes.roles ? user.attributes.roles[0] : '-' }}
              </td>
              <td class="text-center">-</td>

              <td class="text-center">-</td>
              <td class="text-center">
                <div>
                  <q-btn-dropdown label="Action" style="width: 100px" outline>
                    <q-list style="width: 100px">
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
      <q-card style="max-width: 70vw">
        <q-bar class="row justify-between bg-primary" style="height: 50px">
          <div class="col-4 q-px-xs text-bold text-white">Add User</div>
          <q-btn dense flat icon="close" color="white" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-form ref="addUserForm" class="q-pa-xl">
          <div class="row q-mt-xs justify-between full-width">
            <q-input
              dense
              v-model="users.contact.fname"
              class="q-mx-md col-5 input-extra-padding"
              outlined
              label="First name"
            />

            <q-input
              dense
              v-model="users.contact.lname"
              class="q-mx-md col-5 input-extra-padding"
              outlined
              label="Last name"
            />
            <q-input
              dense
              label="Email"
              v-model="users.email"
              class="q-mx-md col-5 required"
              outlined
              lazy-rules
              :rules="[
                val =>
                  validateEmail(val) ||
                  'You have entered an invalid email address!'
              ]"
            />
            <q-select
              dense
              outlined
              filled
              options-dense
              class="q-mx-md col-5 input-extra-padding required"
              v-model="selectedRole"
              :options="userRole"
              label="Role"
              color="primary"
              options-selected-class="text-deep-orange"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please enter the user role!'
              ]"
            >
              <template v-slot:option="scope">
                <q-expansion-item
                  expand-separator
                  group="somegroup"
                  :default-opened="hasChild(scope)"
                  header-class="text-weight-bold"
                  :label="scope.opt.label"
                >
                  <template v-for="child in scope.opt.children">
                    <q-item
                      :key="child.label"
                      clickable
                      v-ripple
                      v-close-popup
                      @click="selectedRole = child.label"
                      :class="{
                        'bg-light-oragne-1': selectedRole === child.label
                      }"
                    >
                      <q-item-section>
                        <q-item-label
                          v-html="child.label"
                          class="q-ml-md"
                        ></q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-expansion-item>
              </template>
            </q-select>
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
import { onEmailClick, onPhoneNumberClick } from '@utils/clickable';

export default {
  name: 'Manage-User',

  data() {
    return {
      OnboardingStatus: { isCompleted: true },
      isShowRemoveButton: false,
      userRole: [
        {
          label: 'Paid',
          children: []
        },
        {
          label: 'Un-paid',
          children: []
        }
      ],
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
          this.userRole[0].children.push({
            label: val.name,
            value: val.machineValue
          });
        } else {
          this.userRole[1].children.push({
            label: val.name,
            value: val.machineValue
          });
        }
      });
    });
  },

  watch: {
    selectedRole(newVal, oldVal) {
      if (newVal) {
        var user = this.roleTypes.find(o => o.name === newVal);
        this.users.roles[0] = user.machineValue;
      }
    }
  },

  methods: {
    validateEmail,

    ...mapActions(['addUser', 'setOnboard', 'getAllUsers', 'getRoles']),

    onEmailClick,
    onPhoneNumberClick,
    //this is important dont remove this function
    onItemClick() {},

    async onSubmit() {
      const success = await this.$refs.addUserForm.validate();

      if (success) {
        await this.addUser(this.users);
        await this.getAllUsers();
        this.addUserDialogBox = false;
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
      }
    },

    getLabel(scope) {
      return scope.label;
    },

    hasChild(scope) {
      return scope.opt.children.some(c => c.label === this.selectedRole);
    }
  }
};
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
}
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
