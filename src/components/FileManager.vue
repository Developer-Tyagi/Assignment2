<template>
  <div>
    <q-card
      class="q-pa-sm input-style input-overlay  col-5"
      v-if="generateClaimDocument"
    >
      <div class="text-bold q-mt-sm q-ml-sm">Template Type</div>

      <q-select
        dense
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
        :rules="[val => (val && val.length > 0) || 'Please fill the template']"
      />

      <div class="full-width column items-center q-mb-md ">
        <q-btn
          v-if="templatetype.value"
          color="primary"
          size="'xl'"
          class="button-width-90 text-capitalize"
          label="Generate Claim Document"
          @click="onClickGenerateDocument"
        />
      </div>
    </q-card>
    <div class="actions-div justify-between q-px-md" v-if="depth.length > 0">
      <q-breadcrumbs class="text-primary" active-color="grey" gutter="none">
        <template v-slot:separator> </template>
        <div
          v-if="depth.length > 0"
          class="row-div vertical-center q-px-sm q-py-xs"
          @click="onBackButtonClick"
        >
          <q-icon name="reply" size="sm" color="primary" />
        </div>
        <q-breadcrumbs-el @click="onBreadCrumbClick(depth[currentPath], index)"
          >{{ depth[currentPath - 1] ? depth[currentPath - 1].name : '-' }}
        </q-breadcrumbs-el>
      </q-breadcrumbs>
      <div>
        <q-icon
          v-if="depth.length > 1"
          @click="onClickTopMenu"
          name="more_vert"
          size="sm"
          class="q-ml-auto"
        />
      </div>
    </div>
    <div>
      <div v-for="(doc, index) in documents" class="row-div">
        <div
          v-if="doc.type == 'folder'"
          class="vertical-center q-px-md q-py-xs"
        >
          <q-icon name="folder" size="sm" color="primary" />
          <div class="q-pl-md" @click="onClickOnFile(doc)">
            {{ doc.name }}
          </div>
          <q-icon
            @click="onShareClick(index)"
            name="more_vert"
            size="sm"
            class="q-ml-auto"
          />
        </div>
        <div
          v-if="doc.type != 'folder'"
          class="vertical-center q-px-md q-py-sm"
        >
          <q-icon :name="iconType(doc.type)" size="sm" color="primary" />
          <span class="q-pl-md" @click="onDocumentClick(doc.link)">{{
            doc.name
          }}</span>
          <q-icon
            @click="onShareClick(index)"
            name="more_vert"
            size="sm"
            class="q-ml-auto"
          />
        </div>
      </div>
      <div v-if="!documents.length" class=" heading-light row justify-center ">
        <div>This folder is empty</div>
      </div>
    </div>
    <div class="row">
      <q-btn
        class="q-ml-auto"
        @click="uploadFilesOptions = true"
        size="sm"
        label="Add"
        color="primary"
        v-if="!assignDialog"
      ></q-btn>
    </div>

    <!-- Add Folder Dialog -->

    <q-dialog v-model="addFolderDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add Folder</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="folderName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="closeAddFolder" />
          <q-btn flat label="Submit" color="primary" @click="addFolder" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Add File Dialog  -->

    <q-dialog v-model="addFileDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add file as</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="fileName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="closeAddFile" />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="addPdfFileToServer"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Upload File Options Dialog  -->

    <q-dialog
      v-model="uploadFilesOptions"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
      :position="'bottom'"
    >
      <q-card style="width: 550px; height: 200px">
        <div class="text-center q-mt-md text-bold">Create New</div>
        <q-card-section class="items-center form-heading q-ml-md">
          <div class="row q-ml-xl">
            <div class="column">
              <q-btn
                name="upload"
                @click="addFolderDialog = true"
                icon="create_new_folder"
                text-color="primary"
                class="q-ml-sm"
              />
              <div class="form-heading q-ml-md">Folder</div>
            </div>
            <div class="column">
              <q-btn
                class="q-ml-md"
                icon="cloud_upload"
                text-color="primary"
                style="width: 50px"
                @click="onClickUploadButton"
              />
              <div class="form-heading q-ml-md">Upload</div>
              <input
                id="uploadFile"
                type="file"
                accept="image/*,.pdf"
                hidden
                @change="onFileInputClick"
              />
            </div>
            <div class="column">
              <q-btn
                class="q-ml-md"
                icon="add_a_photo"
                @click="addFile"
                text-color="primary"
                style="width: 50px"
              />
              <div class="form-heading q-ml-lg">Scan</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="foldersAndFilesOptions"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
      :position="'bottom'"
    >
      <q-card style="width: 350px">
        <q-card-section class="items-center">
          <div
            class="q-pa-md heading-light"
            @click="(shareDialog = true), (foldersAndFilesOptions = false)"
          >
            Share
          </div>
          <div
            v-if="documents[index] && documents[index].properties == null"
            class="q-pa-md heading-light"
            @click="(alert = true), (foldersAndFilesOptions = false)"
          >
            Remove
          </div>
          <div
            class="q-pa-md heading-light"
            v-if="generateClaimDocument && documentType"
            @click="onFetchDocumentClick"
          >
            Fetch Signed Updated Document
          </div>
          <div v-else>
            <div
              class="q-pa-md heading-light"
              v-if="generateClaimDocument && !documentType"
              @click="onClickSignDocument(documents[index].id)"
            >
              Sign Document
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Share Files And Folder Dialog -->

    <q-dialog
      v-model="shareDialog"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 500px">
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Share</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>
            <q-select
              v-model="role.value"
              dense
              class="full-width"
              option-label="name"
              label="Roles"
              autofocus
              :options="fileRoleOptions"
              option-value="name"
              behavior="menu"
              options-dense
              emit-value
              options-dense
            >
            </q-select>
          </div>

          <div class="custom-select" @click="onSelectPersonOrGroup">
            <div class="select-text" v-if="!assignFilter">
              Click Person / Group
            </div>
            <q-card
              bordered
              v-if="assignFilter"
              @click="assignDialog = true"
              class="q-my-md q-pa-md"
            >
              <div class="text-bold">
                {{ assignFilter }}
              </div>
            </q-card>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="shareDialog = false"
          />
          <q-btn
            flat
            label="Assign "
            color="primary"
            @click="onAssignClick()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Assign Dialog -->

    <q-dialog v-model="assignDialog">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <div class="mobile-container-page">
          <div class="text-bold q-ma-sm q-mb-none">Select Person/Group</div>

          <div class="q-ma-lg">
            <q-card>
              <div class="text-center q-mt-lg text-bold">Users</div>
              <q-separator class="bg-primary" />
              <q-scroll-area style="height:30vh">
                <div
                  v-for="user in allUsers"
                  :key="user.id"
                  class="q-ml-xs q-pt-sm"
                >
                  <div class="row">
                    <q-radio
                      @input="setUsersName(user.name)"
                      v-model="assignFilter"
                      :val="user.name"
                      dense
                      size="xs"
                      class="q-mb-xs"
                    />
                    <div class="q-pt-none">
                      <span class="q-ml-sm q-mt-xs"> {{ user.name }}</span>
                    </div>
                  </div>
                </div>
              </q-scroll-area>
            </q-card>
          </div>
          <div class="q-ma-lg">
            <q-card>
              <div class="text-center q-mt-lg text-bold">Roles</div>
              <q-separator class="bg-primary" />
              <q-scroll-area style="height:30vh">
                <div
                  v-for="filter in claimRoles"
                  :key="filter.id"
                  class="q-ml-xs q-pt-sm"
                >
                  <div class="row">
                    <q-radio
                      @input="setFilterName(filter.name)"
                      v-model="assignFilter"
                      :val="filter.name"
                      dense
                      size="xs"
                      class="q-mb-xs"
                    />
                    <div class="q-pt-none">
                      <span class="q-ml-sm q-mt-xs"> {{ filter.name }}</span>
                    </div>
                  </div>
                </div>
              </q-scroll-area>
            </q-card>
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
                  label="Select"
                  @click="assignDialog = false"
                />
              </div>
            </div>
          </q-footer>
        </div>
      </q-layout>
    </q-dialog>
    <!-- Alert delete Box -->
    <q-dialog v-model="alert">
      <q-card>
        <DeleteAlert @close="alert = false" @onDelete="removeDocument" />
      </q-card>
    </q-dialog>

    <!-- Upload File Dialog -->
    <q-dialog v-model="uploadFileDailog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add file as</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="uploadFileName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="uploadFileDailog = false"
          />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="uploadPdfToServer"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Sign Document Dialog -->
    <q-dialog
      v-model="signDocumentDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          dialogName="Send Document"
          @closeDialog="onClickCloseDialog"
        />
        <div class="mobile-container-page q-pa-sm form-height ">
          <span>Send To</span>
          <div>
            <q-radio v-model="sendToRadio" val="Email" label="Email"></q-radio>
            <q-radio
              class="q-ml-none"
              v-model="sendToRadio"
              val="User"
              label="User"
            ></q-radio>
          </div>
          <div v-if="sendToRadio == 'User'">
            <div class="column " v-for="(actor, index) in claimActors">
              <div class="row q-pa-sm">
                <div class="column q-mt-sm">
                  <span style="font-weight:normal ">{{ actor.name }} </span>
                  <div v-for="(role, index) in actor.role">
                    <q-badge rounded>
                      <span>{{ role.value ? role.value : '' }}</span>
                    </q-badge>
                  </div>
                  <q-badge color="primary" v-if="!actor.role" rounded>
                    <span>{{ actor.type ? actor.type : '' }}</span>
                  </q-badge>
                </div>
                <div class="flex q-ml-auto ">
                  <q-checkbox
                    v-model="actor.isEnabled"
                    color="$primary"
                    size="xs"
                    @input="setClaimActors(actor)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="sendToRadio == 'Email'">
            <div v-for="(email, index) in emails" class="row q-mt-sm">
              <q-input
                outlined
                dense
                v-model="email.email"
                class="col-7"
                label="Email"
                type="email"
                lazy-rules
                :rules="[
                  val =>
                    validateEmail(val) ||
                    'You have entered an invalid email address!'
                ]"
              />
              <q-icon
                name="delete"
                class="col-1 cursor-pointer"
                color="primary"
                @click="removeEmail()"
              />
            </div>
            <q-btn
              class="cursor-pointer q-mb-md text-primary q-mt-xs"
              @click="onClickAddEmail()"
              label="Enter Another Email"
            />
          </div>
        </div>
        <q-btn
          label="Send"
          color="primary"
          class="button-width-90 fixed-bottom q-mb-xl"
          size="'xl'"
          @click="onClickSendDocument()"
        />
      </q-card>
    </q-dialog>

    <!-- Fetch Document Dialog -->

    <q-dialog
      v-model="documentStatusDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          dialogName="Document Status"
          @closeDialog="
            (documentStatusDialog = false), (foldersAndFilesOptions = false)
          "
        />

        <div class="q-mt-md q-ml-xl row">
          <div class="q-mt-none text-bold text-capitalize col-xs-4 ">
            Recipients
          </div>
          <div class="column q-ml-md text-bold text-capitalize">
            Status
          </div>
        </div>

        <q-separator />
        <div
          class="q-mt-md q-ml-xl row"
          v-for="doc in signedDocuments.recipients"
        >
          <div class="q-mt-none row col-xs-4 ">
            {{ doc.name }}
          </div>
          <div class="column q-ml-md">
            {{ doc.status }}
          </div>
          <div
            class="q-ml-auto  q-ml-xl q-mb-xs q-mr-md"
            v-if="doc && doc.status == 'completed'"
          >
            <q-icon name="check" size="md" color="primary" />
          </div>
        </div>
        <q-btn
          label="Close"
          color="primary"
          class="button-width-90 fixed-bottom q-mb-xl"
          size="'xl'"
          @click="
            (documentStatusDialog = false), (foldersAndFilesOptions = false)
          "
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import request from '@api';
import { jsPDF } from 'jspdf';
import { Plugins, CameraResultType, CameraDirection } from '@capacitor/core';
import DeleteAlert from 'components/DeleteAlert';
const { Camera } = Plugins;
import CustomBar from 'components/CustomBar';
import { setNotification } from 'src/store/common/mutations';
import { validateEmail } from '@utils/validation';

