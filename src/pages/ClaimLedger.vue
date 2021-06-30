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
                    <div class=" row justify-end">
                      <div class="q-mr-xs">
                        <!-- <q-icon
                          name="create"
                          size="xs"
                          color="primary"
                          @click="editExpense(expense)"
                        /> -->
                        ppp
                        <!-- <q-icon
                          class="q-mx-xs"
                          name="delete"
                          size="xs"
                          @click="deletePayment(pay)"
                          color="primary"
                        /> -->
                      </div>
                    </div>
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
                        @click="deleteExpense(expense)"
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
                      <div class="heading-light">Amount</div>
                      <div>{{ expense.amount }}</div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Reference</div>
                      <div>{{ expense.reference }}</div>
                    </div>

                    <div class="row justify-between">
                      <div class="heading-light">Payee</div>
                      <div>{{ expense.payee }}</div>
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
                        @input="() => $refs.qDateProxy.hide()"
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
                        @input="() => $refs.qDateProxy.hide()"
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
              <span class="">Payable By</span>

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
          @closeDialog="closeDisbursmentBox"
          :dialogName="'Add Claim  Disbursment'"
        />
        <div class="q-ma-sm mobile-container-page listing-height">
          <q-form>
            <q-card class="q-mx-sm q-pa-sm">
              <span class="q-my-md">Opening Balance </span>
              <div class="row q-my-sm">
                <span class="col-8 heading-light">Amount Available </span>
                <div>
                  {{ account.totalPayment ? account.totalPayment : '-' }}
                </div>
              </div>
              <div class="row justify-between">
                <span class=" q-mt-md heading-light">Amount to Disburse</span>
                <q-input
                  dense
                  v-model.number="addDisbursement.amountToDisbuse"
                  mask="#.#"
                  type="number"
                  prefix="$"
                  class="col-4 "
                />
              </div>
              <div class="row justify-between q-my-sm">
                <span class="col-5   heading-light">
                  Outstanding Expenses Payable By both company and Client
                </span>
                <span class="col-4">
                  {{ totalExpensesOfClientAndCompany }}</span
                >
              </div>
              <div v-if="clientAndCompany.length > 0">
                <table class="full-width">
                  <tr>
                    <td style="width:30%;">
                      Name
                    </td>
                    <td style="width:30%;">
                      Due
                    </td>

                    <td style="width:30%;">
                      Value
                    </td>
                  </tr>

                  <tr v-for="(exp, index) in clientAndCompany">
                    <td>
                      {{ exp.payee ? exp.payee : '-' }}
                    </td>
                    <td>
                      {{ exp.amount ? exp.amount : '-' }}
                    </td>
                    <!-- <td>
                    <q-toggle size="xs" v-model="wantToPay" @input="setValue" />
                  </td> -->
                    <td>
                      <q-input
                        v-model="clientAndCompanyAmount[index]"
                        prefix="$"
                        class=" col-2 "
                      />
                    </td>
                  </tr>
                </table>

                <div class="q-mt-sm  row full-width justify-end">
                  <q-btn
                    size="xs"
                    label="add"
                    color="primary"
                    @click="onFillingValue()"
                  />
                </div>
              </div>

              <div class="row q-my-md">
                <span class="col-8">Net Expense To Pay</span>
                <div>
                  {{ netExpenseToPayByBoth ? netExpenseToPayByBoth : 0 }}
                </div>
              </div>
              <div class="row q-my-sm">
                <span class="heading-light col-8 q-my-xs">
                  Net Amount to Disburse</span
                >
                {{ addDisbursement.amountToDisbuse - netExpenseToPayByBoth }}
              </div>
              <div class="row q-my-sm">
                <span class="col-8 heading-light"
                  >Client Expenses Exempt from Company Fee</span
                >
                0
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light col-8"
                  >Amount Subject to Company Fee</span
                >
                {{
                  addDisbursement.amountToDisbuse - netExpenseToPayByBoth
                    ? addDisbursement.amountToDisbuse - netExpenseToPayByBoth
                    : 0
                }}
              </div>
              <div class=" q-mt-md  row justify-between">
                <div class="col-4 q-mt-sm heading-light">Company Fee Type</div>

                <q-btn-toggle
                  v-model="feesType"
                  push
                  glossy
                  toggle-color="primary"
                  :options="[
                    { label: ' $', value: 'dollar' },
                    { label: ' %', value: 'percentage' }
                  ]"
                ></q-btn-toggle>
              </div>

              <div v-if="feesType == 'percentage'" class="row justify-between">
                <span class="q-mt-sm  heading-light">Company Fee</span>
                <q-input
                  dense
                  v-model="partialCompanyValue"
                  mask="#.#"
                  type="number"
                  prefix="$"
                  @input="CalculationOfCompanyFee(partialCompanyValue)"
                  class=" col-4 "
                />
              </div>
              <div v-else class="row justify-between">
                <span class="q-mt-sm  heading-light">Company Fee</span>
                <q-input
                  dense
                  v-model="addDisbursement.companyFee"
                  mask="#.#"
                  type="number"
                  prefix="$"
                  class=" col-4 "
                />
              </div>
              <div class="row q-mt-lg">
                <span class=" col-8 heading-light"
                  >Company Starting Balance</span
                >
                {{
                  addDisbursement.companyFee ? addDisbursement.companyFee : 0
                }}
              </div>
              <div class="row q-my-sm ">
                <span class="heading-light col-8">Client Starting Balance</span>
                {{
                  addDisbursement.amountToDisbuse -
                    netExpenseToPayByBoth -
                    addDisbursement.companyFee
                }}
              </div>
            </q-card>
            <q-card class="q-ma-sm q-pa-sm">
              <span class="q-my-sm">Client Breakdown </span>
              <div class="row q-my-sm">
                <span class="col-8 heading-light">Client Starting Balance</span>
                {{
                  addDisbursement.amountToDisbuse -
                    netExpenseToPayByBoth -
                    addDisbursement.companyFee
                }}
              </div>

              <div class="row" style="align-items: center">
                <span class="heading-light col-8"
                  >Expenses Payable by Client</span
                >
                {{ totalExpensesOfClient }}
              </div>
              <div v-if="clientOnly.length > 0">
                <table class=" q-my-md full-width">
                  <tr>
                    <td style="width:30%;">
                      Name
                    </td>
                    <td style="width:30%;">
                      Due
                    </td>
                    <!-- <td>
                    Action
                  </td> -->
                    <td style="width:30%;">
                      Value
                    </td>
                  </tr>

                  <tr v-for="(exp, index) in clientOnly">
                    <td>
                      {{ exp.payee }}
                    </td>
                    <td>
                      {{ exp.amount }}
                    </td>
                    <!-- <td>
                    <q-toggle size="xs" v-model="wantToPay" @input="setValue" />
                  </td> -->
                    <td>
                      <q-input
                        v-model="clientAmount[index]"
                        prefix="$"
                        class=" col-2"
                      />
                    </td>
                  </tr>
                </table>

                <div class="x-my-sm  row justify-end">
                  <q-btn
                    size="xs"
                    label="add"
                    color="primary"
                    @click="onFillingClient()"
                  />
                </div>
              </div>

              <div class=" q-my-sm row justify-between">
                <span class="heading-light ">Total Amount to Client</span>
                <div class="q-mr-xl">
                  {{ netExpenseToPayByClient }}
                </div>
              </div>
            </q-card>
            <q-card class="q-ma-sm q-pa-sm">
              <span class="q-my-sm">Company Breakdown </span>
              <div class="q-my-sm row ">
                <span class="heading-light col-8 "
                  >Company Starting Balance</span
                >
                <div class="q-mr-xl">
                  {{ addDisbursement.companyFee }}
                </div>
              </div>
              <div class="q-my-sm row">
                <span class="heading-light col-8"
                  >Expenses Payable by Company</span
                >
                {{ totalExpensesOfCompany }}
              </div>
              <div v-if="companyOnly.length > 0">
                <table class="full-width">
                  <tr>
                    <td style="width:30%;">
                      Name
                    </td>
                    <td style="width:30%;">
                      Due
                    </td>

                    <td style="width:30%;">
                      Value
                    </td>
                  </tr>

                  <tr v-for="(exp, index) in companyOnly">
                    <td>
                      {{ exp.payee }}
                    </td>
                    <td>
                      {{ exp.amount }}
                    </td>
                    <!-- <td>
                    <q-toggle size="xs" v-model="wantToPay" @input="setValue" />
                  </td> -->
                    <td>
                      <q-input
                        v-model="companyAmounts[index]"
                        prefix="$"
                        class=" col-2 "
                      />
                    </td>
                  </tr>
                </table>

                <div class=" q-my-sm row justify-end">
                  <q-btn
                    size="xs"
                    label="add"
                    color="primary"
                    @click="onFillingCompany()"
                  />
                </div>
              </div>

              <div class="row  q-my-md   ">
                <span class="heading-light col-8">Total Amount to Company</span>
                <div class=" q-mr-xl">
                  {{ netExpenseToPayByCompany }}
                </div>
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
      partialCompanyValue: '',
      finalExpenses: [],
      totalAmount: null,
      netExpenseToPayByBoth: null,
      netExpenseToPayByClient: 0,
      netExpenseToPayByCompany: 0,
      clientAndCompanyAmount: [],
      clientAmount: [],
      feesType: 'dollar',

      companyAmounts: [],
      totalExpensesOfClient: 0,
      totalExpensesOfClientAndCompany: 0,
      totalExpensesOfCompany: 0,
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
        companyFee: 0,

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
    await this.getAccountDetails(this.selectedClaimId);

    await this.getAccountDetails(this.selectedClaimId).then(async () => {
      this.account.settlements.forEach(val => {
        this.payments.settlements.push({
          id: val.id,
          amountPaid: 0
        });
        this.showValue = true;
      });
    });

    // await this.getAllExpenses(this.selectedClaimId).then(async () => {
    //   this.expenses.expenses.forEach(val => {

    //     this.addDisbursement.expenses.push({
    //       id: val.id,
    //       paid: 0
    //     });
    //     this.showExpences = true;
    //   });
    // });
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
      'createDisbursement',
      'deleteExpenses',
      'deletePayment'
    ]),
    onPhoneNumberClick,
    onEmailClick,
    validateDate,
    dateToShow,

    async deleteExpense(value) {
      const payload = {
        claimID: this.selectedClaimId,
        expenseID: value.id
      };
      await this.deleteExpenses(payload);
      await this.getAllExpenses(this.selectedClaimId);
      await this.getAccountDetails(this.selectedClaimId);
    },

    // async deletePayment(value) {
    //   const payload = {
    //     claimID: this.selectedClaimId,
    //     expenseID: value.id
    //   };
    //   await this.deletePayment(payload);
    //   await this.getAllPayment(this.selectedClaimId);
    //   await this.getAccountDetails(this.selectedClaimId);
    // },

    onFillingClient() {
      for (var i in this.clientAmount) {
        this.clientOnly[i].paid = parseInt(this.clientAmount[i]);
        this.totalAmount += parseInt(this.clientAmount[i]);
      }

      this.netExpenseToPayByClient = this.totalAmount;
    },
    CalculationOfCompanyFee(value) {
      this.addDisbursement.companyFee =
        (value / 100) *
        (this.addDisbursement.amountToDisbuse - this.netExpenseToPayByBoth);
    },
    onFillingCompany() {
      let total = 0;
      for (var i in this.companyAmounts) {
        this.companyOnly[i].paid = parseInt(this.companyAmounts[i]);
        total += parseInt(this.companyAmounts[i]);
      }
      this.netExpenseToPayByCompany = total;
    },

    onFillingValue() {
      let total = 0;
      for (var i in this.clientAndCompanyAmount) {
        this.clientAndCompany[i].paid = parseInt(
          this.clientAndCompanyAmount[i]
        );

        total += parseInt(this.clientAndCompanyAmount[i]);
      }
      this.netExpenseToPayByBoth = total;
    },
    closeDisbursmentBox() {
      this.clientAndCompany = [];
      this.clientOnly = [];
      this.companyOnly = [];
      this.addDisbursementDialog = false;
    },

    openDisbursementBox() {
      if (this.expenses.expenses) {
        this.expenses.expenses.forEach(val => {
          if (val.payableBy.machineValue == 'client_company') {
            this.clientAndCompany.push({
              amount: val.amount,
              id: val.id,
              payee: val.payee,
              paid: 0
            });
            this.totalExpensesOfClientAndCompany =
              this.totalExpensesOfClientAndCompany + val.amount;
          }
          if (val.payableBy.machineValue == 'client') {
            this.clientOnly.push({
              amount: val.amount,
              id: val.id,
              payee: val.payee,
              paid: 0
            });

            this.totalExpensesOfClient =
              this.totalExpensesOfClient + val.amount;
          }
          if (val.payableBy.machineValue == 'company') {
            this.companyOnly.push({
              amount: val.amount,
              id: val.id,
              payee: val.payee,
              paid: 0
            });
            this.totalExpensesOfCompany =
              this.totalExpensesOfCompany + val.amount;
          }

          this.showValue = true;
        });
      }

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
        this.getAllPayment(this.selectedClaimId);
        await this.getAccountDetails(this.selectedClaimId);
        this.addPaymentDialog = false;
      }
    },

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
      this.clientAndCompany.forEach(val => {
        this.finalExpenses.push({
          id: val.id,
          paid: parseInt(val.paid)
        });
      });
      this.clientOnly.forEach(val => {
        this.finalExpenses.push({
          id: val.id,
          paid: parseInt(val.paid)
        });
      });
      this.companyOnly.forEach(val => {
        this.finalExpenses.push({
          id: val.id,
          paid: parseInt(val.paid)
        });
      });

      const payload = {
        id: this.selectedClaimId,
        data: {
          amount: this.addDisbursement.amountToDisbuse,
          paidToClient: this.netExpenseToPayByClient,
          paidToCompany: this.netExpenseToPayByCompany,
          expenses: this.finalExpenses
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
