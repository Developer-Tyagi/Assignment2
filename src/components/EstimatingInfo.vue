<template>
  <div class="bg-white full-width">
    <!-- Estimating  Info -->
    <q-card class="q-pa-sm">
      <div class="row" v-if="estimatorAssignToggle">
        <p class="form-heading q-my-auto">
          Does Estimator need to be assigned?
        </p>
        <q-toggle
          class="q-ml-auto"
          v-model="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
          @input="estimatorToggleChange"
        />
      </div>

      <div v-if="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle">
        <div
          class="custom-select"
          @click="onClickEstimatorOpen"
          v-if="!estimatingInfo.estimatorID"
        >
          <div class="select-text">Click for choosing a estimator</div>
        </div>
        <div>
          <q-card
            bordered
            v-if="estimatingInfo.estimatorID"
            @click="onClickEstimatorOpen"
            class="q-my-md q-pa-md"
          >
            <div class="text-bold">
              {{ estimatingInfo.name }}
            </div>
            <div>
              Phone:
              <span
                class="clickLink"
                @click="onPhoneNumberClick(estimatingInfo.phone, $event)"
              >
                {{ estimatingInfo.phone.phoneNumber }}</span
              >
            </div>
            <div>
              Email:<span
                class="clickLink"
                @click="onEmailClick(estimatingInfo.email, $event)"
              >
                {{ estimatingInfo.email }}</span
              >
            </div>
          </q-card>
        </div>
      </div>
      <p
        class="form-heading q-mb-none"
        v-if="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
      >
        Scope time
      </p>
      <input
        v-if="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
        dense
        v-model="estimatingInfo.scopeTimeNeeded"
        placeholder="Scope time needed"
        class="time-input"
        type="time"
        style="outline: none"
      />
      <q-input
        v-if="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
        dense
        v-model="estimatingInfo.notesToTheEstimator"
        label="Notes to the estimator"
        dense
        class="input-extra-padding"
      />
    </q-card>
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
            <q-input dense placeholder="Search" borderless class="full-width">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
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
          <div
            v-for="estimator in estimators"
            :key="estimator.id"
            class="vendor-list-item column"
            @click="selectEstimator(estimator)"
          >
            <div class="text-bold">
              {{ estimator.contact.fname }} {{ estimator.contact.lname }}
            </div>
            <div>{{ estimator.companyName }}</div>
            <div
              class="row"
              v-if="
                estimator.contact.phoneNumber &&
                  estimator.contact.phoneNumber.length
              "
            >
              {{ estimator.contact.phoneNumber[0].type }} :
              <span
                class="click-link"
                @click="
                  onPhoneNumberClick(
                    estimator.contact.phoneNumber[0].number,
                    $event
                  )
                "
              >
                {{ estimator.contact.phoneNumber[0].number }}
              </span>
            </div>
            <div>
              Email:<span
                class="clickLink"
                @click="onEmailClick(estimator.email, $event)"
              >
                {{ estimator.email }}</span
              >
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
              v-model="addEstimatorDialog.companyName"
              label="Company name"
            />
          </q-form>
          <q-btn
            label="Add Estimator"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
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
import { successMessage } from '@utils/validation';
import { constants } from '@utils/constant';
import { onPhoneNumberClick, onEmailClick } from '@utils/clickable';

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
      addEstimatorDialog: false,
      estimatorsListDialog: false,
      addEstimatorDialogInfo: {
        honorific: {
          id: '',
          value: 'Mr.',
          machineValue: 'mr_'
        },
        name: '',
        fname: 'hhhhhhh',
        lname: '',
        email: '',
        phone: '',
        type: 'yyyyyyy',
        companyName: ''
      }
    };
  },
  created() {
    this.getEstimators();
  },
  computed: {
    ...mapGetters(['estimators', 'contactTypes', 'titles'])
  },
  methods: {
    ...mapActions(['getEstimators', 'addEstimator']),
    validateEmail,
    successMessage,

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
                number: this.addEstimatorDialogInfo.phone
              }
            ]
          },
          email: this.addEstimatorDialogInfo.email,

          roles: ['estimator'],
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
      this.getEstimators();
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

      this.estimatingInfo.email = value.email;
      this.estimatorsListDialog = false;
    },
    onPhoneNumberClick,
    onEmailClick
  }
};
</script>
<style>
input[type='time']::-webkit-calendar-picker-indicator {
  background: none;
}
</style>
