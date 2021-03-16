<template>
  <q-page>
    <div class="actions-div">
      <q-input
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
      <q-separator vertical inset></q-separator>
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
            <q-tab
              name="newLeads"
              :label="`Active Leads-${activeLeads.length}`"
              class="text-capitalize"
            ></q-tab>
            <q-tab
              name="oldLeads"
              :label="`Old Leads-${archivedLeads.length}`"
              class="text-capitalize"
            ></q-tab>
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
                    v-touch-swipe.mouse:6e-3:150:50="
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
                            {{ lead.primaryContact.phoneNumber[0].number }}
                          </span>
                        </span>
                        <span class="q-ml-auto" v-if="lead.lastVisted">
                          {{ lead.lastVisted | moment('DD/MM/YYYY') }}
                        </span>
                        <span v-else class="q-ml-auto"> - </span>
                      </div>
                      <div>
                        Date of Loss:
                        <span v-if="lead.dateofLoss">{{
                          lead.dateofLoss | moment('DD/MM/YYYY')
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
                        class="text-white q-my-auto q-mx-auto full-width full-height"
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
                          {{ lead.primaryContact.phoneNumber[0].number }}
                        </span>
                      </span>
                      <span class="q-ml-auto" v-if="lead.lastVisted">
                        {{ lead.lastVisted | moment('DD/MM/YYYY') }}
                      </span>
                      <span v-else class="q-ml-auto"> - </span>
                    </div>
                    <div>
                      Date of Loss:
                      <span v-if="lead.dateofLoss">{{
                        lead.dateofLoss &&
                          lead.dateofLoss | moment('DD/MM/YYYY')
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

export default {
  name: 'Leads',
  data() {
    return {
      searchText: '',
      panel: 'newLeads'
    };
  },

  computed: {
    ...mapGetters(['activeLeads', 'archivedLeads']),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  created() {
    this.getActiveLeadsList();
    this.getArchivedLeadsList();
  },
  methods: {
    ...mapActions([
      'getActiveLeadsList',
      'getArchivedLeadsList',
      'addLeadToArchiveList'
    ]),
    ...mapMutations(['setSelectedLead']),

    onCreateClientButtonClick(lead) {
      let payload = {
        attributes: lead
      };
      this.setSelectedLead(payload);

      this.$router.push('/add-client');
    },
    addLead() {
      this.$router.push('/add-lead');
    },

    onLeadListClick(lead) {
      this.$router.push('/details/' + lead.id);
    },

    search() {
      if (this.panel === 'newLeads') {
        this.getActiveLeadsList(this.searchText ? this.searchText : '');
      } else {
        this.getArchivedLeadsList(this.searchText ? this.searchText : '');
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

    onPhoneNumberClick(number, e) {
      e.stopPropagation();
      if (number) {
        window.open('tel:' + number);
      }
    },

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

      if (oldVal === 'newLeads') {
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
