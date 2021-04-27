<template>
  <q-page>
    <div class="listing-height">
      <ClaimDetail />
      <q-card class="q-ma-md q-pa-md  ">
        <div class="row q-ml-xs justify-between">
          <div class="text-bold  q-mt-xs">Claim Summary</div>
          <div>
            <q-icon
              class="q-ml-xs"
              name="edit"
              size="xs"
              color="primary"
              @click="claimSummary = true"
            />
          </div>
        </div>
        <div class=" q-ml-xs">
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> File Number </span>
            <span class="q-ml-md col">
              {{
                getSelectedClaim.fileNumber ? getSelectedClaim.fileNumber : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Claim Number </span>
            <span class="q-ml-md col">
              {{ getSelectedClaim.number ? getSelectedClaim.number : '-' }}
            </span>
          </div>

          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Claim Reason </span>
            <span class="q-ml-md col" v-if="getSelectedClaim.lossInfo">
              {{
                getSelectedClaim.lossInfo.claimReason
                  ? getSelectedClaim.lossInfo.claimReason.value
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Claim Fees </span>
            <span class="q-ml-md col">
              {{
                getSelectedClaim.contractInfo.fees.rate
                  ? getSelectedClaim.contractInfo.fees.rate
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4 "> Date of Contract </span>
            <span class="q-ml-md" v-if="getSelectedClaim.contractInfo">
              {{
                getSelectedClaim.contractInfo.dateOfFirstContact
                  | moment('MM/DD/YYYY')
              }}
            </span>
            <span class="q-ml-md" v-else> MM/DD/YYYY</span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Date of Notified </span>
            <span class="q-ml-md" v-if="getSelectedClaim.contractInfo">
              {{ getSelectedClaim.contractInfo.date | moment('MM/DD/YYYY') }}
            </span>
            <span v-else class="q-ml-md"> MM/DD/YYYY</span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Open Since </span>
            <span class="q-ml-md col">
              {{
                getSelectedClaim.sinceOpen ? getSelectedClaim.sinceOpen : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Loss Since </span>
            <span class="q-ml-md col">
              {{
                getSelectedClaim.sinceLoss ? getSelectedClaim.sinceLoss : '-'
              }}
            </span>
          </div>
        </div>
      </q-card>

      <q-card class="q-ma-md q-pa-md ">
        <div class="row q-ml-xs justify-between ">
          <div class="text-bold  q-mt-xs">Claim Deadlines</div>
          <div class=" q-mt-xs">
            <q-icon
              class="q-ml-xs"
              name="edit"
              size="xs"
              color="primary"
              @click="claimDeadline = true"
            />
          </div>
        </div>
        <div class=" q-ml-xs ">
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              Tolling Date / Statute Deadline
            </span>
            <span class="q-ml-md col"> {{ DeadLineDate }}</span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              Recoverable Depreciation Due
            </span>
            <span class="q-ml-md col">
              {{ recovDDDate }}
            </span>
          </div>
        </div>
      </q-card>

      <q-card class="q-ma-md q-pa-md  ">
        <div class="row q-ml-xs justify-between">
          <div class="text-bold  q-mt-xs">Loss Details</div>
          <div>
            <q-icon
              name="create"
              color="primary"
              class="col "
              size="xs"
              @click="lossDetailsBox = true"
            ></q-icon>
          </div>
        </div>
        <div class=" q-ml-xs ">
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              Date & Time of Loss
            </span>
            <span class="q-ml-md col">
              MM/DD/YYYY
            </span>
          </div>

          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              Estimated Loss Amount
            </span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              Property Value at Time of Loss
            </span>
            <span class="q-ml-md col" v-if="getSelectedClaim.lossInfo">
              {{
                getSelectedClaim.lossInfo.propertyDesc
                  ? getSelectedClaim.lossInfo.propertyDesc
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Loss Description </span>
            <span class="q-ml-md col" v-if="getSelectedClaim.lossInfo">
              {{
                getSelectedClaim.lossInfo.desc
                  ? getSelectedClaim.lossInfo.desc
                  : '-'
              }}
            </span>
          </div>
        </div>
      </q-card>

      <div class="form-heading q-ml-md col q-mb-md">Claim Timeline</div>
      <div v-for="(phase, index) in getSelectedClaim.phases">
        <div class="row">
          <div class="col-2 q-ml-md ">
            <q-avatar
              class="q-ma-sm "
              size="50px"
              style="background-color:#ECA74C"
              font-size="15px"
              text-color="white"
            >
              <span>
                {{
                  getSelectedClaim.phases[index].created
                    ? getSelectedClaim.phases[index].created
                    : '-' | moment('D MMM')
                }}</span
              >
            </q-avatar>
          </div>
          <div class="col row q-ml-lg q-mt-sm ">
            <div class="col-10">
              <span class="text-bold">
                {{
                  getSelectedClaim.phases[index].value
                    ? getSelectedClaim.phases[index].value
                    : '-'
                }}</span
              >
            </div>

            <q-icon
              name="create"
              color="primary"
              class="col "
              size="xs"
              @click="onClickeditClaimTimeline(index)"
            ></q-icon>

            <div class="q-mb-xl heading-light">
              Phase changed to
              {{
                getSelectedClaim.phases[index].value
                  ? getSelectedClaim.phases[index].value
                  : '-'
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="claimDeadline"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="claimDeadline = false"
          :dialogName="'Edit Claim Deadlines'"
        />
        <div class="q-ma-sm mobile-container-page">
          <q-card class="q-mx-sm">
            <div class="q-px-md">
              <q-input
                class="q-py-sm"
                dense
                v-model="DeadLineDate"
                mask="##/##/####"
                label="Recoverable Depreciation Due"
              >
                <template v-slot:append>
                  <q-icon
                    name="event"
                    size="sm"
                    color="primary"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      ref="qDateProxy2"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="DeadLineDate"
                        @input="() => $refs.qDateProxy2.hide()"
                        mask="MM/DD/YYYY"
                        :options="lossDateOption"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                dense
                class="q-py-lg"
                v-model="recovDDDate"
                mask="##/##/####"
                label="Trolling Date /Statute Deadline"
              >
                <template v-slot:append>
                  <q-icon
                    name="event"
                    size="sm"
                    color="primary"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      ref="qDateProxy2"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="recovDDDate"
                        @input="() => $refs.qDateProxy2.hide()"
                        mask="MM/DD/YYYY"
                        :options="lossDateOption"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </q-card>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          @click="onSaveButtonClick('claimDeadline')"
          size="'xl'"
        />
      </q-card>
    </q-dialog>
    <!-- Claim Summary -->
    <q-dialog
      v-model="claimSummary"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="claimSummary = false"
          :dialogName="'Edit Claim Summary'"
        />
        <div class="q-ma-sm mobile-container-page">
          <q-card class="q-mx-sm">
            <div class="q-px-sm">
              <q-input
                class="q-py-sm"
                v-model="policyInfo.fileNumber"
                label="File Number"
              />
              <q-input
                class="q-py-sm"
                v-model="policyInfo.claimFee"
                label="Claim Fee(%)"
              />
              <q-input
                class="q-py-sm"
                v-model="policyInfo.carrierNotifyDate"
                label="Date Notified"
                disable
              />
              <q-input
                class="q-py-sm"
                v-model="policyInfo.reasonForClaim"
                label="Reason For Claim"
              />
            </div>
          </q-card>
          <q-card class="q-ma-sm">
            <div class="q-ma-sm">
              <q-input
                class="q-py-sm"
                v-model="policyInfo.dateOfFirstContact"
                label="Date of First Contact"
                disable
              />
            </div>
          </q-card>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          @click="onSaveButtonClick('claimSummary')"
          size="'xl'"
        />
      </q-card>
    </q-dialog>
    <!-- Timeline Dialog -->
    <q-dialog
      v-model="editClaimTimeline"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="editClaimTimeline = false"
          :dialogName="'Edit Claim Deadlines'"
        />
        <div class="q-ma-sm mobile-container-page">
          <q-card class="q-mx-sm">
            <div class="q-px-md">
              <div class="row">
                <div class="q-pa-md heading-light">Phase</div>
                <div class="q-pa-md text-bold">{{ claimPhase.value }}</div>
              </div>

              <q-input
                dense
                class="q-px-md q-py-sm"
                v-model="claimPhase.created"
                mask="##/##/####"
                label="Date"
              >
                <template v-slot:append>
                  <q-icon
                    name="event"
                    size="sm"
                    color="primary"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      ref="qDateProxy2"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="claimPhase.created"
                        @input="() => $refs.qDateProxy2.hide()"
                        mask="MM/DD/YYYY"
                        :options="lossDateOption"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <div class="q-px-md">Notes</div>
              <div class="q-pb-md q-px-md">
                <textarea
                  rows="5"
                  required
                  class="full-width"
                  v-model="claimPhase.notes"
                  style="resize: none"
                />
              </div>
            </div>
          </q-card>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          @click="onSaveButtonClick('editClaimTimeline')"
          size="'xl'"
        />
      </q-card>
    </q-dialog>
    <!-- Loss Detail dialog -->
    <q-dialog
      v-model="lossDetailsBox"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="lossDetailsBox = false"
          :dialogName="'Edit Loss Details'"
        />
        <div class="q-ma-sm mobile-container-page">
          <q-card class="q-mx-sm">
            <div class="q-px-md">
              <q-input
                dense
                v-model="lossInfo.dateOfLoss"
                mask="##/##/####"
                label="MM/DD/YYYY"
              >
                <template v-slot:append>
                  <q-icon
                    name="event"
                    size="sm"
                    color="primary"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      ref="qDateProxy2"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="lossInfo.dateOfLoss"
                        @input="() => $refs.qDateProxy2.hide()"
                        mask="MM/DD/YYYY"
                        :options="lossDateOption"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-select
                dense
                v-model="lossInfo.cause.id"
                behavior="menu"
                class="required q-py-md"
                option-value="id"
                option-label="name"
                map-options
                options-dense
                emit-value
                :options="lossCauses"
                @input="setTypes(lossInfo.cause.id)"
                label="Loss Cause"
                :rules="[
                  val =>
                    (val && val.length > 0) ||
                    'Please select the reason for claim'
                ]"
              />
              <div class="row" style="align-items: center">
                <span class="form-heading">Estimated Loss Amount</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  v-model.number="lossInfo.estimatedLossAmount"
                  placeholder="Dwelling Limit (A)"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="form-heading">Estimated Loss Amount</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  v-model.number="lossInfo.propertyValue"
                  placeholder="Dwelling Limit (A)"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <span class="form-heading">Loss Description </span>
              <textarea
                rows="5"
                required
                class="full-width"
                v-model="lossInfo.cause.desc"
                style="resize: none"
              />
              <div class="row">
                <div>FEMA Claim</div>
                <q-toggle class="q-ml-auto" v-model="isFemaClaim" />
              </div>
              <div class="row">
                <div>Property is not habitable</div>
                <q-toggle class="q-ml-auto" v-model="isHabitable" />
              </div>
            </div>
          </q-card>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          @click="onSaveButtonClick('lossDetailsBox')"
          size="'xl'"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClaimDetail from 'components/ClaimDetail';
import moment from 'moment';
import { date } from 'quasar';
import { dateToShow } from '@utils/date';

export default {
  name: 'Claims',
  components: { CustomBar, ClaimDetail },
  data() {
    return {
      rating: 1,
      claimDeadline: false,
      claimSummary: false,
      lossDetailsBox: false,
      editClaimTimeline: false,
      isFemaClaim: false,
      isHabitable: false,
      DeadLineDate: '',
      recovDDDate: '',
      claimPhase: {
        value: '',
        created: '',
        notes: ''
      },
      lossInfo: {
        dateOfLoss: '',
        reason: {
          id: '',
          machineValue: '',
          value: ''
        },
        claimReason: {
          id: '',
          value: '',
          machineValue: ''
        },
        date: '2020-09-24T11:18:06+00:00',
        cause: {
          id: '',
          value: '',
          machineValue: '',
          desc: ''
        },
        desc: 'Loss description',
        estimatedLossAmount: 2000.2,
        propertyValue: 1200
      },

      policyInfo: {
        claimFee: '',
        reasonForClaim: '',
        sourceOfClaim: '',
        contractDetails: '',
        dateOfFirstContact: '',
        timeOfFirstContact: '',
        carrierNotifyDate: '',
        number: '',
        isClaimFiled: true,
        isForcedPlaced: true,
        fileNumber: '',
        priorPayment: 1234.09,
        limitReason: 'reason for limits or denial',
        effectiveDate: '2020-09-24T11:18:06Z',
        expirationDate: '2020-09-24T11:18:06Z'
      }
    };
  },

  computed: {
    ...mapGetters([
      'getSelectedClaim',
      'setClientProperty',
      'selectedClaimId',
      'lossCauses'
    ]),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  created() {
    if (!this.selectedClaimId) {
      this.$router.push('/clients');
    }
    this.getClaimReasons();
    this.getLossCauses();
    this.lossInfo.dateOfLoss = dateToShow(this.getSelectedClaim.lossInfo.date);
    this.policyInfo.fileNumber = this.getSelectedClaim.fileNumber;
    this.DeadLineDate = dateToShow(this.getSelectedClaim.lossInfo.deadlineDate);
    this.recovDDDate = dateToShow(this.getSelectedClaim.lossInfo.recovDDDate);
    this.policyInfo.carrierNotifyDate = dateToShow(
      this.getSelectedClaim.contractInfo.date
    );
    this.policyInfo.reasonForClaim = this.getSelectedClaim.lossInfo.claimReason.value;
    this.policyInfo.dateOfFirstContact = dateToShow(
      this.getSelectedClaim.contractInfo.dateOfFirstContact
    );
    this.policyInfo.claimFee = this.getSelectedClaim.contractInfo.fees.rate;
    this.isHabitable = this.getSelectedClaim.lossInfo.isHabitable;
    this.isFemaClaim = this.getSelectedClaim.lossInfo.isFEMA;

    if (this.getSelectedClaim.lossInfo.cause) {
      this.lossInfo.cause = this.getSelectedClaim.lossInfo.cause;
    }

    this.getSingleClaimDetails(this.selectedClaimId);
  },
  methods: {
    ...mapActions([
      'getSingleClaimDetails',
      'getClaimReasons',
      'getLossCauses',
      'editClaimInfo'
    ]),
    onClickeditClaimTimeline(index) {
      this.claimPhase.value = this.getSelectedClaim.phases[index].value;
      this.claimPhase.created = this.getSelectedClaim.phases[index].created;
      this.editClaimTimeline = true;
    },
    async onSaveButtonClick(value) {
      if (value == 'claimSummary') {
        let payload = {
          id: this.selectedClaimId,
          data: { policyInfo: this.policyInfo }
        };
        await this.editClaimInfo(payload);
      } else {
        let payload = {
          id: this.selectedClaimId,
          data: { lossInfo: this.lossInfo }
        };
        await this.editClaimInfo(payload);
      }
      this[value] = false;
    },

    lossDateOption(dateopn) {
      return dateopn <= date.formatDate(Date.now(), 'YYYY/MM/DD');
    },
    setTypes(data) {
      const obj = this.lossCauses.find(item => {
        return item.id === data;
      });
      this.lossInfo.cause.id = obj.id;
      this.lossInfo.cause.machineValue = obj.machineValue;
      this.lossInfo.cause.value = obj.name;
    }
  }
};
</script>
