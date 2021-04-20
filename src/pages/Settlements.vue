<template>
  <q-page>
    <div v-if="settlement.attributes">
      <div class="actions-div">
        <q-btn @click="onClickAddButton" flat class="q-ml-auto"
          ><img src="~assets/addSettlement.svg"
        /></q-btn>
      </div>
      <div class="mobile-container-page">
        <ClaimDetail />

        <div class="q-mx-md">
          <q-separator class="q-my-sm" />
          <div class="row q-py-sm">
            <div class="q-ml-sm heading-light col-5">Total net Claimed</div>
            <div class="col-3" style="margin-left: 7.5%">$</div>
            <div class="q-ml-lg text-bold">
              {{ settlement.attributes.totalNetClaimed }}
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="heading-light q-ml-sm col-5">
              Total replacement Cost
            </div>
            <div class="col-3" style="margin-left: 7.5%">$</div>
            <div class="q-ml-lg text-bold">
              {{ settlement.attributes.totalReplCost }}
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="heading-light q-ml-sm col-5">Initial Offer</div>
            <div class="col-3" style="margin-left: 7.5%">$</div>
            <div class="q-ml-lg text-bold">
              {{ settlement.attributes.intialOffer }}
            </div>
          </div>
          <q-separator class="q-my-sm" />
        </div>
        <!-- card -working -->
        <div>
          <div
            class="q-ma-sm"
            v-for="(settlement, index) in settlement.attributes.settlements"
          >
            <q-card class="q-mt-md">
              <div class="row q-pa-md justify-between">
                <div>
                  <q-badge
                    class="q-pa-sm"
                    :color="
                      settlement.status == 'Accepted'
                        ? 'green'
                        : settlement.status == 'Rejected'
                        ? 'primary'
                        : 'grey'
                    "
                  >
                    {{ settlement.status }}</q-badge
                  >
                </div>
                <div class="heading-light">
                  {{ settlement.description.value }}
                </div>

                <div>
                  <q-icon
                    class="q-my-auto"
                    name="edit"
                    size="sm"
                    color="primary"
                    @click="onClickEdit(index, 'show')"
                  />
                  <q-icon
                    class="q-ml-xs"
                    name="delete"
                    size="sm"
                    color="primary"
                  />
                </div>
              </div>
              <div class="q-mx-md">
                <div class="row">
                  <div class="heading-light col-6">Replacement Cost</div>
                  <div class="heading-light col-4">$</div>

                  <div class="text-bold">
                    {{ settlement.amounts.replacementCost }}
                  </div>
                </div>
                <div class="row q-py-lg">
                  <div class="heading-light col-6">Net Settlement</div>
                  <div class="heading-light col-4">$</div>

                  <div class="text-bold">
                    {{ settlement.amounts.netSettlement }}
                  </div>
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
          style="margin-left: 55px"
          @click="onClickAddButton"
          class="q-mb-auto q-mx-auto q-mt-sm"
        />
      </div>
    </div>
    <!-- This Dialog box is for editing the Data of settlements -->
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
        <div class="q-ma-sm mobile-container-page-without-search">
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
              <div class="q-pl-md q-mt-md">Accepted or Rejected</div>
              <div class="row justify-center">
                <q-btn-toggle
                  class="q-my-sm q-mr-sm"
                  v-model="buttonGroup"
                  glossy
                  size="md"
                  toggle-color="primary"
                  :options="[
                    { label: ' Accepted', value: true },
                    { label: 'Rejected', value: false },
                    { label: 'Pending', value: null }
                  ]"
                />
              </div>
            </q-card>
            <!-- 2nd Card -->
            <q-card class="q-pa-md q-mt-sm" flat bordered>
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
                  @input="onChangeValueCalculation()"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="col-5">Recoverable </span>
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
                  @input="onChangeValueCalculation(amounts.replacementCost)"
                />
              </div>
              <div class="row">
                <div class="col-5 q-pt-sm">Non Recoverable</div>
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
                  @input="onChangeValueCalculation(amounts.replacementCost)"
                />
              </div>

              <div class="row" style="align-items: center">
                <span class="col-5 text-bold">Actual Cash Value</span>
                <span>=</span>
                <q-input
                  dense
                  v-model.number="actualValue"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%; font-size: 19px"
                  prefix="$"
                  borderless
                  class="q-py-sm"
                  @input="onChangeValueCalculation()"
                />
              </div>

              <div class="row" style="align-items: center">
                <span class="col-5">Other Adjustment</span>
                <span>+</span>
                <q-input
                  dense
                  v-model.number="amounts.otherAdjustment"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onChangeValueCalculation()"
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
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onChangeValueCalculation()"
                />
              </div>

              <div class="row" style="align-items: center">
                <span class="col-5 text-bold">Net Settlement </span>
                <span>=</span>
                <q-input
                  dense
                  borderless
                  v-model.number="netSettlement"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%; font-size: 19px"
                  prefix="$"
                  class="q-py-sm"
                  @input="onChangeValueCalculation()"
                />
              </div>

              <div class="row" style="align-items: center">
                <span class="col-5">Amt. Over Policy Limit </span>
                <span>-</span>
                <q-input
                  dense
                  v-model.number="amounts.policyLimit"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onChangeValueCalculation()"
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
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onChangeValueCalculation()"
                />
              </div>

              <div class="row" style="align-items: center">
                <span class="col-5 text-bold">Total Settlement </span>
                <span>=</span>
                <q-input
                  dense
                  v-model.number="totalSettlement"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%; font-size: 19px"
                  prefix="$"
                  class="q-py-sm"
                  borderless
                />
              </div>
            </q-card>
            <q-card flat bordered class="q-mt-md">
              <q-input
                v-model="offeredDate"
                class="q-px-lg q-my-sm"
                mask="##/##/####"
                label="Date Offered"
                lazy-rules
                @input="closeTimeDialog()"
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
                class="q-px-lg q-my-sm"
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

              <div class="row q-px-lg q-py-sm justify-between">
                <div class="q-mt-sm text-bold">Pol required</div>
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
                  <div class="col-5">
                    <q-input
                      v-model="proofOfLossInfo.reqDate"
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
                <div class="row q-px-lg q-mt-sm justify-between">
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
                <div class="row q-px-lg q-mt-sm justify-between">
                  <div class="col-5">Pol Date Send to Carrier</div>
                  <div class="col-5">Date Responce Rec'd</div>
                </div>
                <div class="row q-px-lg justify-between">
                  <div class="col-5">
                    <q-input
                      v-model="proofOfLossInfo.sentCarrierDate"
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
                  <div class="col-5">
                    <q-input
                      v-model="proofOfLossInfo.resRecvDate"
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
                  placeholder=" Additional Notes"
                  class="full-width"
                  style="resize: none"
                />
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
    <!-- This Dialog Box is Only For Showing Data Not Editing -->
    <q-dialog
      v-model="settlementShowDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="settlementShowDialog = false"
          :dialogName="'Settlements'"
        />
        <div class="q-ma-sm mobile-container-page-without-search">
          <q-form ref="settlementForm" class="form-height">
            <!-- 2nd Card -->
            <q-card class="q-pa-md q-mt-sm" flat bordered>
              <div class="row q-pa-md justify-between">
                <div>
                  <q-badge
                    class="q-pa-sm"
                    :color="
                      status == 'Accepted'
                        ? 'green'
                        : status == 'Rejected'
                        ? 'primary'
                        : 'grey'
                    "
                  >
                    {{ status }}</q-badge
                  >
                </div>

                <div>
                  <q-icon
                    class="q-my-auto"
                    name="edit"
                    size="sm"
                    color="primary"
                    @click="onClickEdit(currentIndex, 'edit')"
                  />
                  <q-icon
                    class="q-ml-xs"
                    name="delete"
                    size="sm"
                    color="primary"
                  />
                </div>
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Replacement Cost</span>

                <q-input
                  dense
                  disable
                  v-model.number="amounts.replacementCost"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  @input="onChangeValueCalculation()"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="col-5 heading-light">Recoverable </span>
                <span>-</span>

                <q-input
                  dense
                  v-model.number="amounts.recoverable"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  disable
                  class="input-extra-padding"
                  @input="onChangeValueCalculation(amounts.replacementCost)"
                />
              </div>
              <div class="row">
                <div class="col-5 q-pt-sm heading-light">Non Recoverable</div>
                <div class="q-pt-sm">-</div>
                <q-input
                  v-model.number="amounts.nonRecoverable"
                  dense
                  mask="#.#"
                  type="number"
                  disable
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  borderless
                  @input="onChangeValueCalculation(amounts.replacementCost)"
                />
                <q-separator />
              </div>

              <div class="row" style="align-items: center">
                <span class="col-5 text-bold">Actual Cash Value</span>
                <span>=</span>
                <q-input
                  dense
                  v-model.number="actualValue"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%; font-size: 19px"
                  prefix="$"
                  borderless
                  class="q-py-sm"
                  @input="onChangeValueCalculation()"
                />
                <q-separator />
              </div>

              <div class="row q-mt-md" style="align-items: center">
                <span class="col-5 heading-light">Other Adjustment</span>
                <span>+</span>
                <q-input
                  dense
                  v-model.number="amounts.otherAdjustment"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  disable
                  class="input-extra-padding"
                  @input="onChangeValueCalculation()"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="col-5 heading-light">Deductible Applied</span>
                <span class="">-</span>
                <q-input
                  dense
                  v-model.number="amounts.deductibleApplied"
                  mask="#.#"
                  type="number"
                  disable
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  borderless
                  @input="onChangeValueCalculation()"
                />
                <q-separator />
              </div>

              <div class="row" style="align-items: center">
                <span class="col-5 text-bold">Net Settlement </span>
                <span>=</span>
                <q-input
                  dense
                  borderless
                  v-model.number="netSettlement"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%; font-size: 19px"
                  prefix="$"
                  class="q-py-sm"
                  @input="onChangeValueCalculation()"
                />
                <q-separator />
              </div>

              <div class="row q-mt-md" style="align-items: center">
                <span class="col-5 heading-light">Amt. Over Policy Limit </span>
                <span>-</span>
                <q-input
                  dense
                  v-model.number="amounts.policyLimit"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  disable
                  class="input-extra-padding"
                  @input="onChangeValueCalculation()"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="col-5 heading-light">Prior Payment </span>
                <span>-</span>
                <q-input
                  dense
                  v-model.number="amounts.priorPayment"
                  mask="#.#"
                  type="number"
                  disable
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                  borderless
                  @input="onChangeValueCalculation()"
                />
                <q-separator />
              </div>

              <div class="row" style="align-items: center">
                <span class="col-5 text-bold">Total Settlement </span>
                <span>=</span>
                <q-input
                  dense
                  v-model.number="totalSettlement"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%; font-size: 19px"
                  prefix="$"
                  class="q-py-sm"
                  borderless
                />
                <q-separator />
              </div>
            </q-card>
            <div class="q-mt-md">
              <div class="heading-light row justify-between q-py-sm q-px-lg">
                <div>Offered Date</div>
                <div>Payment Expected</div>
              </div>
              <div class="row justify-between">
                <q-input
                  disable
                  v-model="offeredDate"
                  class="q-px-lg q-my-sm col-5"
                  mask="##/##/####"
                  label="Date Offered"
                  lazy-rules
                  @input="closeTimeDialog()"
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
                  disable
                  v-model="paymentExpDate"
                  class="q-px-lg q-my-sm col-5"
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
              </div>
              <div v-if="isProofOfLossReq">
                <div class="row q-mt-md q-px-lg justify-between">
                  <div class="col-5">Pol Date requested</div>
                  <div class="col-5">Pol Date Due</div>
                </div>
                <div class="row q-px-lg justify-between">
                  <div class="col-5">
                    <q-input
                      disable
                      v-model="proofOfLossInfo.reqDate"
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
                      disable
                      v-model="proofOfLossInfo.dueDate"
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
                <div class="row q-px-lg q-mt-sm justify-between">
                  <div class="col-5">Date send to client</div>
                  <div class="col-5">Date Rec'd from Client</div>
                </div>
                <div class="row q-px-lg justify-between">
                  <div class="col-5">
                    <q-input
                      disable
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
                      disable
                      v-model="proofOfLossInfo.recvClientDate"
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
                <div class="row q-px-lg q-mt-sm justify-between">
                  <div class="col-5">Pol Date Send to Carrier</div>
                  <div class="col-5">Date Responce Rec'd</div>
                </div>
                <div class="row q-px-lg justify-between">
                  <div class="col-5">
                    <q-input
                      disable
                      v-model="proofOfLossInfo.sentCarrierDate"
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
                  <div class="col-5">
                    <q-input
                      disable
                      v-model="proofOfLossInfo.resRecvDate"
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
            </div>
          </q-form>
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
import { dateToSend, dateToShow } from '@utils/date';
import { date } from 'quasar';
import { log } from 'src/store/claims/getters';
import ClaimDetail from 'components/ClaimDetail';

