<template>
  <div>
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
    ></q-select>

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
    ></q-select>
    <div class="form-heading q-mt-lg">Commision/Fee</div>
    <div class="row">
      <q-btn-toggle
        v-model="companyPersonnel.buttonGroup"
        push
        glossy
        toggle-color="primary"
        :options="[
          { label: ' $', value: 'dollar' },
          { label: ' %', value: 'percentage' },
          { value: 'update', icon: 'update' }
        ]"
      ></q-btn-toggle>
    </div>
    <div class="row" style="align-items: center">
      <q-input
        class="q-ml-auto full-width"
        mask="#.#"
        v-model="companyPersonnel.claimFeeRate"
        label="Claim Fee Rate"
        :suffix="
          companyPersonnel.buttonGroup == 'dollar'
            ? '$ flat'
            : '' || companyPersonnel.buttonGroup == 'percentage'
            ? '%'
            : '' || companyPersonnel.buttonGroup == 'update'
            ? '/hr'
            : ''
        "
        style="width: 50%"
      />
    </div>
    <br />
    <span class="form-heading">Start Date</span>
    <div class="full-width">
      <q-input
        class="required"
        v-model="companyPersonnel.startDate"
        mask="##/##/####"
        label="MM/DD/YYYY"
        lazy-rules
        :rules="[
          val => (validateDate(val) && val && val.length > 0) || 'Invalid date!'
        ]"
      >
        <template v-slot:append>
          <q-icon name="event" size="sm" color="primary" class="cursor-pointer">
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

    <br />
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
          <q-icon name="event" size="sm" color="primary" class="cursor-pointer">
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
    <span class="form-heading">Notes</span>
    <div class="floating-label">
      <textarea
        rows="5"
        required
        class="full-width"
        v-model="companyPersonnel.notes"
        style="resize: none"
      ></textarea>
    </div>
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
  created() {
    this.addCompanyPersonnel(this.selectedClaimId);
    this.getPersonnelInfo(this.selectedClaimId);
  },
  methods: {
    ...mapActions(['getPersonnelInfo', 'getAllUsers', 'addCompanyPersonnel']),
    validateDate,
    setTypes(types, data) {
      const obj = types.find(item => {
        return item.id === data.id;
      });
      data.machineValue = obj.machineValue;
      data.value = obj.name;
      data.role = obj.name;
      this.params.role = data.machineValue;
      this.getAllUsers(this.params);
      this.companyPersonnel.isFieldDisable = false;
    }
  }
};
</script>
