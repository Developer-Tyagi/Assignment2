<template>
  <q-page class="row q-ml-xl height-without-header">
    <div class="col-10">
      <div class="my-font text-bold text-h4 row q-ma-md">
        Global Master Data Management
      </div>
      <div class="q-ml-md text-body1">
        <p>
          Master Data management allows you to edit and refine those values that
          are used by all ClaimGuru accounts .please be aware that changes you
          make will effect all users and accounts so be judicious. To manage
          master data, select the Data type from the menu below and edit the
          data in the table shown.
        </p>
      </div>

      <div class="row q-ml-md">
        <div class="col-1 q-mt-sm">Data Type</div>

        <div class="col-4">
          <q-select
            dense
            class="col-3 input-extra-padding"
            outlined
            v-model="configuration.dataType"
            :options="setAllConfigurationData"
            option-label="dataTypeValue"
            option-value="type"
            @input=""
            options-dense
            behavior="menu"
            label="Please select a data type"
          />
        </div>
      </div>
      <div class="q-mx-md" flat bordered v-if="tab.key != 'template'">
        <div class="row full-width justify-between">
          <span class="text-bold" style="line-height: 36px">{{
            tab.name
          }}</span>
          <q-btn @click="onClickingAddButton(tab)" color="primary">
            Add {{ tab.name }}
          </q-btn>
        </div>
        <div class="bg-grey-3 q-mt-md">
          <table class="table" v-if="table.length">
            <thead>
              <tr class="table-tr" v-if="tab.key !== 'inspectionType'">
                <th class="table-th text-black">Name</th>
                <th class="table-th text-black">Action</th>
              </tr>
              <tr class="table-tr" v-if="tab.key == 'inspectionType'">
                <th class="table-th text-black">Name</th>
                <th class="table-th text-black">SubType</th>
                <th class="table-th text-black">Duration (hrs)</th>
                <th class="table-th text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-tr"
                v-for="(list, index) in table"
                :key="index"
                v-if="tab.key !== 'inspectionType'"
              >
                <td class="table-td">
                  <span v-if="!toEditConfigurationData">{{
                    list.value || list.name
                  }}</span>
                  <span class="row justify-center text-center">
                    <q-input
                      v-model="
                        toEditConfigurationWithoutSubtype.attributes[index]
                          .value
                      "
                      v-if="toEditConfigurationData"
                    ></q-input
                  ></span>
                </td>
                <td class="table-td">
                  <div class="justify-between">
                    <q-icon
                      name="edit"
                      size="sm"
                      v-if="!toEditConfigurationData"
                      @click="toEditConfiguration(list, index)"
                      class="q-pr-md cursor-pointer"
                    ></q-icon>
                    <q-icon
                      name="block"
                      size="sm"
                      v-if="toEditConfigurationData"
                      @click="toCancelConfigurationEdit()"
                      class="q-pr-md cursor-pointer"
                    ></q-icon>
                    <q-icon
                      name="visibility"
                      size="sm"
                      v-if="!toEditConfigurationData"
                      class="q-pl-md cursor-pointer"
                    ></q-icon>
                    <q-icon
                      name="save"
                      size="sm"
                      @click="toSaveConfigurationEdit()"
                      v-if="toEditConfigurationData"
                      class="q-pl-md cursor-pointer"
                    ></q-icon>
                  </div>
                </td>
              </tr>

              <tr
                class="table-tr"
                v-for="list in table"
                v-if="tab.key === 'inspectionType'"
              >
                <td class="table-td">
                  <div class="text-bold">{{ list.value }}</div>
                </td>
                <td class="table-td">
                  <div v-for="type in list.subtypes">
                    <div>{{ type.value }}</div>
                  </div>
                </td>
                <td class="table-td">
                  <div>&nbsp;</div>
                  <div v-for="type in list.subtypes">
                    <div>{{ type.duration }}</div>
                  </div>
                </td>
                <td class="table-td">
                  <div class="justify-between">
                    <q-icon
                      name="edit"
                      size="sm"
                      class="q-pr-md cursor-pointer"
                    ></q-icon>
                    <q-icon
                      name="visibility"
                      size="sm"
                      class="q-pl-md cursor-pointer"
                    ></q-icon>
                  </div>
                </td>
              </tr>
              <td>
                <q-icon
                  name="add_box"
                  size="md"
                  class="q-ml-md cursor-pointer"
                ></q-icon>
              </td>
              <td></td>
              <td v-if="tab.key == 'inspectionType'"></td>
              <td v-if="tab.key == 'inspectionType'"></td>
            </tbody>
          </table>

          <div class="q-pa-lg q-ma-auto" v-else>You Have Not Added AnyYet</div>
        </div>
      </div>
      <div v-else>
        <div class="q-mx-md">
          <div class="row full-width justify-between">
            <span class="text-bold" style="line-height: 36px">{{
              tab.name
            }}</span>

            <div class="row">
              <q-btn @click="openAddTemplateBox" color="primary">
                Add Template
              </q-btn>
              <q-btn
                class="q-ml-lg"
                @click="uploadTemplateDialogBox = true"
                color="primary"
              >
                Upload Template
              </q-btn>
            </div>
          </div>
          <div class="bg-grey-3 q-mt-md">
            <table class="table" v-if="table.length">
              <thead>
                <tr class="table-tr">
                  <th class="table-th">Name</th>

                  <th class="table-th">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  class="table-tr"
                  v-for="(list, index) in templates"
                  :key="index"
                >
                  <td class="table-td">{{ list.name.type.value }}</td>

                  <td class="table-td">
                    <span class="cursor-pointer">
                      <q-icon
                        size="sm"
                        color="primary"
                        name="create"
                        @click="onEditTemplate(list)"
                      />
                    </span>
                    <span class="cursor-pointer">
                      <q-icon
                        class="q-ml-xs"
                        size="sm"
                        color="primary"
                        name="delete"
                        @click="onDeleteTemplate(list)"
                      />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="q-pa-lg q-ma-auto" v-else>
              You Have Not Added AnyYet
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialogBox">
      <q-card
        :class="{
          'inspection-dialog-box': tab.key === 'inspectionType',
          'other-dialog-box': tab.key !== 'inspectionType'
        }"
      >
        <q-bar
          class="row justify-between bg-primary text-white"
          style="height: 50px"
        >
          <div class="col-7 text-bold">Add {{ dialogBoxName.name }}</div>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section
          :class="{
            'dialog-box-content': tab.key === 'inspectionType',
            'other-dialog-box-content': tab.key !== 'inspectionType'
          }"
        >
          <div class="column">
            <q-form ref="form" v-if="tab.key !== 'inspectionType'">
              <div class="q-pl-xs">
                <q-input
                  dense
                  v-model="payload.value"
                  class="full-width"
                  outlined
                  :rules="[
                    val =>
                      (val && val.length > 0) ||
                      'Please Fill ' + dialogBoxName.name
                  ]"
                />
              </div>
            </q-form>
            <q-form ref="form" v-if="tab.key == 'inspectionType'">
              <q-card
                class="q-ma-md q-pa-md"
                v-for="(subtype, index) in inspectionType.subtypes"
                :key="index"
              >
                <q-input
                  dense
                  v-model="inspectionType.value"
                  placeholder="Type of Inspection"
                  v-if="index == 0"
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill inspection name'
                  ]"
                />
                <q-input
                  dense
                  placeholder="Sub Type of Inspection"
                  v-model="inspectionType.subtypes[index].value"
                />
                <div class="slider-div">
                  <label>Duration(hr)</label>
                  <q-slider
                    v-model="inspectionType.subtypes[index].duration"
                    label-always
                    markers
                    :min="0.5"
                    :max="4"
                    :step="0.5"
                  />
                </div>
              </q-card>
            </q-form>
          </div>
          <div
            class="row justify-between text-primary"
            v-if="tab.key == 'inspectionType'"
          >
            <div class="q-ml-xl" @click="addAnotherSubType">
              + Another Sub Type Of Inspection
            </div>
            <div
              class="q-mr-xl"
              v-if="inspectionType.subtypes.length > 1"
              @click="onClickRemoveSubType"
            >
              Remove
            </div>
          </div>
        </q-card-section>
        <div class="row justify-center">
          <div class="col-8">
            <q-btn
              label="Clear"
              class="back-button-style"
              padding="md"
              @click="clear"
            />
            <q-btn
              padding="md"
              label="Save"
              class="next-button-style"
              @click="onSubmit(tab)"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- Token Dialog Box -->
    <q-dialog
      v-model="addTemplateDialogBox"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="height: 85%; width: 60%">
        <div class="row bg-primary" style="height: 5%">
          <div
            v-if="!this.isEdit"
            class="text-white text-center text-h6 q-pa-sm"
          >
            Add Template
          </div>
          <div v-else class="text-white text-h6 q-pa-sm">Edit Template</div>
          <q-space />
          <q-btn
            class="q-mr-md"
            dense
            flat
            icon="close"
            color="white"
            v-close-popup
          >
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </div>
        <div class="q-mx-lg">
          <div
            style="
              height: calc(100% - 100px);
              overflow-y: auto;
              margin-bottom: 10px;
            "
          >
            <div class="text-bold q-mt-xl">Template Type</div>
            <div>
              <q-select
                :disable="isEdit"
                dense
                class="input-extra-padding q-ma-sm required"
                v-model="templatetype.value"
                option-value="name"
                option-label="name"
                map-options
                options-dense
                behavior="menu"
                emit-value
                :options="templateOptions"
                @input="setTypes(templatetype.value)"
                label="List of Templates"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the template'
                ]"
              />
            </div>
            <div class="text-bold q-py-sm">BODY</div>
            <Ckeditor
              :markup="post.body"
              :templateTokens="templateTokens"
              :groupedTokens="groupedTokens"
              @updateMarkup="updateMarkup"
            ></Ckeditor>
          </div>
          <div class="row q-mt-xl justify-center">
            <q-btn
              class="single-next-button-style"
              label="Save"
              @click="onSaveTemplate"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- delete dialog -->
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure ! You want to delete This Template!
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="alert = false"
          ></q-btn>
          <q-btn
            flat
            label="Delete"
            color="primary"
            v-close-popup
            @click="onDeleteConfirmation(indexValue)"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Upload Template Dialog Box -->

    <q-dialog
      v-model="uploadTemplateDialogBox"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="height: 85%; width: 60%">
        <div class="row justify-between bg-primary" style="height: 50px">
          <div class="text-white text-h6 q-pa-sm">Upload Template</div>
          <q-btn dense flat icon="close" color="white" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </div>
        <div class="q-mx-lg">
          <div>
            <div class="text-bold q-mt-xl q-ml-xs">Template Type</div>
            <q-form ref="uploadTemplateForm">
              <div>
                <q-select
                  dense
                  class="input-extra-padding q-ma-sm required"
                  v-model="uploadTemplatetype.value"
                  option-value="name"
                  option-label="name"
                  map-options
                  options-dense
                  behavior="menu"
                  emit-value
                  :options="templateOptions"
                  @input="setTypes(uploadTemplatetype.value)"
                  label="List of Templates"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Please fill the template'
                  ]"
                />
              </div>
              <div>
                <input
                  id="uploadFile"
                  type="file"
                  style="width: 250px"
                  accept=".doc,.docx,"
                  @change="onFileInputClick"
                />
                <span class="form-heading q-mt-lg text-capitalize q-pa-sm">
                  only doc and docx files are allowed
                </span>
              </div>
              <q-btn
                class="q-mt-md"
                size="md"
                color="primary"
                label="upload"
                @click="uploadFileToServer()"
              />
            </q-form>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { constants } from '@utils/constant';
