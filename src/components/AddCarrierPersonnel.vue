<template>
  <q-page>
    <q-card class="q-ma-md q-pa-md q-mt-sm">
      <q-select
        class="required"
        dense
        v-model="carrierPersonnel.honorific.value"
        :options="titles"
        option-value="id"
        option-label="value"
        map-options
        options-dense
        behavior="menu"
        @input="setTitleName(carrierPersonnel.honorific)"
        emit-value
        label="Title"
        options-dense
      />
      <q-input
        dense
        v-model="carrierPersonnel.fname"
        label="First Name"
        class="required"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Please fill the first name'
        ]"
      />
      <q-input
        dense
        v-model="carrierPersonnel.lname"
        label="Last Name"
        class="required"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please fill the last name']"
      />
      <q-input
        dense
        v-model="carrierPersonnel.departmentName"
        label="Organization / Department Name"
      />
      <q-input
        dense
        v-model="carrierPersonnel.email"
        input
        type="email"
        novalidate="true"
        class="required"
        label="Email"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please fill the email']"
      />
    </q-card>
    <q-card class="q-ma-md q-pa-md q-mt-sm"
      ><span class="text-bold">Address Details</span>
      <AutoCompleteAddress
        :address="carrierPersonnel.address"
        :isDropBoxEnable="false"
        :isChecksEnable="false"
      />
    </q-card>
    <q-card class="q-ma-md q-pa-md q-mt-sm">
      <div v-if="carrierPersonnel.phoneNumber">
        <div
          class="row justify-between"
          v-for="(addPhone, index) in carrierPersonnel.phoneNumber"
          v-if="index >= 0"
        >
          <q-select
            dense
            v-model="carrierPersonnel.phoneNumber[index].type"
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
            v-model.number="carrierPersonnel.phoneNumber[index].number"
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
            v-if="carrierPersonnel.phoneNumber.length > 1"
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
      <div class="form-heading  q-mt-sm  q-mb-sm">Notes</div>
      <div class="floating-label">
        <textarea
          rows="3"
          required
          class="full-width"
          v-model="carrierPersonnel.notes"
          style="resize: none"
          placeholder="Take notes here..."
        ></textarea>
      </div>
    </q-card>
  </q-page>
</template>
<script>
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    AutoCompleteAddress
  },
  name: 'AddCarrierPersonnel',
  props: {
    carrierPersonnel: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['contactTypes', 'titles'])
  },
  created() {
    this.getContactTypes();
    this.getTitles();
  },
  methods: {
    ...mapActions(['getContactTypes', 'getTitles']),
    setTitleName() {
      const title = this.titles.find(obj => {
        return obj.id === this.carrierPersonnel.honorific.id;
      });
      this.carrierPersonnel.honorific.value = title.value;
      this.carrierPersonnel.honorific.machineValue = title.machineValue;
    },

    RemoveAnotherContact() {
      this.carrierPersonnel.phoneNumber.pop();
    },

    // For adding multiple Contact Numbers
    addAnotherContact() {
      let len = this.carrierPersonnel.phoneNumber.length;
      if (this.carrierPersonnel.phoneNumber[len - 1].number.length == 14) {
        this.carrierPersonnel.phoneNumber.push({
          type: '',
          number: ''
        });
      } else {
        this.$q.notify({
          message: 'Please fill the absove contact first',
          position: 'top',
          type: 'negative'
        });
      }
    }
  }
};
</script>