export default {
  name: 'FileManager',
  components: { DeleteAlert, CustomBar },
  props: ['directoryId', 'generateClaimDocument'],

  data() {
    return {
      sendToRadio: '',
      emails: [{ email: '', type: 'external', name: '' }],
      signedDocuments: '',
      documentStatusDialog: false,
      documentType: '',
      isSelected: true,
      signActor: [],
      claimActors: [],
      selectedDocumentId: '',
      templatetype: { value: '', machineValue: '' },
      signDocumentDialog: false,
      index: '',
      id: '',
      isSystemGen: '',
      alert: false,
      uploadFileName: '',
      uploadFileDailog: false,
      currentPath: '',
      depth: [],
      documents: [],
      addFolderDialog: false,
      addFileDialog: false,
      folderName: '',
      fileName: '',
      uploadFilesOptions: false,
      foldersAndFilesOptions: false,
      shareDialog: false,
      options: [],
      role: { value: null, id: '', machineValue: '' },
      isAssignDisabled: true,
      assignDialog: false,
      filterName: '',
      userRole: '',
      assignFilter: '',
      documentID: '',
      allFolderId: '',
      assignUser: '',
      allFolder: false
    };
  },
  async created() {
    const { data } = await request.get(
      `/documents?parent_id=${this.directoryId}`
    );

    this.setLoading(true);

    this.documents = data.map(document => ({
      name: document.attributes.name,
      id: document.id,
      type: document.attributes.mimeType,
      link: document.attributes.webViewLink,
      properties: document.attributes.properties
    }));
    this.getTemplates();
    await this.getAllActorToClaim(this.selectedClaimId);
  },
  computed: {
    ...mapGetters([
      'fileRoleOptions',
      'selectedClaimId',
      'claimRoles',
      'allUsers',
      'templateOptions',
      'actors',
      'templates'
    ])
  },

  methods: {
    ...mapActions([
      'createDocuments',
      'createDirectories',
      'getClaimRoles',
      'shareFolderAndFiles',
      'deleteDocument',
      'getFolderDocuments',
      'getAllUsers',
      'deleteDirectory',
      'generateClaimDoc',
      'getTemplates',
      'getAllActorToClaim',
      'signDocuments',
      'getSignedDocument'
    ]),
    ...mapMutations(['setLoading', 'setNotification']),
    validateEmail,
    removeEmail() {
      this.emails.pop();
    },

    setClaimActors(actor) {
      this.signActor.push({
        id: actor.id,
        name: actor.name,
        type: actor.type
      });
    },

    async onClickSignDocument(documentId) {
      const response = await this.getSignedDocument(this.selectedClaimId);

      for (var index in this.actors) {
        this.claimActors.push({
          label: this.actors[index].name,
          value:
            this.actors[index].roles && this.actors[index].roles[0].value
              ? this.actors[index].roles[0].value
              : '',
          id: this.actors[index].id,
          type: this.actors[index].type,
          name: this.actors[index].name,
          isEnabled: false,
          role: this.actors[index].roles
        });
      }
      if (
        !response.attributes.status ||
        response.attributes.status == 'completed'
      ) {
        this.signDocumentDialog = true;
        this.selectedDocumentId = documentId;
      } else {
        this.setNotification({
          type: 'negative',
          message: 'Previous document is not signed yet!'
        });
      }
    },
    async onFetchDocumentClick() {
      const response = await this.getSignedDocument(this.selectedClaimId);

      this.signedDocuments = response.attributes;
      if (response.attributes.status) {
        this.documentStatusDialog = true;
      } else {
        this.setNotification({
          type: 'negative',
          message: 'there is no signed document!!'
        });
        this.foldersAndFilesOptions = false;
      }
    },
    onDocumentClick(link) {
      window.open(link);
    },
    async onClickSendDocument() {
      if (this.sendToRadio != 'User') {
        var payload = {
          claimID: this.selectedClaimId,
          data: {
            recipients: this.emails,
            driveIDs: [this.selectedDocumentId]
          }
        };
      } else {
        var payload = {
          claimID: this.selectedClaimId,
          data: {
            recipients: this.signActor,
            driveIDs: [this.selectedDocumentId]
          }
        };
      }

      await this.signDocuments(payload);
      this.signDocumentDialog = false;
      this.foldersAndFilesOptions = false;
      this.signActor = [];
      this.claimActors = [];
      this.emails = [{ email: '', type: 'external', name: '' }];
    },
    onSelectPersonOrGroup() {
      this.getClaimRoles();
      this.getAllUsers();
      this.assignDialog = true;
    },
    async onFileInputClick(event) {
      this.dataURl = await this.getBase64(event.target.files[0]);
      const file = document.getElementById('uploadFile').value;
      this.selectFile = file.split('\\').pop();
      this.selectFile = this.selectFile.split('.');
      await this.uploadPdfToServer();
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    async onClickUploadButton(value) {
      await document.getElementById('uploadFile').click();
    },
    async uploadPdfToServer() {
      this.setLoading(true);
      const formData = new FormData();
      formData.append(
        'parentID',
        this.depth &&
          this.depth.length > 0 &&
          this.depth[this.depth.length - 1].id
          ? this.depth[this.depth.length - 1].id
          : this.directoryId
      );
      formData.append(
        'file',
        this.dataURItoBlob(this.dataURl),
        this.selectFile[0]
      );

      await this.createDocuments(formData);
      this.selectFile[0] = '';
      this.uploadFilesOptions = false;
      this.uploadFileDailog = false;

      const { data } = await request.get(
        `/documents?parent_id=${
          this.depth && this.depth.length > 0
            ? this.depth[this.depth.length - 1].id
            : this.directoryId
        }`
      );

      this.documents = data.map(document => ({
        name: document.attributes.name,
        id: document.id,
        type: document.attributes.mimeType,
        link: document.attributes.webViewLink,
        properties: document.attributes.properties
      }));
      this.setLoading(false);
    },
    onClickTopMenu() {
      this.foldersAndFilesOptions = true;
      this.allFolder = true;
    },
    async removeDocument() {
      if (this.allFolder) {
        this.id = this.allFolderId;
        this.deleteDirectory(this.id);
        this.id = '';
      } else {
        this.id = this.documentID;
        await this.deleteDocument(this.id);
      }

      if (this.allFolder) {
        this.allFolder = false;
        this.depth.pop();
        this.currentPath = this.depth.length;
        const { data } = await request.get(
          `/documents?parent_id=${
            this.depth && this.depth.length > 0
              ? this.depth[this.depth.length - 1].id
              : this.directoryId
          }`
        );
        this.documents = data.map(document => ({
          name: document.attributes.name,
          id: document.id,
          type: document.attributes.mimeType,
          link: document.attributes.webViewLink,
          properties: document.attributes.properties
        }));
      }
      const { data } = await request.get(
        `/documents?parent_id=${
          this.depth && this.depth.length > 0
            ? this.depth[this.depth.length - 1].id
            : this.directoryId
        }`
      );
      this.documents = data.map(document => ({
        name: document.attributes.name,
        id: document.id,
        type: document.attributes.mimeType,
        link: document.attributes.webViewLink
      }));

      this.assignDialog = false;
      this.shareDialog = false;
      this.foldersAndFilesOptions = false;
      this.allFolder = false;
      this.id = '';
    },
    onShareClick(index) {
      this.documentType = this.documents[index].type == 'folder';

      if (
        this.documents[index].properties &&
        this.documents[index].properties.isSystemGen
      ) {
        this.isSystemGen = this.documents[index].properties.isSystemGen;
      }
      this.foldersAndFilesOptions = true;
      this.documentID = this.documents[index].id;
      this.index = index;
    },
    async onAssignClick() {
      const payload = {
        id: this.documentID,
        shareData: {
          type: this.assignFilter,
          role: this.role.value,

          id: this.documentID
        }
      };

      await this.shareFolderAndFiles(payload);
      this.assignDialog = false;
      this.shareDialog = false;
      this.foldersAndFilesOptions = false;
      this.role.value = '';
      this.assignFilter = '';
    },
    setFilterName(name) {
      this.filterName = name;
    },
    setUsersName(name) {
      this.userRole = name;
    },

    async addFile() {
      const imageData = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        direction: CameraDirection.Rear
      });
      this.setLoading(true);
      // const jsPDFObj = new jsPDF('p', 'mm');
      // jsPDFObj.addImage(imageData.dataUrl, 10, 10);
      // this.pdfImage = jsPDFObj.output('datauristring');
      this.pdfImage = imageData.dataUrl;
      this.addFileDialog = true;
      this.setLoading(false);
    },

    async addFolder() {
      if (this.folderName) {
        const payload = {
          name: this.folderName,
          parentID:
            this.depth && this.depth.length > 0
              ? this.depth[this.depth.length - 1].id
              : this.directoryId
        };
        await this.createDirectories(payload);
        this.setLoading(true);
        const { data } = await request.get(
          `/documents?parent_id=${
            this.depth && this.depth.length > 0
              ? this.depth[this.depth.length - 1].id
              : this.directoryId
          }`
        );
        this.documents = data.map(document => ({
          name: document.attributes.name,
          id: document.id,
          type: document.attributes.mimeType,
          link: document.attributes.webViewLink,
          properties: document.attributes.properties
        }));
        this.addFolderDialog = false;
        this.uploadFilesOptions = false;
        this.folderName = '';
        this.setLoading(false);
      }
    },

    async addPdfFileToServer() {
      if (this.fileName) {
        this.setLoading(true);
        const formData = new FormData();

        formData.append(
          'parentID',
          this.depth && this.depth.length > 0
            ? this.depth[this.depth.length - 1].id
            : this.directoryId
        );
        formData.append(
          'file',
          this.dataURItoBlob(this.pdfImage),
          this.fileName
        );

        await this.createDocuments(formData);
        this.fileName = '';
        this.addFileDialog = false;
        this.uploadFilesOptions = false;
        const { data } = await request.get(
          `/documents?parent_id=${
            this.depth && this.depth.length > 0
              ? this.depth[this.depth.length - 1].id
              : this.directoryId
          }`
        );

        this.documents = data.map(document => ({
          name: document.attributes.name,
          id: document.id,
          type: document.attributes.mimeType,
          link: document.attributes.webViewLink,
          properties: document.attributes.properties
        }));
        this.setLoading(false);
      }
    },

    dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
      else byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: mimeString });
    },

    closeAddFolder() {
      this.folderName = '';
      this.addFolderDialog = false;
    },

    closeAddFile() {
      this.fileName = '';
      this.addFileDialog = false;
    },

    async getDocuments() {
      this.setLoading(true);
      try {
        const { data } = await request.get(
          `/documents?parent_id=${this.directoryId}`
        );

        this.documents = data.map(document => ({
          name: document.attributes.name,
          id: document.id,
          type: document.attributes.mimeType,
          link: document.attributes.webViewLink,
          properties: document.attributes.properties
        }));
        this.depth.push({ name: '', id: this.directoryId });
        this.setLoading(false);
      } catch (e) {
        this.setLoading(false);
      }
    },

    async onClickOnFile(document) {
      this.allFolderId = document.id;
      this.documentType = document.type;

      if (document.type == 'folder') {
        this.setLoading(true);
        const { data } = await request.get(
          `/documents?parent_id=${document.id}`
        );
        if (this.allFolder) {
          this.allFolderId = document.id;
        }
        this.documents = data.map(document => ({
          name: document.attributes.name,
          id: document.id,
          type: document.attributes.mimeType,
          link: document.attributes.webViewLink,
          properties: document.attributes.properties
        }));

        this.depth.push({ name: document.name, id: document.id });
        const length = this.depth.length;

        this.currentPath = length;

        this.setLoading(false);
      } else {
        window.open(document.link);
      }
    },

    async onBackButtonClick() {
      const documentId =
        this.depth && this.depth.length > 1
          ? this.depth[this.depth.length - 2].id
          : this.directoryId;
      this.setLoading(true);
      const { data } = await request.get(`/documents?parent_id=${documentId}`);
      this.documents = data.map(document => ({
        name: document.attributes.name,
        id: document.id,
        type: document.attributes.mimeType,
        link: document.attributes.webViewLink,
        properties: document.attributes.properties
      }));
      this.depth.pop();
      this.currentPath = this.depth.length;
      this.setLoading(false);
    },

    iconType(type) {
      const filetype = type.split('/').pop();
      switch (filetype) {
        case 'pdf':
          return 'picture_as_pdf';
        case 'png':
        case 'jpeg':
          return 'photo';
      }
    },

    async onBreadCrumbClick(crumb) {
      const index = this.depth.findIndex(val => val.id === crumb.id);
      this.setLoading(true);
      const { data } = await request.get(`/documents?parent_id=${crumb.id}`);
      this.documents = data.map(document => ({
        name: document.attributes.name,
        id: document.id,
        type: document.attributes.mimeType,
        link: document.attributes.webViewLink,
        properties: document.attributes.properties
      }));
      this.depth.splice(index + 1);
      this.setLoading(false);
    },
    setTypes(value) {
      const obj = this.templateOptions.find(item => {
        return item.name === value;
      });
      this.templatetype.machineValue = obj.machineValue;
    },
    async onClickGenerateDocument() {
      if (this.isOnline) {
        const payload = {
          claimID: this.selectedClaimId,
          data: {
            template: this.templatetype.machineValue
          }
        };
        const response = await this.generateClaimDoc(payload);

        const { data } = await request.get(
          `/documents?parent_id=${response.attributes.parentID}`
        );

        this.setLoading(true);
        if (this.allFolder) {
          this.allFolderId = document.id;
        }
        this.documents = data.map(document => ({
          name: document.attributes.name,
          id: document.id,
          type: document.attributes.mimeType,
          link: document.attributes.webViewLink,
          properties: document.attributes.properties
        }));

        this.depth.push({ name: document.name, id: document.id });
        const length = this.depth.length;

        this.currentPath = length;
        this.depth[this.currentPath - 1].name =
          response.attributes.directoryName;
        this.setLoading(false);
      } else {
        this.convertHtmlToPdf(this.templates[0].name.value);
      }
    },
    convertHtmlToPdf(value) {
      console.log(this.templates[0].name.value, 'ss');
      var demo = this.templates[0].name.value;
      var doc = new jsPDF();

      // doc.html(demo, 15, 15);
      doc.html(demo, {
        callback: function(doc) {
          const respone = doc.save();
          console.log(respone, 'res');
        },
        x: 10,
        y: 10
      });
      // doc.save('sample-page.pdf');
    },
    onClickAddEmail() {
      this.emails.push({ email: '', type: 'external', name: '' });
    },
    onClickCloseDialog() {
      this.signDocumentDialog = false;
      this.foldersAndFilesOptions = false;
      this.claimActors = [];
    },

    async mounted() {
      this.getDocuments();
    }
  }
};
</script>
<style lang="scss">
.vertical-center {
  display: flex;
  align-items: center;
}

.row-div:hover {
  background-color: rgba($color: $primary, $alpha: 0.2);
}

.fixed-heading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
.file-add-icon {
  position: absolute;
  right: 5px;
  top: -40px;
  font-size: 24px;
  z-index: 10000;
}
.office-task-list {
  height: calc(100vh - 365px);
  overflow-y: auto;
}
</style>
