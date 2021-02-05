<template>
  <q-page class="window-height bg-background full-width">
    <br />
    <div class="q-mx-xl q-mt-xs" style="height: 60%; width: 90%">
      <div class="full-width">
        <div class="text-bold q-mx-xl">Manage Users</div>
      </div>
      <div class="full-width">
        <div class="row justify-between my-font text-bold q-mx-xl">
          <q-div class="col-3">
            <q-input outlined v-model="searchText" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-div>
          ​
          <div class="justify-between row col-6">
            <div class="col-4">
              <q-card class="q-pl-lg q-pt-md q-mx-xs full-height" flat bordered
                >Licenses available-15</q-card
              >
            </div>
            <div class="col-3">
              <q-card class="q-pl-lg q-pt-md q-mx-xs full-height" flat bordered
                >Total Users - 1</q-card
              >
            </div>
            <div class="col-3 q-mr-lg">
              <q-card
                class="q-pl-lg q-pt-md q-mx-xs full-height text-primary"
                flat
                bordered
                >+ Add New User</q-card
              >
            </div>
          </div>
        </div>
      </div>
      <div class="q-mt-xs -xl row full-width full-height">
        <div class="col-11 q-mx-xl">
          <q-markup-table flat bordered>
            <thead class="bg-grey-5">
              <tr>
                <th class="text-left">Contact Name</th>
                <th class="text-left">Bussiness</th>
                <th class="text-left">Contact Number</th>
                <th class="text-left">Member Since</th>
                <th class="text-left">Roles</th>
                <th class="text-left">Last Access</th>
                <th class="text-left">Status</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="index in 5" :key="index">
                <td class="text-left">{{ name }}</td>
                <td class="text-left">{{ bussiness }}</td>
                <td class="text-left">{{ contactNo }}</td>
                <td class="text-left">{{ date }}/</td>
                <td class="text-left">{{ roles }}</td>
                <td class="text-left">{{ lastAccess }}</td>
                <td class="text-left">{{ status }}</td>
                <td class="text-center">
                  <div class="q-pl-xl">
                    <q-btn-dropdown label="Action" style="width: 100px" outline>
                      <q-list>
                        <q-item clickable v-close-popup @click="onItemClick">
                          <q-item-section>
                            <q-item-label>View/Edit</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="onItemClick">
                          <q-item-section>
                            <q-item-label>Reset Password</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="onItemClick">
                          <q-item-section>
                            <q-item-label>Remove</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                  </div>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'User',
  data() {
    return {
      options: [
        'View/Edit',
        'Reset Password',
        'Change/Modify Plan',
        'Remove',
        'Inactive'
      ],
      searchText: '',
      name: 'Himanshu',
      bussiness: 'Bussiness-1',
      contactNo: +909098987,
      date: '20/02/1998',
      roles: 'Super Admin',
      lastAccess: '20/01/2020 20:40:19',
      status: 'Active'
    };
  },

  methods: {
    onItemClick() {}
  }
};
</script>
<style lang="scss" scoped>
tr:nth-child(even) {
  background-color: $grey-3 !important;
}
</style>
