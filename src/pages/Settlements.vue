<template>
  <q-page>
    <div v-if="settlement.attributes">
      <div class="actions-div">
        <q-separator vertical inset></q-separator>
        <q-btn @click="onClickAddButton" flat class="q-ml-auto"
          ><img src="~assets/add.svg"
        /></q-btn>
      </div>
      <div class="mobile-container-page">
        <div class="row justify-between  ">
          <div class="form-heading q-ml-md">Total net Claimed</div>

          <div>
            <q-icon
              class="q-mt-md q-mr-md"
              name="edit"
              size="sm"
              color="primary"
              @click="editTotalTopFields"
            />
          </div>
        </div>
        <div class="q-ml-lg" v-if="edit == false">
          $ {{ settlement.attributes.totalNetClaimed }}
        </div>
        <div class="q-ml-lg" v-if="edit == true">
          <q-input
            class="q-mr-xl"
            style="width:70px"
            v-model="totalNetClaimed"
          ></q-input>
        </div>

        <div class="form-heading q-ml-md">Total replacement Cost</div>
        <div class="q-ml-lg" v-if="edit == false">
          $ {{ settlement.attributes.totalReplCost }}
        </div>
        <div class="q-ml-lg" v-if="edit == true">
          <q-input style="width:70px" v-model="totalReplacementCost"></q-input>
        </div>

        <div class="form-heading q-ml-md">Initial Offer</div>
        <div class=" q-ml-lg" v-if="edit == false">
          $ {{ settlement.attributes.intialOffer }}
        </div>
        <div class="row justify-between q-mr-lg">
          <div class="q-ml-lg" v-if="edit == true">
            <q-input style="width:70px" v-model="initialCost"></q-input>
          </div>
          <div class="q-ml-lg" v-if="edit == true">
            <!-- @click and then send the 3 data edit api -->
            <q-btn label="Save" color="primary"></q-btn>
          </div>
        </div>

        <div class="mobile-container-page ">
          <div
            class="q-ma-sm  "
            v-for="(settlement, index) in settlement.attributes.settlements"
          >
            <q-card flat bordered class="client-list-item q-mt-md ">
              <div class="row justify-right  q-my-md">
                <div class="col-11 text-center  text-h6">
                  $ {{ settlement.amounts.netSettlement }}
                </div>

                <div>
                  <q-icon
                    class="q-my-auto "
                    name="edit"
                    size="sm"
                    color="primary"
                    @click="onClickEdit(index)"
                  />
                </div>
              </div>
              <div class="row justify-between  q-px-md q-my-md">
                <div>{{ settlement.description.value }}</div>

                <div>
                  <q-badge color="primary"> {{ settlement.status }}</q-badge>
                </div>
              </div>
              <q-separator />
              <div class="row justify-between q-my-md q-px-md ">
                <div class="">Replacement Cost</div>

                <div>
                  {{ settlement.amounts.replacementCost }}
                </div>
              </div>
              <div class="row justify-between q-px-md q-my-md">
                <div>Recoverable</div>

                <div>- {{ settlement.amounts.recoverable }}</div>
              </div>
              <div class="row justify-between q-px-md q-my-md">
                <div>Non-Recoverable</div>

                <div>- {{ settlement.amounts.nonRecoverable }}</div>
              </div>
              <q-separator />
              <div class="row justify-between q-my-md q-px-md ">
                <div>Actual Cash Value</div>

                <div>
                  {{ settlement.amounts.actualCash }}
                </div>
              </div>
              <div class="row justify-between  q-my-md q-px-md">
                <div>Deductable Applied</div>

                <div>- {{ settlement.amounts.deductibleApplied }}</div>
              </div>
              <div class="row justify-between q-my-md q-px-md ">
                <div>Prior Payment Applied</div>

                <div>-{{ settlement.amounts.priorPayment }}</div>
              </div>
              <q-separator class="bg-dark " />
              <div class="row justify-between q-my-md q-px-md ">
                <div>Net Settlement</div>

                <div>
                  {{ settlement.amounts.netSettlement }}
                </div>
              </div>
            </q-card>
          </div>
          <q-separator />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="actions-div">
        <q-separator vertical inset></q-separator>
        <q-btn @click="onClickAddButton" flat class="q-ml-auto"
          ><img src="~assets/add.svg"
        /></q-btn>
      </div>
      <div class="absolute-center">
        You Dont Have Any Settlements !
        <img
          src="~assets/add.svg"
          alt="add_icon"
          width="80px"
          height="80px"
          style="margin-left:55px;"
          @click="onClickAddButton"
          class="q-mb-auto q-mx-auto q-mt-sm"
        />
      </div>
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
                  v-model.number="actualValue"
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
                  v-model.number="netSettlement"
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
                  v-model.number="totalSettlement"
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
                <div>
                  <q-toggle v-model="isProofOfLossReq" />
                </div>
              </div>
              <div v-if="isProofOfLossReq">
                <div class="row q-mt-md q-px-lg justify-between">
                  <div class="col-5">Pol Date requested</div>
                  <div class="col-5">Pol Date Due</div>
                </div>
                <div class="row q-px-lg justify-between">
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

