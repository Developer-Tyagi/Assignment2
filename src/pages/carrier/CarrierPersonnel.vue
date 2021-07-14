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
            <div class="row ">
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
            <div class="row">
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
                    {{ phone.number ? phone.number : '-' }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
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
        <div class="mobile-container-page">
          <q-form ref="carrierForm">
            <AddCarrierPersonnel :carrierPersonnel="personnel" />
          </q-form>
        </div>
        <q-btn
          @click="onSave"
          label="Add Personnel"
          color="primary"
          class="button-width-90 q-mt-lg"
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
      <q-card>
        <CustomBar
          :dialogName="'Edit Personnel'"
          @closeDialog="editPersonnelDialog = false"
        />
        <div class="mobile-container-page">
          <q-form ref="editPersonnelForm">
            <q-card class="q-ma-md q-pa-md q-mt-sm">
              <q-select
                class="required"
                dense
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
                options-dense
              />
              <q-input
                dense
                v-model="personnel.fname"
                label="First Name"
                class="required"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the first name'
                ]"
              />
              <q-input
                dense
                class="required"
                v-model="personnel.lname"
                label="Last Name"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the last name'
                ]"
              />
              <q-input
                dense
                v-model="personnel.departmentName"
                label="Organization / Department Name"
              />
              <q-input
                dense
                class="required"
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
              <div class="form-heading q-mt-sm q-mb-sm">Notes</div>
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
          </q-form>
        </div>
        <q-btn
          @click="onEditSave"
          label="Save"
          color="primary"
          class="button-width-90 q-mt-lg"
          size="'xl'"
        />
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteAlertDialog">
      <q-card>
        <DeleteAlert />
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="deleteAlertDialog = false"
          ></q-btn>
          <q-btn
            flat
            label="Delete"
            color="primary"
            v-close-popup
            @click="onPersonnelDelete"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import AddCarrierPersonnel from 'components/AddCarrierPersonnel';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
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

    onEdit(index) {
      this.editPersonnelDialog = true;
      this.getContactTypes();
      this.getTitles();
      this.personnel.fname = this.carrierPersonnel.personnel[index].fname;
      this.personnel.lname = this.carrierPersonnel.personnel[index].lname;
      this.personnel.email = this.carrierPersonnel.personnel[index].email;
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
              phoneNumber: this.personnel.phoneNumber,

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
              phoneNumber: this.personnel.phoneNumber,

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
        this.personnel.address.streetAddress = '';
        this.personnel.address.postalCode = '';
        this.personnel.notes = '';
        this.personnel.departmentName = '';
      }
    }
  }
};
</script>
