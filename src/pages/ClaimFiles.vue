<template>
  <div>
    <q-card class="q-pa-sm input-style input-overlay  col-5">
      <div class="text-bold q-mt-xl q-ml-sm">Template Type</div>
      <q-select
        dense
        v-model="templatetype.value"
        option-value="name"
        option-label="name"
        map-options
        options-dense
        behavior="menu"
        emit-value
        :options="templateOptions"
        @input="setTypes(templatetype.value)"
        label="List of Templates"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please fill the template']"
      />
      <div class="full-width column items-center q-mb-md ">
        <q-btn
          v-if="templatetype.value"
          color="primary"
          size="'xl'"
          class="button-width-90 text-capitalize"
          label="Generate Claim Document"
          @click="onClickGenerateDocument"
        />
      </div>
    </q-card>
    <FileManager
      :directoryId="claim.rootDirectoryID"
      v-if="claim.rootDirectoryID"
    />
    <div v-else class="text-center">
      <span>No directory found</span>
    </div>
  </div>
</template>

<script>
import FileManager from 'components/FileManager';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ClaimFiles',
  components: { FileManager },
  data() {
    return { templatetype: { value: '', machineValue: '' } };
  },
  async created() {
    await this.getSingleClaims(this.selectedClaimId);
    await this.getTemplates();
  },

  computed: {
    ...mapGetters(['claim', 'selectedClaimId', 'templateOptions'])
  },

  methods: {
    ...mapActions(['getSingleClaims', 'getTemplates', 'generateClaimDoc']),

    setTypes(value) {
      const obj = this.templateOptions.find(item => {
        return item.name === value;
      });
      this.templatetype.machineValue = obj.machineValue;
    },
    onClickGenerateDocument() {
      this.generateClaimDoc(this.selectedClaimId);
    }
  }
};
</script>
