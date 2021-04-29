<template>
  <q-page>
    <div style="height: calc(100vh - 50px); overflow-y: auto">
      <ClaimDetail />
      <q-card class="q-ma-md q-pa-md">
        <div class="text-bold row q-pa-sm">
          Carrier Info
          <q-icon
            v-if="selectedClaimCarrier.carrier.id"
            size="xs"
            name="create "
            color="primary"
            @click="onAddCarrierClick"
            class="q-ml-auto"
          ></q-icon>
          <q-icon
            v-if="selectedClaimCarrier.carrier.id"
            class="q-my-auto q-ml-sm"
            name="delete"
            size="xs"
            color="primary"
            @click="onDelete(selectedClaimCarrier.carrier.id)"
          />
          <img
            v-if="!selectedClaimCarrier.carrier.id"
            class="q-ml-auto"
            src="~assets/add.svg"
            alt="add_icon"
            height="20px"
            @click="onAddCarrierClick"
          />
        </div>

        <div class="q-pa-sm" v-if="selectedClaimCarrier.carrier.id">
          <div class="text-bold row" v-model="carrierName">
            {{ selectedClaimCarrier.carrier.name }}
          </div>

          <div class="row q-mt-sm">
            <span
              class="col-7 heading-light"
              v-if="selectedClaimCarrier.carrier.address"
            >
              <div class="row">
                {{
                  selectedClaimCarrier.carrier.address.houseNumber
                    ? selectedClaimCarrier.carrier.address.houseNumber
                    : '-'
                }}
                ,
                {{
                  selectedClaimCarrier.carrier.address.streetAddress
                    ? selectedClaimCarrier.carrier.address.streetAddress
                    : '-'
                }}
              </div>
              <div>
                {{
                  selectedClaimCarrier.carrier.address.addressLocality
                    ? selectedClaimCarrier.carrier.address.addressLocality
                    : '-'
                }}
                ,
                {{
                  selectedClaimCarrier.carrier.address.addressRegion
                    ? selectedClaimCarrier.carrier.address.addressRegion
                    : '-'
                }}
              </div>
              <div class="row">
                {{
                  selectedClaimCarrier.carrier.address.addressCountry
                    ? selectedClaimCarrier.carrier.address.addressCountry
                    : '-'
                }},
                {{
                  selectedClaimCarrier.carrier.address.postalCode
                    ? selectedClaimCarrier.carrier.address.postalCode
                    : '-'
                }}
              </div>
              <div
                class="q-mt-xs"
                v-for="phone in selectedClaimCarrier.carrier.phoneNumber"
              >
                <span v-if="phone.type"
                  >{{ phone.type ? phone.type : '-' }} :
                </span>
                <span
                  class="clickLink"
                  @click="onPhoneNumberClick(phone.number, $event)"
                  >{{ phone.number ? phone.number : '-' }}</span
                >
              </div>
              <span
                class="click-link"
                @click="
                  onEmailClick(selectedClaimCarrier.carrier.email, $event)
                "
                >{{
                  selectedClaimCarrier.carrier.email
                    ? selectedClaimCarrier.carrier.email
                    : '-'
                }}</span
              >
            </span>
          </div>
        </div>
        <div v-else class="heading-light col q-ma-xs">
          Carrier info not added yet.
        </div>
      </q-card>
      <q-card class="q-ma-md q-pa-md">
        <div class="row">
          <span class="text-bold col q-ma-xs"> Carrier Personnel Info</span>
          <img
            class="q-mx-xs q-my-auto"
            src="~assets/add.svg"
            alt="add_icon"
            height="20px"
            @click="onAddAdjustorClick"
          />
        </div>
        <div v-if="selectedClaimCarrier.carrier.personnel">
          <div
            v-for="(personnel, index) in selectedClaimCarrier.carrier.personnel"
          >
            <div class="q-pa-sm text-bold row">
              <span v-if="personnel.name">
                {{ personnel.name ? personnel.name : '-' }}</span
              >
              <div v-if="personnel.role">
                <q-badge
                  class="q-px-sm q-py-xs q-ml-xs"
                  size="xs"
                  v-if="personnel.role.value"
                >
                  {{ personnel.role.value }}</q-badge
                >
              </div>
              <q-icon
                v-if="personnel.id"
                size="xs"
                name="create "
                color="primary"
                class="q-ml-auto"
                @click="onEditAdjustorPersonnel(index)"
              ></q-icon>
              <q-icon
                v-if="personnel.id"
                class="q-my-auto q-ml-sm"
                name="delete"
                size="xs"
                color="primary"
                s
                @click="onDeleteAdjustor(personnel.id)"
              />
            </div>

            <span class="col-7 heading-light" v-if="personnel.address">
              <div class="row q-ml-sm" v-if="personnel.address.houseNumber">
                {{
                  personnel.address.houseNumber
                    ? personnel.address.houseNumber
                    : '-'
                }}
                ,
                {{
                  personnel.address.streetAddress
                    ? personnel.address.streetAddress
                    : '-'
                }}
              </div>
              <div class="q-ml-sm" v-if="personnel.address.addressLocality">
                {{
                  personnel.address.addressLocality
                    ? personnel.address.addressLocality
                    : '-'
                }}
                ,
                {{
                  personnel.address.addressRegion
                    ? personnel.address.addressRegion
                    : '-'
                }}
              </div>
              <div class="row q-ml-sm" v-if="personnel.address.addressCountry">
                {{
                  personnel.address.addressCountry
                    ? personnel.address.addressCountry
                    : '-'
                }},
                {{
                  personnel.address.postalCode
                    ? personnel.address.postalCode
                    : '-'
                }}
              </div>
            </span>
            <span
              class="click-link q-ml-sm"
              @click="onEmailClick(personnel.email, $event)"
              >{{ personnel.email ? personnel.email : '-' }}</span
            >
            <div class="q-mt-xs q-ml-sm" v-for="phone in personnel.phoneNumber">
              <div v-if="phone.type && phone.number">
                <span>{{ phone.type ? phone.type : '-' }} : </span>
                <span
                  class="clickLink"
                  @click="onPhoneNumberClick(phone.number, $event)"
                  >{{ phone.number ? phone.number : '-' }}</span
                >
              </div>
              <div v-else>No Phone</div>
            </div>

            <q-separator class="q-mb-sm q-mt-sm" />
          </div>
        </div>
        <div v-else class="heading-light q-ma-xs">
          no personnel has been added.
        </div>
      </q-card>
      <q-card class="q-ma-md q-pa-md">
        <div class="row q-mt-xs">
          <span class="text-bold"> Policy Info</span>
          <q-icon
            name="edit"
            size="xs"
            color="primary"
            class="q-ml-auto"
            @click="onEditPolicyInfo"
          />
        </div>
        <div class="q-ml-xs">
          <div class="row q-mt-sm">
            <span class="heading-light col"> Policy Number </span>
            <span class="q-ml-md col">
              {{ policy.policyInfo.number ? policy.policyInfo.number : '-' }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Claim Number </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.claimNumber
                  ? policy.policyInfo.claimNumber
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Start Date </span>
            <span class="q-ml-md col">
              {{ policy.policyInfo.effectiveDate | moment('MM/DD/YYYY') }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> End Date </span>
            <span class="q-ml-md col">
              {{ policy.policyInfo.expirationDate | moment('MM/DD/YYYY') }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Category </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.category.value
                  ? policy.policyInfo.category.value
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Policy Type </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.type.value
                  ? policy.policyInfo.type.value
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Appraisal Clause </span>
            <span class="q-ml-md col"> - </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Total Amount of Policy </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.totalAmount
                  ? policy.policyInfo.totalAmount
                  : '-'
              }}</span
            >
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Dwelling Limit (A) </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.limitCoverage.dwelling
                  ? policy.policyInfo.limitCoverage.dwelling
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Other Structures (B) </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.limitCoverage.otherStructure
                  ? policy.policyInfo.limitCoverage.otherStructure
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Contents Limit (C) </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.limitCoverage.content
                  ? policy.policyInfo.limitCoverage.content
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Loss of Use/Ale Limit (D) </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.limitCoverage.lossOfUse
                  ? policy.policyInfo.limitCoverage.lossOfUse
                  : '-'
              }}
            </span>
          </div>

          <div class="row q-mt-xs">
            <span class="heading-light col"> Ordinance or Law</span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.ordinance ? policy.policyInfo.ordinance : '-'
              }}</span
            >
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Debris Removal</span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.debrisRemoval
                  ? policy.policyInfo.debrisRemoval
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Mold Fungi</span>
            <span class="q-ml-md col">
              {{ policy.policyInfo.mold ? policy.policyInfo.mold : '-' }}</span
            >
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Business Interruption</span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.businessInt
                  ? policy.policyInfo.businessInt
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Depreciation</span>
            <span class="q-ml-md col">
              {{ policy.policyInfo ? policy.policyInfo.depreciation : '-' }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col">Deductible</span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.deductibleAmount
                  ? policy.policyInfo.deductibleAmount
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Additional Details</span>
          </div>
          <q-card class="q-mt-sm q-pa-sm full-width q-mb-sm row">
            <span class="q-mb-lg col"> -</span>
          </q-card>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Notes</span>
          </div>
          <q-card class="q-pa-sm full-width q-mt-sm row">
            <span class="q-mb-lg col"> -</span>
          </q-card>
        </div>
      </q-card>
      <q-separator />
    </div>

    <!-- Insurance Info Dialog -->

    <q-dialog
      v-model="insuranceInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="insuranceInfoDialog = false"
          :dialogName="'Insurance Info'"
        />
        <div class="q-ma-sm mobile-container-page-without-search">
          <q-form ref="insuranceInfoForm" class="form-height">
            <InsuranceInfo :insuranceDetails="insuranceDetails" />
          </q-form>

          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onSaveButtonClick('insuranceInfoDialog')"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>

    <!-- Carriers List Dialog -->

    <q-dialog
      v-model="carriersListDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="carriersListDialog = false"
          :dialogName="'Select Carrier'"
        />
        <CarriersList
          @addCarrier="openAddCarrierDialog"
          :showCarrierDetails="false"
          :selectCarrier="true"
          @afterSelecting="onCloseCarrierList"
          :claimCarrier="true"
          :selectedCarrierName="carrierName"
        />
      </q-card>
    </q-dialog>

    <!-- Add Carrier Dialog -->

    <q-dialog
      v-model="addCarrierDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddCarrier
          @closeDialog="addCarrierDialog = false"
          :componentName="constants.industries.CARRIER"
          @onAddCarrier="onSetCarrier"
        />
      </q-card>
    </q-dialog>

    <!-- Adjustor List Dialog  -->

    <q-dialog
      v-model="adjustorListDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="adjustorListDialog = false"
          :dialogName="'Select Adjustor'"
        />
        <q-btn
          @click="addPersonnelDialog = true"
          flat
          class="q-ml-auto icon-top"
          ><img src="~assets/addAdjustor.svg"
        /></q-btn>
        <div class="actions-div">
          <div v-if="!params.industry" class="q-ml-xs row q-pr-md">
            <div class="row">
              <div @click="filterDialog = true" class="q-ml-md">
                <img src="~assets/filter.svg" /><span class="heading-light"
                  >Filter</span
                >
              </div>
            </div>
            <div class="q-ml-auto edit-icon">
              <q-btn
                v-if="params.role"
                class="q-ml-auto "
                color="white"
                text-color="grey"
                @click="clearFilter()"
                flat
                dense
                style="font-weight: 400"
                >Clear</q-btn
              >
              <q-btn
                :disabled="isAssignDisabled"
                color="primary"
                class="q-mr-lg"
                size="sm"
                label="Assign"
                @click="assignDialog = true"
              />
            </div>
          </div>
        </div>
        <div class="mobile-container-page">
          <div v-if="carrierPersonnel.personnel">
            <div
              v-for="personnel in carrierPersonnel.personnel"
              :key="carrierPersonnel.personnel.id"
              class="carrier-list-item clients-list"
              style="overflow-y: auto"
            >
              <q-item-section @click="onCheckPersonnel(personnel)">
                <span>
                  <span class="text-bold"
                    >{{ personnel.fname }} {{ personnel.lname }}</span
                  >
                  <div v-if="personnel.address">
                    <div>
                      {{
                        personnel.address ? personnel.address.houseNumber : '-'
                      }}
                      {{
                        personnel.address.streetAddress
                          ? personnel.address.streetAddress
                          : '-'
                      }}
                    </div>
                    <div>
                      {{
                        personnel.address.addressLocality
                          ? personnel.address.addressLocality
                          : '-'
                      }},{{
                        personnel.address.addressRegion
                          ? personnel.address.addressRegion
                          : '-'
                      }}
                    </div>
                    <div class="row">
                      {{
                        personnel.address.addressCountry
                          ? personnel.address.addressCountry
                          : '-'
                      }}
                    </div>
                  </div>
                  <div class="q-mt-xs" v-for="phone in personnel.phoneNumber">
                    <span v-if="phone.type"
                      >{{ phone.type ? phone.type : '' }} :
                    </span>
                    <span
                      class="clickLink"
                      @click="onPhoneNumberClick(phone.number, $event)"
                      >{{ phone.number ? phone.number : '-' }}</span
                    >
                  </div>
                  <span
                    class="click-link"
                    @click="onEmailClick(personnel.email, $event)"
                    >{{ personnel.email }}</span
                  >
                </span>
              </q-item-section>
              <q-icon
                v-if="checkID === personnel.id && onClickUncheck"
                name="done"
                size="xs"
                class="q-ml-auto"
              />
            </div>
          </div>
          <div v-else class="full-height full-width column">
            <div class="column absolute-center">
              <div style="color: #666666,align-items: center">
                You haven't added a Adjustor yet.
              </div>
              <img
                class="q-mx-lg q-pt-sm"
                src="~assets/add.svg"
                alt="add_icon"
                width="130px"
                height="100px"
                @click="addPersonnelDialog = true"
              />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- Add Adjustor Dialog -->

    <q-dialog
      v-model="addPersonnelDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Add Personnel'"
          @closeDialog="addPersonnelDialog = false"
        />
        <div class="mobile-container-page">
          <AddCarrierPersonnel :carrierPersonnel="personnel" />
        </div>
        <q-btn
          @click="onSaveCarrierPersonnel"
          label="Save"
          color="primary"
          class="button-width-90 q-mt-lg"
          size="'xl'"
        />
      </q-card>
    </q-dialog>

    <!-- Edit Personnel Dialog -->

    <q-dialog
      v-model="editPersonnelDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Edit Personnel'"
          @closeDialog="editPersonnelDialog = false"
        />
        <div class="mobile-container-page">
          <AddCarrierPersonnel :carrierPersonnel="editPersonnel" />
        </div>
        <q-btn
          @click="onEditSaveCarrierPersonnel"
          label="Save"
          color="primary"
          class="button-width-90 q-mt-lg"
          size="'xl'"
        />
      </q-card>
    </q-dialog>

    <!-- Filter Dialog  -->

    <q-dialog
      v-model="filterDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white">
        <q-bar
          style="height: 51px; border-bottom: 1px solid #0000001f"
          class="bg-white"
        >
          <img
            src="~assets/close.svg"
            alt="close"
            @click="filterDialog = false"
          />
          <q-space />
          <div class="text-uppercase text-bold text-black">Filters</div>
          <q-space />
          <q-btn color="primary" text-color="white" @click="applyFilter()"
            >Apply</q-btn
          >
        </q-bar>
        <div class="mobile-container-page-without-search">
          <div
            v-for="filter in claimRoles"
            :key="filter.id"
            class="filters-list-item"
          >
            <div class="row">
              {{ filter.name }}
              <q-radio
                v-model="selectedFilter"
                :val="filter.machineValue"
                dense
                class="q-ml-auto"
              />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- Assign Dialog -->

    <q-dialog v-model="assignDialog">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <div class="form-heading q-ml-sm q-ma-md text-h5">
          Assign to Claim as
        </div>
        <div class="clients-list q-ma-lg">
          <div
            v-for="filter in claimRoles"
            :key="filter.id"
            class="q-ma-md q-pt-sm"
          >
            <div class="row">
              <q-radio
                @input="setFilterName(filter.name)"
                v-model="assignFilter"
                :val="filter.machineValue"
                dense
                class="q-mb-lg"
              />
              <q-card-section class="q-pt-none">
                <span class="q-ml-sm q-mt-xs"> {{ filter.name }}</span>
              </q-card-section>
            </div>
          </div>
        </div>
        <q-footer class="bg-white q-mb-md">
          <div class="row">
            <div class="q-ml-auto">
              <q-btn
                @click="assignDialog = false"
                color="primary"
                flat
                label="cancel"
              />
            </div>
            <div>
              <q-btn
                color="primary"
                flat
                label="assign"
                @click="onSelectPersonnel(personnelObject)"
              />
            </div>
          </div>
        </q-footer>
      </q-layout>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClaimDetail from 'components/ClaimDetail';
import moment from 'moment';
import InsuranceInfo from 'components/InsuranceInfo';
import AddCarrier from 'components/AddCarrier';
import CarriersList from 'components/CarriersList';
import { validateDate } from '@utils/validation';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
import AddCarrierPersonnel from 'components/AddCarrierPersonnel';

import { dateToSend } from '@utils/date';
import { date } from 'quasar';
import { constants } from '@utils/constant';

export default {
  name: 'InsurancePolicy',
  components: {
    CustomBar,
    InsuranceInfo,
    ClaimDetail,
    CarriersList,
    AddCarrier,
    AddCarrierPersonnel
  },

  data() {
    return {
      params: {
        role: '',
        name: ''
      },
      onClickUncheck: false,
      isAssignDisabled: true,
      filterName: '',
      personnelObject: {},
      checkID: '',
      assignDialog: false,
      assignFilter: '',
      personnelID: '',
      id: '',
      editPersonnelDialog: false,
      selectedFilter: '',
      filterDialog: false,
      personnel: {
        options: [],
        role: { id: '', value: null, machineValue: '' },
        honorific: {
          id: '',
          value: 'Mr.',
          machineValue: 'mr_'
        },
        fname: '',
        lname: '',
        departmentName: '',
        address: {
          houseNumber: '',
          addressCountry: '',
          addressLocality: '',
          addressRegion: '',
          postOfficeBoxNumber: '',
          postalCode: '',
          streetAddress: '',
          dropBox: {
            info: '',
            isPresent: false
          }
        },
        phoneNumber: [
          {
            type: 'main',
            number: ''
          }
        ],
        email: '',

        notes: ''
      },
      editPersonnel: {
        options: [],
        role: { id: '', value: null, machineValue: '' },
        honorific: {
          id: '',
          value: 'Mr.',
          machineValue: 'mr_'
        },
        fname: '',
        lname: '',
        departmentName: '',
        address: {
          houseNumber: '',
          addressCountry: '',
          addressLocality: '',
          addressRegion: '',
          postOfficeBoxNumber: '',
          postalCode: '',
          streetAddress: '',
          dropBox: {
            info: '',
            isPresent: false
          }
        },
        phoneNumber: [
          {
            type: 'main',
            number: ''
          }
        ],
        email: '',

        notes: ''
      },
      addPersonnelDialog: false,
      adjustorListDialog: false,
      carrierName: '',
      claimID: '',
      carrierDetails: '',
      carriersListDialog: false,
      addCarrierDialog: false,
      searchText: '',
      constants: constants,
      params: {
        name: ''
      },
      carrierListDialog: false,
      insuranceInfoDialog: false,
      insuranceDetails: {
        totalAmount: '',
        ordinance: '',
        debrisRemoval: '',
        mold: '',
        businessInt: '',
        hasAppraisalClause: false,
        hasClaimBeenFilledToggle: false,
        isThisIsForcedPlacedPolicyToggle: false,
        policy: {
          id: '',
          value: ''
        },
        type: '',
        details: '',
        id: '',
        machineValue: '',
        policyCategory: {
          id: '',
          value: '',
          machineValue: ''
        },
        carrierName: '',
        carrierId: '',
        insuranceClaimNumber: '',
        policyNumber: '',
        policyEffectiveDate: '',
        policyExpireDate: '',
        dwellingLimitA: '',
        contentsLimit: '',
        otherStructureB: '',
        lossOfUSD: '',
        deprecation: '',
        deductible: '',
        priorPayment: '',
        reasonsOfLD: ''
      }
    };
  },

  computed: {
    ...mapGetters([
      'policy',
      'policyTypes',
      'policyCategories',
      'selectedClaimId',
      'selectedClaimCarrier',
      'carrierPersonnel',
      'contactTypes',
      'titles',
      'carriers',
      'claimRoles'
    ]),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  created() {
    this.getClaimCarrier(this.selectedClaimId);
    this.getCarrierPersonnel(this.selectedClaimCarrier.carrier.id);
    this.getCarrierPersonnel(this.selectedClaimCarrier.carrier.carrierID);
    this.getContactTypes();
    this.getTitles();
    if (this.$route.params.id) {
      this.getPolicy(this.$route.params.id);
    }
    this.getPolicyCategory();
    this.getPolicyTypes();
    this.getClaimRoles();
  },
  methods: {
    ...mapActions([
      'getPolicy',
      'getPolicyTypes',
      'getPolicyCategory',
      'editInsurancePolicy',
      'getSelectedClaim',
      'getClaimCarrier',
      'deleteClaimCarrier',
      'getClaimCarrierPersonnel',
      'getContactTypes',
      'getTitles',
      'addCarrierPersonnel',
      'getCarrierPersonnel',
      'addClaimPersonnel',
      'deleteClaimCarrierPersonnel',
      'getCarriers',
      'addClaimCarrier',
      'editCarrierPersonnelToClaim',
      'getClaimRoles'
    ]),

    async applyFilter() {
      if (this.filterName) {
        this.params.role = this.filterName;
      }
      this.params.role = this.selectedFilter;
      const paramsObject = {
        id: this.selectedClaimCarrier.carrier.carrierID,
        params: this.params
      };
      await this.getCarrierPersonnel(paramsObject);
      this.filterDialog = false;
    },
    clearFilter() {
      this.params.role = '';
      this.selectedFilter = '';
      const paramsObject = {
        id: this.selectedClaimCarrier.carrier.carrierID,
        params: this.params
      };
      this.getCarrierPersonnel(paramsObject);
    },
    setFilterName(name) {
      this.filterName = name;
    },
    onCheckPersonnel(personnel) {
      this.checkID = personnel.id;
      this.personnelObject = personnel;
      if (this.onClickUncheck) {
        this.onClickUncheck = false;
        this.isAssignDisabled = true;
      } else {
        this.onClickUncheck = true;
        this.isAssignDisabled = false;
      }
      // this.onClickUncheck = true;
    },
    async onEditSaveCarrierPersonnel() {
      const payload = {
        claimID: this.selectedClaimId,
        carrierID: this.selectedClaimCarrier.id,
        id: this.id,
        data: {
          personnel: {
            personnelID: this.personnelID,
            name: this.editPersonnel.fname + this.editPersonnel.lname,
            email: this.editPersonnel.email,
            role: {
              value: this.editPersonnel.role.value,
              machineValue: this.editPersonnel.role.machineValue
            },
            note: this.editPersonnel.notes,
            phoneNumber: this.editPersonnel.phoneNumber,
            address: this.editPersonnel.address
          }
        }
      };
      if (!this.editPersonnel.role.id) {
        delete payload.data.editPersonnel.role;
      }
      await this.editCarrierPersonnelToClaim(payload);
      this.editPersonnelDialog = false;
      this.getClaimCarrier(this.$route.params.id);
    },

    //This Function is for prefilling the values while editing the Adjustor

    onEditAdjustorPersonnel(index) {
      console.log(this.selectedClaimCarrier.carrier.personnel[index], 98);
      this.id = this.selectedClaimCarrier.carrier.personnel[index].id;
      this.personnelID = this.selectedClaimCarrier.carrier.personnel[
        index
      ].personnelID;
      this.editPersonnelDialog = true;
      this.editPersonnel.fname = this.selectedClaimCarrier.carrier.personnel[
        index
      ].name;
      this.editPersonnel.email = this.selectedClaimCarrier.carrier.personnel[
        index
      ].email;
      this.editPersonnel.phoneNumber = this.selectedClaimCarrier.carrier.personnel[
        index
      ].phoneNumber;
      this.editPersonnel.address = this.selectedClaimCarrier.carrier.personnel[
        index
      ].address;
      this.editPersonnel.notes = this.selectedClaimCarrier.carrier.personnel[
        index
      ].note;
      this.editPersonnel.role.value = this.selectedClaimCarrier.carrier.personnel[
        index
      ].role.value;
      this.editPersonnel.role.machineValue = this.selectedClaimCarrier.carrier.personnel[
        index
      ].role.machineValue;
    },

    validateDate,
    onEmailClick,
    onPhoneNumberClick,

    onEditPolicyInfo() {
      this.insuranceInfoDialog = true;
      this.insuranceDetails.hasClaimBeenFilledToggle = this.policy.policyInfo
        .isClaimFiled
        ? this.policy.policyInfo.isClaimFiled
        : false;

      this.insuranceDetails.isThisIsForcedPlacedPolicyToggle = this.policy
        .policyInfo.isForcedPlaced
        ? this.policy.policyInfo.isForcedPlaced
        : false;

      this.insuranceDetails.policy.id = this.policy.policyInfo.type.id
        ? this.policy.policyInfo.type.id
        : '';
      this.insuranceDetails.totalAmount = this.policy.policyInfo.totalAmount;
      this.insuranceDetails.ordinance = this.policy.policyInfo.ordinance;
      this.insuranceDetails.debrisRemoval = this.policy.policyInfo.debrisRemoval;
      this.insuranceDetails.mold = this.policy.policyInfo.mold;

      this.insuranceDetails.businessInt = this.policy.policyInfo.businessInt;

      this.insuranceDetails.policy.value = this.policy.policyInfo.type.value
        ? this.policy.policyInfo.type.value
        : '';
      this.insuranceDetails.policy.machineValue = this.policy.policyInfo.type
        .machineValue
        ? this.policy.policyInfo.type.machineValue
        : '';

      this.insuranceDetails.policyCategory.id = this.policy.policyInfo.category
        .id
        ? this.policy.policyInfo.category.id
        : '';

      this.insuranceDetails.policyCategory.value = this.policy.policyInfo
        .category.value
        ? this.policy.policyInfo.category.value
        : '';
      this.insuranceDetails.policyCategory.machineValue = this.policy.policyInfo
        .category.machineValue
        ? this.policy.policyInfo.category.machineValue
        : '';
      this.insuranceDetails.policyNumber = this.policy.policyInfo.number
        ? this.policy.policyInfo.number
        : '';
      this.insuranceDetails.insuranceClaimNumber = this.policy.policyInfo
        .claimNumber
        ? this.policy.policyInfo.claimNumber
        : '-';
      this.insuranceDetails.policyEffectiveDate = this.policy.policyInfo.effectiveDate;
      this.insuranceDetails.policyExpireDate = this.policy.policyInfo.expirationDate;

      this.insuranceDetails.policyEffectiveDate = this.insuranceDetails.policyExpireDate = date.formatDate(
        Date.now(),
        'MM/DD/YYYY'
      );

      this.insuranceDetails.dwellingLimitA = this.policy.policyInfo.limitCoverage.dwelling;
      this.insuranceDetails.contentsLimit = this.policy.policyInfo.limitCoverage.content;
      this.insuranceDetails.otherStructureB = this.policy.policyInfo.limitCoverage.otherStructure;
      this.insuranceDetails.lossOfUSD = this.policy.policyInfo.limitCoverage.lossOfUse;
      this.insuranceDetails.deprecation = this.policy.policyInfo.depreciation;
      this.insuranceDetails.deductible = this.policy.policyInfo.deductibleAmount;
      this.insuranceDetails.priorPayment = this.policy.policyInfo.priorPayment;
      this.insuranceDetails.reasonsOfLD = this.policy.policyInfo.limitReason;
      this.insuranceDetails.carrierName = this.policy.policyInfo.carrier.value
        ? this.policy.policyInfo.carrier.value
        : '';
      this.insuranceDetails.carrierId = this.policy.policyInfo.carrier.id
        ? this.policy.policyInfo.carrier.id
        : ''.value
        ? this.policy.policyInfo.carrier.value
        : '';
    },
    async onCloseCarrierList() {
      this.carriersListDialog = false;
      await this.getClaimCarrier(this.selectedClaimId);
    },
    async onSetCarrier(carrierID) {
      this.carriersListDialog = false;
      await this.getClaimCarrier(this.selectedClaimId);
      const payload = {
        id: this.selectedClaimId,
        data: {
          carrier: {
            carrierID: carrierID
          }
        }
      };
      await this.addClaimCarrier(payload);
      this.getClaimCarrier(this.selectedClaimId);
    },
    async onDeleteAdjustor(id) {
      const adjustor = {
        claimID: this.selectedClaimId,
        carrierID: this.selectedClaimCarrier.carrier.id,
        personnelD: id
      };
      await this.deleteClaimCarrierPersonnel(adjustor);
      this.$router.push(`/insurance-policy/${this.selectedClaimId}`);
      this.getClaimCarrier(this.selectedClaimId);
    },

    onAddAdjustorClick() {
      this.adjustorListDialog = true;

      // console.log(this.carrierId, 'id is ');
      console.log(this.selectedClaimCarrier.carrier.carrierID, 87);
      // this.getCarrierPersonnel(this.selectedClaimCarrier.carrier.carrierID);
      const paramsObject = {
        id: this.selectedClaimCarrier.carrier.carrierID,
        params: ''
      };

      this.getCarrierPersonnel(paramsObject);
    },
    //This Function is for when create a new personnel

    async onSaveCarrierPersonnel() {
      const payload = {
        id: this.selectedClaimCarrier.carrier.carrierID,
        data: {
          personnel: {
            honorific: {
              id: this.personnel.honorific.id,
              value: this.personnel.honorific.value,
              machineValue: this.personnel.honorific.machineValue
            },
            fname: this.personnel.fname,
            lname: this.personnel.lname,
            email: this.personnel.email,
            phoneNumber: this.personnel.phoneNumber,
            role: {
              value: this.personnel.role.value,
              machineValue: this.personnel.role.machineValue
            },
            address: {
              ...this.personnel.address
            },
            note: this.personnel.notes
          }
        }
      };
      if (!this.personnel.role.id) {
        delete payload.data.personnel.role;
      }
      const response = await this.addCarrierPersonnel(payload);
      this.addPersonnelDialog = false;
      this.getCarrierPersonnel(this.selectedClaimCarrier.carrier.carrierID);
      this.onSelectPersonnel(response.attributes.personnel);
      this.personnel.fname = '';
      this.personnel.lname = '';
      this.personnel.email = '';
      this.personnel.address.houseNumber = '';
      this.personnel.address.addressCountry = '';
      this.personnel.address.addressLocality = '';
      this.personnel.address.addressRegion = '';
      this.personnel.address.streetAddress = '';
      this.personnel.address.postalCode = '';
      this.personnel.notes = '';
      this.personnel.departmentName = '';
      this.personnel.role.value = '';
      this.personnel.role.machineValue = '';
    },
    //This Function is called when we click on adjustor list and select a personnel
    async onSelectPersonnel(personnel) {
      const payload1 = {
        claimID: this.selectedClaimId,
        carrierID: this.selectedClaimCarrier.id,
        data: {
          personnel: {
            personnelID: personnel.id,
            name: personnel.fname + ' ' + personnel.lname,
            email: personnel.email,
            role: {
              value: this.filterName,
              machineValue: this.assignFilter
            },
            note: personnel.note,
            phoneNumber: personnel.phoneNumber,
            address: personnel.address
          }
        }
      };
      await this.addClaimPersonnel(payload1);
      this.assignDialog = false;
      this.adjustorListDialog = false;
      this.getClaimCarrier(this.$route.params.id);
      this.filterName = '';
      this.assignFilter = '';
    },

    async onDelete(id) {
      const carrier = {
        claimID: this.selectedClaimId,
        carrierID: id
      };
      await this.deleteClaimCarrier(carrier);
      this.getClaimCarrier(this.selectedClaimId);
      this.carrierName = '';
    },

    async onSaveButtonClick() {
      let success = false;
      success = await this.$refs.insuranceInfoForm.validate();

      if (success) {
        const payload = {
          id: this.selectedClaimId,
          data: {
            policyInfo: {
              carrier: {
                id: this.insuranceDetails.carrierId,
                value: this.insuranceDetails.carrierName
              },
              number: this.insuranceDetails.policyNumber,
              isClaimFiled: this.hasClaimBeenFilledToggle,
              isForcedPlaced: this.isThisIsForcedPlacedPolicyToggle,
              hasAppraisalClause: this.hasAppraisalClause,
              claimNumber: this.insuranceDetails.insuranceClaimNumber,
              category: {
                id: this.insuranceDetails.policyCategory.id,
                value: this.insuranceDetails.policyCategory.value,
                machineValue: this.insuranceDetails.policyCategory.machineValue
              },
              type: {
                id: this.insuranceDetails.policy.id,
                value: this.insuranceDetails.policy.value,
                machineValue: this.insuranceDetails.policy.machineValue
              },

              effectiveDate: dateToSend(
                this.insuranceDetails.policyEffectiveDate
              ),
              expirationDate: dateToSend(
                this.insuranceDetails.policyExpireDate
              ),
              isClaimFiled: this.insuranceDetails.hasClaimBeenFilledToggle,
              isForcedPlaced: this.insuranceDetails
                .isThisIsForcedPlacedPolicyToggle,
              limitCoverage: {
                dwelling: this.insuranceDetails.dwellingLimitA
                  ? this.insuranceDetails.dwellingLimitA
                  : 0,
                otherStructure: this.insuranceDetails.otherStructureB
                  ? this.insuranceDetails.otherStructureB
                  : 0,
                content: this.insuranceDetails.contentsLimit
                  ? this.insuranceDetails.contentsLimit
                  : 0,
                lossOfUse: this.insuranceDetails.lossOfUSD
                  ? this.insuranceDetails.lossOfUSD
                  : 0
              },
              totalAmount: this.insuranceDetails.totalAmount
                ? this.insuranceDetails.totalAmount
                : 0,
              ordinance: this.insuranceDetails.ordinance
                ? this.insuranceDetails.ordinance
                : 0,
              debrisRemoval: this.insuranceDetails.debrisRemoval
                ? this.insuranceDetails.debrisRemoval
                : 0,
              mold: this.insuranceDetails.mold ? this.insuranceDetails.mold : 0,
              businessInt: this.insuranceDetails.businessInt
                ? this.insuranceDetails.businessInt
                : 0,
              deductibleAmount: this.insuranceDetails.deductible
                ? this.insuranceDetails.deductible
                : 0,
              depreciation: this.insuranceDetails.deprecation
                ? this.insuranceDetails.deprecation
                : 0,
              priorPayment: this.insuranceDetails.priorPayment
                ? this.insuranceDetails.priorPayment
                : 0,
              limitReason: this.insuranceDetails.reasonsOfLD,
              declaration: {
                isDeclared: true,
                fileInfo: {
                  id: '',
                  value: ''
                }
              }
            }
          }
        };

        await this.editInsurancePolicy(payload);
        this.insuranceInfoDialog = false;
        this.getPolicy(this.selectedClaimId);
        this.$router.push(`/insurance-policy/${this.selectedClaimId}`);
      }
    },

    async selecting() {
      this.carriersListDialog = false;
      await this.getClaimCarrier(this.selectedClaimId);
    },

    openAddCarrierDialog(e) {
      this.addCarrierDialog = e;
    },
    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },
    onAddButtonClick() {
      this.$emit('addCarrier', true);
    },
    search(event) {
      this.params.name = event;
    },
    onAddCarrierClick() {
      this.carriersListDialog = true;
      this.carrierName = this.selectedClaimCarrier.carrier.name;
    }
  }
};
</script>
<style lang="scss">
.form-height {
  height: calc(100vh - 120px);
  overflow: auto;
  margin: 10px;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
.icon-top {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 10000;
}
.filters-list-item {
  color: #666666;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  text-transform: capitalize;
}
</style>
