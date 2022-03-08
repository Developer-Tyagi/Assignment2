<template>
  <div>
    <q-dialog v-model="addAdditionalUser">
      <q-card class="full-width" style="max-width: 600px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 fontWeight600">Add an Additional User</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            @click="passEvent()"
          />
        </q-card-section>

        <q-card-section>
          <q-form class="q-mt-md" @submit="addExtraUser()" ref="userInfo">
            <div class="row">
              <div class="col q-mr-md">
                <div class="text-subtitle1 fontWeight600">First name</div>
                <div>
                  <q-input
                    outlined
                    dense
                    v-model="user.firstName"
                    label="Enter First Name"
                  />
                </div>
              </div>
              <div class="col">
                <div class="text-subtitle1 fontWeight600">Last name</div>
                <div>
                  <q-input
                    outlined
                    dense
                    v-model="user.lastName"
                    label="Enter Last Name"
                  />
                </div>
              </div>
            </div>
            <div class="q-mt-md">
              <div class="text-subtitle1 fontWeight600">Email</div>
              <div>
                <q-input
                  outlined
                  dense
                  v-model="user.email"
                  label="Enter Email Address"
                />
              </div>
            </div>
            <div class="q-mt-md">
              <div class="text-subtitle1 fontWeight600">Select Role</div>
              <div>
                <q-select
                  dense
                  outlined
                  options-dense
                  class="input-extra-padding"
                  v-model="user.role"
                  :options="userRole"
                  label="Role"
                  color="primary"
                  options-selected-class="text-deep-orange"
                />
              </div>
            </div>

            <div class="row justify-between q-mt-xl">
              <q-btn
                v-close-popup
                label="Cancel"
                no-caps
                outline
                color="deep-orange"
                size="1rem"
                @click="passEvent()"
              />
              <q-btn
                label="Add User"
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
  </div>
</template>

<script>
export default {
  name: 'AddNewUser',
  data() {
    return {
      addAdditionalUser: false,
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
      }
    };
  },

  props: {
    showDialog: {
      type: Boolean
    }
  },
  watch: {
    showDialog: function (newVal, oldVal) {
      // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      this.addAdditionalUser = newVal;
    }
  },
  methods: {
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
    passEvent() {
      this.$emit('closeUserDialog', false);
    }
  }
};
</script>