import { validateDate } from '@utils/validation';
import { dateToSend } from '@utils/date';
import { date } from 'quasar';

export default {
  name: 'Settlements',

  components: { CustomBar },
  data() {
    return {
      totalReplacementCost: '',
      initialCost: '',
      totalNetClaimed: '',
      edit: false,
      totalNetValue: '',
      setId: '',
      ecValue: '',
      buttonGroup: null,
      description: {
        value: '',
        id: '',
        machineValue: ''
      },
      option: '',
      settlementDialog: false,
      isFinal: false,
      actualValue: null,
      netSettlement: null,
      totalSettlement: null,

      amounts: {
        replacementCost: null,
        recoverable: null,
        nonRecoverable: null,

        otherAdjustment: null,
        deductibleApplied: null,

        policyLimit: null,
        priorPayment: null,

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
    if (this.selectedClaimId) {
      this.getSettlementTypes();
      await this.getSettlements(this.selectedClaimId);
    } else {
      this.$router.push('/clients');
    }

    this.getPolicyCategory();
    this.getPolicyTypes();
    this.getSettlementTypes();
    this.totalNetValue = this.settlement.attributes.totalNetClaimed;
    this.totalReplacementCost = this.settlement.attributes.totalReplCost;
    this.initialCost = this.settlement.attributes.intialOffer;
    this.totalNetClaimed = this.settlement.attributes.totalNetClaimed;
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
      'editSettlement'
    ]),
    onClickAddButton() {
      this.ecValue = false;
      (this.description = {
        value: '',
        id: '',
        machineValue: ''
      }),
        (this.amounts = {
          replacementCost: null,
          recoverable: null,
          nonRecoverable: null,

          otherAdjustment: null,
          deductibleApplied: null,

          policyLimit: null,
          priorPayment: null,

          otherAdjustmentDesc: 'Side settlement'
        }),
        (this.buttonGroup = null);
      this.isFinal = false;
      this.offeredDate = '';
      this.paymentExpDate = '';
      this.notes = '';
      this.isProofOfLossReq = false;
      this.proofOfLossInfo = {
        reqDate: '',
        dueDate: '',
        sentClientDate: '',
        recvClientDate: '',
        sentCarrierDate: '',
        resRecvDate: ''
      };
      this.actualValue = '';
      this.settlementDialog = true;
    },
    onClickEdit(val) {
      this.settlementDialog = true;
      this.ecValue = true;
      //here we have to add id which is currently not coming!

      this.setId = this.settlement.attributes.claimID;

      this.description = this.settlement.attributes.settlements[
        val
      ].description;
      this.amounts = this.settlement.attributes.settlements[val].amounts;
      this.buttonGroup = this.settlement.attributes.settlements[val].isAccepted;

      this.isFinal = this.settlement.attributes.settlements[val].isFinal;
      this.offeredDate = this.settlement.attributes.settlements[
        val
      ].offeredDate;
      this.paymentExpDate = this.settlement.attributes.settlements[
        val
      ].paymentExpDate;
      this.notes = this.settlement.attributes.settlements[val].notes;
      this.isProofOfLossReq = this.settlement.attributes.settlements[
        val
      ].isProofOfLossReq;
      this.proofOfLossInfo = this.settlement.attributes.settlements[
        val
      ].proofOfLossInfo;
    },
    setTypes(data) {
      const obj = data.find(item => {
        return item.id === this.description.id;
      });

      this.description.value = obj.value;
      this.description.machineValue = obj.machineValue;
    },

    closeTimeDialog() {
      this.$refs.qTimeProxy.hide();
    },
    onInput(val) {
      this.actualValue =
        this.amounts.replacementCost -
        this.amounts.recoverable -
        this.amounts.nonRecoverable;
      this.netSettlement =
        this.actualValue -
        this.amounts.otherAdjustment -
        this.amounts.deductibleApplied;
      this.totalSettlement =
        this.netSettlement -
        this.amounts.policyLimit -
        this.amounts.priorPayment;
    },
    validateDate,
    editTotalTopFields() {
      if (this.edit == false) {
        this.edit = true;
      } else {
        this.edit = false;
      }
    },
    async onSaveButtonClick() {
      let success = false;
      success = await this.$refs.settlementForm.validate();

      const payload = {
        id: this.selectedClaimId,
        setId: this.setId,
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
      if (this.ecValue == true) {
        this.editSettlement(payload);
      } else {
        await this.addSettlement(payload);
      }

      this.settlementDialog = false;
      this.getSettlements(this.selectedClaimId);
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
  padding: 5px;
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
