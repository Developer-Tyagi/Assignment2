<template>
  <q-page style="padding-top: 0; height: 100vh">
    <CustomHeader
      @backButton="$router.push('/clients')"
      :showAddButton="false"
    />
    <div class="column" style="padding: 30px 20px 20px;">
      <div class="q-md column">
        <div class=" q-mt-md full-width">
          <div
            v-for="dialogBox in dialogBoxes"
            :key="dialogBox.name"
            @click="clientDetailsDailogBoxOpen(dialogBox.name)"
          >
            <div class="form-list row">
              {{ dialogBox.name }}
              <div class="q-mr-lg q-ml-auto" v-if="dialogBox.validForm == true">
                <q-icon size="xs" color="primary" name="done" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import CustomHeader from 'components/CustomHeader';

export default {
  data() {
    return {
      dialogBoxes: [
        { name: 'Client Info' },
        { name: 'Properties and Claims' },
        { name: 'Documents' },
        { name: 'Notes' }
      ]
    };
  },

  components: {
    CustomHeader
  },
  methods: {
    clientDetailsDailogBoxOpen(value) {
      if (value == 'Client Info') {
        this.$router.push('/client-details');
      }
    }
  }
};
</script>
<style>
.form-list {
  color: #333333;
  font-weight: bold;
  font-size: 16px;
  padding: 5px;
  border-bottom: 1px solid #d3d3d3;
  margin-top: 20px;
}
</style>
