<template>
  <q-page>
    <div>
      <div style="margin-top: 36px; margin-left: 36px; margin-bottom: 26px">
        <q-img
          size="1em"
          style="width: 15px; height: 16px"
          src="~assets/Home-Icon.svg"
          class="LogoSize"
        />
        <q-img
          size="1em"
          style="width: 4px; height: 8px; margin-left: 21px; margin-right: 22px"
          src="~assets/Forward-Icon.svg"
          class="LogoSize"
        />
        <span>Group Permissions</span>
      </div>
      <div class="group-per-text"><span>Group Permissions</span></div>
      <p>
        Please select the role you wish to configure from the selector below and
        then set privileges by checking the associated box. Checking the box
        will turn the privilege on. Changes to these settings will be saved
        automatically.
      </p>
      <div class="text-brown-7 text-weight-bold text-italic">
        Note: the user will need to log out and then in again to activate the
        privilege
      </div>
    </div>

    <div class="row q-mt-md items-center">
      <div class="col">
        <div class="row items-center">
          <div class="q-mr-md">Role</div>

          <q-select
            dense
            outlined
            options-dense
            behavior="menu"
            option-label="value"
            option-value="machineValue"
            v-model="selectedRole"
            :options="roles"
            map-options
            emit-value
            label="Select Role"
            style="width: 30%"
          />
        </div>
      </div>
      <div class="col-3">
        <q-checkbox v-model="paid" disable>Paid</q-checkbox>
      </div>
    </div>
    <q-scroll-area class="claim-list-scrollable">
      <div class="q-my-md" v-if="selectedRole">
        <div v-for="(priv, index) in privileges" :key="index">
          <div class="text-capitalize text-h6">{{ priv }} privileges</div>
          <hr />
          <div v-for="(us, ind) in sortedPermissions" :key="ind">
            <div v-if="privCategory(us.category, priv)">
              <div
                class="q-ml-md"
                v-for="(user, index) in arrOfRoles"
                :key="index"
              >
                <div
                  class="row items-center q-my-md no-wrap"
                  v-if="
                    roleSelection(
                      user.value.name,
                      selectedRole,
                      user.value.isPaid
                    )
                  "
                >
                  <div
                    v-if="
                      user.value.permission != null &&
                      checkPermission(
                        permissions[ind].machineValue,
                        user.machineValue,
                        index
                      )
                    "
                  >
                    <q-icon
                      color="primary"
                      name="check_box"
                      size="sm"
                      @click="rolePermission(ind, index, 'selected')"
                    />
                  </div>

                  <div v-else>
                    <q-icon
                      color="primary"
                      name=" check_box_outline_blank"
                      size="sm"
                      @click="rolePermission(ind, index, 'unselected')"
                    />
                  </div>
                  <div>
                    <span class="q-ml-sm">{{ us.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { getCurrentUser } from 'src/utils/auth';

export default {
  name: 'GroupPermission',
  data() {
    return {
      paid: false,
      roles: [],
      privileges: [
        'claims',
        'clients',
        'carriers',
        'leads',
        'mortgagees',
        'vendors',
        'configuration',
        'tasks',
        'admin'
      ],

      newRole: { id: '', value: '', machine: '' },
      newPermission: '',
      rol: [],
      arrOfRoles: [],
      value: {},
      userId: '',
      selectedRole: ''
    };
  },
  computed: {
    ...mapGetters(['roleTypes', 'permissions']),

    sortedPermissions: function () {
      function compare(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }
      return this.permissions.sort(compare);
    }
  },

  methods: {
    ...mapActions(['getRoles', 'getPermissions', 'setMultiplePermission']),
    async rolePermission(per, role, value) {
      if (value == 'unselected') {
        this.newPermission = this.permissions[per].machineValue;
        this.newRole.id = this.roleTypes[role].id;
        this.newRole.value = this.roleTypes[role].name;
        this.newRole.machineValue = this.roleTypes[role].machineValue;
        if (this.roleTypes[role].permission == null) {
          this.rol.push(this.newPermission);
        } else {
          this.rol = this.roleTypes[role].permission;
          this.rol.push(this.newPermission);
        }
        const payload = [
          {
            id: this.newRole.id,
            value: this.newRole.value,
            machineValue: this.newRole.machineValue,
            permissions: this.rol
          }
        ];
        await this.setMultiplePermission(payload).then(async () => {
          await this.getRoles().then(async () => {
            this.arrOfRoles = [];
            this.roleTypes.forEach(val => {
              this.arrOfRoles.push({
                label: '',
                value: val
              });
            });
          });
        });
      } else {
        this.newPermission = this.permissions[per].machineValue;
        this.newRole.id = this.roleTypes[role].id;
        this.newRole.value = this.roleTypes[role].name;
        this.newRole.machineValue = this.roleTypes[role].machineValue;

        var index = this.roleTypes[role].permission.indexOf(this.newPermission);

        this.rol = this.roleTypes[role].permission;
        this.rol.splice(index, 1);
        const payload = [
          {
            id: this.newRole.id,
            value: this.newRole.value,
            machineValue: this.newRole.machineValue,
            permissions: this.rol
          }
        ];
        this.setMultiplePermission(payload).then(async () => {
          await this.getRoles().then(async () => {
            this.arrOfRoles = [];
            this.roleTypes.forEach(val => {
              this.arrOfRoles.push({
                label: '',
                value: val
              });
            });
          });
        });
      }
    },
    checkPermission(val, role, index) {
      if (this.roleTypes[index].permission.includes(val)) {
        this.arrOfRoles[index].label = true;
        return true;
      }
      return false;
    },

    privCategory(category, priv) {
      if (category.toLowerCase().includes(priv.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    },
    roleSelection(name, selectedRole, isPaid) {
      if (name === selectedRole) {
        this.paid = isPaid;
        return true;
      }
    }
  },

  async created() {
    if (getCurrentUser().attributes) {
      this.user = getCurrentUser().attributes;
      this.userId = getCurrentUser().id;
    }
    this.getRoles().then(async () => {
      this.roleTypes.forEach(val => {
        this.arrOfRoles.push({
          label: '',
          value: val
        });
      });
      for (var i = 0; i < this.roleTypes.length; i++) {
        this.roles.push(this.roleTypes[i].name);
      }
    });
    this.getPermissions();
  }
};
</script>

<style scoped>
.group-per-text {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600 !important;
  font-size: 24px !important;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #000000 !important;
}
</style>
