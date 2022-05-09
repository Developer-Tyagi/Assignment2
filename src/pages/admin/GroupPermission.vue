<template>
  <q-page>
    <div class="test">
      <div>
        <div style="margin: 34px 0px 24px 6px" class="breadCrumb">
          <q-img
            size="1em"
            style="width: 15px; height: 17px"
            src="~assets/Home-Icon.svg"
            class="LogoSize"
          />
          <q-img
            size="1em"
            style="
              width: 4px;
              height: 8px;
              margin-left: 20px;
              margin-right: 22px;
            "
            src="~assets/Forward-Icon.svg"
            class="LogoSize"
          />
          <span
            style="
              font-size: 14px;
              line-height: 20px;
              font-weight: 500;
              font-family: Barlow;
              color: #667085;
            "
            >Group Permissions</span
          >
        </div>
        <div class="group-per-text"><span>Group Permissions</span></div>
        <div class="detailText">
          Select the role you wish to configure. Set privileges by toggling on
          or off. Changes are saved automatically.
        </div>
      </div>

      <div class="row roleSelectContainer items-center">
        <div class="col">
          <div class="row items-center">
            <div class="q-mr-md roleText">Role</div>

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
              :label="selectedRole ? undefined : 'Select Role'"
              style="width: 30%"
            />
            <div class="roleChips">
              <span v-if="paid">Paid Role</span>
              <span v-else>Free Role</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="roleChipsMobile">
        <span v-if="paid">Paid Role</span>
        <span v-else>Free Role</span>
      </div> -->
      <!-- <q-scroll-area class="claim-list-scrollable"> -->
      <div class="privilegeContainer" v-if="selectedRole">
        <q-list
          bordered
          v-for="(priv, index) in privileges"
          :key="index"
          style="margin-bottom: 20px"
        >
          <q-expansion-item>
            <template v-slot:header>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 100%;
                "
              >
                <span
                  class="text-capitalize"
                  style="
                    margin: 7px 8px;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: 500;
                    color: #0c0c0c;
                  "
                  >{{ priv }} privileges</span
                >
              </div>
            </template>
            <div v-ripple v-for="(us, ind) in sortedPermissions" :key="ind">
              <div
                v-if="privCategory(us.category, priv)"
                style="border-top: 1px solid #ccc"
              >
                <div
                  style="margin-left: 24px"
                  v-for="(user, index) in arrOfRoles"
                  :key="index"
                >
                  <div
                    class="row items-center optionsBox no-wrap"
                    v-if="
                      roleSelection(
                        user.value.name,
                        selectedRole,
                        user.value.isPaid
                      )
                    "
                  >
                    <div
                      class="toggleBox"
                      v-if="
                        user.value.permission != null &&
                        checkPermission(
                          permissions[ind].machineValue,
                          user.machineValue,
                          index
                        )
                      "
                    >
                      <img
                        src="~assets/basetoggleOn.svg"
                        alt="toogle off switch"
                        @click="rolePermission(ind, index, 'selected')"
                        style="margin-top: 5px"
                      />
                    </div>

                    <div v-else class="toggleBox">
                      <img
                        src="~assets/basetoggleOff.svg"
                        alt="toogle off switch"
                        @click="rolePermission(ind, index, 'unselected')"
                        style="margin-top: 5px"
                      />
                    </div>
                    <div>
                      <span
                        style="
                          font-size: 16px;
                          color: #101828;
                          font-weight: 500;
                          font-family: 'Poppins';
                          line-height: 24px;
                        "
                        >{{ us.name }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-expansion-item>
        </q-list>

        <!-- <div v-for="(priv, index) in privileges" :key="index">
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
          </div> -->
      </div>
      <!-- </q-scroll-area> -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { getCurrentUser } from 'src/utils/auth';
export default {
  name: 'GroupPermission',
  data() {
    return {
      toggleValue: true,
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

<style scoped lang="scss">
.breadCrumb {
  display: block;
  @media (max-width: 1023px) {
    display: none;
  }
}
.group-per-text {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #000000;

  @media (max-width: 1023px) {
    margin-top: 22px;
  }
}
.detailText {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #151821;
  @media (max-width: 1023px) {
    font-size: 14px;
    line-height: 20px;
  }
}
.roleSelectContainer {
  margin-top: 30px;
  .roleText {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    color: #101828;
  }
  .roleChips {
    margin-left: 16px;
    background-color: #ecfdf3;
    color: #027a48;
    padding: 4px 16px;
    border-radius: 16px;
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    @media (max-width: 500px) {
      margin-left: 51px;
      margin-top: 16px;
    }
  }

  @media (max-width: 1023px) {
    margin-top: 20px;
  }
}
.privilegeContainer {
  margin-top: 30px;
  .optionsBox {
    margin-top: 24px;
    margin-bottom: 24px;
  }
  .toggleBox {
    margin-right: 12px;
    cursor: pointer;
  }
  @media (max-width: 1023px) {
    margin-top: 20px;
    .optionsBox {
      margin-top: 12px;
      margin-bottom: 12px;
    }
  }
}
.claim-list-scrollable {
  padding: 0px;
  @media (max-width: 1023px) {
    height: calc(100vh);
  }
}
::v-deep {
  .q-field {
    min-width: 300px;
    max-width: 300px;
    @media (max-width: 1023px) {
      min-width: 294px;
    }
  }
  .q-field__label {
    font-size: 16px;
  }
  .q-field__inner {
    min-width: 300px;
    max-width: 300px;
    height: 44px;
    @media (max-width: 768px) {
      min-width: 294px;
    }
  }
  .q-field__control {
    padding-left: 14px;
    padding-right: 19px;
  }
  .q-item__section {
    padding-right: 5px;
    color: #151821;
    font-size: 12px;
  }
  .q-field__native span {
    color: #101828 !important;
    font-weight: 500 !important;
    line-height: 24px !important;
    font-size: 16px !important;
  }
}
</style>
