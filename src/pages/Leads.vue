<template>
  <q-page>
    <div class="row justify-center q-mt-sm">
      <q-badge
        color="red"
        v-if="!organization.photoIDAPIKey && this.userRole == 'owner'"
      >
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
        src="~assets/close.svg"
        v-if="searchText"
        @click="onSearchBackButtonClick"
        style="margin: 0 20px"
      />
      <q-separator vertical></q-separator>
      <q-btn @click="addLead" flat><img src="~assets/add.svg"/></q-btn>
    </div>
    <div class="mobile-container-page">
      <div class="row">
        <div class="full-width">
          <q-tabs
            v-model="panel"
            dense
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
          </q-tabs>
          <q-tab-panels
            v-model="panel"
            animated
            style="height: calc(100vh - 156px); overflow: auto"
          >
            <q-tab-panel name="newLeads" class="q-pa-none">
              <q-list style="overflow-x: hidden" v-if="activeLeads.length">
                <div
                  class="lead-list-item"
                  v-for="lead in activeLeads"
                  :key="lead.id"
                >
                  <div
                    class="button-left"
                    @click="onArchiveButtonClick(lead.id)"
                  >
                    <div class="button-yellow">
                      <span class="text-white q-my-auto q-mx-auto"
                        >Archive</span
                      >
                    </div>
                  </div>
                  <q-item
                    @click="onLeadListClick(lead)"
                    clickable
                    v-ripple
                    class="lead-list-details"
                    v-touch-swipe.horizontal.scroll="
                      data => onListSwipe(data, lead)
                    "
                    :class="{
                      swipeRight: lead.isLeftOptionOpen,
                      swipeLeft: lead.isRightOptionOpen
                    }"
                  >
                    <q-item-section>
                      <div class="row">
                        <span
                          >{{ lead.primaryContact.fname }}
                          {{ lead.primaryContact.lname }}</span
                        >
                        <span class="q-ml-auto">Visting On</span>
                      </div>
                      <div class="row">
                        <span
                          >Mob:
                          <span
                            v-if="
                              lead.primaryContact.phoneNumber &&
                                lead.primaryContact.phoneNumber.length
                            "
                            class="click-link"
                            @click="
                              onPhoneNumberClick(
                                lead.primaryContact.phoneNumber[0].number,
                                $event
                              )
                            "
                          >
                            {{
                              showPhoneNumber(
                                lead.primaryContact.phoneNumber[0].number
                              )
                            }}
                          </span>
                        </span>
                        <span class="q-ml-auto" v-if="lead.lastVisted">
                          {{ dateToShow(lead.lastVisted) }}
                        </span>
                        <span v-else class="q-ml-auto"> - </span>
                      </div>
                      <div>
                        Date of Loss:
                        <span v-if="lead.dateofLoss">{{
                          dateToShow(lead.dateofLoss)
                        }}</span>
                        <span v-else> - </span>
                      </div>
                      <div class="q-mt-md row">
                        <span>New Lead in Inspection</span>
                        <span class="q-ml-auto">
                          <q-icon name="restore_page"></q-icon>
                        </span>
                      </div>
                    </q-item-section>
                  </q-item>
                  <div class="button-right">
                    <div class="button-yellow">
                      <span class="text-white q-my-auto q-mx-auto"
                        >Schedule Visit</span
                      >
                    </div>

                    <div class="button-orange">
                      <q-btn
                        class="
                          text-white
                          q-my-auto q-mx-auto
                          full-width full-height
                        "
                        label="Create Client"
                        @click="onCreateClientButtonClick(lead)"
                      ></q-btn>
                    </div>
                  </div>
                </div>
              </q-list>
              <div v-else class="full-height full-width column">
                <div style="color: #666666" class="text-center q-mt-auto">
                  You haven't added a Lead yet.
                </div>
                <img
                  src="~assets/add.svg"
                  alt="add_icon"
                  width="80px"
                  height="80px"
                  @click="addLead"
                  style="margin-top: 10px"
                />
              </div>
            </q-tab-panel>
            <q-tab-panel name="oldLeads" class="q-pa-none">
              <q-list v-if="archivedLeads.length">
                <q-item
                  v-for="lead in archivedLeads"
                  :key="lead.id"
                  clickable
                  v-ripple
                  class="lead-list-details"
                  v-touch-swipe.horizontal.scroll="
                    data => onListSwipe(data, lead)
                  "
                  :class="{
                    swipeRight: lead.isLeftOptionOpen,
                    swipeLeft: lead.isRightOptionOpen
                  }"
                >
                  <q-item-section>
                    <div class="row">
                      <span
                        >{{ lead.primaryContact.fname }}
                        {{ lead.primaryContact.lname }}</span
                      >
                      <span class="q-ml-auto">Visting On</span>
                    </div>
                    <div class="row">
                      <span
                        >Mob:
                        <span
                          v-if="
                            lead.primaryContact.phoneNumber &&
                              lead.primaryContact.phoneNumber.length
                          "
                        >
                          {{
                            showPhoneNumber(
                              lead.primaryContact.phoneNumber[0].number
                            )
                          }}
                        </span>
                      </span>
                      <span class="q-ml-auto" v-if="lead.lastVisted">
                        {{ dateToShow(lead.lastVisted) }}
                      </span>
                      <span v-else class="q-ml-auto"> - </span>
                    </div>
                    <div>
                      Date of Loss:
                      <span v-if="lead.dateofLoss">{{
                        lead.dateofLoss && dateToShow(lead.dateofLoss)
                      }}</span>
                      <span v-else> - </span>
                    </div>
                    <div class="q-mt-md row">
                      <span>New Lead in Inspection</span>
                      <span class="q-ml-auto">
                        <q-icon name="restore_page"></q-icon>
                      </span>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
              <div v-else class="full-height full-width column">
                <div style="color: #666666" class="text-center q-mt-auto">
                  You haven't any archived Lead yet.
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import moment from 'moment';
import { dateToShow } from '@utils/date';
import { onPhoneNumberClick, showPhoneNumber } from '@utils/clickable';
import { getCurrentUser } from 'src/utils/auth';

