<template>
  <q-page>
    <div>
      <q-card class="q-pa-lg" flat bordered>
        <div class="row justify-between">
          <div class="text-h5">Account Summary</div>
          <div class="text-h5">
            <q-icon name="create" color="primary" @click="onEditClick" />
          </div>
        </div>

        <div class="row q-mt-lg text-bold">
          <div class="col">Company Name</div>
          <div class="col">Company Address</div>
          <div class="col">Company Mobile</div>
          <div class="col">Postal Company Code</div>
        </div>
        <q-separator />

        <div class="row q-mt-xs">
          <div class="col-3 column">
            {{ user.name }}
          </div>
          <div class="col-3">
            <div class="q-mr-md" v-if="user.mailingAddress">
              {{
                user.mailingAddress.streetAddress
                  ? user.mailingAddress.streetAddress
                  : '-'
              }},{{
                user.mailingAddress.addressRegion
                  ? user.mailingAddress.addressRegion
                  : '-'
              }},{{
                user.mailingAddress.addressLocality
                  ? user.mailingAddress.addressLocality
                  : '-'
              }}
              ,
              {{
                user.mailingAddress.addressCountry
                  ? user.mailingAddress.addressCountry
                  : '-'
              }},{{
                user.mailingAddress.postalCode
                  ? user.mailingAddress.postalCode
                  : '-'
              }}
            </div>
          </div>
          <div class="col">
            {{ user.phoneNumber ? user.phoneNumber.number : '-' }}
          </div>
          <div class="col" v-if="user.mailingAddress">
            {{ user.mailingAddress ? user.mailingAddress.postalCode : '-' }}
          </div>
        </div>

        <div class="row q-mt-xl text-bold">
          <div class="col">Company Administrator</div>
          <div class="col">Administrator Email</div>
        </div>
        <q-separator />
        <div class="row q-mt-xs">
          <div class="col">
            {{ user.contact.fname }} {{ user.contact.lname }}
          </div>
          <div class="col">{{ user.email }}</div>
        </div>
      </q-card>
    </div>
    <!-- Dialog For user Data -->
    <q-dialog
      v-model="editUserInfoDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="width: 40%; height: 75vh">
        <q-bar class="row justify-between bg-primary" style="height: 50px">
          <div class="q-px-xs text-bold text-white">Edit User Info</div>
          <q-btn dense flat icon="close" color="white" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div style="height: calc(100% - 140px); overflow: auto" class="q-pa-md">
          <q-form ref="addUserForm" class="q-pa-md">
            <div class="q-mt-xs">
              <q-card class="q-mx-md q-pa-sm q-mb-sm">
                <div class="row full-width">
                  <q-input
                    v-model="users.fname"
                    dense
                    class="q-mx-md col-5 input-extra-padding"
                    outlined
                    label="First name"
                  />

                  <q-input
                    dense
                    v-model="users.lname"
                    class="q-mx-md col-5 input-extra-padding"
                    outlined
                    label="Last name"
                  />
                </div>
                <div class="row">
                  <q-select
                    dense
                    v-model="users.contact.type"
                    class="q-mx-md col-5 input-extra-padding"
                    :options="contactTypes"
                    option-value="machineValue"
                    option-label="name"
                    map-options
                    outlined
                    options-dense
                    behavior="menu"
                    label="Type"
                    emit-value
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select phone type'
                    ]"
                  />
                  <q-input
                    dense
                    v-model="users.contact.number"
                    outlined
                    class="q-mx-md required col-5 input-extra-padding"
                    label="Phone"
                    mask="(###) ###-####"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length == 14) || 'Please enter phone number'
                    ]"
                  />
                </div>
                <div class="row">
                  <q-input
                    dense
                    disable
                    v-model="users.email"
                    style=""
                    label="Email"
                    class="q-mx-md col-5 required"
                    outlined
                    lazy-rules
                    :rules="[
                      val =>
                        validateEmail(val) ||
                        'You have entered an invalid email address!'
                    ]"
                  />
                </div>
              </q-card>
              <q-card class="q-mx-md q-pa-sm">
                <AutoCompleteAddress
                  :id="'AddVendor'"
                  :address="users.mailingAddress"
                  :isDropBoxEnable="false"
                  :isChecksEnable="false"
                  :value="false"
                  :view="'web'"
                />
              </q-card>
            </div>
          </q-form>
        </div>
        <div class="row justify-center">
          <q-btn
            color="primary"
            label="Save"
            class="align-content-center col-2 q-my-lg"
            @click="onSaveEditedButton"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { getCurrentUser } from 'src/utils/auth';
