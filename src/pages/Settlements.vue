<template>
  <q-page>
    <div class="mobile-container-page ">
      <div
        class="client-list-item q-ma-sm  "
        v-for="(settlement, index) in settlement"
      >
        <div class="row justify-between">
          <div class=" text-bold">Settlement Details</div>

          <div>
            <q-icon
              class="q-my-auto "
              name="edit"
              size="sm"
              color="primary"
              @click="settlementDialog = true"
            />
          </div>
        </div>

        <div class="form-heading">Description</div>
        <div class="q-pl-md">
          {{ settlement.attributes.description.machineValue }}
        </div>

        <div class="form-heading">Is Accepted</div>
        <div class="q-pl-md">{{ settlement.attributes.isAccepted }}</div>

        <div class="form-heading">Replacement Cost</div>
        <div class="q-pl-md">
          {{ settlement.attributes.amounts.replacementCost }}
        </div>
        <div class="form-heading">Replacement Cost</div>
        <div class="q-pl-md">
          {{ settlement.attributes.amounts.nonRecoverable }}
        </div>
      </div>
      <q-separator />
    </div>
    <q-dialog
      v-model="settlementDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="settlementDialog = false"
          :dialogName="'Settlements'"
        />
        <div class="q-ma-sm  mobile-container-page-without-search">
          <q-form ref="settlementForm" class="form-height">
            <q-card flat bordered>
              <q-select
                v-model="description.id"
                class="q-pa-md"
                option-label="value"
                option-value="id"
                :options="settlementType"
                label="Settlement Description"
                options-dense
                map-options
                behavior="menu"
                emit-value
                @input="setTypes(settlementType)"
              />
              <div class="row q-pa-md justify-between">
                <div class="q-mt-sm">Final Settlement</div>
                <div class="">
                  <q-toggle class="" v-model="isFinal" />
                </div>
              </div>

              <div class="row justify-between ">
                <div class="q-pl-md q-my-md">Accepted or Rejected</div>
                <q-btn-toggle
                  class="q-my-sm q-mr-sm"
                  v-model="buttonGroup"
                  glossy
                  toggle-color="primary"
                  :options="[
                    { label: ' Accepted', value: true },
                    { label: 'Rejected', value: false }
                  ]"
                ></q-btn-toggle>
              </div>
            </q-card>
            <!-- 2nd Card -->
            <q-card class=" q-pa-md q-mt-sm" flat bordered>
              <div class="form-heading">Accepted or Rejected</div>
              <div class="row" style="align-items: center">
                <span class="">Replacement Cost</span>

                <q-input
                  dense
                  v-model.number="amounts.replacementCost"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onInput()"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class=" col-5">Recoverable </span>
                <span>-</span>

                <q-input
                  dense
                  v-model.number="amounts.recoverable"
                  mask="#.#"
                  type="number"
                  placeholder=""
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onInput(amounts.replacementCost)"
                />
              </div>
              <div class="row ">
                <div class=" col-5  q-pt-sm">Non Recoverable</div>
                <div class="q-pt-sm">-</div>
                <q-input
                  v-model.number="amounts.nonRecoverable"
                  dense
                  mask="#.#"
                  type="number"
                  placeholder=""
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onInput(amounts.replacementCost)"
                />
              </div>
              <q-separator />
              <div class="row" style="align-items: center">
                <span class="col-5">Actual Cash Value</span>
                <span>=</span>
                <q-input
                  dense
                  v-model.number="amounts.actualValue"
                  mask="#.#"
                  type="number"
                  placeholder=""
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onInput()"
                />
              </div>
              <q-separator />
              <div class="row" style="align-items: center">
                <span class="col-5">Other Adjustment</span>
                <span>-</span>
                <q-input
                  dense
                  v-model.number="amounts.otherAdjustment"
                  mask="#.#"
                  type="number"
                  placeholder=""
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onInput()"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="col-5">Deductible Applied</span>
                <span class="">-</span>
                <q-input
                  dense
                  v-model.number="amounts.deductibleApplied"
                  mask="#.#"
                  type="number"
                  placeholder=""
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onInput()"
                />
              </div>
              <q-separator />
              <div class="row" style="align-items: center">
                <span class="col-5">Net Settlement </span>
                <span>=</span>
                <q-input
                  dense
                  v-model.number="amounts.netSettlement"
                  mask="#.#"
                  type="number"
                  placeholder=""
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onInput()"
                />
              </div>
              <q-separator />
              <div class="row" style="align-items: center">
                <span class="col-5">Amt. Over Policy Limit </span>
                <span>-</span>
                <q-input
                  dense
                  v-model.number="amounts.policyLimit"
                  mask="#.#"
                  type="number"
                  placeholder=""
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onInput()"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="col-5">Prior Payment </span>
                <span>-</span>
                <q-input
                  dense
                  v-model.number="amounts.priorPayment"
                  mask="#.#"
                  type="number"
                  placeholder=""
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onInput()"
                />
              </div>
              <q-separator />
              <div class="row" style="align-items: center">
                <span class="col-5">Total Settlement </span>
                <span>=</span>
                <q-input
                  dense
                  v-model.number="amounts.totalSettlement"
                  mask="#.#"
                  type="number"
                  placeholder=""
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <q-separator />
            </q-card>
            <q-card flat bordered class="q-mt-md">
              <q-input
                v-model="offeredDate"
                class=" q-px-lg q-my-sm"
                mask="##/##/####"
                label="Date Offered"
                lazy-rules
                @input="closeTimeDialog"
              >
                <template v-slot:append>
                  <q-icon
                    name="event"
                    size="sm"
                    color="primary"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      ref="qDateProxy1"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="offeredDate"
                        @input="() => $refs.qDateProxy1.hide()"
                        mask="MM/DD/YYYY"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                v-model="paymentExpDate"
                class=" q-px-lg q-my-sm"
                mask="##/##/####"
                label="Payment Expected Date"
                lazy-rules
                @input="closeTimeDialog"
              >
                <template v-slot:append>
                  <q-icon
                    name="event"
                    size="sm"
                    color="primary"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="paymentExpDate"
                        @input="() => $refs.qDateProxy.hide()"
                        mask="MM/DD/YYYY"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <div class="row q-px-lg justify-between">
                <div class="q-mt-sm q-py-sm">Pol required</div>
                <div class="">
                  <q-toggle class="" v-model="isProofOfLossReq" />
                </div>
              </div>
              <div v-if="isProofOfLossReq">
                <div class="row q-mt-md q-px-lg justify-between">
                  <div class="col-5">Pol Date requested</div>
                  <div class="col-5">Pol Date Due</div>
                </div>
                <div class="row q-px-md justify-between">
                  <div class="col-5 ">
                    <q-input
                      v-model="proofOfLossInfo.reqDate"
                      class="  q-my-sm"
                      mask="##/##/####"
                      label="Pol Date requested"
                      lazy-rules
                      @input="closeTimeDialog"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="event"
                          size="xs"
                          color="primary"
                          class="cursor-pointer"
                        >
                          <q-popup-proxy
                            ref="qDateProxy2"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="proofOfLossInfo.reqDate"
                              @input="() => $refs.qDateProxy2.hide()"
                              mask="MM/DD/YYYY"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <!-- start -->
                  <div class="col-5">
                    <q-input
                      v-model="proofOfLossInfo.dueDate"
                      class="  q-my-sm"
                      mask="##/##/####"
                      label="Pol Date Due"
                      lazy-rules
                      @input="closeTimeDialog"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="event"
                          size="xs"
                          color="primary"
                          class="cursor-pointer"
                        >
                          <q-popup-proxy
                            ref="qDateProxy3"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="proofOfLossInfo.dueDate"
                              @input="() => $refs.qDateProxy3.hide()"
                              mask="MM/DD/YYYY"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row q-px-lg justify-between">
                  <div class="col-5">Date send to client</div>
                  <div class="col-5">Date Rec'd from Client</div>
                </div>
                <div class="row q-px-lg justify-between">
                  <div class="col-5">
                    <q-input
                      v-model="proofOfLossInfo.sentClientDate"
                      mask="##/##/####"
                      label="Date send to client"
                      lazy-rules
                      @input="closeTimeDialog"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="event"
                          size="xs"
                          color="primary"
                          class="cursor-pointer"
                        >
                          <q-popup-proxy
                            ref="qDateProxy4"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="proofOfLossInfo.sentClientDate"
                              @input="() => $refs.qDateProxy4.hide()"
                              mask="MM/DD/YYYY"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-5">
                    <!-- remain -->
                    <q-input
                      v-model="proofOfLossInfo.recvClientDate"
                      class="  q-my-sm"
                      mask="##/##/####"
                      label="Date Rec'd from Client"
                      lazy-rules
                      @input="closeTimeDialog"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="event"
                          size="xs"
                          color="primary"
                          class="cursor-pointer"
                        >
                          <q-popup-proxy
                            ref="qDateProxy7"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="proofOfLossInfo.recvClientDate"
                              @input="() => $refs.qDateProxy7.hide()"
                              mask="MM/DD/YYYY"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row q-px-lg justify-between">
                  <div class="col-5">Pol Date Send to Carrier</div>
                  <div class="col-5 ">Date Responce Rec'd</div>
                </div>
                <div class="row q-px-lg justify-between">
                  <div class="col-5">
                    <q-input
                      v-model="proofOfLossInfo.sentCarrierDate"
                      class="  q-my-sm"
                      mask="##/##/####"
                      label="Pol Date Send to Carrier"
                      lazy-rules
                      @input="closeTimeDialog"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="event"
                          size="xs"
                          color="primary"
                          class="cursor-pointer"
                        >
                          <q-popup-proxy
                            ref="qDateProxy5"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="proofOfLossInfo.sentCarrierDate"
                              @input="() => $refs.qDateProxy5.hide()"
                              mask="MM/DD/YYYY"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-5 ">
                    <q-input
                      v-model="proofOfLossInfo.resRecvDate"
                      class="  q-my-sm"
                      mask="##/##/####"
                      label="Date Responce Rec'd"
                      lazy-rules
                      @input="closeTimeDialog"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="event"
                          size="xs"
                          color="primary"
                          class="cursor-pointer"
                        >
                          <q-popup-proxy
                            ref="qDateProxy6"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="proofOfLossInfo.resRecvDate"
                              @input="() => $refs.qDateProxy6.hide()"
                              mask="MM/DD/YYYY"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>

              <div class="floating-label q-px-md">
                <textarea
                  v-model="notes"
                  rows="5"
                  required
                  placeholder=" Additional Notes"
                  class="full-width"
                  style="resize: none"
                ></textarea>
              </div>
            </q-card>
          </q-form>

          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onSaveButtonClick()"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import moment from 'moment';
