<template>
  <q-page>
    <div>
      <q-card class="q-pa-lg" flat bordered>
        <div class="row justify-between">
          <div class="text-h5">Account Summary</div>
          <div class="text-h5 cursor-pointer">
            <q-icon name="create" color="primary" @click="onEditClick" />
          </div>
        </div>

        <div class="q-mt-lg q-pa-sm">
          <div class="row">
            <div
              class="col-5 text-bold"
              v-if="user.roles[0].machineValue == 'vendor'"
            >
              Company Name
            </div>
            <div>
              {{
                user.roles[0].machineValue == 'vendor'
                  ? user.companyName
                  : user.name
              }}
            </div>
          </div>
          <div class="row" v-if="user.name">
            <div class="col-5 text-bold">User Name</div>
            <div>{{ user.name }}</div>
          </div>
          <div class="row">
            <div class="col-5 text-bold">Address</div>

            <div class="column col-6" v-if="user.mailingAddress">
              <div>
                {{
                  user.mailingAddress.houseNumber
                    ? user.mailingAddress.houseNumber
                    : '-'
                }}
                {{
                  user.mailingAddress.address1
                    ? user.mailingAddress.address1
                    : '-'
                }}
              </div>
              <div v-if="user.mailingAddress && user.mailingAddress.address2">
                {{ user.mailingAddress.address2 }}
              </div>
              <div>
                {{
                  user.mailingAddress.addressLocality
                    ? user.mailingAddress.addressLocality
                    : '-'
                }},
                {{
                  user.mailingAddress.addressRegion
                    ? toGetStateShortName(user.mailingAddress.addressRegion)
                    : '-'
                }}

                {{
                  user.mailingAddress.postalCode
                    ? user.mailingAddress.postalCode
                    : '-'
                }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-5 text-bold">Mobile</div>
            <div
              class="col clickable text-primary"
              @click="onPhoneNumberClick(user.phoneNumber.number, $event)"
            >
              {{ user.phoneNumber ? user.phoneNumber.number : '-' }}
            </div>
          </div>
          <div class="row q-mt-sm">
            <div class="text-bold col-5">Postal Code</div>
            <div v-if="user.mailingAddress">
              {{ user.mailingAddress ? user.mailingAddress.postalCode : '-' }}
            </div>
          </div>
          <div class="row q-mt-sm">
            <div class="col-5 text-bold">Email</div>
            <div
              class="col clickable text-primary"
              @click="onEmailClick(user.email, $event)"
            >
              {{ user.email }}
            </div>
          </div>
          <div
            class="row q-mt-sm"
            v-if="user.roles[0].machineValue == 'estimator'"
          >
            <div class="col-5 text-bold">Photo ID Email</div>
            <div
              class="col clickable text-primary"
              @click="onEmailClick(user.email, $event)"
            >
              {{ user.photoIDEmail }}
            </div>
          </div>
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
      <q-card style="width: 100%; height: 100vh">
        <CustomBar
          :dialogName="'Edit User'"
          @closeDialog="editUserInfoDialog = false"
        />
        <div style="height: calc(100% - 140px); overflow: auto" class="">
          <q-form ref="addUserForm" class="q-pa-md">
            <div class="q-mt-xs">
              <q-card class="q-pa-sm q-mb-sm">
                <div class="full-width">
                  <q-input
                    v-if="user.roles[0].machineValue != 'owner'"
                    v-model="users.companyName"
                    dense
                    class="q-mx-md col-5 input-extra-padding"
                    label="Company name"
                  />

                  <q-input
                    v-model="users.fname"
                    dense
                    borderless
                    class="col-5 input-extra-padding input-style input-field"
                    label="First name"
                  />

                  <q-input
                    dense
                    v-model="users.lname"
                    borderless
                    class="col-5 input-extra-padding input-style input-field"
                    label="Last name"
                  />
                </div>
                <div class="row justify-between">
                  <q-select
                    dense
                    v-model="users.contact.type"
                    class="col-4 input-extra-padding input-style input-field"
                    :options="contactTypes"
                    borderless
                    option-value="machineValue"
                    option-label="name"
                    map-options
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
                    class="required col-5 input-style input-field"
                    label="Phone"
                    mask="(###) ###-####"
                    lazy-rules
                    borderless
                    :rules="[
                      val =>
                        (val && sendPhoneNumber(val).length == 10) ||
                        'Please enter the phone number'
                    ]"
                  />
                </div>
                <div>
                  <q-input
                    dense
                    disable
                    v-model="users.email"
                    label="Email"
                    borderless
                    class="col-5 required input-style input-field"
                    lazy-rules
                    :rules="[
                      val =>
                        validateEmail(val) ||
                        'You have entered an invalid email address!'
                    ]"
                  />
                  <q-input
                    v-if="user.roles[0].machineValue == 'estimator'"
                    dense
                    v-model="users.photoIdEmail"
                    style=""
                    label="Photo ID Email"
                    class="q-mx-md col-5"
                  />
                </div>
              </q-card>
              <q-card class="q-pa-sm">
                <AutoCompleteAddress
                  :id="'AddVendor'"
                  :address="users.mailingAddress"
                  :isDropBoxEnable="false"
                  :isChecksEnable="false"
                  :value="false"
                />
              </q-card>
            </div>
          </q-form>
        </div>
        <div class="row justify-center">
          <q-btn
            label="Save"
            class="single-next-button-style q-mt-lg"
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
import { toGetStateShortName } from '@utils/common';
import CustomBar from 'components/CustomBar';
import { validateEmail } from '@utils/validation';
import {
  onPhoneNumberClick,
  onEmailClick,
  sendPhoneNumber
} from '@utils/clickable';

