<template>
  <div class="bg-white full-width">
    <!-- Estimating  Info -->
    <q-card class="q-pa-sm">
      <div class="row">
        <p class="form-heading q-my-auto">
          Does Estimator need to be assigned?
        </p>
        <q-toggle
          class="q-ml-auto"
          v-model="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
          @input="EstimatorToggleChange"
        />
      </div>

      <div v-if="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle">
        <div
          class="custom-select"
          @click="onClickEstimatorOpen"
          v-if="!estimatingInfo.addEstimatorValue.name"
        >
          <div class="select-text">Click for choosing a estimator</div>
        </div>
        <div>
          <q-card
            bordered
            v-if="estimatingInfo.addEstimatorValue.name"
            @click="onClickEstimatorOpen"
            class="q-my-md q-pa-md"
          >
            <div class="text-bold">
              {{ estimatingInfo.addEstimatorValue.name }}
            </div>
            <div class="row" v-if="estimatingInfo.addEstimatorValue.phone">
              {{ estimatingInfo.addEstimatorValue.phone.type }} :
              <span>
                {{ estimatingInfo.addEstimatorValue.phone.phoneNumber }}
              </span>
            </div>
            <div>{{ estimatingInfo.addEstimatorValue.email }}</div>
          </q-card>
        </div>
      </div>
      <input
        v-if="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
        dense
        v-model="estimatingInfo.scopeTimeNeeded"
        placeholder="Scope time needed"
        class="time-input"
        type="time"
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
      v-model="estimatingInfo.estimatorsListDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Estimators'"
          @closeDialog="estimatingInfo.estimatorsListDialog = false"
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
                estimatingInfo.addEstimatorDialog = true;
                estimatingInfo.estimatorsListDialog = false;
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
            <div>{{ estimator.email }}</div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- Add Estimator Dialog -->
    <q-dialog
      v-model="estimatingInfo.addEstimatorDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="estimatingInfo.addEstimatorDialog = false"
          :dialogName="'Add New Estimator'"
        />
        <div class="mobile-container-page-without-search">
          <q-form ref="addEstimatorForm" class="form-height">
            <q-select
              class="required"
              dense
              v-model="estimatingInfo.honorific3.id"
              :options="titles"
              option-value="id"
              option-label="value"
              map-options
              @input="setTitleName(estimatingInfo.honorific3)"
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
              v-model="estimatingInfo.fname"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please fill the First name'
              ]"
              label="First Name"
            />

            <q-input
              v-model="estimatingInfo.lname"
              label="Last Name"
              dense
              class="input-extra-padding"
            />
            <q-input
              class="required"
              dense
              v-model="estimatingInfo.email"
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
                v-model="estimatingInfo.type"
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
                v-model.number="estimatingInfo.phone"
                label="Phone"
                mask="(###) ###-####"
              />
            </div>
            <q-input
              dense
              v-model="estimatingInfo.companyName"
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
export default {
  name: 'EstimatingInfo',
  components: { CustomBar },

  props: {
    estimatingInfo: {
      type: Object
    }
  },
  data() {
    return {};
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
            fname: this.estimatingInfo.fname,
            lname: this.estimatingInfo.lname,
            honorific: {
              id: this.estimatingInfo.honorific3.id,
              value: this.estimatingInfo.honorific3.title,
              machineValue: this.estimatingInfo.honorific3.machineValue
            },
            phoneNumber: [
              {
                type: this.estimatingInfo.type,
                number: this.estimatingInfo.phone
              }
            ]
          },
          email: this.estimatingInfo.email,

          roles: ['estimator'],
          companyName: this.estimatingInfo.companyName
        };

        const response = this.addEstimator(payload);
        if (response) {
          this.estimatingInfo.addEstimatorValue.name = this.estimatingInfo.fname;
          this.estimatingInfo.addEstimatorDialog = false;
          this.successMessage(constants.successMessages.ESTIMATOR);
          this.getEstimators();
        }
      }
    },

    setTitleName(selectedTitle) {
      const selected = this.titles.find(obj => {
        return obj.id === selectedTitle.id;
      });

      selectedTitle.value = selected.title;
      selectedTitle.machineValue = selected.machineValue;
    },
    onClickEstimatorOpen() {
      this.getEstimators();
      this.estimatingInfo.estimatorsListDialog = true;
    },
    EstimatorToggleChange() {
      this.estimatingInfo.addEstimatorInfo = {
        name: '',
        fname: '',
        lname: '',
        email: '',
        phone: '',
        type: ''
      };
      this.estimatingInfo.honorific3.id = '';
      this.estimatingInfo.addEstimatorValue.name = '';
      this.estimatingInfo.fname = '';
      this.estimatingInfo.lname = '';
      this.estimatingInfo.email = '';
      this.estimatingInfo.phone = '';
      this.estimatingInfo.type = '';
    },

    selectEstimator(value) {
      this.estimatingInfo.addEstimatorValue.name = value.contact.fname;
      this.estimatingInfo.addEstimatorValue.phone = {
        phoneNumber: value.contact.phoneNumber
          ? value.contact.phoneNumber[0].number
          : '-',
        type: value.contact.phoneNumber
          ? value.contact.phoneNumber[0].type
          : 'main'
      };

      this.estimatingInfo.addEstimatorValue.email = value.email;
      this.estimatingInfo.estimatorsListDialog = false;
    }
  }
};
</script>
<style>
input[type='time']::-webkit-calendar-picker-indicator {
  background: none;
}
</style>
