<template>
  <div class="bg-white full-width">
    <div class="form-heading text-bold">CLAIM PERSONNEL</div>
    <div class="form-heading q-mt-lg">Personnel Role</div>

    <q-select
      dense
      v-model="publicAdjustorInfo.personnel[0].id"
      :options="roleTypes"
      option-value="id"
      option-label="name"
      map-options
      behavior="menu"
      emit-value
      options-dense
      @input="setTypes(roleTypes, publicAdjustorInfo.personnel[0], 0)"
      label="Select Role"
    />

    <div class="form-heading q-mt-lg">Person Party</div>

    <q-select
      dense
      v-model="publicAdjustorInfo.personParty1"
      :options="userRoles"
      :disable="publicAdjustorInfo.isFieldDisable1"
      :label="
        publicAdjustorInfo.isFieldDisable1 ? 'Select a Role' : 'Select a Party'
      "
      option-label="name"
      behavior="menu"
      option-value="machineValue"
      options-dense
      emit-value
      map-options
    />

    <div class="form-heading q-mt-lg">Personnel Role</div>
    <q-select
      dense
      v-model="publicAdjustorInfo.personnel[1].id"
      :options="roleTypes"
      option-value="id"
      option-label="name"
      map-options
      behavior="menu"
      emit-value
      options-dense
      @input="setTypes(roleTypes, publicAdjustorInfo.personnel[1], 1)"
      label="Select Role"
    />
    <div class="form-heading q-mt-lg">Person/Party</div>
    <q-select
      dense
      v-model="publicAdjustorInfo.personParty2"
      :options="userRoles"
      :disable="publicAdjustorInfo.isFieldDisable2"
      :label="
        publicAdjustorInfo.isFieldDisable2 ? 'Select a Role' : 'Select a Party'
      "
      option-label="name"
      option-value="machineValue"
      options-dense
      behavior="menu"
      emit-value
      map-options
    />
    <div class="form-heading q-mt-lg">Personnel Role</div>
    <q-select
      dense
      v-model="publicAdjustorInfo.personnel[2].id"
      :options="roleTypes"
      option-value="id"
      option-label="name"
      map-options
      emit-value
      options-dense
      @input="setTypes(roleTypes, publicAdjustorInfo.personnel[2], 2)"
      label="Select Role"
    />
    <div class="form-heading q-mt-lg">Person/Party</div>

    <q-select
      dense
      v-model="publicAdjustorInfo.personParty3"
      :options="userRoles"
      :disable="publicAdjustorInfo.isFieldDisable3"
      :label="
        publicAdjustorInfo.isFieldDisable3 ? 'Select a Role' : 'Select a Party'
      "
      option-label="name"
      option-value="machineValue"
      options-dense
      behavior="menu"
      emit-value
      map-options
    />
    <div class="form-heading q-mt-lg">Personnel Role</div>
    <q-select
      dense
      v-model="publicAdjustorInfo.personnel[3].id"
      :options="roleTypes"
      option-value="id"
      option-label="name"
      map-options
      emit-value
      options-dense
      @input="setTypes(roleTypes, publicAdjustorInfo.personnel[3], 3)"
      label="Select Role"
    />
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
      behavior="menu"
      map-options
    />

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
      />
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
      role: [
        {
          machineValue: ''
        },
        {
          machineValue: ''
        },
        {
          machineValue: ''
        },
        {
          machineValue: ''
        }
      ],
      params: {
        role: ''
      }
    };
  },
  created() {
    this.getRoles();
    this.getAllUsers();
  },

  computed: {
    ...mapGetters(['roleTypes', 'userRoles'])
  },
  methods: {
    ...mapActions(['getRoles', 'getAllUsers']),
    setTypes(types, data, index) {
      const obj = types.find(item => {
        return item.id === data.id;
      });

      this.role[index].machineValue = obj.machineValue;
      data.role = obj.name;
      switch (index) {
        case 0:
          this.publicAdjustorInfo.isFieldDisable1 = false;
          this.params.role = this.role[index].machineValue;

          this.getAllUsers(this.params);
          break;
        case 1:
          this.publicAdjustorInfo.isFieldDisable2 = false;
          this.params.role = this.role[index].machineValue;
          this.getAllUsers(this.params);
          break;

        case 2:
          this.publicAdjustorInfo.isFieldDisable3 = false;
          this.params.role = this.role[index].machineValue;
          this.getAllUsers(this.params);
          break;
        case 3:
          this.publicAdjustorInfo.isFieldDisable4 = false;
          this.params.role = this.role[index].machineValue;
          this.getAllUsers(this.params);
          break;
      }
    }
  }
};
</script>
