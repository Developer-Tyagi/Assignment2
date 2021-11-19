<template>
  <q-page class="mobile-container-page">
    <div class="mobile-container-page-without-search">
      <q-card class="q-ma-xl ">
        <div class="q-pa-xl">
          <q-select
            outlined
            v-model="TypeOfClient"
            :options="options"
            option-label="value"
            option-value="machineValue"
            map-options
            emit-value
            label="Report Type"
          ></q-select>
        </div>
        <div class="q-pa-xl q-gutter-sm">
          <q-radio v-model="Value" val="pdf" label="PDF" Value="teal"></q-radio>
          <q-radio
            v-model="Value"
            val="csv"
            label="CSV"
            color="orange"
          ></q-radio>
          <q-radio
            v-model="Value"
            val="xlsx"
            label="Excel"
            color="red"
          ></q-radio>
        </div>
        <div class="row q-pb-md justify-center">
          <q-btn
            label="Download"
            @click="onDownload"
            class="single-next-button-style"
          />
        </div>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Reports',
  data() {
    return {
      Value: 'pdf',
      TypeOfClient: '',
      options: [
        { value: 'Claims', machineValue: 'claims' },
        { value: 'Clients', machineValue: 'clients' }
      ]
    };
  },

  methods: {
    ...mapActions(['getReportDownload']),
    async onDownload() {
      const payload = {
        name: this.Value,

        type: this.TypeOfClient
      };
      const response = await this.getReportDownload(payload);
      if (response) {
        window.open(response.attributes.link);
      }
    }
  }
};
</script>