import { validateEmail, errorMessage } from '@utils/validation';
import SubSideBar from 'components/SubSideBar';
import CustomBar from 'components/CustomBar';
import Ckeditor from 'components/Ckeditor';
import { getBase64 } from '@utils/common';

export default {
  name: 'SetConfiguration',
  components: {
    SubSideBar,
    CustomBar,
    Ckeditor
  },

  data() {
    return {
      toEditConfigurationData: false,
      newTab: '',
      uploadTemplateDialogBox: false,
      dataURl: '',
      indexValue: '',
      isEdit: false,
      alert: false,
      addTemplateDialogBox: false,
      tokenDialogBox: false,
      templateTokens: [],
      groupedTokens: [],
      templatetype: { value: '', machineValue: '' },
      configuration: {
        dataType: ''
      },
      toEditConfigurationWithoutSubtype: {
        type: '',
        attributes: [
          {
            value: '',
            machineValue: ''
          }
        ]
      },
      uploadTemplatetype: { value: '', machineValue: '', id: '' },
      definitions: {
        insert_img: {
          tip: 'Insertar Imagen',
          icon: 'photo',
          handler: this.insertImg // handler will call insertImg() method
        }
      },
      title: '',
      post: { body: '' },
      dialogBox: false,
      dialogBoxName: {},
      tab: { name: 'Inspection Type', key: 'inspectionType' },
      table: [],
      inspectionType: {
        value: '',
        subtypes: [{ value: '', duration: 0.5, unit: 'hour' }]
      },
      payload: {
        value: ''
      },

      configurationType: [
        { name: 'Inspection Type', key: 'inspectionType' },
        { name: ' Industry Type', key: 'industryType' },
        { name: 'Honorific', key: 'honorific' },
        { name: 'Phone Type', key: 'phoneType' },
        { name: 'Client Type', key: 'clientType' },
        { name: 'Policy Categories', key: 'policyCategories' },
        { name: 'Policy Type', key: 'policyType' },
        { name: 'Property Type', key: 'propertyType' },
        { name: 'Claim Reason', key: 'claimReason' },
        { name: 'Loss Cause', key: 'lossCause' },
        { name: 'Claim Severity', key: 'claimSeverity' },
        { name: 'Template Type', key: 'templateType' },
        { name: 'Template', key: 'template' }
      ]
    };
  },
  watch: {
    webSubOptionMenuTab() {
      (this.tab = this.webSubOptionMenuTab), this.setSelectedTab(this.tab);
    }
  },
  async created() {
    this.getAllConfigurationData();
    (this.tab = this.webSubOptionMenuTab), this.setSelectedTab(this.tab);
    this.getInspectionTypes().then(async () => {
      this.table = this.inspectionTypes;
    });
    console.log(this.setAllConfigurationData, 'setAllConfigurationData');
  },

  computed: {
    ...mapGetters([
      'setAllConfigurationData',
      'webSubOptionMenuTab',
      'contactTypes',
      'titles',
      'inspectionTypes',
      'vendorIndustries',
      'clientTypes',
      'policyTypes',
      'policyCategories',
      'propertyTypes',
      'claimReasons',
      'lossCauses',
      'claimSeverity',
      'templateOptions',
      'tokens',
      'templates'
    ])
  },

  methods: {
    ...mapActions([
      'getAllConfigurationData',
      'addUser',
      'addInspectionType',
      'addHonorifics',
      'addIndustry',
      'addPhone',
      'addClientType',
      'addPolicy',
      'addPolicyCategories',
      'addProperty',
      'addClaimReason',
      'addLoss',
      'addClaimSeverity',
      'addOnboardingStep',
      'getTitles',
      'getClientTypes',
      'getContactTypes',
      'getInspectionTypes',
      'getVendorIndustries',
      'getPolicyTypes',
      'getPolicyCategory',
      'getPropertyTypes',
      'getSeverityClaim',
      'getClaimReasons',
      'getLossCauses',
      'getTemplates',
      'addTemplateRemote',
      'getTemplateToken',
      'getAllTemplate',
      'editTemplate',
      'deleteTemplate',
      'addTemplateType',
      'uploadDocFileToServer',
      'addTemplate'
    ]),
    ...mapMutations(['setLoading', 'setNotification', 'webMenuSubOptionTab']),
    dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
      else byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: mimeString });
    },

    getBase64,
    //function is used to cancel the edit configuration data
    toCancelConfigurationEdit() {
      this.toEditConfigurationData = false;
    },
    //function is used to save the configuration edit data
    toSaveConfigurationEdit() {
      this.toEditConfigurationData = false;
    },
    //funvtion is used to edit the configurationData
    toEditConfiguration(data, index) {
      this.toEditConfigurationData = true;
      console.log(data, 'toEditConfiguration');
      this.toEditConfigurationWithoutSubtype.type = data.type;
      this.toEditConfigurationWithoutSubtype.attributes[index].value =
        data.value;
      this.toEditConfigurationWithoutSubtype.attributes[index].machineValue =
        data.machineValue;
    },
    async onFileInputClick(event) {
      document.getElementById('uploadFile').click();
      this.dataURI = await this.getBase64(event.target.files[0]);

      document.getElementById('uploadFile').value;
    },
    async uploadFileToServer() {
      var success = await this.$refs.uploadTemplateForm.validate();
      if (success && this.dataURI) {
        this.setLoading(true);

        const formData = new FormData();
        formData.append('templateValue', this.uploadTemplatetype.value);
        formData.append('file', this.dataURItoBlob(this.dataURI));

        const payload = {
          templateMachineValue: this.uploadTemplatetype.machineValue,
          formData: formData
        };
        await this.uploadDocFileToServer(payload);
        await this.getAllTemplate();

        this.setLoading(false);
        this.uploadTemplateDialogBox = false;
        this.$q.notify({
          message: ' please wait for sometime if document is not visible',
          position: 'top',
          type: 'positive',
          timeout: 7500
        });
        this.uploadTemplatetype = {};
      } else {
        this.$q.notify({
          message: 'Please fill the above details first',
          position: 'top',
          type: 'negative'
        });
      }
    },
    updateMarkup(val) {
      this.post.body = val;
    },

    openAddTemplateBox() {
      this.isEdit = false;
      this.templateTokens = [];
      this.groupedTokens = [];
      this.tokens.forEach(val => {
        var grpName = val.attributes.group;
        var tokenArr = [];

        val.attributes.tokens.forEach(token => {
          let arr = [];
          arr[0] = token.name;
          arr[1] = token.value;
          this.templateTokens.push(arr);
          tokenArr.push(arr);
        });
        this.groupedTokens.push({ groupName: grpName, tokens: tokenArr });
      });
      this.templatetype.value = '';
      this.post.body = '';
      this.addTemplateDialogBox = true;
    },

    async onSaveTemplate() {
      if (this.templatetype.value == '') {
        this.errorMessage(constants.successMessages.TEMPLATE_TYPE_NOT_SELECTED);
      } else if (this.post.body == '') {
        this.errorMessage(constants.successMessages.CKEDITOR_BODY_EMPTY);
      } else {
        if (this.isEdit) {
          const payload = {
            value: this.post.body,
            type: {
              machineValue: this.templatetype.machineValue,
              value: this.templatetype.value
            }
          };
          const success = await this.editTemplate(payload);
          if (success) {
            this.addTemplateDialogBox = false;
            await this.getAllTemplate();
          }
        } else {
          const payload = {
            value: this.post.body,
            type: {
              machineValue: this.templatetype.machineValue,
              value: this.templatetype.value
            }
          };
          const success = await this.addTemplate(payload);

          if (success) {
            this.addTemplateDialogBox = false;
            await this.getAllTemplate();
          }
        }

        this.post.body = '';
        this.templatetype.value = '';
        this.templatetype.machineValue = '';
        this.isEdit = false;
      }
    },

    async onDeleteConfirmation(val) {
      const payload = {
        type: this.indexValue
      };
      await this.deleteTemplate(payload);
      await this.getAllTemplate();
    },

    onDeleteTemplate(value) {
      this.indexValue = value.name.type.machineValue;
      this.alert = true;
    },

    onEditTemplate(value) {
      this.isEdit = true;
      this.templateTokens = [];
      this.groupedTokens = [];
      this.tokens.forEach(val => {
        // grp token code goes here
        var grpName = val.attributes.group;
        var tokenArr = [];

        // ends here
        val.attributes.tokens.forEach(token => {
          let arr = [];
          arr[0] = token.name;
          arr[1] = token.value;
          this.templateTokens.push(arr);
          tokenArr.push(arr);
        });
        this.groupedTokens.push({ groupName: grpName, tokens: tokenArr });
      });
      this.post.body = value.name.value;
      this.templatetype.value = value.name.type.value;
      this.templatetype.machineValue = value.name.type.machineValue;

      this.addTemplateDialogBox = true;
    },

    setTypes(value) {
      const obj = this.templateOptions.find(item => {
        return item.name === value;
      });
      this.templatetype.machineValue = obj.machineValue;
      this.uploadTemplatetype.machineValue = obj.machineValue;
      this.uploadTemplatetype.id = obj.id;
    },

    saveWork() {
      this.$q.notify({
        message: 'Saved your text to local storage',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
      });
    },

    uploadIt() {
      this.$q.notify({
        message: 'Server unavailable. Check connectivity.',
        color: 'red-5',
        textColor: 'white',
        icon: 'warning'
      });
    },

    tokenDialog() {
      this.tokenDialogBox = true;
    },

    setValueToTemplate(value) {
      this.post.body += value;
      this.tokenDialogBox = false;
    },

    async setSelectedTab(e) {
      this.tab = e;
      switch (this.tab.key) {
        case 'inspectionType':
          await this.getInspectionTypes();
          this.table = this.inspectionTypes;
          break;
        case 'honorific':
          await this.getTitles();
          this.table = this.titles;
          break;
        case 'industryType':
          await this.getVendorIndustries();
          this.table = this.vendorIndustries;
          break;
        case 'phoneType':
          await this.getContactTypes();
          this.table = this.contactTypes;
          break;
        case 'clientType':
          await this.getClientTypes();
          this.table = this.clientTypes;
          break;
        case 'policyType':
          await this.getPolicyTypes();
          this.table = this.policyTypes;
          break;
        case 'policyCategories':
          await this.getPolicyCategory();
          this.table = this.policyCategories;
          break;
        case 'propertyType':
          await this.getPropertyTypes();
          this.table = this.propertyTypes;
          break;
        case 'claimReason':
          await this.getClaimReasons();
          this.table = this.claimReasons;
          break;
        case 'lossCause':
          await this.getLossCauses();
          this.table = this.lossCauses;
          break;
        case 'claimSeverity':
          await this.getSeverityClaim();
          this.table = this.claimSeverity;
          break;
        case 'templateType':
          await this.getTemplates();
          this.table = this.templateOptions;
          break;
        case 'template':
          await this.getTemplates();
          await this.getAllTemplate();
          await this.getTemplateToken();
          this.table = this.templates;
      }
    },

    validateEmail,
    errorMessage,

    async onSubmit(tab) {
      var vald = await this.$refs.form.validate();
      if (vald) {
        switch (tab.key) {
          case 'inspectionType':
            for (var i = 0; i <= this.inspectionType.subtypes.length - 1; i++) {
              if (this.inspectionType.subtypes[i].value == '') {
                this.inspectionType.subtypes[i].value =
                  this.inspectionType.value;
              }
            }
            var response = await this.addInspectionType(this.inspectionType);
            break;
          case 'honorific':
            var response = await this.addHonorifics(this.payload);
            break;
          case 'industryType':
            var response = await this.addIndustry(this.payload);
            break;
          case 'phoneType':
            var response = await this.addPhone(this.payload);
            break;
          case 'clientType':
            var response = await this.addClientType(this.payload);
            break;
          case 'policyType':
            var response = await this.addPolicy(this.payload);
            break;
          case 'policyCategories':
            var response = await this.addPolicyCategories(this.payload);
            break;
          case 'propertyType':
            var response = await this.addProperty(this.payload);
            break;
          case 'claimReason':
            var response = await this.addClaimReason(this.payload);
            break;
          case 'lossCause':
            var response = await this.addLoss(this.payload);
            break;
          case 'claimSeverity':
            var response = await this.addClaimSeverity(this.payload);
            break;
          case 'templateType':
            var response = await this.addTemplateType(this.payload);
            break;
        }
        if (response) {
          this.setSelectedTab(tab);
          this.clear();
          this.dialogBox = false;
        }
      }
    },

    // This is Secondary Dialog Box
    onClickingAddButton(key) {
      this.dialogBoxName = key;
      this.dialogBox = true;
    },

    async addAnotherSubType() {
      var ValidateSubType = await this.$refs.form.validate();
      if (ValidateSubType) {
        this.inspectionType.subtypes.push({ type: ' ', duration: 0.5 });
      }
    },

    onClickRemoveSubType() {
      this.inspectionType.subtypes.pop();
    },

    //For clearing the Secondary Dilog box Data when clicked to clearing
    clear() {
      if (this.tab.key == 'inspectionType') {
        this.inspectionType = {
          value: '',

          subtypes: [{ value: '', duration: 0.5, unit: 'hour' }]
        };
      } else {
        this.payload.value = '';
      }
    },

    // onSaveInspectionType
    async onSaveInspectionType() {
      if (response) {
        this.getInspectionTypes();
        this.InspectionDialogBox = false;
        this.inspection = {
          value: '',

          subtypes: [
            { value: ' ', duration: 0.5, unit: 'hour', machineValue: '' }
          ]
        };
      } else {
        this.$q.notify({
          message: ' Server Response Failed',
          position: 'top',
          type: 'negative'
        });
      }
    }
  }
};
</script>
<style lang="scss">
.table {
  width: 100%;
  overflow: auto;
}
.table-th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: orangered;
  color: white;
}
.table-th1 {
  position: sticky;
  top: 0;
  z-index: 2;
  background: orangered;
  color: white;
}

.table-th,
.table-td {
  text-align: center;
  padding: 12px;
}

.table-tr:nth-child(odd) {
  background-color: white;
}
.table-tr:nth-child(even) {
  background-color: $grey-3;
}
.table-data {
  width: 33.33%;
  text-align: center;
}

::-webkit-scrollbar {
  width: 0px;
}

.inspection-dialog-box {
  height: 60vh;
  width: 50vw;

  .dialog-box-content {
    height: calc(55vh - 90px);
    overflow: auto;
  }
}
.other-dialog-box {
  height: 30vh;
  width: 40vw;
}
</style>
