<template>
  <div class="bg-white full-width">
    <!-- Estimating  Info -->
    <div class="q-pa-sm">
      <div class="row" v-if="estimatorAssignToggle">
        <p class="form-heading q-my-auto">
          Does Estimator need to be assigned?
        </p>
        <q-toggle
          class="q-ml-auto"
          v-model="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
          @input="estimatorToggleChange"
          :disable="isOfflineClientEdit"
        />
      </div>

      <div v-if="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle">
        <q-input
          borderless
          class="input-style input-field"
          v-model="estimatingInfo.estimatorID"
          style="color: transparent"
          maxlength="0"
          placeholder="Click add for choosing a estimator"
          v-if="!estimatingInfo.estimatorID"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Please Choose the Estimator'
          ]"
        >
          <q-icon
            class="q-mt-md"
            name="person_add"
            size="sm"
            @click="onClickEstimatorOpen"
            v-if="!estimatingInfo.estimatorID"
          />
        </q-input>
        <div>
          <q-card
            bordered
            v-if="estimatingInfo.estimatorID"
            @click="onClickEstimatorOpen"
            class="q-my-md q-pa-md"
          >
            <div class="text-bold q-ml-sm">
              {{ estimatingInfo.name }}
            </div>
            <span
              class="col-7 heading-light"
              v-if="estimatingInfo.mailingAddress"
            >
              <div
                class="row q-ml-sm"
                v-if="estimatingInfo.mailingAddress.houseNumber"
              >
                {{
                  estimatingInfo.mailingAddress.houseNumber
                    ? estimatingInfo.mailingAddress.houseNumber
                    : '-'
                }}
                ,
                {{
                  estimatingInfo.mailingAddress.address1
                    ? estimatingInfo.mailingAddress.address1
                    : '-'
                }}
              </div>
              <div
                class="q-ml-sm"
                v-if="
                  estimatingInfo.mailingAddress &&
                    estimatingInfo.mailingAddress.address2
                "
              >
                {{ estimatingInfo.mailingAddress.address2 }}
              </div>
              <div
                class="row q-ml-sm"
                v-if="estimatingInfo.mailingAddress.addressLocality"
              >
                {{
                  estimatingInfo.mailingAddress.addressLocality
                    ? estimatingInfo.mailingAddress.addressLocality
                    : '-'
                }}
                ,
                {{
                  estimatingInfo.mailingAddress.addressRegion
                    ? toGetStateShortName(
                        estimatingInfo.mailingAddress.addressRegion
                      )
                    : '-'
                }}

                {{
                  estimatingInfo.mailingAddress.postalCode
                    ? estimatingInfo.mailingAddress.postalCode
                    : '-'
                }}
              </div>
            </span>
            <span
              class="click-link q-ml-sm"
              @click="onEmailClick(estimatingInfo.email, $event)"
              >{{ estimatingInfo.email ? estimatingInfo.email : '-' }}</span
            >
            <div class="q-mt-xs q-ml-sm">
              <div
                v-if="
                  estimatingInfo.phone.phoneNumber && estimatingInfo.phone.type
                "
              >
                <span
                  >{{
                    estimatingInfo.phone.type ? estimatingInfo.phone.type : '-'
                  }}
                  :
                </span>
                <span
                  class="clickLink"
                  @click="
                    onPhoneNumberClick(estimatingInfo.phone.phoneNumber, $event)
                  "
                  >{{
                    estimatingInfo.phone.phoneNumber
                      ? showPhoneNumber(estimatingInfo.phone.phoneNumber)
                      : '-'
                  }}</span
                >
              </div>
              <div v-else>No Phone</div>
            </div>
          </q-card>
        </div>
      </div>
      <p
        class="q-mt-sm form-heading q-mb-none"
        v-if="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
      >
        Scope time
      </p>
      <!-- <q-input
        v-if="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
        dense
        v-model="estimatingInfo.scopeTimeNeeded"
        placeholder="Scope time needed"
        borderless
        class="input-style input-field time-input"
        type="time"
        style="outline: none"
      /> -->
      <div class="row q-py-sm">
        <q-input
          v-if="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
          class="input-style hours-input-style input-field"
          borderless
          type="number"
          v-model="estimatingInfo.scopeTimeNeededInHours"
          min="0"
          max="24"
          style="width:85px;"
          placeholder="HH"
        />

        <q-select
          borderless
          label="MM"
          style="width:91px;"
          class="input-style text-center minute-select input-field q-ml-md q-mt-sm"
          v-if="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
          :options="options"
          v-model="estimatingInfo.scopeTimeNeededInMinutes"
        />
      </div>
      <q-input
        v-if="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
        dense
        type="textarea"
        v-model="estimatingInfo.notesToTheEstimator"
        label="Notes to the estimator"
        borderless
        class=" input-style input-extra-padding"
      />
    </div>
    <!-- Estimators List Dialog -->
    <q-dialog
      v-model="estimatorsListDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Estimators'"
          @closeDialog="estimatorsListDialog = false"
        />
        <div class="vendor-list">
          <div class="actions-div">
            <q-input
              dense
              placeholder="Search"
              v-model="searchText"
              @input="search($event)"
              borderless
              class="full-width"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn
              v-if="params.name"
              class="q-ml-auto q-pr-md"
              color="white"
              text-color="grey"
              @click="clearFilter()"
              flat
              dense
              style="font-weight: 400"
              >Clear</q-btn
            >
            <q-separator vertical></q-separator>
            <q-btn
              @click="
                addEstimatorDialog = true;
                estimatorsListDialog = false;
              "
              flat
            >
              <img src="~assets/add.svg"
            /></q-btn>
          </div>
          <div class="mobile-container-page" v-if="estimators.length">
            <div
              v-for="estimator in estimators"
              :key="estimator.id"
              class="q-pa-sm clients-list"
              @click="selectEstimator(estimator)"
              style="overflow-y: auto"
            >
              <div class="text-bold ">
                {{ estimator.contact.fname }} {{ estimator.contact.lname }}
              </div>
              <div>{{ estimator.companyName }}</div>

              <div>
                <div v-if="estimator.mailingAddress">
                  <div>
                    {{
                      estimator.mailingAddress
                        ? estimator.mailingAddress.houseNumber
                        : '-'
                    }}
                    {{
                      estimator.mailingAddress.address1
                        ? estimator.mailingAddress.address1
                        : '-'
                    }}
                  </div>
                  <div
                    v-if="
                      estimator.mailingAddress &&
                        estimator.mailingAddress.address2
                    "
                  >
                    {{ estimator.mailingAddress.address2 }}
                  </div>
                  <div class="row">
                    {{
                      estimator.mailingAddress.addressLocality
                        ? estimator.mailingAddress.addressLocality
                        : '-'
                    }}
                    ,
                    {{
                      estimator.mailingAddress.addressRegion
                        ? toGetStateShortName(
                            estimator.mailingAddress.addressRegion
                          )
                        : '-'
                    }}
                    {{
                      estimator.mailingAddress.postalCode
                        ? estimator.mailingAddress.postalCode
                        : '-'
                    }}
                  </div>
                </div>

                <div
                  class="q-mt-xs fit-content"
                  v-if="estimator.contact.phoneNumber"
                >
                  <span v-if="estimator.contact.phoneNumber.type"
                    >{{ estimator.contact.phoneNumber[0].type }} :
                  </span>
                  <span
                    class="clickLink"
                    @click="
                      onPhoneNumberClick(
                        estimator.contact.phoneNumber.number[0],
                        $event
                      )
                    "
                    >{{ estimator.contact.phoneNumber[0].number }}</span
                  >
                </div>
                <span
                  class="click-link fit-content"
                  @click="onEmailClick(estimator.email, $event)"
                  >{{ estimator.email }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- Add Estimator Dialog -->
    <q-dialog
      v-model="addEstimatorDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="closeAddEstimatorDialog"
          :dialogName="'Add New Estimator'"
        />
        <div class="mobile-container-page-without-search">
          <q-form ref="addEstimatorForm" class="form-height">
            <q-select
              class="required"
              dense
              v-model="addEstimatorDialogInfo.honorific.value"
              :options="titles"
              option-value="value"
              option-label="value"
              map-options
              @input="setTitleName(addEstimatorDialogInfo.honorific)"
              behavior="menu"
              emit-value
              options-dense
              label="Title"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please select the title'
              ]"
            />

            <q-input
              class="required"
              dense
              v-model="addEstimatorDialogInfo.fname"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please fill the First name'
              ]"
              label="First Name"
            />

            <q-input
              v-model="addEstimatorDialogInfo.lname"
              label="Last Name"
              dense
              class="input-extra-padding"
            />
            <q-input
              class="required"
              dense
              v-model="addEstimatorDialogInfo.email"
              label="Email"
              lazy-rules
              :rules="[
                val =>
                  validateEmail(val) ||
                  'You have entered an invalid email address!'
              ]"
            />
            <div class="row justify-between">
              <q-select
                class="col-5 input-extra-padding"
                v-model="addEstimatorDialogInfo.type"
                :options="contactTypes"
                option-value="machineValue"
                option-label="name"
                map-options
                options-dense
                emit-value
                label="Type"
                dense
                behavior="menu"
              />
              <q-input
                dense
                class="col-6 input-extra-padding"
                v-model.number="addEstimatorDialogInfo.phone"
                label="Phone"
                mask="(###) ###-####"
              />
            </div>
            <q-input
              dense
              v-model="addEstimatorDialogInfo.companyName"
              label="Company name"
            />
          </q-form>
          <q-btn
            label="Add Estimator"
            color="primary"
            class="button-width-90"
            @click="onCloseAddEstimator('addEstimatorDialog')"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { validateEmail } from '@utils/validation';
