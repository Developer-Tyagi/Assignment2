<template>
  <div>
    <div class="q-pa-sm">
      <div v-if="carrierPersonnel.personnel">
        <div v-for="(personnel, index) in carrierPersonnel.personnel">
          <q-card class="q-pa-sm q-mb-sm ">
            <div class="form-heading text-capitalize row">
              <div class="col-10">
                {{ personnel.fname }} {{ personnel.lname }}
              </div>

              <q-icon
                size="xs"
                :style="
                  personnel.isEditable == false ? 'visibility:hidden;' : ''
                "
                name="create "
                color="primary"
                class="q-ml-auto "
                @click="onEdit(index)"
              ></q-icon>

              <q-icon
                :style="
                  personnel.isEditable == false ? 'visibility:hidden;' : ''
                "
                class="q-my-auto"
                name="delete"
                size="xs"
                color="primary"
                @click="onClickDelete(index)"
              />
            </div>
            <div v-if="toCheckAddressData(personnel.address)" class="row ">
              <div class="heading-light col-3 ">Address Details</div>
              <div class="col-7" v-if="personnel.address">
                {{
                  personnel.address.houseNumber
                    ? personnel.address.houseNumber
                    : '-'
                }}
                {{
                  personnel.address.address1 ? personnel.address.address1 : '-'
                }}
                <div v-if="personnel.address && personnel.address.address2">
                  {{ personnel.address.address2 }}
                </div>
                <div>
                  {{
                    personnel.address.addressLocality
                      ? personnel.address.addressLocality
                      : '-'
                  }}
                  ,
                  {{
                    personnel.address.addressRegion
                      ? toGetStateShortName(personnel.address.addressRegion)
                      : '-'
                  }}
                  {{
                    personnel.address.postalCode
                      ? personnel.address.postalCode
                      : '-'
                  }}
                  <q-icon
                    name="place"
                    color="primary"
                    @click="sendMap(personnel.address)"
                    style="position: absolute; right: 20px"
                    size="sm"
                  ></q-icon>
                </div>
              </div>
            </div>
            <div class="row " v-if="personnel.email">
              <span class="heading-light col-3"> Email </span>
              <span
                class="q-ml-none col clickLink"
                @click="onEmailClick(personnel.email, $event)"
              >
                {{ personnel.email ? personnel.email : '-' }}</span
              >
            </div>
            <div
              class="row"
              v-if="personnel.phoneNumber && personnel.phoneNumber[0].number"
            >
              <div class="heading-light col-3">Phone Number</div>
              <div class=" col-6 q-ml-none">
                <div class="row" v-for="phone in personnel.phoneNumber">
                  <div class="col-3">
                    {{ phone.type ? phone.type : '-' }}
                  </div>
                  <div
                    class="clickLink"
                    @click="onPhoneNumberClick(phone.number, $event)"
                  >
                    {{ phone.number ? showPhoneNumber(phone.number) : '-' }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row" v-if="personnel.note">
              <span class="heading-light col-3"> Notes: </span>
              <span class="q-ml-none col" v-if="personnel.note">
                {{ personnel.note ? personnel.note : '-' }}</span
              >
              <span v-else>-</span>
            </div>
          </q-card>
        </div>
      </div>
      <div v-else class="full-height text-center">
        <div class="q-mt-xs">
          <div style="color: #666666">
            You haven't added a Personnel yet.
          </div>
          <img
            class="text-center"
            src="~assets/add.svg"
            width="30px"
            height="30px"
            @click="addPersonnelDialog = true"
          />
        </div>
      </div>
      <div class="row" v-if="carrierPersonnel.personnel">
        <div class="q-ml-auto">
          <q-btn
            @click="addPersonnelDialog = true"
            label="Add Personnel"
            class="q-ml-auto"
            color="primary"
          ></q-btn>
        </div>
      </div>
    </div>

    <!-- Add Personnel Dialog -->
    <q-dialog
      v-model="addPersonnelDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Add Personnel'"
          @closeDialog="addPersonnelDialog = false"
        />
        <div class="mobile-container-page form-color">
          <q-form
            ref="carrierForm"
            class="q-px-lg "
            style="height: calc(100vh - 51px)"
          >
            <AddCarrierPersonnel :carrierPersonnel="personnel" />
          </q-form>
        </div>
        <q-btn
          @click="onSave"
          label="Add Personnel"
          class="single-next-button-style q-mt-lg rounded"
          size="'xl'"
        />
      </q-card>
    </q-dialog>
    <!-- Edit Personnel Dialog -->
    <q-dialog
      v-model="editPersonnelDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div class="bg-white full-width">
        <CustomBar
          :dialogName="'Edit Personnel'"
          @closeDialog="editPersonnelDialog = false"
        />
        <div class="mobile-container-page form-color">
          <q-form ref="editPersonnelForm" class="q-pa-md ">
            <q-card class="full-width q-pa-md bg-white">
              <div class="q-mt-sm">
                <q-select
                  borderless
                  class="required input-style input-overlay"
                  v-model="personnel.honorific.value"
                  :options="titles"
                  option-value="value"
                  option-label="value"
                  map-options
                  options-dense
                  behavior="menu"
                  @input="setTitleName(honorific)"
                  emit-value
                  label="Title"
                />
                <q-input
                  dense
                  borderless
                  v-model="personnel.fname"
                  label="First Name"
                  class="required input-style input-overlay"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill the first name'
                  ]"
                />
                <q-input
                  dense
                  borderless
                  class="required input-style input-overlay"
                  v-model="personnel.lname"
                  label="Last Name"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill the last name'
                  ]"
                />
                <q-input
                  borderless
                  class="input-style input-overlay"
                  v-model="personnel.departmentName"
                  label="Organization / Department Name"
                />
                <q-input
                  dense
                  borderless
                  class="required input-style input-overlay"
                  v-model="personnel.email"
                  input
                  type="email"
                  novalidate="true"
                  label="Email"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Please fill the email'
                  ]"
                />
              </div>
              <div class="q-mt-sm">
                <span class="text-bold">Address Details</span>
                <AutoCompleteAddress
                  :address="personnel.address"
                  :isDropBoxEnable="false"
                  :isChecksEnable="false"
                />
              </div>
              <div class=" q-mt-sm">
                <div>
                  <div
                    class="row justify-between"
                    v-for="(addPhone, index) in personnel.phoneNumber"
                    v-if="index >= 0"
                  >
                    <q-select
                      borderless
                      v-model="personnel.phoneNumber[index].type"
                      class="col-5 input-style input-overlay"
                      label="Type"
                      :options="contactTypes"
                      option-value="machineValue"
                      option-label="name"
                      map-options
                      options-dense
                      emit-value
                    />
                    <q-input
                      borderless
                      v-model.number="personnel.phoneNumber[index].number"
                      label="Phone"
                      class="col-6 input-style input-overlay"
                      mask="(###) ###-####"
                    />
                  </div>
                  <div class="row">
                    <q-btn
                      outline
                      class="q-mt-sm input-style input-overlay"
                      @click="addAnotherContact"
                      color="primary"
                      label="Add"
                      style="margin-right: auto"
                    />

                    <q-btn
                      v-if="personnel.phoneNumber.length > 1"
                      outline
                      @click="RemoveAnotherContact"
                      class="q-mt-sm input-style input-overlay"
                      color="primary"
                      label="Remove"
                    />
                  </div>
                </div>
              </div>
              <div class="q-mt-xs">
                <div class="form-heading q-mt-sm q-mb-sm">Notes</div>
                <div class="floating-label">
                  <q-input
                    type="textarea"
                    rows="3"
                    required
                    borderless
                    class="full-width input-style input-overlay"
                    v-model="personnel.notes"
                    style="resize: none"
                    placeholder="Take notes here..."
                  ></q-input>
                </div>
              </div>
            </q-card>
          </q-form>
        </div>
        <q-btn
          @click="onEditSave"
          label="Save"
          class="single-next-button-style q-mt-lg"
          size="'xl'"
        />
      </div>
    </q-dialog>

    <q-dialog v-model="deleteAlertDialog">
      <q-card>
        <DeleteAlert
          @close="deleteAlertDialog = false"
          @onDelete="onPersonnelDelete"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import { toGetStateShortName, toCheckAddressData } from '@utils/common';