import { mapGetters, mapActions } from 'vuex';
import { validateEmail } from '@utils/validation';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
export default {
  components: { AutoCompleteAddress },
  name: 'UserProfile',
  data() {
    return {
      editUserInfoDialog: false,
      user: {},
      users: {
        fname: '',
        lname: '',
        contact: {
          type: 'main',
          number: ''
        },
        email: '',
        roles: [],
        mailingAddress: {
          houseNumber: '',
          addressCountry: '',
          addressLocality: '',
          addressRegion: '',
          postOfficeBoxNumber: '',
          postalCode: '',
          streetAddress: '',
          dropBox: {
            info: '',
            isPresent: false
          }
        }
      }
    };
  },
  created() {
    this.getContactTypes();
    if (getCurrentUser().attributes) {
      console.log(getCurrentUser().attributes, 667);
      this.user = getCurrentUser().attributes;
      this.userId = getCurrentUser().id;
    }
  },
  computed: {
    ...mapGetters(['contactTypes'])
  },
  methods: {
    validateEmail,
    ...mapActions(['getContactTypes', 'editUserInfo', 'getUserInfo']),
    onEditClick() {
      this.users.fname = this.user.contact.fname;
      this.users.lname = this.user.contact.lname;
      this.users.contact.type = this.user.phoneNumber
        ? this.user.phoneNumber.type
        : '';
      this.users.contact.number = this.user.phoneNumber
        ? this.user.phoneNumber.number
        : '';

      this.users.email = this.user.email;
      if (this.user.mailingAddress) {
        this.users.mailingAddress.addressCountry = this.user.mailingAddress
          ? this.user.mailingAddress.addressCountry
          : '';
        this.users.mailingAddress.addressRegion = this.user.mailingAddress
          .addressRegion
          ? this.user.mailingAddress.addressRegion
          : '';
        this.users.mailingAddress.addressLocality = this.user.mailingAddress
          .addressLocality
          ? this.user.mailingAddress.addressLocality
          : '';
        this.users.mailingAddress.houseNumber = this.user.mailingAddress
          .houseNumber
          ? this.user.mailingAddress.houseNumber
          : '';
        this.users.mailingAddress.streetAddress = this.user.mailingAddress
          .streetAddress
          ? this.user.mailingAddress.streetAddress
          : '';
        this.users.mailingAddress.postalCode = this.user.mailingAddress
          .postalCode
          ? this.user.mailingAddress.postalCode
          : '';
      }

      this.editUserInfoDialog = true;
    },
    async onSaveEditedButton() {
      const success = await this.$refs.addUserForm.validate();
      if (success) {
        this.editUserInfoDialog = false;
        const payload = {
          id: this.userId,
          data: {
            contact: {
              fname: this.users.fname,
              lname: this.users.lname
            },
            email: this.users.email,
            role: this.users.roles,
            mailingAddress: this.users.mailingAddress,
            phoneNumber: {
              type: this.users.contact.type,
              number: this.users.contact.number
            }
          }
        };
        await this.editUserInfo(payload);
        await this.getUserInfo();
        this.user = getCurrentUser().attributes;
        this.users.fname = this.user.contact.fname;
        this.users.lname = this.user.contact.lname;
        this.users.contact.type = this.user.phoneNumber.type;
        this.users.contact.number = this.user.phoneNumber.number;
        this.users.email = this.user.email;
        this.users.mailingAddress = this.user.mailingAddress;
      }
    }
  }
};
</script>
<style lang="scss">
.form-list {
  color: #333333;
  font-weight: bold;
  font-size: 16px;
  margin: 5px 0;
}
</style>
