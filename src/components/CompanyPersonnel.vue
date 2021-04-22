<template>
  <div>
    <q-card class="q-pa-sm">
      <div class="form-heading q-mt-lg">Personnel Role</div>
      <q-select
        v-model="companyPersonnel.personnel.id"
        :options="roleTypes"
        option-value="id"
        option-label="name"
        map-options
        emit-value
        options-dense
        @input="setTypes(roleTypes, companyPersonnel.personnel)"
        label="Select Role"
      />
      <div class="form-heading q-mt-lg">Person Party</div>
      <q-select
        v-model="companyPersonnel.personParty"
        :options="userRoles"
        :disable="companyPersonnel.isFieldDisable"
        :label="
          companyPersonnel.isFieldDisable ? 'Select a Role' : 'Select a Party'
        "
        option-label="name"
        option-value="machineValue"
        options-dense
        emit-value
        map-options
      />
    </q-card>
    <q-card class="q-mt-sm q-pa-sm">
      <div class="form-heading q-mt-lg">Commision/Fee</div>
      <div class="row">
        <q-btn-toggle
          v-model="companyPersonnel.buttonGroup"
          push
          glossy
          toggle-color="primary"
          :options="[
            { label: '$', value: 'dollar' },
            { label: '%', value: 'percentage' },
            { value: 'update', icon: 'update' }
          ]"
        />
      </div>
      <div class="row" style="align-items: center">
        <q-input
          class="q-ml-auto full-width"
          mask="#.#"
          type="number"
          v-model.number="companyPersonnel.claimFeeRate"
          label="Claim Fee Rate"
          style="width: 50%"
          ><template
            v-slot:prepend
            v-if="companyPersonnel.buttonGroup == 'dollar'"
          >
            <q-icon name="$" color="primary" class="q-mb-sm"></q-icon>
          </template>

          <template
            v-slot:append
            v-else-if="companyPersonnel.buttonGroup == 'percentage'"
          >
            <q-icon name="%" color="primary"></q-icon>
          </template>
          <template v-slot:append v-else>
            <span class="form-heading">/hour</span>
          </template></q-input
        >
      </div>
    </q-card>
    <q-card class="q-mt-sm q-pa-sm">
      <span class="form-heading">Start Date</span>
      <div class="full-width">
        <q-input
          class="required"
          v-model="companyPersonnel.startDate"
          mask="##/##/####"
          label="MM/DD/YYYY"
          lazy-rules
          :rules="[
            val =>
              (validateDate(val) && val && val.length > 0) || 'Invalid date!'
          ]"
        >
          <template v-slot:append>
            <q-icon
              name="event"
              size="sm"
              color="primary"
              class="cursor-pointer"
            >
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="companyPersonnel.startDate"
                  @input="() => $refs.qDateProxy.hide()"
                  mask="MM/DD/YYYY"
                ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <span class="form-heading">End Date</span>
      <div class="full-width">
        <q-input
          v-model="companyPersonnel.endDate"
          mask="##/##/####"
          label="MM/DD/YYYY"
          lazy-rules
          :rules="[val => validateDate(val) || 'Invalid date!']"
        >
          <template v-slot:append>
            <q-icon
              name="event"
              size="sm"
              color="primary"
              class="cursor-pointer"
            >
              <q-popup-proxy
                ref="qDateProxy4"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="companyPersonnel.endDate"
                  @input="() => $refs.qDateProxy4.hide()"
                  mask="MM/DD/YYYY"
                ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </q-card>
    <q-card class="q-mt-sm q-pa-sm">
      <span class="form-heading">Notes</span>
      <div class="floating-label">
        <textarea
          rows="5"
          class="full-width"
          v-model="companyPersonnel.notes"
          style="resize: none"
        />
      </div>
    </q-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

import { validateDate } from '@utils/validation';
import { date } from 'quasar';

export default {
  name: 'CompanyPersonnel',
  props: {
    companyPersonnel: {
      type: Object
    }
  },
  data() {
    return {
      role: {
        machineValue: ''
      },
      params: {
        role: ''
      }
    };
  },
  computed: {
    ...mapGetters([
      'personnel',
      'selectedClaimId',
      'roleTypes',
      'getRoles',
      'userRoles'
    ])
  },

  methods: {
    ...mapActions(['getPersonnelInfo', 'getAllUsers', 'addCompanyPersonnel']),
    validateDate,
    setTypes(types, data) {
      const obj = types.find(item => {
        return item.id === data.id;
      });

      data.role.value = obj.name;
      data.role.machineValue = obj.machineValue;

      this.params.role = data.role.machineValue;
      this.getAllUsers(this.params);
      this.companyPersonnel.isFieldDisable = false;
    }
  }
};
</script>