export default {
  name: 'Leads',
  data() {
    return {
      payload: '',
      searchText: '',
      panel: 'newLeads'
    };
  },

  computed: {
    ...mapGetters(['activeLeads', 'archivedLeads', 'isOnline', 'organization']),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  async created() {
    //only owner have the permission to view the organization info
    this.userRole = getCurrentUser().attributes.roles[0].machineValue;
    if (this.userRole == 'owner') {
      await this.getOrganization();
    }
  },

  methods: {
    ...mapActions([
      'getActiveLeadsList',
      'getArchivedLeadsList',
      'addLeadToArchiveList',
      'getOrganization'
    ]),
    dateToShow,
    ...mapMutations(['setSelectedLeadOnline', 'setSelectedLeadOffline']),
    showPhoneNumber,

    onCreateClientButtonClick(lead) {
      if (this.isOnline) {
        let payload = {
          attributes: lead
        };
        this.setSelectedLeadOnline(payload);
      } else {
        this.setSelectedLeadOffline(lead);
      }
      this.$router.push('/add-client');
    },

    addLead() {
      this.$router.push('/add-lead');
    },

    onLeadListClick(lead) {
      // this.$router.push('/details/' + lead.id);
      this.$router.push('/lead-details/' + lead.id);
    },

    search() {
      if (this.panel === 'newLeads') {
        this.payload = {
          searchString: this.searchText ? this.searchText : '',
          new: ''
        };

        this.getActiveLeadsList(this.payload);
      } else {
        this.getArchivedLeadsList();
      }
    },

    onListSwipe(info, lead) {
      if (info.direction === 'left') {
        if (lead['isLeftOptionOpen']) {
          lead['isLeftOptionOpen'] = false;
          lead['isRightOptionOpen'] = false;
        } else {
          lead['isLeftOptionOpen'] = false;
          lead['isRightOptionOpen'] = true;
        }
      } else if (info.direction === 'right') {
        if (lead.isRightOptionOpen) {
          lead['isLeftOptionOpen'] = false;
          lead['isRightOptionOpen'] = false;
        } else {
          lead['isLeftOptionOpen'] = true;
          lead['isRightOptionOpen'] = false;
        }
      }
      let index = this.activeLeads.findIndex(item => item.id === lead.id);
      this.$set(this.activeLeads, index, lead);
    },

    onArchiveButtonClick(leadId) {
      this.addLeadToArchiveList(leadId);
    },

    onPhoneNumberClick,

    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    }
  },
  watch: {
    panel(newVal, oldVal) {
      if (newVal != oldVal) {
        this.searchText = '';
        this.openSearchInput = false;
      }

      if (newVal === 'newLeads') {
        this.getActiveLeadsList();
      } else {
        this.getArchivedLeadsList();
      }
    }
  }
};
</script>
<style lang="sass">
.lead-list-item
  position: relative

  .button-left
    position: absolute
    z-index: 1
    top: 0
    width: 200px
    left: 0
    bottom: 0
    display: flex
    justify-content: flex-start

  .button-right
    position: absolute
    z-index: 1
    top: 0
    right: 0
    width: 200px
    bottom: 0
    display: flex
    justify-content: flex-end

  .button-orange
    margin: 0
    padding: 0
    border: none
    display: flex
    flex-direction: column
    width: 100px
    height: calc(100% - 4px)
    background-color: #F05A26

  .button-yellow
    margin: 0
    padding: 0
    display: flex
    flex-direction: column
    border: none
    width: 100px
    height: calc(100% - 4px)
    background-color: #ECA74C

  .swipeRight
    transform: translateX(100px)
    transition: all 600ms ease-out
  .swipeLeft
    transition: all 1200ms ease-out
    transform: translateX(-200px)
</style>
<style lang="scss" scoped>
img {
  display: block;
  margin-bottom: auto;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
}

.lead-list-details {
  background-color: #f4f4f4;
  border-bottom: 4px solid white;
  position: relative;
  z-index: 2;
  transition: all 1200ms ease-out;
}
</style>
<style lang="scss">
.q-tab {
  padding: 0;

  .q-tab__content {
    width: 100% !important;
  }
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
