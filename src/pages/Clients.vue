<template>
  <q-page>
    <div>
      <div
        class="q-mt-sm row justify-center"
        v-if="!organization.photoIDAPIKey && this.userRole == 'owner'"
      >
        <q-badge color="red ">
          PhotoId Key has not been added in the system
          <q-icon name="warning" color="white" class="q-ml-xs"></q-icon>
        </q-badge>
      </div>
      <div class="actions-div">
        <q-input
          dense
          v-model="searchText"
          placeholder="Search"
          borderless
          style="width: 100%"
          @input="search($event)"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <img
          class="q-ma-sm"
          src="~assets/close.svg"
          v-if="searchText"
          @click="onSearchBackButtonClick"
        />
        <q-separator vertical></q-separator>
        <q-btn @click="addClient" flat><img src="~assets/add.svg" /></q-btn>
      </div>
      <div class="">
        <div class="clients-list" v-if="clients.length">
          <div v-if="!loading">
            <q-scroll-area class="scroll-area">
              <q-infinite-scroll
                @load="onLoad"
                :offset="250"
                ref="infiniteScroll"
              >
                <template v-slot:loading>
                  <div class="row justify-center q-my-md">
                    <q-spinner-dots color="primary" size="md" />
                  </div>
                </template>
                <div
                  class="clients-list"
                  v-for="client in clients"
                  :key="client.id"
                >
                  <q-item-section @click="onClientsListClick(client)">
                    <div class="client-list-item">
                      <div class="row form-heading q-pb-md">
                        <span>
                          {{ client['insuredInfo']['primary']['fname'] }}

                          {{ client['insuredInfo']['primary']['lname'] }}
                        </span>
                      </div>
                      <div class="row">
                        <span>
                          {{
                            client['meta'] ? client['meta']['totalClaims'] : 0
                          }}
                          Total Claims /
                          {{
                            client['meta'] ? client['meta']['openClaims'] : 0
                          }}
                          Open Claim
                        </span>
                      </div>
                      <div class="row">
                        <div
                          class="row"
                          v-if="client.insuredInfo.primary.phoneNumber"
                        >
                          <span
                            >Mob:
                            <span
                              class="clickLink"
                              @click="
                                onPhoneNumberClick(
                                  client.insuredInfo.primary.phoneNumber[0]
                                    .number,
                                  $event
                                )
                              "
                            >
                              {{
                                showPhoneNumber(
                                  client.insuredInfo.primary.phoneNumber[0]
                                    .number
                                )
                              }}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div><span>File No. 12345678</span></div>
                      <div class="row justify-between">
                        <div>
                          Status: {{ client.status ? client.status : '-' }}
                        </div>
                        <div>
                          {{ dateWithTime(client.created) }}
                        </div>
                      </div>
                    </div>
                  </q-item-section>
                </div>
                <div
                  class="
                    no-more-results-msg
                    border-bottom-secondary
                    text-body1 text-h5 text-center text-manatee
                  "
                  v-if="noMoreResults"
                >
                  <span class="bg-whiteSmoke q-px-sm">No more results</span>
                </div>
              </q-infinite-scroll>
            </q-scroll-area>
          </div>
        </div>
        <div v-else class="full-height full-width column">
          <div style="color: #666666" class="text-center q-mt-auto">
            You haven't added a Client yet.
          </div>
          <img
            src="~assets/add.svg"
            alt="add_icon"
            width="80px"
            height="80px"
            @click="addClient"
            class="q-mb-auto q-mx-auto q-mt-sm"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { dateWithTime } from '@utils/date';
import { onPhoneNumberClick, showPhoneNumber } from '@utils/clickable';
import localDB, { getCollection } from '@services/dexie';
import { getCurrentUser } from 'src/utils/auth';
const CLIENT_LIST_LIMIT = 20;
export default {
  name: 'Clients',
  data() {
    return {
      userRole: '',
      searchText: '',
      loading: true,
      noMoreResults: false,
      openSearchInput: false
    };
  },

  computed: {
    ...mapGetters([
      'clients',
      'selectedClientId',
      'selectedLead',
      'isOnline',
      'editSelectedClient',
      ' isOfflineClientEdit',
      'organization'
    ])
  },

  async created() {
    //only owner have the permission to view the organization info
    this.userRole = getCurrentUser().attributes.roles[0].machineValue;
    if (this.userRole == 'owner') {
      await this.getOrganization();
    }
    this.getClientListData();
  },
  methods: {
    ...mapActions(['getClients', 'getSingleClientDetails', 'getOrganization']),
    ...mapMutations([
      'setSelectedClient',
      'setSelectedClientOffline',
      'setEditOfflineClientIcon'
    ]),
    dateWithTime,
    onPhoneNumberClick,
    showPhoneNumber,
    // code for Pagination
    async getClientListData() {
      let params = {
        limit: CLIENT_LIST_LIMIT,
        offset: 0
      };
      this.loading = true;
      await this.getClients(params);
      this.loading = false;
    },
    // this function is for pagination and this is get called when the user start scrolling down.
    async onLoad(index, done) {
      let clientListBeforeLoad = this.clients.length;
      let params = {
        limit: CLIENT_LIST_LIMIT,
        offset: index * CLIENT_LIST_LIMIT
      };
      if (clientListBeforeLoad >= CLIENT_LIST_LIMIT) {
        await this.getClients(params);
      }
      let clientListAfterLoad = this.clients.length;
      if (
        clientListBeforeLoad == clientListAfterLoad ||
        clientListAfterLoad - clientListBeforeLoad < CLIENT_LIST_LIMIT
      ) {
        if (clientListBeforeLoad > 0) {
          this.noMoreResults = true;
        }
        this.$refs.infiniteScroll.stop();
      }
      done();
    },
    onSearchBackButtonClick() {
      this.searchText = '';
      this.getClientListData();
      this.noMoreResults = false;
    },
    async onClientsListClick(client) {
      this.getSingleClientDetails(client.id);
      if (this.isOnline) {
        this.setSelectedClient(client);
        this.$router.push('/view-client/' + client.id);
      } else {
        this.setSelectedClientOffline(client);
        this.$router.push('/add-client');
        this.setEditOfflineClientIcon(true);
      }
    },
    addClient() {
      this.$router.push('/add-client');
      this.selectedLead.id = '';
    },

    async search(e) {
      let params = {
        name: ''
      };
      params.name = e;
      if (e == '') {
        this.getClientListData();
        this.noMoreResults = false;
      } else await this.getClients(params);
    }
  }
};
</script>

<style lang="scss">
.clients-list {
  background-color: #f4f4f4;
  border-bottom: 6px solid white;

  .client-list-item {
    padding: 20px;
    background-color: #f4f4f4;
    text-transform: capitalize;
    p {
      margin: 0 0 6px;
    }
  }
}
</style>
