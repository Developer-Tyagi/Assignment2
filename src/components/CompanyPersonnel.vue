<template>
  <div>
    <q-card class="q-pa-sm">
      <div class="form-heading q-mt-lg">Personnel Role</div>

      <q-select
        v-model="companyPersonnel.personnel.value"
        :options="claimRoles"
        use-input
        option-value="value"
        option-label="name"
        map-options
        emit-value
        options-dense
        @input="setTypes(claimRoles, companyPersonnel.personnel.value)"
        label="Select Role"
        @filter="searchFilterBy"
        input-debounce="0"
        behavior="menu"
        :disable="isOfflineClientEdit"
      />
      <div class="form-heading q-mt-lg">Person Party</div>

      <q-select
        v-if="allUsers.length"
        v-model="companyPersonnel.personParty.id"
        :options="allUsers"
        @input="setPersonTypes(allUsers, companyPersonnel.personParty)"
        option-label="name"
        option-value="id"
        label="Select Person"
        options-dense
        emit-value
        behavior="menu"
        map-options
        :disable="isOfflineClientEdit"
      />

      <div v-else>No user exist for this role.</div>
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
          :disable="isOfflineClientEdit"
        />
      </div>
      <div class="row" style="align-items: center">
        <q-input
          class="q-ml-auto full-width"
          mask="#.#"
          type="number"
          v-model.number="companyPersonnel.claimFeeRate"
          label="Claim Fee Rate"
          label-color="primary"
          style="width: 50%"
          :disable="isOfflineClientEdit"
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
            <span class="form-heading text-primary">/hour</span>
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
          :disable="isOfflineClientEdit"
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
          :rules="[val => dateGreaterThan(val)]"
          :disable="isOfflineClientEdit"
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
          v-if="!isOfflineClientEdit"
          rows="5"
          class="full-width"
          v-model="companyPersonnel.notes"
          style="resize: none"
        />
        <textarea
          v-if="isOfflineClientEdit"
          disabled
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

export default {
  name: 'CompanyPersonnel',
  props: {
    companyPersonnel: {
      type: Object
    }
  },
  data() {
    return {
      options: []
    };
  },

  computed: {
    ...mapGetters([
      'personnel',
      'selectedClaimId',
      'claimRoles',
      'userRoles',
      'allUsers',
      'isOfflineClientEdit'
    ])
  },

  methods: {
    ...mapActions([
      'getPersonnelInfo',
      'addCompanyPersonnel',
      'getAllUsers',
      'getClaimRoles'
    ]),

    validateDate,

    async setTypes(types, data) {
      const obj = types.find(item => {
        return item.name === data.name;
      });

      data.machineValue = obj.machineValue;
      data.id = obj.id;
    },
    async setPersonTypes(types, data) {
      const obj = types.find(item => {
        return item.id === data.id;
      });
      data.machineValue = obj.machineValue;
      data.value = obj.name;
      data.name = obj.name;
    },

    dateGreaterThan(val) {
      if (validateDate(val)) {
        if (Date.parse(val) >= Date.parse(this.companyPersonnel.startDate)) {
          return true;
        } else {
          return 'End Date should be  greater than Start date';
        }
      } else {
        return 'Invalid date';
      }
    },

    searchFilterBy(val, update) {
      this.companyPersonnel.personnel.id = null;
      if (val === ' ') {
        update(() => {
          this.companyPersonnel.options = this.claimRoles;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.companyPersonnel.options = this.claimRoles.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
    }
  }
};
</script>