import CustomBar from 'components/CustomBar';
import { toGetStateShortName } from '@utils/common';
import { successMessage } from '@utils/validation';
import { constants } from '@utils/constant';
import {
  onPhoneNumberClick,
  onEmailClick,
  showPhoneNumber,
  sendPhoneNumber
} from '@utils/clickable';

export default {
  name: 'EstimatingInfo',
  components: { CustomBar },

  props: {
    estimatingInfo: {
      type: Object
    },
    estimatorAssignToggle: {
      type: Boolean
    }
  },
  data() {
    return {
      searchText: '',
      options: ['0', '15', '30', '45'],
      addEstimatorDialog: false,
      estimatorsListDialog: false,
      addEstimatorDialogInfo: {
        honorific: {
          id: '',
          value: 'Mr.',
          machineValue: 'mr_'
        },
        name: '',
        fname: '',
        lname: '',
        email: '',
        phone: '',
        type: 'main',
        companyName: ''
      },
      params: {
        role: 'estimator',
        name: ''
      }
    };
  },

  computed: {
    ...mapGetters([
      'estimators',
      'contactTypes',
      'titles',
      'isOfflineClientEdit'
    ])
  },
  methods: {
    ...mapActions(['getEstimators', 'addEstimator']),
    validateEmail,
    successMessage,
    toGetStateShortName,

    async onCloseAddEstimator() {
      const success = await this.$refs.addEstimatorForm.validate();

      if (success) {
        const payload = {
          type: 'user',
          contact: {
            fname: this.addEstimatorDialogInfo.fname,
            lname: this.addEstimatorDialogInfo.lname,
            honorific: {
              id: this.addEstimatorDialogInfo.honorific.id,
              value: this.addEstimatorDialogInfo.honorific.title,
              machineValue: this.addEstimatorDialogInfo.honorific.machineValue
            },
            phoneNumber: [
              {
                type: this.addEstimatorDialogInfo.type,
                number: sendPhoneNumber(this.addEstimatorDialogInfo.phone)
              }
            ]
          },
          email: this.addEstimatorDialogInfo.email,

          roles: [
            { value: 'Estimator', machineValue: 'estimator', isPaid: true }
          ],
          companyName: this.addEstimatorDialogInfo.companyName
        };

        const response = await this.addEstimator(payload);
        if (response) {
          this.estimatingInfo.estimatorID = response.id;
          this.estimatingInfo.name = response.attributes.contact.fname;
          this.estimatingInfo.phone = {
            phoneNumber: response.attributes.contact.phoneNumber
              ? response.attributes.contact.phoneNumber[0].number
              : '',
            type: response.attributes.contact.phoneNumber
              ? response.attributes.contact.phoneNumber[0].type
              : 'main'
          };

          this.estimatingInfo.email = response.attributes.email;
          this.addEstimatorDialog = false;
        }
        this.addEstimatorDialogInfo = {
          honorific: {
            id: '',
            value: 'Mr.',
            machineValue: 'mr_'
          },
          name: '',
          fname: '',
          lname: '',
          email: '',
          phone: '',
          type: '',
          companyName: ''
        };
      }
    },

    setTitleName(selectedTitle) {
      const selected = this.titles.find(obj => {
        return obj.value === selectedTitle.value;
      });

      selectedTitle.machineValue = selected.machineValue;
      selectedTitle.id = selected.id;
    },

    onClickEstimatorOpen() {
      this.getEstimators(this.params);
      this.estimatorsListDialog = true;
    },

    estimatorToggleChange() {
      this.addEstimatorDialogInfo = {
        name: '',
        fname: '',
        lname: '',
        email: '',
        phone: '',
        type: '',
        honorific: {
          id: '',
          value: 'Mr.',
          machineValue: 'mr_'
        }
      };
    },

    closeAddEstimatorDialog() {
      this.addEstimatorDialogInfo = {
        honorific: {
          id: '',
          value: 'Mr.',
          machineValue: 'mr_'
        },
        name: '',
        fname: '',
        lname: '',
        email: '',
        phone: '',
        type: '',
        companyName: ''
      };
      this.addEstimatorDialog = false;
    },

    selectEstimator(value) {
      this.estimatingInfo.estimatorID = value.id;
      this.estimatingInfo.name = value.contact.fname;
      this.estimatingInfo.phone = {
        phoneNumber: value.contact.phoneNumber
          ? value.contact.phoneNumber[0].number
          : '',
        type: value.contact.phoneNumber
          ? value.contact.phoneNumber[0].type
          : 'main'
      };
      this.estimatingInfo.mailingAddress = value.mailingAddress;
      this.estimatingInfo.email = value.email;
      this.estimatorsListDialog = false;
    },
    search(event) {
      this.params.name = event;
      this.getEstimators(this.params);
    },
    clearFilter() {
      this.searchText = '';
      this.params.name = '';
      this.getEstimators(this.params);
    },

    onPhoneNumberClick,
    onEmailClick,
    showPhoneNumber,
    sendPhoneNumber
  }
};
</script>
<style lang="scss" scoped>
input[type='time']::-webkit-calendar-picker-indicator {
  background: none;
}
.input-field {
  height: 55px;
}
</style>
