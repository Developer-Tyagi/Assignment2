<template>
  <q-page>
    <div>
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

        <div class="q-ml-auto row q-pr-md" @click="filterDialog = true">
          <img src="~assets/filter.svg" />
        </div>
      </div>
      <div class="mobile-container-page ">
        <div class="clients-list " v-if="claims.length">
          <div>
            <div
              class="clients-list "
              v-for="(claim, index) in claims"
              :key="claim.id"
            >
              <div class="client-list-item">
                <div class="row  text-bold q-pb-md  ">
                  <div class="col-10" @click="onClickingOnClaim(claim)">
                    {{ claim.attributes.client.fname }}
                    {{ claim.attributes.client.lname }}
                  </div>

                  <q-icon
                    class="q-ml-auto"
                    size="1em"
                    :name="
                      claim.attributes.isFavourite ? 'star' : 'star_border'
                    "
                    @click="onClickFavorite(index)"
                    color="primary"
                  >
                    <q-tooltip
                      anchor="center right"
                      self="center left"
                      :offset="[10, 10]"
                    >
                      Mark claim as favourite
                    </q-tooltip>
                  </q-icon>
                </div>
                <div @click="onClickingOnClaim(claim)">
                  <div class="row">
                    <div class="col-3">Carrier</div>

                    <div>
                      {{
                        claim.attributes.carrier
                          ? claim.attributes.carrier.value
                            ? claim.attributes.carrier.value
                            : ''
                          : '-'
                      }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3">Claim No.</div>

                    <div>
                      {{
                        claim.attributes.number ? claim.attributes.number : '-'
                      }}
                    </div>
                  </div>

                  <div class="row justify-between q-pt-xs">
                    <div v-if="claim.attributes.status">
                      <q-badge
                        class="q-px-md q-py-sm"
                        :style="
                          claim.attributes.status.isCancelled == false
                            ? 'background-color:#ECA74C;'
                            : 'background-color:#EF9A9A;'
                        "
                      >
                        {{
                          claim.attributes.status
                            ? claim.attributes.status.isCancelled == false
                              ? 'OPEN'
                              : 'CANCELLED'
                            : ''
                        }}</q-badge
                      >
                    </div>

                    <div column>
                      <div>
                        {{
                          claim.attributes.lossInfo.cause
                            ? claim.attributes.lossInfo.cause
                              ? claim.attributes.lossInfo.cause.value
                              : ''
                            : '-'
                        }}
                      </div>
                      <div>
                        {{ dateToShow(claim.attributes.created) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="full-height full-width column">
          <div class="column absolute-center">
            <div style="color: #666666,align-items: center">
              You haven't added a Claim yet.
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import moment from 'moment';
import { dateToShow } from '@utils/date';
import { getCurrentUser } from '@utils/auth';
export default {
  name: 'Claims',
  data() {
    return {
      claimcolor: false,
      filterDialog: false,
      params: {
        name: ''
      },
      searchText: '',
      openSearchInput: false
    };
  },

  computed: {
    ...mapGetters(['claims', 'selectedClaimId']),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  created() {
    this.userRole = getCurrentUser().attributes.roles[0].machineValue;
  },
  methods: {
    ...mapActions([
      'getClaims',
      'markClaimFavorite',
      'getSelectedClaim',
      'markClaimUnFavorite'
    ]),
    ...mapMutations(['setSelectedClaimId']),
    dateToShow,
    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },
    async onClickFavorite(index) {
      if (this.claims[index].attributes.isFavourite == false) {
        await this.markClaimUnFavorite(this.selectedClaimId);
      } else {
        await this.markClaimFavorite(this.selectedClaimId);
      }
    },
    search(event) {
      this.params.name = event;
      this.getClaims(this.params);
    },

    onClickingOnClaim(claim) {
      this.setSelectedClaimId(claim.id);
      this.$router.push('/claim-details');
      if (this.userRole == 'estimator' || this.userRole == 'vendor') {
        console.log(this.userRole, 'user');
        this.setSelectedClaimId(claim.id);
        this.$router.push('/claim-summary');
      }
    }
  }
};
</script>
