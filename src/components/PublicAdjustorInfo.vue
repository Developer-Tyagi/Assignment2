<template>
  <div class="bg-white full-width">
    <div class="form-heading text-bold">CLAIM PERSONNEL</div>
    <div class="form-heading q-mt-lg">Personnel Role</div>

    <q-select
      v-model="publicAdjustorInfo.personnelRole1.id"
      :options="roleTypes"
      option-value="id"
      option-label="name"
      map-options
      emit-value
      options-dense
      @input="setTypes(roleTypes, publicAdjustorInfo.personnelRole1, 'role1')"
      label="Select Role"
    ></q-select>

    <div class="form-heading q-mt-lg">Person Party</div>

    <q-select
      v-model="publicAdjustorInfo.personParty1"
      :options="userRoles"
      :disable="publicAdjustorInfo.isFieldDisable1"
      :label="
        publicAdjustorInfo.isFieldDisable1 ? 'Select a Role' : 'Select a Party'
      "
      option-label="name"
      option-value="machineValue"
      options-dense
      emit-value
      map-options
    ></q-select>

    <div class="form-heading q-mt-lg">Personnel Role</div>
    <q-select
      v-model="publicAdjustorInfo.personnelRole2.id"
      :options="roleTypes"
      option-value="id"
      option-label="name"
      map-options
      emit-value
      options-dense
      @input="setTypes(roleTypes, publicAdjustorInfo.personnelRole2, 'role2')"
      label="Select Role"
    ></q-select>
    <div class="form-heading q-mt-lg">Person/Party</div>
    <q-select
      v-model="publicAdjustorInfo.personParty2"
      :options="userRoles"
      :disable="publicAdjustorInfo.isFieldDisable2"
      :label="
        publicAdjustorInfo.isFieldDisable2 ? 'Select a Role' : 'Select a Party'
      "
      option-label="name"
      option-value="machineValue"
      options-dense
      emit-value
      map-options
    ></q-select>
    <div class="form-heading q-mt-lg">Personnel Role</div>
    <q-select
      v-model="publicAdjustorInfo.personnelRole3.id"
      :options="roleTypes"
      option-value="id"
      option-label="name"
      map-options
      emit-value
      options-dense
      @input="setTypes(roleTypes, publicAdjustorInfo.personnelRole3, 'role3')"
      label="Select Role"
    ></q-select>
    <div class="form-heading q-mt-lg">Person/Party</div>

    <q-select
      v-model="publicAdjustorInfo.personParty3"
      :options="userRoles"
      :disable="publicAdjustorInfo.isFieldDisable3"
      :label="
        publicAdjustorInfo.isFieldDisable3 ? 'Select a Role' : 'Select a Party'
      "
      option-label="name"
      option-value="machineValue"
      options-dense
      emit-value
      map-options
    ></q-select>
    <div class="form-heading q-mt-lg">Personnel Role</div>
    <q-select
      v-model="publicAdjustorInfo.personnelRole4.id"
      :options="roleTypes"
      option-value="id"
      option-label="name"
      map-options
      emit-value
      options-dense
      @input="setTypes(roleTypes, publicAdjustorInfo.personnelRole4, 'role4')"
      label="Select Role"
    ></q-select>
    <div class="form-heading q-mt-lg">Person/Party</div>
    <q-select
      v-model="publicAdjustorInfo.personParty4"
      :options="userRoles"
      :disable="publicAdjustorInfo.isFieldDisable4"
      :label="
        publicAdjustorInfo.isFieldDisable4 ? 'Select a Role' : 'Select a Party'
      "
      option-label="name"
      option-value="machineValue"
      options-dense
      emit-value
      map-options
    ></q-select
    ><br />
    <span class="form-heading"
      >Special Instructions, Comments Or Other Notes</span
    >
    <div class="floating-label">
      <textarea
        rows="5"
        required
        class="full-width"
        v-model="publicAdjustorInfo.notes"
        style="resize: none"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'PublicAdjustorInfo',

  props: {
    publicAdjustorInfo: {
      type: Object
    }
  },

  data() {
    return {
      params: {
        role: ''
      }
    };
  },
  created() {
    this.getAllUsers();
  },

  computed: {
    ...mapGetters(['roleTypes', 'userRoles'])
  },
  methods: {
    ...mapActions(['getRoles', 'getAllUsers']),
    setTypes(types, data, role) {
      const obj = types.find(item => {
        return item.id === data.id;
      });
      data.machineValue = obj.machineValue;
      data.value = obj.name;
      switch (role) {
        case 'role1':
          this.publicAdjustor.isFieldDisable1 = false;
          this.params.role = this.publicAdjustor.personnelRole1.machineValue;
          this.getAllUsers(this.params);
          break;
        case 'role2':
          this.publicAdjustor.isFieldDisable2 = false;
          this.params.role = this.publicAdjustor.personnelRole2.machineValue;
          this.getAllUsers(this.params);
          break;

        case 'role3':
          this.publicAdjustor.isFieldDisable3 = false;
          this.params.role = this.publicAdjustor.personnelRole3.machineValue;
          this.getAllUsers(this.params);
          break;
        case 'role4':
          this.publicAdjustor.isFieldDisable4 = false;
          this.params.role = this.publicAdjustor.personnelRole4.machineValue;
          this.getAllUsers(this.params);
          break;
      }
    }
  }
};
</script>
