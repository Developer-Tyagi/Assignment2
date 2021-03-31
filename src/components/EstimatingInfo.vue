<template>
  <div class="bg-white full-width">
    <!-- Estimating  Info -->
    <div class="row">
      <p style="form-heading">Does an estimator need to be<br />assigned?</p>
      <q-toggle
        class="q-ml-auto"
        v-model="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
        @input="EstimatorToggleChange"
      />
    </div>

    <div
      v-if="estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle"
      @click="onClickEstimatorOpen"
    >
      <div class="custom-select form-heading" v-model="estimatingInfo.name">
        <div class="select-text">
          {{
            estimatingInfo.addEstimatorValue.name
              ? estimatingInfo.addEstimatorValue.name
              : 'Add Estimator'
          }}
        </div>
      </div>
    </div>
    <q-input
      dense
      v-model="estimatingInfo.estimatorToBeAssigned"
      label="Estimator to be assigned"
      dense
      class="input-extra-padding"
    />
    <q-input
      dense
      v-model="estimatingInfo.scopeTimeNeeded"
      label="Scope time needed"
      dense
      class="input-extra-padding"
    />
    <q-input
      dense
      v-model="estimatingInfo.notesToTheEstimator"
      label="Notes to the estimator"
      dense
      class="input-extra-padding"
    />

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
            class="vendor-list-item"
            @click="selectEstimator(estimator)"
          >
            <span>{{ estimator.fname }} {{ estimator.lname }}</span>
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
    async onCloseAddEstimator() {
      const success = await this.$refs.addEstimatorForm.validate();

      if (success) {
        const payload = {
          fname: this.estimatingInfo.fname,
          lname: this.estimatingInfo.lname,
          honorific: {
            id: this.estimatingInfo.honorific3.id,
            value: this.estimatingInfo.honorific3.title,
            machineValue: this.estimatingInfo.honorific3.machineValue
          },
          email: this.estimatingInfo.email,
          phoneNumber: [
            {
              type: this.estimatingInfo.addEstimatorInfo.type,
              number: this.estimatingInfo.addEstimatorInfo.phone
            }
          ]
        };

        const response = this.addEstimator(payload);
        if (response) {
          this.estimatingInfo.addEstimatorValue.name = this.estimatingInfo.fname;
          this.estimatingInfo.addEstimatorDialog = false;
          this.getEstimators();
          // this.carrierName = this.addEstimatorInfo.fname;
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
    },
    selectEstimator(value) {
      this.estimatingInfo.addEstimatorValue.name = value.fname;
      this.estimatingInfo.estimatorsListDialog = false;
    }
  }
};
</script>
