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
      </div>
      <div class="mobile-container-page">
        <div class="clients-list " v-if="claims.length">
          <div>
            <div
              class="clients-list "
              v-for="(claim, index) in claims"
              :key="claim.id"
            >
              <div class="client-list-item">
                <div class="row  form-heading q-pb-md  ">
                  <div class="col-10" @click="onClickingOnClaim(claim)">
                    {{ claim.client.fname }}
                    {{ claim.client.lname }}
                  </div>

                  <q-icon
                    class="q-ml-auto"
                    size="1em"
                    :name="claim.isFavourite ? 'star' : 'star_border'"
                    @click="onClickFavourite(claim)"
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
                        claim.carrier
                          ? claim.carrier.value
                            ? claim.carrier.value
                            : ''
                          : '-'
                      }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3">Claim No.</div>

                    <div>
                      {{ claim.number ? claim.number : '-' }}
                    </div>
                  </div>

                  <div class="row justify-between q-pt-xs">
                    <div v-if="claim.status">
                      <q-badge
                        class="q-px-md q-py-sm"
                        :style="
                          claim.status.isCancelled == false
                            ? 'background-color:#ECA74C;'
                            : 'background-color:#EF9A9A;'
                        "
                      >
                        {{
                          claim.status
                            ? claim.status.isCancelled == false
                              ? 'OPEN'
                              : 'CANCELLED'
                            : ''
                        }}</q-badge
                      >
                    </div>

                    <div column>
                      <div>
                        {{
                          claim.lossInfo.cause
                            ? claim.lossInfo.cause
                              ? claim.lossInfo.cause.value
                              : ''
                            : '-'
                        }}
                      </div>
                      <div>
                        {{ dateToShow(claim.created) }}
                      </div>
                    </div>
                  </div>

                  <div v-if="photoIdKey.photoIdKeyPresent">
                    <q-badge
                      color="red"
                      v-if="
                        !claim.uScopeAssignmentID && !claim.isPhotoIDGenerated
                      "
                    >
                      Assignment not generated, push it manually
                      <q-icon
                        name="warning"
                        color="white"
                        class="q-ml-xs"
                      ></q-icon>
                    </q-badge>
                    <q-badge
                      color="red"
                      v-if="
                        !claim.uScopeAssignmentID &&
                          claim.isPhotoIDGenerated === null
                      "
                    >
                      Assignment not generated, PLEASE WAIT
                      <q-icon
                        name="warning"
                        color="white"
                        class="q-ml-xs"
                      ></q-icon>
                    </q-badge>
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
    ...mapGetters(['claims', 'selectedClaimId', 'photoIdKey']),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  async created() {
    await this.getPhotoIdKeys();
    this.getClaims();
    this.userRole = getCurrentUser().attributes.roles[0].machineValue;
  },
  methods: {
    ...mapActions([
      'getClaims',
      'markClaimFavourite',
      'getSelectedClaim',
      'markClaimUnFavourite',
      'getPhotoIdKeys'
    ]),
    ...mapMutations(['setSelectedClaimId']),
    dateToShow,
    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },
    async onClickFavourite(claim) {
      if (claim.isFavourite == true) {
        claim.isFavourite = false;
        await this.markClaimUnFavourite(claim.id);
      } else {
        claim.isFavourite = true;
        await this.markClaimFavourite(claim.id);
      }
      this.getClaims();
    },
    search(event) {
      this.params.name = event;
      this.getClaims(this.params);
    },
    onClickingOnClaim(claim) {
      this.setSelectedClaimId(claim.id);
      this.$router.push('/claim-details');
      if (this.userRole == 'estimator' || this.userRole == 'vendor') {
        this.setSelectedClaimId(claim.id);
        this.$router.push('/claim-summary');
      }
    }
  }
};
</script>
