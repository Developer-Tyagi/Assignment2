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
    <div class="actions-div justify-between q-px-md" v-if="depth.length > 1">
      <q-breadcrumbs class="text-primary" active-color="grey" gutter="none">
        <template v-slot:separator> </template>
        <div
          v-if="depth.length > 1"
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
      <q-card style="width: 550px; height: 200px">
        <q-card-section class="items-center form-heading q-ml-md">
          <div class="row">
            <div class="column q-ml-xl">
              <q-btn
                name="upload"
                icon="share"
                @click="(shareDialog = true), (foldersAndFilesOptions = false)"
                text-color="primary"
                class="q-ml-sm"
              />
              <div class="form-heading q-ml-md">Share</div>
            </div>

            <div
              class="column"
              v-if="documents[index] && documents[index].properties == null"
            >
              <q-btn
                class="q-ml-md"
                icon="delete"
                text-color="primary"
                style="width: 50px"
                @click="(alert = true), (foldersAndFilesOptions = false)"
              />
              <div class="form-heading q-ml-md">Remove</div>
            </div>

            <div
              class="col-3"
              v-if="generateClaimDocument && documentType"
              @click="onClickSignedDoc"
            >
              <q-btn
                class="q-ml-md"
                icon="refresh"
                text-color="primary"
                style="width: 50px"
              />
              <div class="form-heading q-ml-md">
                Fetch signed updated document
              </div>
            </div>
            <div v-else>
              <div class="col-3" v-if="generateClaimDocument && !documentType">
                <q-btn
                  class="q-ml-md"
                  icon="edit"
                  text-color="primary"
                  style="width: 50px"
                  @click="onClickSignDocument(documents[index].id)"
                />
                <div class="form-heading q-ml-md">
                  Sign Document
                </div>
              </div>
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
            </q-card>
          </div>
          <div class="q-ma-lg">
            <q-card>
              <div class="text-center q-mt-lg text-bold">Roles</div>
              <q-separator class="bg-primary" />
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
          @closeDialog="signDocumentDialog = false"
        />

        <q-option-group
          :options="claimActors"
          type="checkbox"
          v-model="signActor"
        ></q-option-group>
        <q-btn
          label="Send"
          color="primary"
          class="button-width-90 fixed-bottom q-mb-xl"
          size="'xl'"
          @click="onClickSendDocument()"
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

export default {
  name: 'FileManager',
  components: { DeleteAlert, CustomBar },
  props: ['directoryId', 'generateClaimDocument'],

  data() {
    return {
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
  created() {
    this.getTemplates();
    this.getAllActorToClaim();

    for (var i in this.actors) {
      const role =
        this.actors[i].role && this.actors[i].role.value
          ? this.actors[i].role.value
          : '';

      this.claimActors.push({
        label: this.actors[i].name + ' - ' + role,
        value:
          this.actors[i].role && this.actors[i].role.value
            ? this.actors[i].role.value
            : '',
        id: this.actors[i].id,
        type: this.actors[i].type,
        name: this.actors[i].name
      });
    }
  },
  computed: {
    ...mapGetters([
      'fileRoleOptions',
      'selectedClaimId',
      'claimRoles',
      'allUsers',
      'templateOptions',
      'actors'
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
    ...mapMutations(['setLoading']),
    onClickSignDocument(documentId) {
      this.signDocumentDialog = true;

      this.selectedDocumentId = documentId;
    },
    async onClickSignedDoc() {
      await this.getSignedDocument(this.selectedClaimId);
    },
    onDocumentClick(link) {
      window.open(link);
    },
    async onClickSendDocument() {
      const payload = {
        claimID: this.selectedClaimId,
        data: {
          recipients: this.claimActors,
          // recipients:[]
          documentIDs: [this.selectedDocumentId]
        }
      };
      await this.signDocuments(payload);
      this.signDocumentDialog = false;
      this.foldersAndFilesOptions = false;
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
      formData.append('parentID', this.depth[this.depth.length - 1].id);
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
        `/documents?parent_id=${this.depth[this.depth.length - 1].id}`
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
          `/documents?parent_id=${this.depth[this.depth.length - 1].id}`
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
        `/documents?parent_id=${this.depth[this.depth.length - 1].id}`
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
          parentID: this.depth[this.depth.length - 1].id
        };
        await this.createDirectories(payload);
        this.setLoading(true);
        const { data } = await request.get(
          `/documents?parent_id=${this.depth[this.depth.length - 1].id}`
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
        formData.append('parentID', this.depth[this.depth.length - 1].id);
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
          `/documents?parent_id=${this.depth[this.depth.length - 1].id}`
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
      const documentId = this.depth[this.depth.length - 2].id;
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
      this.depth[this.currentPath - 1].name = response.attributes.directoryName;
      this.setLoading(false);
    }
  },

  async mounted() {
    this.getDocuments();
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
</style>
