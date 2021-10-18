<template>
  <div>
    <div class="q-pa-sm">
      <div v-if="mortgagePersonnel.personnel">
        <div
          class="q-mt-sm"
          v-for="(personnel, index) in mortgagePersonnel.personnel"
        >
          <q-card class="q-pa-sm">
            <div class="form-heading text-capitalize  row">
              <div class="col-10">
                {{ personnel.fname }} {{ personnel.lname }}
              </div>
              <q-icon
                :style="
                  personnel.isEditable == false ? 'visibility:hidden;' : ''
                "
                size="xs"
                name="create "
                color="primary"
                class="q-ml-auto"
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

            <div
              class="row q-mt-sm"
              v-if="toCheckAddressData(personnel.address)"
            >
              <div class="heading-light col-3">Address Details</div>
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
            <div class="row q-mt-sm" v-if="personnel.email">
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
              <div class="q-mt-xs col-6 q-ml-none">
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
            <div class="row q-mt-sm q-mb-sm" v-if="personnel.note">
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

      <div class="row" v-if="mortgagePersonnel.personnel">
        <div class="q-ml-auto">
          <q-btn
            @click="addPersonnelDialog = true"
            label="Add Personnel"
            class="q-ml-auto q-mt-sm"
            color="primary"
            rounded
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
          <q-form ref="mortgagePersonnelForm">
            <q-card class="q-ma-md q-pa-md q-mt-sm">
              <q-select
                class="required input-style input-overlay"
                borderless
                v-model="honorific.value"
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
                class="required input-style input-overlay"
                borderless
                v-model="personnel.fname"
                label="First Name"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the first name'
                ]"
              />
              <q-input
                dense
                v-model="personnel.lname"
                class="required input-style input-overlay"
                borderless
                label="Last Name"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the last name'
                ]"
              />
              <q-input
                v-model="personnel.departmentName"
                class="required input-style input-overlay"
                borderless
                label="Organization / Department Name"
              />
              <q-input
                dense
                v-model="personnel.email"
                input
                class="required input-style input-overlay"
                borderless
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
                    v-model="personnel.phoneNumber[index].type"
                    class="col-5  input-style input-overlay"
                    borderless
                    label="Type"
                    :options="contactTypes"
                    option-value="machineValue"
                    option-label="name"
                    map-options
                    options-dense
                    emit-value
                  />
                  <q-input
                    v-model.number="personnel.phoneNumber[index].number"
                    label="Phone"
                    class="col-6  input-style input-overlay"
                    borderless
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
                <q-input
                  type="textarea"
                  rows="3"
                  required
                  class="col-6 q-pt-md input-style input-overlay full-width"
                  borderless
                  v-model="personnel.notes"
                  style="resize: none ;padding-left:10px;"
                  placeholder="Take notes here..."
                ></q-input>
              </div>
            </q-card>
          </q-form>
        </div>
        <div class="row  justify-center">
          <q-btn
            @click="onSave"
            label="Add Personnel"
            class="single-next-button-style q-mt-lg"
          />
        </div>
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
                dense
                v-model="honorific.value"
                :options="titles"
                option-value="value"
                option-label="value"
                class="required input-style input-overlay"
                borderless
                map-options
                options-dense
                behavior="menu"
                @input="setTitleName(honorific)"
                emit-value
                label="Title"
              />
              <q-input
                dense
                v-model="personnel.fname"
                class="required input-style input-overlay"
                borderless
                label="First Name"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the first name'
                ]"
              />
              <q-input
                dense
                v-model="personnel.lname"
                label="Last Name"
                class="required input-style input-overlay"
                borderless
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the last name'
                ]"
              />
              <q-input
                class=" input-style input-overlay"
                borderless
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
                class="required input-style input-overlay"
                borderless
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
                    v-model="personnel.phoneNumber[index].type"
                    label="Type"
                    class="col-5 input-style input-overlay"
                    borderless
                    dense
                    :options="contactTypes"
                    option-value="machineValue"
                    option-label="name"
                    map-options
                    options-dense
                    emit-value
                  />
                  <q-input
                    v-model.number="personnel.phoneNumber[index].number"
                    class="col-6 input-style input-overlay"
                    borderless
                    dense
                    label="Phone"
                    mask="(###) ###-####"
                    lazy-rules
                    :rules="[
                      val =>
                        nonRequiredPhoneNumber(val) ||
                        'Please enter the phone number'
                    ]"
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
                <q-input
                  rows="3"
                  required
                  type="textarea"
                  class="col-6 q-pt-md input-style input-overlay full-width"
                  borderless
                  v-model="personnel.notes"
                  style="resize: none  ;padding-left:10px;"
                  placeholder="Take notes here..."
                ></q-input>
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
      </q-card>
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
import { toGetStateShortName, toCheckAddressData } from '@utils/common';
import { nonRequiredPhoneNumber } from '@utils/validation';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import {
  onEmailClick,
  onPhoneNumberClick,
  sendMap,
  sendPhoneNumber,
  showPhoneNumber
} from '@utils/clickable';
import DeleteAlert from 'components/DeleteAlert';

