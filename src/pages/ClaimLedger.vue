<template>
  <div>
    <div>
      <div>
        <div class="q-mx-md">
          <div class="row q-py-sm">
            <div class="col-6 heading-light">Total Payment</div>

            <div class="col row justify-between q-ml-auto ">
              <div class="heading-light">$</div>
              {{ account.totalPayment }}
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-6 heading-light">Outstanding Expenses</div>

            <div class="col row justify-between q-ml-auto ">
              <div class="heading-light">$</div>
              {{ account.totalExpense }}
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-6 heading-light ">
              Outstanding on Claim
            </div>
            <div class="col row justify-between q-ml-auto ">
              <span class="heading-light">$</span>
              {{ account.totalReplCost }}
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-6 heading-light ">
              Waiting Disbursement
            </div>

            <div class="col row justify-between q-ml-auto ">
              <span class="heading-light">$</span>
            </div>
            {{ account.pendingDisbursement }}
          </div>
          <div class="text-center q-my-xs heading-light ">
            Accepted Settlements
          </div>

          <q-card class="q-my-sm" v-for="settlement in account.settlements">
            <div class="row q-px-md q-pt-xs justify-center">
              <div>{{ settlement.desc }}</div>
            </div>
            <div class="row q-px-sm">
              <div class="col-6 heading-light ">
                Net Claimed
              </div>
              <div class="col row justify-between q-ml-auto ">
                <span class="heading-light">$</span>
                {{ settlement.netSettlement }}
              </div>
            </div>
            <div class="row q-px-sm">
              <div class="col-6 heading-light ">
                Total Recieved
              </div>
              <div class="col row justify-between q-ml-auto  ">
                <span class="heading-light">$</span>
                {{ settlement.totalPaid }}
              </div>
            </div>
            <div class="row q-px-sm">
              <div class="col-6 heading-light ">
                Outstanding
              </div>
              <div class="col row justify-between q-ml-auto q-mb-sm">
                <span class="heading-light">$</span>
                {{ settlement.outstanding }}
              </div>
            </div>
          </q-card>
          <q-list>
            <q-expansion-item
              group="Ledger"
              label="Payment"
              header-class="text-primary"
            >
              <div class="heading-light q-ml-sm">
                Payments Issued by Carrier
              </div>
              <!-- <div class="row justify-between q-my-sm">
                <div class="heading-light q-ml-sm">Total Recieved</div>
                <div class="heading-light q-ml-sm">$</div>

                <div class="q-mr-sm">{{ payment.totalReplCost }}</div>
              </div> -->
              <div>
                <div v-if="payment.payments != null">
                  <q-card
                    class="q-pa-sm q-ma-sm"
                    v-for="pay in payment.payments"
                  >
                    <div class="row justify-between">
                      <div class="heading-light">Date</div>
                      <div>{{ pay.receviedDate | moment('MM/DD/YYYY') }}</div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Amount</div>
                      <div>{{ pay.amount }}</div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Reference Number</div>
                      <div>{{ pay.reference }}</div>
                    </div>
                  </q-card>
                </div>
                <div v-else class="text-center heading-light q-my-md">
                  No Payment Is added Yet !
                </div>
              </div>
              <div class="justify-end row q-mr-sm">
                <q-btn
                  @click="addPaymentDialog = true"
                  label="Add Payment"
                  size="xs"
                  class="q-ml-sm"
                  color="primary"
                />
              </div>
            </q-expansion-item>
            <q-expansion-item
              group="Ledger"
              label="Expenses"
              header-class="text-primary"
            >
              <div v-if="expenses.expenses != null">
                <q-card class="q-ma-xs" v-for="expense in expenses.expenses">
                  <div class=" row justify-end">
                    <div class="q-mr-xs">
                      <q-icon
                        name="create"
                        size="xs"
                        color="primary"
                        @click="editExpense(expense)"
                      />
                      <q-icon
                        class="q-mx-xs"
                        name="delete"
                        size="xs"
                        color="primary"
                      />
                    </div>
                  </div>
                  <div class="q-pa-sm">
                    <div class="row q-mt-xs justify-between">
                      <div class="heading-light">Date</div>
                      <div>
                        {{ expense.receviedDate | moment('MM/DD/YYYY') }}
                      </div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Payee</div>
                      <div>{{ expense.amount }}</div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Reference</div>
                      <div>{{ expense.reference }}</div>
                    </div>

                    <div class="row justify-between">
                      <div class="heading-light">Note</div>
                      <div>{{ expense.desc }}</div>
                    </div>
                  </div>
                </q-card>
              </div>
              <div v-else class="text-center heading-light q-my-md">
                No Expense is Added Yet !
              </div>

              <div class=" row justify-end">
                <div class="q-mr-md q-mt-sm">
                  <q-btn
                    size="xs"
                    color="primary"
                    label="Add"
                    @click="addExpensesDialog = true"
                  />
                </div>
              </div>
            </q-expansion-item>
            <q-expansion-item
              group="Ledger"
              label="Disbursement"
              header-class="text-primary"
            >
              {{ disbursements }}
              <div v-if="disbursements.disbursements != null">
                <q-card
                  class="q-pa-sm q-ma-sm"
                  v-for="pay in disbursements.disbursements"
                >
                  <div class="row justify-between">
                    <div class="heading-light">Amount</div>
                    <div>{{ pay.amount }}</div>
                  </div>
                  <div class="row justify-between">
                    <div class="heading-light">Paid To Company</div>
                    <div>{{ pay.paidToCompany }}</div>
                  </div>
                  <div class="row justify-between">
                    <div class="heading-light">Paid To Client</div>
                    <div>{{ pay.paidToClient }}</div>
                  </div>
                </q-card>
              </div>
              <div v-else class="text-center heading-light q-my-md">
                No Disbursement Is added Yet !
              </div>
              <div class=" row justify-end">
                <div class="q-mr-md q-mt-sm">
                  <q-btn
                    size="xs"
                    color="primary"
                    label="Add Disbursement"
                    @click="openDisbursementBox"
                  />
                </div>
              </div>
            </q-expansion-item>
          </q-list>

          <q-separator class="q-my-sm" />
        </div>
      </div>
    </div>
    <!-- Add Estimator Dialog  -->
    <q-dialog
      v-model="addPaymentDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="addPaymentDialog = false"
          :dialogName="'Add Claim Payment '"
        />
        <div class="q-ma-sm mobile-container-page listing-height">
          <q-form>
            <div class="row" style="align-items: center">
              <span class="">Recieved Date</span>

              <q-input
                dense
                v-model="payments.date"
                mask="##/##/####"
                label="DD/MM/YYYY"
                style="margin-left: auto; width: 50%"
                lazy-rules
                class="required"
                :rules="[
                  val =>
                    (val && val.length > 0 && validateDate(val)) ||
                    'Invalid date!'
                ]"
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
                        v-model="payments.date"
                        mask="MM/DD/YYYY"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="row" style="align-items: center">
              <span class="">Amount Of Payment</span>

              <q-input
                dense
                v-model.number="payments.amountsOfPayment"
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div>
            <div class="row" style="align-items: center">
              <span class="">Check Reference #</span>

              <q-input
                dense
                v-model="payments.checkReference"
                style="margin-left: auto; width: 50%"
                class="input-extra-padding"
              />
            </div>
            <div style="border-style: ridge ">
              <div class=" q-mt-sm row justify-between">
                <span class="col-7 q-pt-xs q-ml-md">Settlements</span>
                <span class="col-4">Amounts</span>
              </div>

              <div class="q-pa-sm " v-if="showValue">
                <div
                  class=" justify-between"
                  v-for="(settlement, index) in account.settlements"
                >
                  <div class=" col-6 q-mt-md">
                    {{ index + 1 }}.
                    <span class="">{{ settlement.desc }}</span>
                  </div>
                  <div class=" q-mx-md row justify-between" style="">
                    <span class="">Net Settlement</span>
                    <span class="">{{ settlement.netSettlement }}</span>
                  </div>
                  <div class="q-mx-md  row justify-between" style="">
                    <span class="">Paid To Date</span>
                    <span class="">{{ settlement.totalPaid }}</span>
                  </div>
                  <div class="q-mx-md  row justify-between" style="">
                    <span class="">Outstanding</span>
                    <span class="">{{ settlement.outstanding }}</span>
                  </div>
                  <div class=" q-ml-md  row" style="align-items: center">
                    <span class="">Amt To Apply</span>

                    <q-input
                      dense
                      style="margin-left: auto; width: 20%"
                      v-model.number="payments.settlements[index].amountPaid"
                      prefix="$"
                    />
                  </div>
                  <!-- <div class="col-5"> -->
                  <!-- <q-input
                      dense
                      v-model.number="payments.settlements[index].amountPaid"
                      prefix="$"
                    /> -->
                  <!-- </div> -->
                </div>
              </div>
            </div>

            <!-- <div class="row" style="align-items: center">
              <span class="">Paid to Date</span>

              <q-input
                dense
                v-model.number="payments.paidToDate"
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div> -->
            <!-- <div class="row" style="align-items: center">
              <span class="">Outstanding</span>

              <q-input
                v-model="payments.outstanding"
                dense
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div> -->
            <!-- <div class="row" style="align-items: center">
              <span class="">Aim To Apply</span>

              <q-input
                dense
                v-model="payments.aimToApply"
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div> -->
            <div>Notes</div>
            <textarea v-model="payments.notes" rows="3" class="full-width" />
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          @click="onClickSavePayment"
          size="'xl'"
        />
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="addExpensesDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="addExpensesDialog = false"
          :dialogName="'Add Claim  Expenses'"
        />
        <div class="q-ma-sm mobile-container-page listing-height">
          <q-form>
            <div class="row" style="align-items: center">
              <span class="">Recieved Date</span>

              <q-input
                dense
                v-model="addexpenses.receviedDate"
                mask="##/##/####"
                label="DD/MM/YYYY"
                style="margin-left: auto; width: 50%"
                lazy-rules
                class="required"
                :rules="[
                  val =>
                    (val && val.length > 0 && validateDate(val)) ||
                    'Invalid date!'
                ]"
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
                        v-model="addexpenses.receviedDate"
                        mask="MM/DD/YYYY"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="row" style="align-items: center">
              <span class="">Expense Amount</span>

              <q-input
                dense
                v-model.number="addexpenses.amount"
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div>
            <!-- <div class="row" style="align-items: center">
              <span class=""> Amount Collected</span>

              <q-input
                dense
                v-model="addexpenses.reference"
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                class="input-extra-padding"
              />
            </div> -->

            <div class="row" style="align-items: center">
              <span class=""> Company Fee</span>

              <q-toggle class="q-ml-auto" v-model="toggleOnOff" />
            </div>

            <div class="row" style="align-items: center">
              <span class="">Payee</span>

              <q-input
                dense
                v-model="addexpenses.payee"
                style="margin-left: auto; width: 50%"
                class="input-extra-padding"
              />
            </div>
            <div class="row" style="align-items: center">
              <span class="">Resposible Party</span>

              <q-select
                v-model="addexpenses.payableBy.value"
                :options="options"
                dense
                option-value="value"
                option-label="value"
                behavior="menu"
                @input="setResponsibleBy(addexpenses.payableBy.value)"
                style="margin-left: auto; width: 50%"
                class="input-extra-padding"
              ></q-select>

              <!-- <q-input
                v-model="addexpenses.payableBy.value"
                dense
                style="margin-left: auto; width: 50%"
                class="input-extra-padding"
              /> -->
            </div>
            <div class="row" style="align-items: center">
              <span class=""> Exclude from Company Fee</span>

              <q-toggle class="q-ml-auto" v-model="toggleOnOff" />
            </div>
            <div class="row" style="align-items: center">
              <span class="">Invoice reference Number</span>

              <q-input
                dense
                v-model="addexpenses.reference"
                style="margin-left: auto; width: 50%"
                class="input-extra-padding"
              />
            </div>

            <div>Description</div>
            <textarea v-model="addexpenses.desc" rows="3" class="full-width" />
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          size="'xl'"
          @click="addExpensesSaveClick"
        />
      </q-card>
    </q-dialog>
    <!-- Expenses Dialog Box -->
    <q-dialog
      v-model="addDisbursementDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="addDisbursementDialog = false"
          :dialogName="'Add Claim  Disbursment'"
        />
        <div class="q-ma-sm mobile-container-page listing-height">
          <q-form>
            <q-card class="q-ma-sm q-pa-sm">
              <div class="row" style="align-items: center">
                <span class="heading-light">Amount </span>
                {{ fakeDisbustments }}343

                <q-input
                  dense
                  v-model.number="addDisbursement.amount"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Paid To Client </span>

                <q-input
                  dense
                  v-model.number="addDisbursement.paidToClient"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Paid To Company </span>

                <q-input
                  dense
                  v-model.number="addDisbursement.paidToCompany"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div>
                <div class="row justify-between" style="align-items: center">
                  <span class="col-6 q-pt-xs q-ml-md">Expenses</span>
                  <span class="col-5">Amounts</span>
                </div>

                <div class="q-pa-sm  q-ma-sm">
                  <div
                    class="row justify-between"
                    v-for="(settlement, index) in expenses.expenses"
                  >
                    <div class=" col-6 q-mt-md">
                      {{ index + 1 }}.
                      <span class="q-ml-sm">
                        {{ settlement.desc }}
                      </span>
                    </div>
                    <div class="col-5" v-if="showExpences">
                      <q-input
                        dense
                        mask="#.#"
                        type="number"
                        prefix="$"
                        v-model.number="addDisbursement.expenses[index].paid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-card>
            <q-card class="q-mx-sm q-pa-sm">
              <span class="">Opening Balance </span>
              <div class="row" style="align-items: center">
                <span class="heading-light">Amount Available </span>
                <div style="margin-left: auto; width: 50%">
                  <!-- {{ account.totalPayment }} -->
                  {{ fakeDisbustments }}343
                </div>
                <!-- <q-input
                  dense
                  v-model.number="amountsOfPayment"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                /> -->
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Amount to Disburse</span>
                <q-input
                  dense
                  v-model.number="addDisbursement.amountToDisbuse"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="col-5 heading-light">
                  Outstanding Expenses Payable By both company and Client
                </span>
                <!-- <q-input
                  dense
                  v-model="checkReference"
                  mask="#.#"
                  prefix="$"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  class="input-extra-padding"
                /> -->
              </div>
              <!-- <div class="q-pa-md" style="border-style: ridge ">
                <div class="row bg-red justify-between">
                  {{ clientAndCompany }}
                  <div class="q-my-xs">{{ clientAndCompany.desc }}himanshu</div>
                  <div>
                    <q-toggle size="xs" v-model="wantToPay" @input="setValue" />
                  </div>
                  <div class="q-my-xs">{{ clientAndCompany.amount }}</div>
                </div>
              </div> -->
              <table class="full-width">
                <tr>
                  <td>
                    Name
                  </td>
                  <td>
                    Due
                  </td>
                  <td>
                    Action
                  </td>
                  <td>
                    Value
                  </td>
                </tr>
                <tr>
                  <td>
                    Himanshu
                  </td>
                  <td>
                    8777
                  </td>
                  <td>
                    <q-toggle size="xs" v-model="wantToPay" @input="setValue" />
                  </td>
                  <td>
                    <q-input style="width:100px;" prefix="$" class=" col-2 " />
                  </td>
                </tr>
              </table>

              <div class="row" style="align-items: center">
                <span class="">Net Expense To Pay</span>
                <q-input
                  dense
                  v-model.number="amountsOfPayment"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light"> Net Amount to Disburse</span>
                <q-input
                  dense
                  v-model.number="amountsOfPayment"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="col-5 heading-light"
                  >Client Expenses Exempt from Company Fee</span
                >
                <q-input
                  dense
                  v-model.number="amountsOfPayment"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Amount Subject to Company Fee</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light"> Company Fee Type</span>
                <q-input
                  dense
                  v-model.number="amountsOfPayment"
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Percentage</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Company Fee</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Company Starting Balance</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Client Starting Balance</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
            </q-card>
            <q-card class="q-ma-sm q-pa-sm">
              <span class="">Client Breakdown </span>
              <div class="row" style="align-items: center">
                <span class="heading-light">Client Starting Balance</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Total Amount to Client</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Expenses Payable by Client</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
            </q-card>
            <q-card class="q-ma-sm q-pa-sm">
              <span class="">Company Breakdown </span>
              <div class="row" style="align-items: center">
                <span class="heading-light">Company Starting Balance</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Expenses Payable by Company</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light"
                  >Amount Available for Commission Calculations</span
                >
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Expenses/Fees Owed to Company</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light">Total Amount to Company</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
            </q-card>
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          size="'xl'"
          @click="onSaveDisbursement"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EstimatingInfo from 'components/EstimatingInfo';
