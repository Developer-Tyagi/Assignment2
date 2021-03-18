<template>
  <q-page>
    <div class="row height-without-header ">
      <SubSideBar
        class="col-2"
        :list="adminSettings"
        @onListClick="setSelectedTab"
        :selectedItem="tab"
      />
      <div class="col-10">
        <div class="q-pa-xs col-9">
          <!-- Height given for there Inner 2 div -->
          <div class=" row full-width" style="height: 100%" flat bordered>
            <!-- This is the Main Div -->

            <!-- Main Template -->
            <template class="">
              <q-tab-panels
                class="q-ml-xl full-width  "
                style="height: 800px;"
                v-model="tab"
                animated
                vertical
                swipeable
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <!--  -->
                <q-tab-panel name="accountSummary">
                  <q-card class="q-pa-lg " style="height: 800px;" flat bordered>
                    <div class=" text-h5">Account Summary</div>
                    <div class=" row q-mt-lg text-bold">
                      <div class=" col">Company Name</div>
                      <div class=" col">Company Address</div>
                      <div class=" col">Company Mobile</div>
                      <div class=" col">Postal Company Code</div>
                    </div>
                    <q-separator />
                    <div class=" row q-mt-xs">
                      <div class=" col">{{ user.name }}</div>
                      <div class=" col">Company Address</div>
                      <div class=" col ">
                        {{
                          user.phoneNumber.number
                            ? user.phoneNumber.number
                            : '-'
                        }}
                      </div>
                      <div class=" col">Company Mobile</div>
                    </div>

                    <div class=" row q-mt-xl text-bold">
                      <div class=" col">Company Administrator</div>
                      <div class=" col">Administrator Email</div>
                    </div>
                    <q-separator />
                    <div class=" row q-mt-xs">
                      <div class=" col">
                        {{ user.contact.fname }} {{ user.contact.lname }}
                      </div>
                      <div class=" col">{{ user.email }}</div>
                    </div>
                  </q-card>
                </q-tab-panel>
                <q-tab-panel name="portalconfiguration">
                  <q-card class="q-pa-lg " style="" flat bordered>
                    <div class=" full-width">
                      <div class=" text-h5 text-bold">Claim Action Item</div>
                      <div class="text-h5 " style="height:200px;">
                        <div class=" q-pa-xl"></div>
                        <div class=" row q-pa-xl">
                          <q-btn
                            color="primary"
                            label="+ Add Default Action "
                            class=" col-2"
                            @click=""
                          />
                          <q-btn
                            color="primary"
                            label="Refesh "
                            class="q-mx-lg col-2"
                            @click=""
                          />
                          <q-btn
                            color="primary"
                            label="Clone Workflow "
                            class="col-2"
                            @click=""
                          />
                          <q-btn
                            color="primary"
                            label="Delete Workflow "
                            class="q-mx-lg col-2"
                            @click=""
                          />
                          <q-btn
                            color="primary"
                            label="Planning Sheet "
                            class="q-mx-lg col-2"
                            @click=""
                          />
                        </div>
                      </div>
                    </div>
                    <q-card
                      class=" q-ma-xl  "
                      style="; border: 1px solid grey;"
                      flat
                      bordered
                    >
                      <div class=" row bg-grey-3 ">
                        <div class="col-7 q-pa-lg">
                          5 Action Items
                        </div>

                        <div class="col-4 row  text-h6">
                          <div class="col q-pt-md">Workflow</div>

                          <div class="col">
                            <q-select
                              class="full-width q-py-sm"
                              outlined
                              options-dense
                              behavior="menu"
                              v-model="model"
                              :options="options"
                              label="Claim-New Claim"
                            ></q-select>
                          </div>
                        </div>
                        <q-separator />
                      </div>
                      <div class=" q-pa-lg">
                        <div v-for="index in 5" v-if="index >= 0">
                          <div class=" row q-pa-md">
                            <div class="col-11 ">
                              <div class="text-blue">
                                Send Wecome Letter To Client
                              </div>

                              <div class="q-pl-lg">
                                Created when the claim is maded
                              </div>
                            </div>

                            <div class="col-1 row  text-h6">
                              <q-icon size="sm" color="primary" name="create" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </q-card>
                  </q-card>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import SubSideBar from 'components/SubSideBar';
import { getCurrentUser } from 'src/utils/auth';
export default {
  name: 'Admin',
  components: { SubSideBar },
  data() {
    return {
      model: null,
      options: ['nknj', ',mmnjn', 'nnkmk', 'nnj', 'nkjn'],
      tab: '',
      adminSettings: [
        { name: 'Account Summary', key: 'accountSummary' },
        { name: 'Company Setup', key: 'companySetup' },
        { name: 'Group Permission ', key: 'groupPermission' },
        { name: ' PortalConfiguration', key: 'portalconfiguration' }
      ]
    };
  },

  methods: {
    setSelectedTab(e) {
      this.tab = e.key;
    }
  },

  created() {
    this.tab = 'accountSummary';
    if (getCurrentUser().attributes) {
      this.user = getCurrentUser().attributes;
      console.log(this.user);
    }
  }
};
</script>