export default {
  components: {
    CustomBar,
    AutoCompleteAddress,
    DeleteAlert
  },
  data() {
    return {
      valueIndex: '',
      deleteAlertDialog: false,
      options: [],
      id: '',
      name: '',
      addPersonnelDialog: false,
      editPersonnelDialog: false,
      addAditionalPhoneNumberToggle: false,
      honorific: {
        id: '',
        value: 'Mr.',
        machineValue: 'mr_'
      },

      personnel: {
        fname: '',
        lname: '',
        departmentName: '',
        address: {
          houseNumber: '',
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
      'mortgagePersonnel',
      'selectedMortgage'
    ])
  },
  created() {
    this.getMortgagePersonnel(this.$route.params.id);
  },
  methods: {
    ...mapActions([
      'getContactTypes',
      'getTitles',
      'addMortgagePersonnel',
      'getMortgagePersonnel',
      'getMortgageDetails',
      'editMortgagePersonnel',
      'deleteMortgagePersonnel'
    ]),
    toGetStateShortName,
    toCheckAddressData,
    nonRequiredPhoneNumber,

    onEdit(index) {
      this.editPersonnelDialog = true;
      this.getContactTypes();
      this.getTitles();
      this.personnel.fname = this.mortgagePersonnel.personnel[index].fname;
      this.personnel.lname = this.mortgagePersonnel.personnel[index].lname;
      this.personnel.email = this.mortgagePersonnel.personnel[index].email;

      if (this.mortgagePersonnel.personnel[index].address) {
        this.personnel.address.dropBox = this.mortgagePersonnel.personnel[index]
          .address.dropBox
          ? this.mortgagePersonnel.personnel[index].address.dropBox
          : { info: '', isPresent: false };
        this.personnel.address = this.mortgagePersonnel.personnel[
          index
        ].address;
      }

      this.personnel.notes = this.mortgagePersonnel.personnel[index].note;
      this.personnel.phoneNumber = this.mortgagePersonnel.personnel[
        index
      ].phoneNumber;
      this.id = this.mortgagePersonnel.personnel[index].id;
    },
    async onEditSave() {
      const success = await this.$refs.editPersonnelForm.validate();
      if (success) {
        const payload = {
          id: this.$route.params.id,
          personnelId: this.id,
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

        await this.editMortgagePersonnel(payload);
        await this.getMortgagePersonnel(this.$route.params.id);
        this.editPersonnelDialog = false;

        this.personnel.fname = '';
        this.personnel.lname = '';
        this.personnel.departmentName = '';
        this.personnel.address.houseNumber = '';
        this.personnel.address.addressLocality = '';
        this.personnel.address.addressRegion = '';
        this.personnel.address.postOfficeBoxNumber = '';
        this.personnel.address.postalCode = '';
        this.personnel.address.address1 = '';
        this.personnel.address.address2 = '';
        this.personnel.address.isPresent = false;
        this.personnel.phoneNumber = [{ type: 'main', number: '' }];
        this.personnel.email = '';
        this.personnel.notes = '';
      }
    },
    onClickDelete(index) {
      this.deleteAlertDialog = true;
      this.valueIndex = index;
    },
    async onPersonnelDelete() {
      const vendor = {
        id: this.$route.params.id,
        personnelId: this.mortgagePersonnel.personnel[this.valueIndex].id
      };
      await this.deleteMortgagePersonnel(vendor);
      this.getMortgagePersonnel(this.$route.params.id);
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
        return obj.value === this.honorific.value;
      });

      this.honorific.id = title.id;

      this.honorific.machineValue = title.machineValue;
    },

    async onSave() {
      const success = await this.$refs.mortgagePersonnelForm.validate();
      if (success) {
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

        await this.addMortgagePersonnel(payload);
        this.addPersonnelDialog = false;
        this.getMortgagePersonnel(this.$route.params.id);

        this.personnel.fname = '';
        this.personnel.lname = '';
        this.personnel.departmentName = '';
        this.personnel.address.houseNumber = '';
        this.personnel.address.addressLocality = '';
        this.personnel.address.addressRegion = '';
        this.personnel.address.postOfficeBoxNumber = '';
        this.personnel.address.postalCode = '';
        this.personnel.address.address1 = '';
        this.personnel.address.address2 = '';
        this.personnel.address.isPresent = false;
        this.personnel.phoneNumber = [{ type: 'main', number: '' }];
        this.personnel.email = '';
        this.personnel.notes = '';
      }
    }
  }
};
</script>