import CustomBar from 'components/CustomBar';
import { dateToShow } from '@utils/date';
import { onPhoneNumberClick, onEmailClick } from '@utils/clickable';
import ClaimDetail from 'components/ClaimDetail';
import { validateDate } from '@utils/validation';
import { dateToSend } from '@utils/date';
export default {
  name: 'ClaimLedger',
  components: {
    EstimatingInfo,
    CustomBar,
    ClaimDetail
  },
  data() {
    return {
      wantToPay: false,
      clientAndCompany: [],
      clientOnly: [],
      companyOnly: [],
      fakeDisbustments: 2000,
      showValue: false,
      showExpences: false,
      options: [
        { value: 'Client', machineValue: 'client' },
        { value: 'Company', machineValue: 'company' },
        { value: 'Client and Company', machineValue: 'client_company' }
      ],

      payments: {
        date: '',
        amountsOfPayment: '',
        checkReference: '',
        netSettlement: '',
        paidToDate: '',
        settlements: [],
        outstanding: '',
        aimToApply: '',
        notes: ''
      },
      addDisbursement: {
        amountToDisbuse: '',
        amount: '',
        paidToClient: '',
        paidToCompany: '',
        expenses: []
      },
      addexpenses: {
        amount: '',
        receviedDate: '',
        reference: '',
        payee: '',
        payableBy: {
          value: '',
          machineValue: ''
        },
        desc: ''
      },
      date: '',
      checkReference: '',
      amountsOfPayment: null,
      addPaymentDialog: false,
      toggleOnOff: false,
      addExpensesDialog: false,
      addDisbursementDialog: false
    };
  },

  computed: {
    ...mapGetters([
      'estimator',
      'selectedClaimId',
      'account',
      'payment',
      'expenses',
      'disbursements'
    ])
  },

  async created() {
    this.getEstimateInfo(this.selectedClaimId);
    this.getAllPayment(this.selectedClaimId);
    this.getAllDisbursements(this.selectedClaimId);
    this.getAllExpenses(this.selectedClaimId);

    await this.getAccountDetails(this.selectedClaimId).then(async () => {
      this.account.settlements.forEach(val => {
        this.payments.settlements.push({
          id: val.id,
          amountPaid: ''
        });
        this.showValue = true;
      });
    });

    await this.getAllExpenses(this.selectedClaimId).then(async () => {
      this.expenses.expenses.forEach(val => {
        console.log(val);
        this.addDisbursement.expenses.push({
          id: val.id,
          paid: ''
        });
        this.showExpences = true;
      });
    });
  },
  methods: {
    ...mapActions([
      'getEstimateInfo',
      'addClaimEstimator',
      'getAccountDetails',
      'getAllPayment',
      'getAllExpenses',
      'addPayment',
      'getAllDisbursements',
      'addExpenses',
      'createDisbursement'
    ]),
    onPhoneNumberClick,
    onEmailClick,
    validateDate,
    dateToShow,

    setValue() {
      console.log(8787);
    },

    openDisbursementBox() {
      console.log(this.expenses);

      this.expenses.expenses.forEach(val => {
        console.log(val.payableBy.machineValue);
        if (val.payableBy.machineValue == 'client_company') {
          this.clientAndCompany = val;
        }
        if (val.payableBy.machineValue == 'client') {
          this.clientOnly = val;
        }
        if (val.payableBy.machineValue == 'company') {
          this.companyOnly = val;
        }
        //   this.payments.settlements.push({
        //     id: val.id,
        //     amountPaid: ''
        //   });
        this.showValue = true;
      });

      this.addDisbursementDialog = true;
    },

    async onClickSavePayment() {
      const payload = {
        id: this.selectedClaimId,
        data: {
          amount: this.payments.amountsOfPayment,

          receviedDate: dateToSend(this.payments.date),
          reference: this.payments.checkReference,
          settlements: this.payments.settlements,
          note: this.payments.notes
        }
      };

      const success = await this.addPayment(payload);
      if (success) {
        this.addPaymentDialog = false;
      }
    },

    // this.addexpenses.payableBy.machineValue=
    setResponsibleBy(data) {
      const obj = this.options.find(item => {
        return item.value === data.value;
      });
      this.addexpenses.payableBy.machineValue = obj.machineValue;
      this.addexpenses.payableBy.value = obj.value;
    },

    async addExpensesSaveClick() {
      const payload = {
        id: this.selectedClaimId,

        data: {
          amount: this.addexpenses.amount,
          receviedDate: dateToSend(this.addexpenses.receviedDate),
          reference: this.addexpenses.reference,
          payee: this.addexpenses.payee,
          payableBy: {
            value: this.addexpenses.payableBy.value,
            machineValue: this.addexpenses.payableBy.machineValue
          },
          desc: this.addexpenses.desc
        }
      };

      const success = await this.addExpenses(payload);
      if (success) {
        await this.getAllExpenses(this.selectedClaimId);
        await this.getAccountDetails(this.selectedClaimId);
        this.addExpensesDialog = false;
      }
    },
    async onSaveDisbursement() {
      const payload = {
        id: this.selectedClaimId,
        data: {
          amount: this.addDisbursement.amount,
          paidToClient: this.addDisbursement.paidToClient,
          paidToCompany: this.addDisbursement.paidToCompany,
          expenses: this.addDisbursement.expenses
        }
      };
      const success = await this.createDisbursement(payload);
      if (success) {
        await this.getAllDisbursements(this.selectedClaimId);
        await this.getAccountDetails(this.selectedClaimId);
        this.addDisbursementDialog = false;
      }
    },
    editExpense(value) {
      this.addexpenses = value;
      this.addExpensesDialog = true;
    }
  }
};
</script>