export default {
  name: 'Settlements',

  components: { CustomBar, ClaimDetail },
  data() {
    return {
      status: '',
      currentIndex: '',
      settlementShowDialog: false,
      totalReplacementCost: '',
      initialCost: '',
      totalNetClaimed: '',
      edit: false,
      totalNetValue: '',
      setId: '',
      isEdit: '',
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
      this.isEdit = false;
      this.description = {
        value: '',
        id: '',
        machineValue: ''
      };
      this.amounts = {
        replacementCost: null,
        recoverable: null,
        nonRecoverable: null,

        otherAdjustment: null,
        deductibleApplied: null,

        policyLimit: null,
        priorPayment: null,

        otherAdjustmentDesc: 'Side settlement'
      };
      this.netSettlement = '';
      this.actualValue = '';
      this.totalSettlement = '';
      this.buttonGroup = null;
      this.isFinal = false;
      this.notes = '';
      this.isProofOfLossReq = false;
      this.actualValue = '';
      this.offeredDate = this.paymentExpDate = this.proofOfLossInfo.reqDate = this.proofOfLossInfo.dueDate = this.proofOfLossInfo.resRecvDate = this.proofOfLossInfo.sentClientDate = this.proofOfLossInfo.recvClientDate = this.proofOfLossInfo.sentCarrierDate = date.formatDate(
        Date.now(),
        'MM/DD/YYYY'
      );
      this.settlementDialog = true;
    },
    onClickEdit(val, dialogName) {
      this.currentIndex = val;
      this.isEdit = true;
      this.setId = this.settlement.attributes.settlements[val].id;
      // this.settlementDialog = true;
      this.status = this.settlement.attributes.settlements[val].status;
      this.description = this.settlement.attributes.settlements[
        val
      ].description;
      this.amounts = this.settlement.attributes.settlements[val].amounts;
      this.totalSettlement = this.settlement.attributes.settlements[
        val
      ].amounts.totalSettlement;
      this.actualValue = this.settlement.attributes.settlements[
        val
      ].amounts.actualCash;
      this.netSettlement = this.settlement.attributes.settlements[
        val
      ].amounts.netSettlement;
      this.buttonGroup = this.settlement.attributes.settlements[val].isAccepted;

      this.isFinal = this.settlement.attributes.settlements[val].isFinal;
      this.offeredDate = dateToShow(
        this.settlement.attributes.settlements[val].offeredDate
      );
      this.paymentExpDate = dateToShow(
        this.settlement.attributes.settlements[val].paymentExpDate
      );
      this.notes = this.settlement.attributes.settlements[val].notes;
      this.isProofOfLossReq = this.settlement.attributes.settlements[
        val
      ].isProofOfLossReq;
      if (this.isProofOfLossReq) {
        this.proofOfLossInfo.reqDate = dateToShow(
          this.settlement.attributes.settlements[val].proofOfLossInfo.reqDate
        );

        this.proofOfLossInfo.dueDate = dateToShow(
          this.settlement.attributes.settlements[val].proofOfLossInfo.dueDate
        );

        this.proofOfLossInfo.resRecvDate = dateToShow(
          this.settlement.attributes.settlements[val].proofOfLossInfo
            .resRecvDate
        );

        this.proofOfLossInfo.sentClientDate = dateToShow(
          this.settlement.attributes.settlements[val].proofOfLossInfo
            .sentClientDate
        );

        this.proofOfLossInfo.recvClientDate = dateToShow(
          this.settlement.attributes.settlements[val].proofOfLossInfo
            .recvClientDate
        );

        this.proofOfLossInfo.sentCarrierDate = dateToShow(
          this.settlement.attributes.settlements[val].proofOfLossInfo
            .sentCarrierDate
        );
      }
      if (dialogName == 'show') {
        this.settlementShowDialog = true;
      } else {
        this.settlementDialog = true;
      }
    },
    // Setting data for dropDown
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
    onChangeValueCalculation(val) {
      this.actualValue =
        this.amounts.replacementCost -
        this.amounts.recoverable -
        this.amounts.nonRecoverable;
      this.netSettlement =
        this.actualValue +
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
      if (this.isEdit == true) {
        await this.editSettlement(payload);
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
