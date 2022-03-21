<template>
  <div class="poppinsFont">
    <q-dialog v-model="show" persistent>
      <q-card
        class="full-width poppinsFont"
        style="
          max-width: 800px;
          padding: 8px;
          border-radius: 8px;
          box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
            0px 8px 8px -4px rgba(16, 24, 40, 0.04);
        "
      >
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
                    borderless
                    dense
                    class="input-style1 test q-mt-xs q-pb-none"
                    v-model="user.firstName"
                    label="Enter First Name"
                    :rules="[
                      val => (val && val.length > 0) || 'Please add first name'
                    ]"
                  />
                </div>
              </div>
              <div class="col">
                <div class="text-subtitle1 fontWeight600">Last name</div>
                <div>
                  <q-input
                    borderless
                    dense
                    class="input-style1 test q-mt-xs q-pb-none"
                    v-model="user.lastName"
                    label="Enter Last Name"
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || 'Please add last name'
                    ]"
                  />
                </div>
              </div>
            </div>
            <div class="q-mt-md">
              <div class="text-subtitle1 fontWeight600">Email</div>
              <div>
                <q-input
                  borderless
                  class="input-style1 test q-mt-xs q-pb-none"
                  dense
                  v-model="user.email"
                  label="Enter Email Address"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Email is required',
                    val => (val && validateEmail(val)) || 'Enter valid Email',
                    val =>
                      checkEmailExist(val) || 'This email is already in use'
                  ]"
                />
                <span
                  class=""
                  style="
                    color: #c10015;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 12px;
                    overflow: visible;
                    font-family: poppins;
                  "
                  >{{ errorMSG }}</span
                >
                <br v-if="errorMSG" />
              </div>
            </div>
            <div class="q-mt-md">
              <div class="text-subtitle1 fontWeight600">Select Role</div>

              <div>
                <q-select
                  dense
                  borderless
                  options-dense
                  class="input-style1 test q-mt-xs q-pb-none"
                  v-model="user.role"
                  :options="roleTypes"
                  option-value="id"
                  option-label="name"
                  label="Select User Role"
                  color="primary"
                  @input="setSelectedRole(user.role)"
                  options-selected-class="text-deep-orange"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && Object.keys(val).length > 0) ||
                      'Please select the role'
                  ]"
                />
              </div>
            </div>
            <div class="q-mt-md" v-if="selectedRole.length > 0">
              <div class="text-subtitle1 fontWeight600">Select Title</div>
              <div>
                <q-select
                  dense
                  borderless
                  options-dense
                  class="input-style1 test q-mt-xs q-pb-none"
                  v-model="user.subRole"
                  @input="setSelectedSubRole(user.subRole)"
                  :options="selectedRole"
                  option-value="machineValue"
                  option-label="value"
                  label="Select Title"
                  color="primary"
                  options-selected-class="text-deep-orange"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && Object.keys(val).length > 0) ||
                      'Please select the title'
                  ]"
                />
              </div>
            </div>
            <div
              class="q-mt-md"
              v-if="
                selectedSubRole.machineValue == 'executive_owner' ||
                selectedSubRole.machineValue == 'ale_adjuster' ||
                selectedSubRole.machineValue == 'apprentice_adjuster' ||
                selectedSubRole.machineValue == 'contents_adjuster' ||
                selectedSubRole.machineValue == 'pia_public_insurance_adjuster_'
              "
            >
              <div class="text-subtitle1 fontWeight600">PIA License</div>
              <div
                class="row"
                :class="index > 0 ? 'q-mt-sm' : ''"
                v-for="(license, index) in user.license"
                :key="index"
              >
                <div class="col-4 q-mr-md">
                  <q-select
                    dense
                    borderless
                    options-dense
                    class="col input-style1 test q-mt-xs q-pb-none"
                    v-model="license.state"
                    :options="states"
                    option-value="state"
                    label="State"
                    color="primary"
                    options-selected-class="text-deep-orange"
                    lazy-rules
                    :rules="[
                      val => val.length > 0 || 'Please select the state!'
                    ]"
                  />
                  <!-- <span v-if="stateError" class="errMessages">{{stateError}}</span> -->
                </div>

                <div class="col row full-width">
                  <q-input
                    borderless
                    class="col input-style1 test q-mt-xs q-mb-sm q-pb-none"
                    dense
                    v-model="license.number"
                    label="PIA License Number"
                    lazy-rules
                    :rules="[
                      val =>
                        val.length > 0 || 'Please enter the license number!'
                    ]"
                  />
                  <q-icon
                    class="col-1 q-pb-sm cursor-pointer"
                    v-if="index > 0"
                    name="close"
                    size="sm"
                    @click="removeLicense(index)"
                  />
                </div>
              </div>
              <div class="col-12 text-caption text-grey q-pt-xs q-mt-xs">
                Please enter your residential PIA license number.
              </div>
              <span
                class="q-mt-md text-primary cursor-pointer"
                @click="addAditionalPIALicense()"
              >
                <q-icon size="xs" name="add_circle_outline" /> Add an additional
                PIA License
              </span>
            </div>
            <div class="row justify-between q-mt-xl">
              <q-btn
                v-close-popup
                label="Cancel"
                no-caps
                outline
                color="deep-orange"
                size="1rem"
                style="border-radius: 10px; width: 118px; height: 50px"
                @click="passEvent()"
              />
              <q-btn
                label="Add user"
                no-caps
                type="submit"
                color="deep-orange"
                size="1rem"
                style="border-radius: 10px; width: 118px; height: 50px"
              />
            </div>
            <div class=""></div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- confirmation dialog -->
    <q-dialog v-model="confirmationDialog" persistent>
      <q-card
        class="full-width poppinsFont"
        style="
          padding: 24px;
          max-width: 400px;
          border-radius: 12px;
          box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
            0px 8px 8px -4px rgba(16, 24, 40, 0.04);
        "
      >
        <div class="text-center q-pb-none">
          <div class="row justify-center">
            <q-icon class="" size="3.5em">
              <q-img :src="getImage('Featured icon (3).svg')" />
            </q-icon>
          </div>
          <div class="text-subtitle1 fontWeight500" style="margin: 8px 0px">
            Do you wish to upgrade your account?
          </div>
        </div>
        <div class="" style="border-radius: 8px">
          <!-- <div class="row justify-center q-pb-md q-pt-sm">
            <div class="row justify-center">
              <q-icon class="" size="3em">
                <q-img :src="getImage('Featured icon (1).svg')" />
              </q-icon>
            </div>
          </div> -->

          <div class="text-center">
            <span><sup class="text-h5 fontWeight600">$</sup></span
            ><span class="fontWeight600 text-h4 q-pt-sm">50</span>
            <span class="text-grey text-subtitle1 fontWeight400"
              >/month per user*</span
            >
          </div>
        </div>

        <div class="q-mb-sm q-mt-lg">
          <div class="row justify-between">
            <q-btn
              class="col q-mr-lg"
              v-close-popup
              label="Cancel"
              no-caps
              outline
              color="deep-orange"
              size="1rem"
              style="border-radius: 10px; width: 164px; height: 50px"
            />
            <q-btn
              class="col"
              label="Confirm"
              no-caps
              style="border-radius: 10px; width: 164px; height: 50px"
              color="deep-orange"
              size="1rem"
              @click="submitUser()"
            />
          </div>
        </div>
        <div
          class="q-px-lg text-grey text-caption"
          style="margin: 20px 0px 0px 0px"
        >
          *You will be charged a pro-rated subscription fee for the current
          month
        </div>
      </q-card>
    </q-dialog>

    <!-- success dialog -->
    <q-dialog v-model="successDialog" persistent>
      <q-card
        class="full-width q-px-lg poppinsFont"
        style="
          padding: 24px;
          max-width: 450px;
          box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
            0px 8px 8px -4px rgba(16, 24, 40, 0.04);
          border-radius: 12px;
        "
      >
        <q-card-section class="text-center q-pb-none">
          <div class="row justify-center">
            <q-icon class="" size="3.5em">
              <q-img :src="getImage('Featured icon (3).svg')" />
            </q-icon>
          </div>
          <div
            class="fontWeight500 q-mt-md"
            style="font-size: 18px; line-height: 28px"
          >
            User successfully created
          </div>
        </q-card-section>

        <div class="text-center text-grey fontWeight400 q-mt-sm">
          Your new user has been added to your account.
        </div>
        <div class="" style="margin-top: 32px">
          <div class="row justify-between">
            <q-btn
              class="col q-mr-lg"
              label="Add an Additional User"
              @click="openAddDialog()"
              no-caps
              outline
              color="deep-orange"
              size="1rem"
              style="border-radius: 10px; width: 215px; height: 50px"
            />
            <q-btn
              class="col-4"
              label="Close"
              v-close-popup
              no-caps
              style="border-radius: 10px; width: 125px; height: 50px"
              color="deep-orange"
              size="1rem"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AddressService from '@utils/country';
