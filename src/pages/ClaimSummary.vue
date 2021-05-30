<template>
  <q-page>
    <q-icon
      class="icon-top"
      @click="menuItemDialog = true"
      name="more_vert"
      v-if="userRole == 'estimator'"
    />
    <div class="listing-height">
      <ClaimDetail />
      <q-card class="q-ma-md q-pa-md">
        <div class="row q-ml-xs justify-between">
          <div class="text-bold q-mt-xs">Claim Summary</div>
          <div>
            <q-icon
              v-if="userRole != 'estimator'"
              class="q-ml-xs"
              name="edit"
              size="xs"
              color="primary"
              @click="onEditClaimSummary"
            />
          </div>
        </div>
        <div class="q-ml-xs">
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
          <div class="row q-mt-sm" v-if="getSelectedClaim.contractInfo">
            <span class="heading-light col-4"> Claim Fees </span>
            <div
              class="q-ml-md col"
              v-if="getSelectedClaim.contractInfo.fees.type == 'dollar'"
            >
              {{
                getSelectedClaim.contractInfo.fees.rate
                  ? '$' + ' ' + getSelectedClaim.contractInfo.fees.rate
                  : '-'
              }}
            </div>
            <div
              class="q-ml-md col"
              v-else-if="getSelectedClaim.contractInfo.fees.type == 'update'"
            >
              {{
                getSelectedClaim.contractInfo.fees.rate
                  ? getSelectedClaim.contractInfo.fees.rate + ' /hour'
                  : '-'
              }}
            </div>
            <div class="q-ml-md col" v-else>
              {{
                getSelectedClaim.contractInfo.fees.rate
                  ? getSelectedClaim.contractInfo.fees.rate + ' %'
                  : '-'
              }}
            </div>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Date of Contract </span>
            <span class="q-ml-md" v-if="getSelectedClaim.contractInfo">
              {{ dateToShow(getSelectedClaim.contractInfo.dateOfFirstContact) }}
            </span>
            <span class="q-ml-md" v-else> MM/DD/YYYY</span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Date of Notified </span>
            <span class="q-ml-md" v-if="getSelectedClaim.contractInfo">
              {{ dateToShow(getSelectedClaim.contractInfo.date) }}
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

      <q-card class="q-ma-md q-pa-md" v-if="userRole != 'estimator'">
        <div class="row q-ml-xs justify-between">
          <div class="text-bold q-mt-xs">Claim Deadlines</div>
          <div class="q-mt-xs">
            <q-icon
              class="q-ml-xs"
              name="edit"
              size="xs"
              color="primary"
              @click="claimDeadline = true"
            />
          </div>
        </div>
        <div class="q-ml-xs">
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

      <q-card class="q-ma-md q-pa-md">
        <div class="row q-ml-xs justify-between">
          <div class="text-bold q-mt-xs">Loss Details</div>
          <div>
            <q-icon
              name="create"
              color="primary"
              class="col"
              size="xs"
              v-if="userRole != 'estimator'"
              @click="lossDetailsBox = true"
            ></q-icon>
          </div>
        </div>
        <div class="q-ml-xs" v-if="getSelectedClaim.lossInfo">
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Date & Time of Loss </span>
            <span class="q-ml-md col">
              {{ dateToShow(getSelectedClaim.lossInfo.date) }}
            </span>
          </div>

          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Estimated Loss Amount </span>
            <span class="q-ml-md col">
              {{
                getSelectedClaim.lossInfo.estimatedLossAmt
                  ? '$' + ' ' + getSelectedClaim.lossInfo.estimatedLossAmt
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              Property Value at Time of Loss
            </span>
            <span class="q-ml-md col" v-if="getSelectedClaim.lossInfo">
              {{
                getSelectedClaim.lossInfo.propertyValue
                  ? '$' + ' ' + getSelectedClaim.lossInfo.propertyValue
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
      <div v-if="userRole != 'estimator'">
        <div class="form-heading q-ml-md col q-mb-md">Claim Timeline</div>
        <div v-for="(phase, index) in getSelectedClaim.phases">
          <div class="row">
            <div class="col-2 q-ml-md">
              <q-avatar
                class="q-ma-sm"
                size="50px"
                style="background-color: #eca74c"
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
            <div class="col row q-ml-lg q-mt-sm">
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
                class="col"
                size="xs"
                @click="onClickEditClaimTimeline(index)"
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
    </div>
    <q-dialog
      v-model="claimDeadline"
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
                v-model="fileNumber"
                label="File Number"
              />
              <!-- <q-input
                class="q-py-sm"
                v-model.number="contractInfo.fees.rate"
                label="Claim Fee(%)"
              /> -->
              <div class="row">
                <q-btn-toggle
                  v-model="contractInfo.fees.type"
                  push
                  glossy
                  toggle-color="primary"
                  :options="[
                    { label: '$', value: 'dollar' },
                    { label: '%', value: 'percentage' },
                    { value: 'update', icon: 'update' }
                  ]"
                />
              </div>
              <div class="row" style="align-items: center">
                <q-input
                  class="q-ml-auto full-width"
                  mask="#.#"
                  type="number"
                  v-model.number="contractInfo.fees.rate"
                  label="Claim Fee Rate"
                  label-color="primary"
                  style="width: 50%"
                  ><template
                    v-slot:prepend
                    v-if="contractInfo.fees.type == 'dollar'"
                  >
                    <q-icon name="$" color="primary" class="q-mb-sm"></q-icon>
                  </template>

                  <template
                    v-slot:append
                    v-else-if="contractInfo.fees.type == 'percentage'"
                  >
                    <q-icon name="%" color="primary"></q-icon>
                  </template>
                  <template v-slot:append v-else>
                    <span class="form-heading text-primary">/hour</span>
                  </template></q-input
                >
              </div>
              <q-input
                class="q-py-sm"
                v-model="policyInfo.carrierNotifyDate"
                label="Date Notified"
                disable
              />

              <q-select
                dense
                behavior="menu"
                v-model="lossInfo.reasonClaim.value"
                option-value="name"
                option-label="name"
                map-options
                use-input
                input-debounce="0"
                options-dense
                emit-value
                :options="claimReasonOptions"
                @input="setClaimReasons(claimReasons, lossInfo.reasonClaim)"
                @filter="searchFilterBy"
                label="Reason for Claim"
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
                v-if="userRole != 'estimator'"
                dense
                v-model="lossInfo.dateOfLoss"
                mask="##/##/####"
                label="MM/DD/YYYY"
                :rules="[val => dateLiesBetween(val)]"
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
                v-if="userRole != 'estimator'"
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
                  v-model.number="lossInfo.estimatedLossAmt"
                  placeholder="Estimated Loss Amount"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="form-heading">Property Loss Amount</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  v-model.number="lossInfo.propertyValue"
                  placeholder="Property Loss Amount"
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
                v-model="lossInfo.desc"
                style="resize: none"
              />
              <div class="row" v-if="userRole != 'estimator'">
                <div>FEMA Claim</div>
                <q-toggle class="q-ml-auto" v-model="isFemaClaim" />
              </div>
              <div class="row" v-if="userRole != 'estimator'">
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
    <!-- Claim Summary Menu Item -->
    <q-dialog
      v-model="menuItemDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
      :position="'bottom'"
    >
      <q-card style="width: 350px">
        <q-card-section class="items-center">
          <div class="q-pa-md heading-light" @click="onClickUploadDocument">
            Upload Documents
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClaimDetail from 'components/ClaimDetail';
import moment from 'moment';
import { validateDate } from '@utils/validation';
import { date } from 'quasar';
import { dateToShow, dateToSend } from '@utils/date';
import { getCurrentUser } from '@utils/auth';
export default {
  name: 'Claims',
  components: { CustomBar, ClaimDetail },
  data() {
    return {
      policyDate: {
        policyEffectiveDate: '',
        policyExpireDate: ''
      },
      menuItemDialog: false,
      claimReasonOptions: [],
      phase: '',
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
        desc: '',
        reason: {
          id: '',
          machineValue: '',
          value: ''
        },
        reasonClaim: {
          id: '',
          value: '',
          machineValue: ''
        },
        cause: {
          id: '',
          value: '',
          machineValue: ''
        },
        estimatedLossAmt: '',
        propertyValue: ''
      },
      contractInfo: {
        fees: {
          rate: '',
          type: ''
        }
      },
      fileNumber: '',
      policyInfo: {
        sourceOfClaim: '',
        contractDetails: '',
        dateOfFirstContact: '',
        timeOfFirstContact: '',
        carrierNotifyDate: '',
        number: '',
        isClaimFiled: true,
        isForcedPlaced: true,
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
      'lossCauses',
      'claimReasons'
    ]),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  async created() {
    this.userRole = getCurrentUser().attributes.roles[0];
    if (!this.selectedClaimId) {
      this.$router.push('/clients');
    }
    this.getClaimReasons();
    this.getLossCauses();
    this.lossInfo.dateOfLoss = dateToShow(this.getSelectedClaim.lossInfo.date);
    this.fileNumber = this.getSelectedClaim.fileNumber;
    this.DeadLineDate = dateToShow(this.getSelectedClaim.lossInfo.deadlineDate);
    this.recovDDDate = dateToShow(this.getSelectedClaim.lossInfo.recovDDDate);
    this.policyInfo.carrierNotifyDate = dateToShow(
      this.getSelectedClaim.contractInfo.date
    );
    this.isHabitable = this.getSelectedClaim.lossInfo.isHabitable;
    this.isFemaClaim = this.getSelectedClaim.lossInfo.isFEMA;
    this.lossInfo.desc = this.getSelectedClaim.lossInfo.desc;

    if (this.getSelectedClaim.lossInfo.cause) {
      this.lossInfo.cause = this.getSelectedClaim.lossInfo.cause;
    }
    await this.getSingleClaimDetails(this.selectedClaimId).then(() => {
      this.policyDate.policyEffectiveDate = this.getSelectedClaim.policyInfo.effectiveDate;
      this.policyDate.policyExpireDate = this.getSelectedClaim.policyInfo.expirationDate;
    });
  },
  methods: {
    ...mapActions([
      'getSingleClaimDetails',
      'getClaimReasons',
      'getLossCauses',
      'editClaimInfo',
      'updateClaimTimeline'
    ]),
    dateToShow,
    validateDate,

    onClickEditClaimTimeline(index) {
      this.claimPhase.notes = this.getSelectedClaim.phases[index].value;
      this.claimPhase.created = dateToShow(
        this.getSelectedClaim.phases[index].created
      );
      this.phase = this.getSelectedClaim.phases[index].value;
      this.editClaimTimeline = true;
    },
    dateLiesBetween(val) {
      if (validateDate(val)) {
        if (Date.parse(val) < Date.parse(this.policyDate.policyEffectiveDate)) {
          return 'Date is before policy effective date';
        } else if (
          Date.parse(val) > Date.parse(this.policyDate.policyExpireDate)
        ) {
          return 'Date is after policy expiry date';
        } else {
          return true;
        }
      } else {
        return 'Invalid date';
      }
    },
    onEditClaimSummary() {
      this.claimSummary = true;
      this.lossInfo.reasonClaim.id = this.getSelectedClaim.lossInfo.claimReason.id;
      this.lossInfo.reasonClaim.value = this.getSelectedClaim.lossInfo.claimReason.value;
      this.lossInfo.reasonClaim.machineValue = this.getSelectedClaim.lossInfo.claimReason.machineValue;
      this.policyInfo.dateOfFirstContact = dateToShow(
        this.getSelectedClaim.contractInfo.dateOfFirstContact
      );

      this.contractInfo.fees.rate = this.getSelectedClaim.contractInfo.fees.rate;
      this.contractInfo.fees.type = this.getSelectedClaim.contractInfo.fees.type;
    },
    searchFilterBy(val, update) {
      this.lossInfo.reasonClaim.id = null;
      if (val === ' ') {
        update(() => {
          this.claimReasonOptions = this.claimReasons;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.claimReasonOptions = this.claimReasons.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
    },
    setTypes(types, data) {
      const obj = types.find(item => {
        return item.id === data.id;
      });

      data.machineValue = obj.machineValue;
      data.value = obj.name;
    },
    setClaimReasons(types, data) {
      const obj = types.find(item => {
        return item.value === data.name;
      });

      data.machineValue = obj.machineValue;
      data.id = obj.name;
    },

    async onSaveButtonClick(value) {
      if (value == 'claimSummary') {
        let payload = {
          id: this.selectedClaimId,
          data: {
            fileNumber: this.fileNumber,
            contractInfo: this.contractInfo,
            policyInfo: this.policyInfo,
            lossInfo: {
              claimReason: {
                id: this.lossInfo.reasonClaim.id,
                value: this.lossInfo.reasonClaim.value,
                machineValue: this.lossInfo.reasonClaim.machineValue
              }
            }
          }
        };
        await this.editClaimInfo(payload);
      } else if (value == 'editClaimTimeline') {
        let payload = {
          id: this.selectedClaimId,
          phase: this.phase,
          data: {
            phase: {
              note: this.claimPhase.notes,
              created: dateToSend(this.claimPhase.created)
            }
          }
        };
        await this.updateClaimTimeline(payload);
        await this.getSingleClaimDetails(this.selectedClaimId);
        this.editClaimTimeline = false;
      } else {
        let payload = {
          id: this.selectedClaimId,
          data: { lossInfo: this.lossInfo }
        };
        if (!this.lossInfo.estimatedLossAmt && !this.lossInfo.propertyValue) {
          delete payload.data.lossInfo.estimatedLossAmt;
          delete payload.data.lossInfo.propertyValue;
        }
        await this.editClaimInfo(payload);
      }
      await this.getSingleClaimDetails(this.selectedClaimId);
      this[value] = false;
    },
    lossDateOption(dateopn) {
      if (
        date.formatDate(Date.now(), 'YYYY/MM/DD') <
        date.formatDate(this.policyDate.policyExpireDate, 'YYYY/MM/DD')
      ) {
        return (
          dateopn >=
            date.formatDate(
              this.policyDate.policyEffectiveDate,
              'YYYY/MM/DD'
            ) && dateopn <= date.formatDate(Date.now(), 'YYYY/MM/DD')
        );
      } else {
        return (
          dateopn >=
            date.formatDate(
              this.policyDate.policyEffectiveDate,
              'YYYY/MM/DD'
            ) &&
          dateopn <=
            date.formatDate(this.policyDate.policyExpireDate, 'YYYY/MM/DD')
        );
      }
    },
    setTypes(data) {
      const obj = this.lossCauses.find(item => {
        return item.id === data;
      });
      this.lossInfo.cause.id = obj.id;
      this.lossInfo.cause.machineValue = obj.machineValue;
      this.lossInfo.cause.value = obj.name;
    },
    onClickUploadDocument() {
      this.$router.push('/document-upload');
    }
  }
};
</script>
