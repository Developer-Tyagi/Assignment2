<template>
  <q-page class="window-height bg-background full-width">
    <br />
    <div class="q-mx-xl q-mt-xs" style="height: 60%; width: 90%">
      <div class="full-width">
        <div class="text-bold q-mx-xl">Manage Users</div>
      </div>
      <div class="full-width">
        <div class="row justify-between my-font text-bold q-mx-xl">
          <div class="col-3">
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
            <div class="col-3 q-mr-lg">
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
        <div class="col-11 q-mx-xl">
          <q-markup-table flat bordered>
            <thead class="bg-grey-5">
              <tr>
                <th class="text-left">Contact Name</th>
                <th class="text-left">Bussiness</th>
                <th class="text-left">Contact Number</th>
                <th class="text-left">Member Since</th>
                <th class="text-left">Roles</th>
                <th class="text-left">Last Access</th>
                <th class="text-left">Status</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="index in 5" :key="index">
                <td class="text-left">{{ name }}</td>
                <td class="text-left">{{ bussiness }}</td>
                <td class="text-left">{{ contactNo }}</td>
                <td class="text-left">{{ date }}/</td>
                <td class="text-left">{{ roles }}</td>
                <td class="text-left">{{ lastAccess }}</td>
                <td class="text-left">{{ status }}</td>
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
          <div class=" row absolute-center">
            <q-btn
              color="primary"
              label="Go To Dashboard"
              class="q-mx-lg"
              @click="SendToDashboard"
            />
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="addUserDialogBox" persistent>
      <q-card
        style="width: 800px; height: 600px; max-width: 1000vw"
        class="q-pa-md"
      >
        <q-bar class="row justify-between" style="height: 50px">
          <div class="col-46 q-px-xl text-bold">
            Add User
          </div>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-form ref="addUserForm">
          <div
            class=" bg- q-ma-xs"
            outlined
            v-for="(contactInfo, index) in users"
            v-if="index >= 0"
          >
            <div class=" q-mt-xs row full-width">
              <div class="col-5 text-bold q-pl-md">
                USER &nbsp;{{ index + 1 }}
              </div>
            </div>
            <div class="row q-mt-xs justify-between full-width">
              <div class="col-6">
                <q-select
                  v-model="typeOfUsers"
                  outlined
                  style="width: 300px"
                  class="q-mx-xl"
                  :options="typeOfUser"
                  label="role"
                  :rules="[
                    val => (val && val.length > 0) || 'Role is Required'
                  ]"
                />
              </div>
            </div>
            <div v-if="typeOfUser != null">
              <div class=" q-mt-xs row full-width">
                <div class="col-5 q-mx-xl q-mt-lg">First Name *</div>
                <div class="col-4 q-mx-lg q-mt-lg">Last Name *</div>
              </div>
              <div class="row q-mt-xs justify-between full-width">
                <div class="col-6">
                  <q-input
                    v-model="users[index].contact.fname"
                    class="q-mx-xl"
                    style="width: 300px"
                    outlined
                  />
                </div>
                <div class="col-6">
                  <q-input
                    v-model="users[index].contact.lname"
                    class="q-mx-xl"
                    style="width: 300px"
                    outlined
                  />
                </div>
              </div>
              <div class="q-mt-xs row full-width">
                <div class="col-5 q-mx-xl q-mt-lg">Email*</div>
                <div class="col-4 q-mx-lg q-mt-lg">Role *</div>
              </div>
              <div class="row q-mt-xs justify-between full-width">
                <div class="col-6 q-mb-xl">
                  <q-input
                    v-model="users[index].email"
                    class="q-mx-xl"
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
                <div class="col-6">
                  <q-select
                    v-model="users[index].roles[0]"
                    outlined
                    style="width: 300px"
                    class="q-mx-xl"
                    :options="optionsRole"
                    label="role"
                    :rules="[
                      val => (val && val.length > 0) || 'Role is Required'
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-form>
        <div class=" row  q-px-xl justify-between">
          <q-btn
            outline
            class=" q-mx-md"
            @click="addAnotherContact"
            color="primary"
            label="Add More"
            style="margin-right: auto"
          />

          <q-btn
            outline
            @click="removeAnotherContact"
            class="  q-mx-xl"
            color="primary"
            label="Remove"
            v-if="isShowRemoveButton"
          />
        </div>
        <div class="q-mt-lg row justify-center">
          <q-btn
            color="primary"
            label="submit and Proceed"
            class="q-mx-lg"
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
      typeOfUsers: '',
      optionsRole: ['Manager', 'Staff'],
      typeOfUser: ['User', 'Office Staff', 'Sales'],
      users: [
        {
          type: 'user',
          contact: {
            fname: '',
            lname: ''
          },
          email: '',
          roles: []
        }
      ],
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
      lastAccess: '20/01/2020 20:40:19',
      status: 'Active'
    };
  },

  methods: {
    validateEmail,
    ...mapActions(['addUser', 'setOnboard']),

    onItemClick() {},
    async addAnotherContact() {
      const success = await this.$refs.addUserForm.validate();
      if (success) {
        const len = this.users.length;

        if (this.users[len - 1].contact.fname && this.users[len - 1].email) {
          this.len = len + 1;
          this.users.push({
            type: 'user',
            contact: {
              fname: '',
              lname: ''
            },
            email: '',
            roles: []
          });
          this.isShowRemoveButton = true;
        } else {
          this.$q.notify({
            message: 'Please fill the first Name and Email First',
            position: 'top',
            type: 'negative'
          });
        }
      }
    },
    //fThis is for Updating the  Onboarding status
    SendToDashboard() {
      console.log(this.OnboardingStatus);
      this.setOnboard(this.OnboardingStatus);
      this.$router.push('/dashboard');
    },
    //  For Remove  AddUser,OfficeStraffInfo and Sales
    removeAnotherContact() {
      const len = this.users.length;
      if (len === 2) {
        this.isShowRemoveButton = false;
      }
      this.users.pop();
    },
    async onSubmit() {
      console.log(66575);
      const success = await this.$refs.addUserForm.validate();

      if (success) {
        this.users.forEach(user => {
          this.addUser(user);
        });

        this.isShowRemoveButton = false;
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