import InsuranceInfo from 'components/InsuranceInfo';
import { validateDate } from '@utils/validation';
import { dateToSend } from '@utils/date';
import { date } from 'quasar';

export default {
  name: 'Settlements',

  components: { CustomBar },
  data() {
    return {
      buttonGroup: '',
      description: {
        value: '',
        id: '',
        machineValue: ''
      },
      option: '',
      settlementDialog: false,
      isFinal: false,

      amounts: {
        replacementCost: null,
        recoverable: null,
        nonRecoverable: null,
        actualValue: '',
        otherAdjustment: null,
        deductibleApplied: null,
        netSettlement: null,

        policyLimit: null,
        priorPayment: null,
        totalSettlement: '',
        otherAdjustmentDesc: 'Side settlement'
      },
      notes: '',
      isProofOfLossReq: true,
      offeredDate: '',
      paymentExpDate: '',
      isProofOfLossReq: false,
      proofOfLossInfo: {
        reqDate: '',
        dueDate: '',
        sentClientDate: '',
        recvClientDate: '',
        sentCarrierDate: '',
        resRecvDate: ''
      }
    };
  },

  computed: {
    ...mapGetters([
      'policy',
      'policyTypes',
      'policyCategories',
      'selectedClaimId',
      'settlementType',
      'settlement'
    ]),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  async created() {
    console.log(this.selectedClaimId);
    if (this.selectedClaimId) {
      console.log(this.selectedClaimId, 54);
      this.getSettlementTypes();
      await this.getSettlements(this.selectedClaimId);
    } else {
      this.$router.push('/clients');
    }

    this.getPolicyCategory();
    this.getPolicyTypes();
    this.getSettlementTypes();
  },
  methods: {
    ...mapActions([
      'getPolicy',
      'getPolicyTypes',
      'getPolicyCategory',
      'editInsurancePolicy',
      'getSettlements',
      'getSettlementTypes',
      'addSettlement',
      'getSettlements'
    ]),
    setTypes(data) {
      const obj = data.find(item => {
        return item.id === this.description.id;
      });

      this.description.value = obj.value;
      this.description.machineValue = obj.machineValue;

      console.log(data, this.description);
    },

    closeTimeDialog() {
      this.$refs.qTimeProxy.hide();
    },
    onInput(val) {
      console.log(val);
      this.amounts.actualValue =
        this.amounts.replacementCost -
        this.amounts.recoverable -
        this.amounts.nonRecoverable;
      this.amounts.netSettlement =
        this.amounts.actualValue -
        this.amounts.otherAdjustment -
        this.amounts.deductibleApplied;
      this.amounts.totalSettlement =
        this.amounts.netSettlement -
        this.amounts.policyLimit -
        this.amounts.priorPayment;
    },
    validateDate,
    async onSaveButtonClick() {
      let success = false;
      success = await this.$refs.settlementForm.validate();
      const payload = {
        id: this.selectedClaimId,
        data: {
          description: {
            id: this.description.id,
            value: this.description.value,
            machineValue: this.description.machineValue
          },
          isFinal: this.isFinal,
          isAccepted: this.buttonGroup,
          amounts: {
            replacementCost: this.amounts.replacementCost,
            recoverable: this.amounts.recoverable,
            nonRecoverable: this.amounts.nonRecoverable,
            otherAdjustment: this.amounts.otherAdjustment,
            otherAdjustmentDesc: 'Side settlement',
            deductibleApplied: this.amounts.deductibleApplied,
            policyLimit: this.amounts.policyLimit,
            priorPayment: this.amounts.priorPayment
          },
          offeredDate: dateToSend(this.offeredDate),
          paymentExpDate: dateToSend(this.paymentExpDate),
          isProofOfLossReq: this.isProofOfLossReq,

          proofOfLossInfo:
            this.isProofOfLossReq == true
              ? {
                  reqDate: dateToSend(this.proofOfLossInfo.reqDate),
                  dueDate: dateToSend(this.proofOfLossInfo.dueDate),
                  sentClientDate: dateToSend(
                    this.proofOfLossInfo.sentClientDate
                  ),
                  recvClientDate: dateToSend(
                    this.proofOfLossInfo.recvClientDate
                  ),
                  sentCarrierDate: dateToSend(
                    this.proofOfLossInfo.sentCarrierDate
                  ),
                  resRecvDate: dateToSend(this.proofOfLossInfo.resRecvDate)
                }
              : null,

          notes: this.notes
        }
      };
      console.log(payload, 5654);
      await this.addSettlement(payload);
      this.settlementDialog = false;
    }
  }
};
</script>
<style lang="scss">
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
}
.client-list-item {
  padding: 20px;
  background-color: #f4f4f4;
  text-transform: capitalize;
}
.custom-select {
  width: 100%;
  border-bottom: 1px solid #c2c2c2;
  margin-bottom: 20px;

  .select-text {
    line-height: 24px;
    padding-top: 24px;
    padding-bottom: 8px;
    height: 50px;
  }
}
.form-height {
  height: calc(100vh - 120px);
  overflow: auto;
  margin: 10px;
}
</style>
