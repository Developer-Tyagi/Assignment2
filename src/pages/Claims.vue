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
      <div class="mobile-container-page">
        <div class="clients-list" v-if="claims.length">
          <div
            class="clients-list"
            v-for="(claim, index) in claims"
            :key="claim.id"
            @click="onClickingOnClaim(claim)"
          >
            <div class="client-list-item">
              <div class="row text-bold q-pb-md">
                {{ claim.attributes.client.fname }}
                {{ claim.attributes.client.lname }}
                <span class="q-ml-auto">
                  <q-rating
                    v-model="ratingModel"
                    class="q-ml-auto"
                    size="1em"
                    :max="1"
                    color="primary"
                  ></q-rating>
                </span>
              </div>
              <div class="row">
                <div class="col-3">Carrier</div>

                <div class="">
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

                <div class="">
                  {{ claim.attributes.number ? claim.attributes.number : '-' }}
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
                    {{ claim.attributes.created | moment('DD/MM/YYYY') }}
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

export default {
  name: 'Claims',
  data() {
    return {
      claimcolor: false,
      filterDialog: false,
      params: {
        name: ''
      },
      ratingModel: 2,
      searchText: '',
      openSearchInput: false
    };
  },

  computed: {
    ...mapGetters(['claims']),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  created() {
    this.getClaims();
  },
  methods: {
    ...mapActions(['getClaims']),
    ...mapMutations(['setSelectedClaimId']),

    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },

    search(event) {
      this.params.name = event;
      this.getClaims(this.params);
    },

    onClickingOnClaim(claim) {
      this.setSelectedClaimId(claim.id);
      this.$router.push('/claim-details');
    }
  }
};
</script>
