<template>
  <q-page>
    <h5>Add New Lead</h5>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-toggle v-model="isNewLead" label="Is this a new lead?" left-label color="orange"></q-toggle>
      <div v-if="!isNewLead">
        <q-separator></q-separator>
        <br />
        <p>If client already exists, select from list below</p>

        <q-select
          v-model="clientSelected"
          :options="clientsList"
          clearable
          key="id"
          option-value="id"
          label="Select existing client"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label v-html="scope.opt.attributes.primaryContact.fname"></q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div>
        <q-btn label="Back" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
        <q-btn label="Next" type="submit" color="primary"></q-btn>
      </div>
    </q-form>
  </q-page>
</template>
<script>
import axios from "axios";
export default {
  methods: {
    getClients: function(event) {
      // API endpoint is hardcoded for testing.
      axios
        .get(
          "https://56564994-ccad-41d5-989e-839ceca5232d.mock.pstmn.io/v1/clients",
          {
            headers: {
              "Content-Type": "application/vnd.api+json",
              Accept: "application/vnd.api+json",
              Authorization: ""
            }
          }
        )
        .then(
          response => {
            this.clientsList = response["data"]["data"];
          },
          error => {
            console.log(error);
            this.showForm = false;
            this.showError("Sorry, Couldn't retrieve clients data");
          }
        );
    },
    onSubmit() {
      console.log(this.clientSelected.label);
      this.$router.push("/add-lead-details");
    },
    onReset() {
      this.$router.push("/leads");
    }
  },
  mounted() {
    this.getClients();
  },
  data() {
    return {
      clientSelected: "",
      isNewLead: false,
      clientsList: []
    };
  }
};
</script>
<style>
</style>