import { validateEmail, validateNonRequiredEmail } from '@utils/validation';
const addressService = new AddressService();
export default {
  name: 'AddNewUser',
  data() {
    return {
      confirmationDialog: false,
      successDialog: false,
      userRole: [],
      user: {
        firstName: '',
        lastName: '',
        role: '',
        subRole: '',
        email: '',
        license: [{ state: '', number: '' }]
      },
      selectedRoleObject: {
        value: '',
        machineValue: '',
        isPaid: false
      },
      selectedRole: [],
      states: [],
      selectedSubRole: [],
      stateError: '',
      errorMSG: ''
    };
  },
  props: {
    showDialog: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['roleTypes', 'organization']),
    show: {
      get() {
        return this.showDialog;
      }
    }
  },
  methods: {
    validateEmail,
    ...mapActions(['addAdditionalLicense', 'addUser', 'checkExistingEmail']),
    getImage(icon) {
      return require('../assets/' + icon);
    },
    myRule(val) {
      if (val.length <= 0) {
        this.stateError = 'Please selcect the state';
        return false;
      } else {
        this.stateError = '';
        return true;
      }
    },
    openAddDialog() {
      this.successDialog = false;
      this.user = {
        firstName: '',
        lastName: '',
        role: '',
        subRole: '',
        email: '',
        license: [{ state: '', number: '' }]
      };
      this.selectedRoleObject = {
        value: '',
        machineValue: '',
        isPaid: false
      };
      this.selectedRole = [];
      this.selectedSubRole = [];
      this.$emit('closeUserDialog', true);
    },
    async addExtraUser() {
      const success = await this.$refs.userInfo.validate();
      let currentSelectedRole = this.selectedRoleObject.machineValue;
      let allowedVal =
        this.organization.allowedRoles[currentSelectedRole].count;
      let currentUsed =
        this.organization.currentRoles[currentSelectedRole].count;
      if (allowedVal - currentUsed > 0) {
        this.submitUser();
      } else {
        this.confirmationDialog = true;
      }
    },
    passEvent() {
      this.user = {
        firstName: '',
        lastName: '',
        role: '',
        subRole: '',
        email: '',
        license: [{ state: '', number: '' }]
      };
      this.selectedRoleObject = {
        value: '',
        machineValue: '',
        isPaid: false
      };
      this.selectedRole = [];
      this.selectedSubRole = [];
      this.$emit('closeUserDialog', false);
    },
    setSelectedRole(selectedRoles) {
      if (selectedRoles.attribute.subRoles) {
        this.selectedRole = selectedRoles.attribute.subRoles;
      }
      this.selectedRoleObject.value = selectedRoles.attribute.value;
      this.selectedRoleObject.machineValue =
        selectedRoles.attribute.machineValue;
      this.selectedRoleObject.isPaid = selectedRoles.attribute.isPaid;
      this.user.subRole = '';
      this.user.license = [{ state: '', number: '' }];
      this.selectedSubRole = [];
    },
    setSelectedSubRole(selectedSubRoles) {
      this.selectedSubRole = selectedSubRoles;
      this.user.license = [{ state: '', number: '' }];
    },
    addAditionalPIALicense() {
      let newLicenseData = { state: '', number: '' };
      this.user.license.push(newLicenseData);
    },
    removeLicense(index) {
      this.user.license.splice(index, 1);
    },
    async checkEmailExist(val) {
      let res = await this.checkExistingEmail(val);
      if (res) {
        this.errorMSG = '';
      } else {
        this.errorMSG =
          'This email is already in use. Please choose another email!';
      }
      return res;
    },
    async submitUser() {
      let payload = {
        plan: {
          value: 'Additional Users',
          machineValue: 'additional_users',
          stripePriceID: 'price_1KWJRoEK8DUf1aFSq5MT2uhH',
          stripeProductID: 'prod_LCitvpxHs3m83L',
          quantity: 1,
          roles: [
            {
              value: this.selectedRoleObject.value,
              machineValue: this.selectedRoleObject.machineValue,
              count: 1
            }
          ]
        }
      };
      let currentSelectedRole = this.selectedRoleObject.machineValue;
      let allowedVal =
        this.organization.allowedRoles[currentSelectedRole].count;
      let currentUsed =
        this.organization.currentRoles[currentSelectedRole].count;

      if (allowedVal - currentUsed > 0) {
        var licenseGrant = true;
      } else {
        var licenseGrant = await this.addAdditionalLicense(payload);
        this.confirmationDialog = false;
      }
      if (licenseGrant) {
        // call add user
        let userPayload = {
          type: 'user',
          email: this.user.email,

          contact: {
            fname: this.user.firstName,
            lname: this.user.lastName
          },
          roles: [
            {
              value: this.selectedRoleObject.value,
              machineValue: this.selectedRoleObject.machineValue,
              isPaid: this.selectedRoleObject.isPaid
            }
          ],
          subRole: {
            value: this.selectedSubRole.value,
            machineValue: this.selectedSubRole.machineValue
          },
          licenses: this.user.license
        };

        if (this.selectedRoleObject.value == 'Estimator') {
          delete userPayload.subRole;
        }
        let resp = await this.addUser(userPayload);
        if (resp) {
          this.user = {
            firstName: '',
            lastName: '',
            role: '',
            subRole: '',
            email: '',
            license: [{ state: '', number: '' }]
          };
          this.selectedRoleObject = {
            value: '',
            machineValue: '',
            isPaid: false
          };
          this.selectedRole = [];
          this.selectedSubRole = [];
          this.$emit('closeUserDialog', false);
          this.successDialog = true;
        }
      }
    }
  },
  mounted() {
    this.states = addressService.getStates('United States');
  }
};
</script>
<style lang="scss" scoped>
.poppinsFont {
  font-family: poppins;
}
::v-deep {
  .input-style1 {
    height: 44px;
    padding-left: 10px;
    padding-right: 10px;

    .q-field__native {
      color: black;
      font-weight: 500 !important;
      font-size: 16px !important;
      line-height: 24px !important;
      overflow: auto;
    }
    .q-field__messages {
      color: #c10015;
      font-weight: 500;
      font-size: 12px;
      line-height: 12px;
      overflow: visible;
      font-family: poppins;
    }

    .q-field__control,
    .q-field__marginal {
      height: 43px;
    }
    .q-field__bottom {
      padding-top: 22px;
    }
    .q-field__label {
      font-weight: 600;
      color: #8a90a0;
    }
  }
}
.test {
  border: 1px solid #b9bcc6 !important;
  border-radius: 8px;
}
.q-field {
  transition: border 0.5s;
  caret-color: $primary !important;
  &:focus,
  &:active,
  &:hover {
    border: 1px solid $primary !important;
    box-shadow: 0 0 5px $primary;
    transition: box-shadow 0.2s;
  }
}

.q-field--error,
.q-field--error:focus,
.q-field--error:active,
.q-field--error:hover {
  border: 1px solid red !important;
  transition: border 0.5s;
  box-shadow: 0 0 5px red;
  transition: box-shadow 0.2s;
  font-weight: 500;
  line-height: 12px;
  caret-color: red !important;
}
.errMessages {
  color: #c10015;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
}
</style>