import AutoCompleteAddress from 'components/AutoCompleteAddress';
export default {
  components: { AutoCompleteAddress, CustomBar },
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
        photoIdEmail: '',
        roles: [],
        mailingAddress: {
          houseNumber: '',
          addressCountry: '',
          addressLocality: '',
          addressRegion: '',
          postOfficeBoxNumber: '',
          postalCode: '',
          address1: '',
          address2: '',
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
      this.user = getCurrentUser().attributes;
      this.userId = getCurrentUser().id;
    }
  },

  computed: {
    ...mapGetters(['contactTypes'])
  },
  methods: {
    validateEmail,
    onPhoneNumberClick,
    onEmailClick,
    sendPhoneNumber,
    toGetStateShortName,
    ...mapActions([
      'getContactTypes',
      'editUserInfo',
      'getUserInfo',
      'editUserProfile'
    ]),
    onEditClick() {
      this.users.companyName = this.user.companyName;
      this.users.fname = this.user.contact.fname;
      this.users.lname = this.user.contact.lname;
      this.users.contact.type = this.user.phoneNumber
        ? this.user.phoneNumber.type
        : '';
      this.users.contact.number = this.user.phoneNumber
        ? this.user.phoneNumber.number
        : '';

      this.users.email = this.user.email;
      if (this.user.roles[0].machineValue == 'estimator') {
        this.users.photoIdEmail = this.user.photoIDEmail;
      }
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
        this.users.mailingAddress.address1 = this.user.mailingAddress.address1
          ? this.user.mailingAddress.address1
          : '';
        this.users.mailingAddress.address2 = this.user.mailingAddress.address2
          ? this.user.mailingAddress.address2
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
            photoIDEmail: this.users.photoIdEmail,
            role: this.users.roles,
            mailingAddress: this.users.mailingAddress,
            phoneNumber: {
              type: this.users.contact.type,
              number: sendPhoneNumber(this.users.contact.number)
            }
          }
        };
        await this.editUserProfile(payload);
        await this.getUserInfo();
        this.user = getCurrentUser().attributes;
        this.users.companyName = this.user.companyName;
        this.users.fname = this.user.contact.fname;
        this.users.lname = this.user.contact.lname;
        this.users.contact.type = this.user.phoneNumber.type;
        this.users.contact.number = this.user.phoneNumber.number;
        this.users.email = this.user.email;
        this.users.mailingAddress = this.user.mailingAddress;
      }
      window.location.reload();
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
