<template>
  <div>
    <q-dialog v-model="show" persistent>
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
                    outlined
                    dense
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
                  outlined
                  dense
                  v-model="user.email"
                  label="Enter Email Address"
                  lazy-rules
                  :rules="[
                    val =>
                      validateEmail(val) ||
                      'You have entered an invalid email address!'
                  ]"
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
                  class="input-extra-padding required"
                  v-model="user.role"
                  :options="roleTypes"
                  option-value="id"
                  option-label="name"
                  label="Role"
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
                  outlined
                  options-dense
                  class="input-extra-padding required"
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
                v-for="(license, index) in user.license"
                :key="index"
              >
                <div class="col-4 q-mr-md">
                  <q-select
                    dense
                    outlined
                    options-dense
                    class="input-extra-padding"
                    v-model="license.state"
                    :options="states"
                    label="State"
                    color="primary"
                    options-selected-class="text-deep-orange"
                  />
                </div>
                <div class="col row full-width">
                  <q-input
                    outlined
                    class="col"
                    dense
                    v-model="license.number"
                    label="PIA License Number"
                  />
                  <q-icon
                    class="col-1 q-pb-md"
                    v-if="index > 0"
                    name="close"
                    size="sm"
                    @click="removeLicense(index)"
                  />
                </div>
              </div>
              <div
                class="col-12 text-caption text-grey"
                style="margin-top: -10px"
              >
                Please enter your residential PIA license number.
              </div>

              <div
                class="q-mt-md text-primary cursor-pointer"
                @click="addAditionalPIALicense()"
              >
                <q-icon size="xs" name="add_circle_outline" /> Add an additional
                PIA License
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

    <!-- confirmation dialog -->
    <q-dialog v-model="confirmationDialog" persistent>
      <q-card class="full-width q-px-lg" style="max-width: 400px">
        <q-card-section class="text-center q-pb-none">
          <div class="row justify-center">
            <q-icon class="" size="3em">
              <q-img :src="getImage('Featured icon (3).svg')" />
            </q-icon>
          </div>
          <div class="text-subtitle1 fontWeight500">
            Do you wish to upgrade your account?
          </div>
        </q-card-section>
        <q-card-section class="" style="border-radius: 8px">
          <!-- <div class="row justify-center q-pb-md q-pt-sm">
            <div class="row justify-center">
              <q-icon class="" size="3em">
                <q-img :src="getImage('Featured icon (1).svg')" />
              </q-icon>
            </div>
          </div> -->

          <div class="text-h4 fontWeight600 text-bold text-center">
            $50
            <span class="text-grey text-subtitle1 fontWeight400"
              >/month per user*</span
            >
          </div>
        </q-card-section>

        <div class="q-px-lg q-mb-sm q-mt-lg">
          <div class="row justify-between">
            <q-btn
              class="col q-mr-lg"
              v-close-popup
              label="Cancel"
              no-caps
              outline
              color="deep-orange"
              size="1rem"
              style="border-radius: 10px"
            />
            <q-btn
              class="col"
              label="Confirm"
              no-caps
              style="border-radius: 10px"
              color="deep-orange"
              size="1rem"
              @click="submitUser()"
            />
          </div>
        </div>
        <div class="q-px-lg q-mb-lg text-grey text-caption">
          *You will be charged a pro-rated subscription fee for the current
          month
        </div>
      </q-card>
    </q-dialog>

    <!-- success dialog -->
    <q-dialog v-model="successDialog" persistent>
      <q-card class="full-width q-px-lg" style="max-width: 450px">
        <q-card-section class="text-center q-pb-none">
          <div class="row justify-center">
            <q-icon class="" size="3em">
              <q-img :src="getImage('Featured icon (3).svg')" />
            </q-icon>
          </div>
          <div class="text-subtitle1 fontWeight500">
            User successfully created
          </div>
        </q-card-section>

        <div class="text-center text-grey fontWeight400">
          Your new user has been added to your account.
        </div>
        <div class="q-px-lg q-mb-lg q-mt-lg">
          <div class="row justify-between">
            <q-btn
              class="col q-mr-lg"
              label="Add an Additional User"
              @click="openAddDialog()"
              no-caps
              outline
              color="deep-orange"
              size="1rem"
              style="border-radius: 10px"
            />
            <q-btn
              class="col-4"
              label="Close"
              v-close-popup
              no-caps
              style="border-radius: 10px"
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
      selectedSubRole: []
    };
  },
  props: {
    showDialog: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['roleTypes']),
    show: {
      get() {
        return this.showDialog;
      }
    }
  },
  methods: {
    validateEmail,
    ...mapActions(['addAdditionalLicense', 'addUser']),
    getImage(icon) {
      return require('../assets/' + icon);
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

      this.confirmationDialog = true;
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
      //this.show = false
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
      this.selectedRole = selectedRoles.attribute.subRoles;
      this.selectedRoleObject.value = selectedRoles.attribute.value;
      this.selectedRoleObject.machineValue =
        selectedRoles.attribute.machineValue;
      this.selectedRoleObject.isPaid = selectedRoles.attribute.isPaid;
      this.user.subRole = '';
    },
    setSelectedSubRole(selectedSubRoles) {
      this.selectedSubRole = selectedSubRoles;
    },
    addAditionalPIALicense() {
      let newLicenseData = { state: '', number: '' };
      this.user.license.push(newLicenseData);
    },
    removeLicense(index) {
      this.user.license.splice(index, 1);
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
      let licenseGrant = await this.addAdditionalLicense(payload);
      this.confirmationDialog = false;
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

        await this.addUser(userPayload);
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
  },
  mounted() {
    this.states = addressService.getStates('United States');
  }
};
</script>
