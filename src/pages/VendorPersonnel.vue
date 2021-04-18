<template>
  <q-page>
    <div class="actions-div">
      <q-separator vertical inset></q-separator>
      <q-btn @click="addPersonnelDialog = true" flat class="q-ml-auto"
        ><img src="~assets/add.svg"
      /></q-btn>
    </div>
    <div class="mobile-container-page">
      <div class="q-pa-sm">
        <div class="text-bold text-h6  q-mt-sm q-ml-md">
          {{ selectedVendor.name ? selectedVendor.name : '-' }}
        </div>
        <div v-if="vendorPersonnel.personnel">
          <div class="q-mt-sm " v-for="personnel in vendorPersonnel.personnel">
            <q-card class="q-ma-sm q-pa-sm ">
              <div class="text-bold text-capitalize q-mt-sm	">
                {{ personnel.fname }} {{ personnel.lname }}
              </div>
              <div class="row q-mt-sm">
                <div class="heading-light col-3">Address Details</div>
                <div class="col-7" v-if="personnel.address">
                  {{
                    personnel.address.houseNumber
                      ? personnel.address.houseNumber
                      : '-'
                  }}
                  ,
                  {{
                    personnel.address.streetAddress
                      ? personnel.address.streetAddress
                      : '-'
                  }}
                  <div class="">
                    {{
                      personnel.address.addressLocality
                        ? personnel.address.addressLocality
                        : '-'
                    }}
                    ,
                    {{
                      personnel.address.addressRegion
                        ? personnel.address.addressRegion
                        : '-'
                    }}
                  </div>
                  <div>
                    {{
                      personnel.address.addressCountry
                        ? personnel.address.addressCountry
                        : '-'
                    }},
                    {{
                      personnel.address.postalCode
                        ? personnel.address.postalCode
                        : '-'
                    }}
                    <q-icon
                      name="place"
                      color="primary"
                      @click="sendMap(personnel.address)"
                      class="edit-icon"
                    ></q-icon>
                  </div>
                </div>
              </div>
              <div class="row  q-mt-sm" v-if="personnel.email">
                <span class="heading-light col-3"> Email </span>
                <span
                  class="q-ml-sm col clickLink"
                  @click="onEmailClick(personnel.email, $event)"
                >
                  {{ personnel.email ? personnel.email : '-' }}</span
                >
              </div>
              <div class="row">
                <div class="heading-light col-3">Phone Number</div>
                <div class="q-mt-xs col-6 q-ml-xs">
                  <div class=" row " v-for="phone in personnel.phoneNumber">
                    <div class="col-3 ">
                      {{ phone.type ? phone.type : '-' }}
                    </div>
                    <div
                      class="clickLink "
                      @click="onPhoneNumberClick(phone.number, $event)"
                    >
                      {{ phone.number }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="row  q-mt-sm q-mb-sm">
                <span class="heading-light col-2"> Notes: </span>
                <span class="q-ml-md col" v-if="personnel.note">
                  {{ personnel.note ? personnel.note : '-' }}</span
                >
              </div>
            </q-card>
          </div>
        </div>
        <div v-else class="full-height full-width">
          <div class="absolute-center">
            <div style="color: #666666; width:110%;">
              You haven't added a Personnel yet.
            </div>
            <img
              class="q-mx-lg q-pt-sm"
              src="~assets/add.svg"
              alt="add_icon"
              @click="addPersonnelDialog = true"
              width="130px"
              height="100px"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Add Personnel Dialog -->
    <q-dialog
      v-model="addPersonnelDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Add Personnel'"
          @closeDialog="addPersonnelDialog = false"
        />
        <div class="mobile-container-page">
          <q-card class="q-ma-md q-pa-md q-mt-sm">
            <q-select
              class="required"
              dense
              v-model="honorific.id"
              :options="titles"
              option-value="id"
              option-label="value"
              map-options
              options-dense
              behavior="menu"
              @input="setTitleName(honorific)"
              emit-value
              label="Title"
              options-dense
            />
            <q-input dense v-model="personnel.fname" label="First Name" />
            <q-input dense v-model="personnel.lname" label="Last Name" />
            <q-input
              dense
              v-model="personnel.departmentName"
              label="Organization / Department Name"
            />
            <q-input
              dense
              v-model="personnel.email"
              input
              type="email"
              novalidate="true"
              label="Email"
            />
            <q-select
              v-model="name"
              class=" col-5"
              label="Default Roles"
              :options="personnel.defaultRoles"
              option-value="name"
              behavior="menu"
              emit-value
            />
          </q-card>
          <q-card class="q-ma-md q-pa-md q-mt-sm"
            ><span class="text-bold">Address Details</span>
            <AutoCompleteAddress
              :address="personnel.address"
              :isDropBoxEnable="false"
              :isChecksEnable="false"
            />
          </q-card>
          <q-card class="q-ma-md q-pa-md q-mt-sm">
            <div>
              <div
                class="row justify-between"
                v-for="(addPhone, index) in personnel.phoneNumber"
                v-if="index >= 0"
              >
                <q-select
                  dense
                  v-model="personnel.phoneNumber[index].type"
                  class="col-5"
                  label="Type"
                  :options="contactTypes"
                  option-value="machineValue"
                  option-label="name"
                  map-options
                  options-dense
                  emit-value
                />
                <q-input
                  dense
                  v-model.number="personnel.phoneNumber[index].number"
                  label="Phone"
                  class="col-6"
                  mask="(###) ###-####"
                />
              </div>
              <div class="row">
                <q-btn
                  outline
                  class="q-mt-sm"
                  @click="addAnotherContact"
                  color="primary"
                  label="Add"
                  style="margin-right: auto"
                />

                <q-btn
                  v-if="personnel.phoneNumber.length > 1"
                  outline
                  @click="RemoveAnotherContact"
                  class="q-mt-sm"
                  color="primary"
                  label="Remove"
                />
              </div>
            </div>
          </q-card>
          <q-card class="q-ma-md q-pa-md q-mt-xs">
            <div class="form-heading  q-mt-sm  q-mb-sm">Notes</div>
            <div class="floating-label">
              <textarea
                rows="3"
                required
                class="full-width"
                v-model="personnel.notes"
                style="resize: none"
                placeholder="Take notes here..."
              ></textarea>
            </div>
          </q-card>
        </div>
        <q-btn
          @click="onSave"
          label="Save"
          color="primary"
          class="button-width-90 q-mt-lg"
          size="'xl'"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';

export default {
  components: {
    CustomBar,
    AutoCompleteAddress
  },
  data() {
    return {
      name: '',
      addPersonnelDialog: false,
      addAditionalPhoneNumberToggle: false,
      honorific: {
        id: '602a5eaa312a2b57ac2b00ad',
        value: 'Mr.',
        machineValue: 'mr_'
      },
      personnel: {
        fname: '',
        lname: '',
        departmentName: '',
        address: {
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
        },
        phoneNumber: [
          {
            type: 'main',
            number: ''
          }
        ],
        email: '',
        defaultRoles: [
          'Manager',
          'Personnel',
          'Technical Architect',
          'Tester',
          'Engineer',
          'Plumber'
        ],
        notes: ''
      }
    };
  },
  computed: {
    ...mapGetters([
      'contactTypes',
      'titles',
      'vendorPersonnel',
      'defaultRoles',
      'selectedVendor'
    ])
  },
  created() {
    this.getVendorDetails(this.$route.params.id);
    this.getVendorPersonnel(this.$route.params.id);
    this.getContactTypes();
    this.getTitles();
  },
  methods: {
    ...mapActions([
      'getContactTypes',
      'getTitles',
      'addVendorPersonnel',
      'getVendorPersonnel',
      'getVendorDetails'
    ]),
    // For adding multiple Contact Numbers in ClientInfo
    addAnotherContact() {
      let len = this.personnel.phoneNumber.length;
      if (this.personnel.phoneNumber[len - 1].number.length == 14) {
        this.personnel.phoneNumber.push({
          type: '',
          number: ''
        });
      } else {
        this.$q.notify({
          message: 'Please fill the above contact first',
          position: 'top',
          type: 'negative'
        });
      }
    },
    RemoveAnotherContact() {
      this.personnel.phoneNumber.pop();
    },
    onEmailClick,
    onPhoneNumberClick,
    sendMap,

    setTitleName() {
      const title = this.titles.find(obj => {
        return obj.id === this.honorific.id;
      });

      this.honorific.value = title.value;

      this.honorific.machineValue = title.machineValue;
    },

    async onSave() {
      const payload = {
        id: this.$route.params.id,

        data: {
          personnel: {
            honorific: {
              id: this.honorific.id,
              value: this.honorific.value,
              machineValue: this.honorific.machineValue
            },
            fname: this.personnel.fname,
            lname: this.personnel.lname,
            email: this.personnel.email,
            phoneNumber: this.personnel.phoneNumber,
            role: {
              value: 'Adjuster',
              machineValue: 'adjuster'
            },
            address: {
              ...this.personnel.address
            },
            note: this.personnel.notes
          }
        }
      };
      await this.addVendorPersonnel(payload);
      this.addPersonnelDialog = false;
      this.getVendorPersonnel(this.$route.params.id);
      this.personnel.fname = '';
      this.personnel.lname = '';
      this.personnel.email = '';
      this.personnel.address.houseNumber = '';
      this.personnel.address.addressCountry = '';
      this.personnel.address.addressLocality = '';
      this.personnel.address.addressRegion = '';
      this.personnel.address.streetAddress = '';
      this.personnel.address.postalCode = '';
      this.personnel.notes = '';
      this.personnel.departmentName = '';
      this.personnel.phoneNumber.length = 0;
    }
  }
};
</script>
