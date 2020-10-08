<template>
  <q-page>
    <h5>Add New Lead</h5>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-toggle v-model="isNewLead" label="Is this a new lead?" left-label color="orange"></q-toggle>
      <div v-if="!isNewLead">
        <q-separator></q-separator>
        <br />
        <p>If client already exists, select from list below</p>
        <q-select v-model="clientSelected" :options="clientsList" label="Select existing client"></q-select>
      </div>
      <div>
        <q-btn label="Back" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
        <q-btn label="Next" type="submit" color="primary"></q-btn>
      </div>
    </q-form>
  </q-page>
</template>
<script>
export default {
  methods: {
    onSubmit() {
      console.log(this.clientSelected.label);
      this.$router.push("/add-lead-details");
    },
    onReset() {
      this.$router.push("/leads");
    }
  },
  data() {
    return {
      clientSelected: "",
      isNewLead: false,
      // Hardcoding this as still api for this in not avialable.
      clientsList: [
        {
          label: "James",
          value: "James"
        },
        {
          label: "Jane",
          value: "Jane"
        },
        ,
        {
          label: "Peter",
          value: "Peter"
        }
      ]
    };
  }
};
</script>
<style>
</style>