import AddCarrierPersonnel from 'components/AddCarrierPersonnel';
import {
  onEmailClick,
  onPhoneNumberClick,
  sendMap,
  sendPhoneNumber,
  showPhoneNumber
} from '@utils/clickable';
import DeleteAlert from 'components/DeleteAlert';
export default {
  name: 'CarrierPersonnel',
  components: {
    CustomBar,
    AutoCompleteAddress,
    AddCarrierPersonnel,
    DeleteAlert
  },
  data() {
    return {
      valueIndex: '',
      deleteAlertDialog: false,
      options: [],
      name: '',
      id: '',
      addPersonnelDialog: false,
      editPersonnelDialog: false,
      addAditionalPhoneNumberToggle: false,

      personnel: {
        options: [],

        honorific: {
          id: '',
          value: 'Mr.',
          machineValue: 'mr_'
        },
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
          address1: '',
          address2: '',
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

        notes: ''
      }
    };
  },
  computed: {
    ...mapGetters([
      'contactTypes',
      'titles',
      'carrierPersonnel',
      'selectedCarrier'
    ])
  },
  created() {
    const params = {
      id: this.$route.params.id
    };
    this.getCarrierPersonnel(params);
    // this.getCarrierPersonnel(this.$route.params.id);
  },
  methods: {
    ...mapActions([
      'getContactTypes',
      'getTitles',
      'addCarrierPersonnel',
      'getCarrierPersonnel',
      'getCarrierDetails',
      'editCarrierPersonnel',
      'deleteCarrierPersonnel'
    ]),
    toGetStateShortName,
    toCheckAddressData,
    onEdit(index) {
      this.editPersonnelDialog = true;
      this.getContactTypes();
      this.getTitles();
      this.personnel.fname = this.carrierPersonnel.personnel[index].fname;
      this.personnel.lname = this.carrierPersonnel.personnel[index].lname;
      this.personnel.email = this.carrierPersonnel.personnel[index].email;
      if (
        this.carrierPersonnel.personnel[index].dropBox &&
        this.carrierPersonnel.personnel[index].dropBox.isPresent
      ) {
        this.personnel.address.dropBox = this.carrierPersonnel.personnel[
          index
        ].dropBox;
      }
      this.personnel.address = this.carrierPersonnel.personnel[index].address;

      this.personnel.notes = this.carrierPersonnel.personnel[index].note;
      this.personnel.phoneNumber = this.carrierPersonnel.personnel[
        index
      ].phoneNumber;
      this.id = this.carrierPersonnel.personnel[index].id;
    },
    async onEditSave() {
      const success = this.$refs.editPersonnelForm.validate();
      if (success) {
        const payload = {
          id: this.$route.params.id,
          personnelId: this.id,
          data: {
            personnel: {
              honorific: {
                id: this.personnel.honorific.id,
                value: this.personnel.honorific.value,
                machineValue: this.personnel.honorific.machineValue
              },
              fname: this.personnel.fname,
              lname: this.personnel.lname,
              email: this.personnel.email,
              phoneNumber: [
                {
                  type: this.personnel.phoneNumber[0].type,
                  number: sendPhoneNumber(this.personnel.phoneNumber[0].number)
                }
              ],

              address: {
                ...this.personnel.address
              },
              note: this.personnel.notes
            }
          }
        };

        await this.editCarrierPersonnel(payload);
        const params = {
          id: this.$route.params.id
        };
        this.getCarrierPersonnel(params);

        this.editPersonnelDialog = false;
      }
    },
    onClickDelete(index) {
      this.deleteAlertDialog = true;
      this.valueIndex = index;
    },
    async onPersonnelDelete() {
      const vendor = {
        id: this.$route.params.id,
        personnelId: this.carrierPersonnel.personnel[this.valueIndex].id
      };
      await this.deleteCarrierPersonnel(vendor);
      const params = {
        id: this.$route.params.id
      };
      await this.getCarrierPersonnel(params);
    },
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
    sendPhoneNumber,
    showPhoneNumber,
    setTitleName() {
      const title = this.titles.find(obj => {
        return obj.value === this.personnel.honorific.value;
      });

      this.personnel.honorific.id = title.id;

      this.personnel.honorific.machineValue = title.machineValue;
    },

    async onSave() {
      const success = await this.$refs.carrierForm.validate();
      if (success) {
        let phoneNumberArray = [];
        this.personnel.phoneNumber.forEach(val => {
          phoneNumberArray.push({
            type: val.type,
            number: sendPhoneNumber(val.number)
          });
        });
        const payload = {
          id: this.$route.params.id,
          data: {
            personnel: {
              honorific: {
                id: this.personnel.honorific.id,
                value: this.personnel.honorific.value,
                machineValue: this.personnel.honorific.machineValue
              },
              fname: this.personnel.fname,
              lname: this.personnel.lname,
              email: this.personnel.email,
              phoneNumber: phoneNumberArray,

              address: {
                ...this.personnel.address
              },
              note: this.personnel.notes
            }
          }
        };

        await this.addCarrierPersonnel(payload);
        this.addPersonnelDialog = false;
        const params = {
          id: this.$route.params.id
        };
        this.getCarrierPersonnel(params);
        this.personnel.fname = '';
        this.personnel.lname = '';
        this.personnel.email = '';
        this.personnel.address.houseNumber = '';
        this.personnel.address.addressCountry = '';
        this.personnel.address.addressLocality = '';
        this.personnel.address.addressRegion = '';
        this.personnel.address.address1 = '';
        this.personnel.address.address2 = '';
        this.personnel.address.postalCode = '';
        this.personnel.notes = '';
        this.personnel.departmentName = '';
      }
    }
  }
};
</script>
