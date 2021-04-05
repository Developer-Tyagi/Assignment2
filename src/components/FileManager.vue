<template>
  <q-page>
    <div>
      <div class="actions-div justify-between q-px-md">
        <q-breadcrumbs class="text-primary" active-color="grey" gutter="none">
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" color="primary" />
          </template>
          <q-breadcrumbs-el
            class="text-capitalize"
            v-for="breadCrumb in depth"
            :key="breadCrumb.name"
            :label="breadCrumb.name"
            @click="onBreadCrumbClick(breadCrumb)"
          ></q-breadcrumbs-el>
        </q-breadcrumbs>
        <div>
          <q-btn
            name="camera"
            @click="addFile"
            icon="camera_enhance"
            text-color="primary"
          />
          <q-btn name="add" @click="" icon="post_add" text-color="primary" />
          <q-btn
            name="upload"
            @click="addFolderDialog = true"
            icon="create_new_folder"
            text-color="primary"
            class="q-ml-sm"
          />
        </div>
      </div>
      <div class="mobile-container-page overflow-y">
        <div
          v-if="depth.length > 1"
          class="row-div vertical-center q-px-md q-py-xs"
          @click="onBackButtonClick"
        >
          <q-icon name="reply" size="sm" color="primary" /><span class="q-pl-md"
            >Back</span
          >
        </div>
        <div
          v-for="doc in documents"
          class="row-div"
          @click="onClickOnFile(doc)"
        >
          <div
            v-if="doc.type == 'folder'"
            class="vertical-center q-px-md q-py-xs"
          >
            <q-icon name="folder" size="sm" color="primary" />
            <span class="q-pl-md">{{ doc.name }}</span>
          </div>
          <div
            v-if="doc.type != 'folder'"
            class="vertical-center q-px-md q-py-sm"
          >
            <q-icon :name="iconType(doc.type)" size="sm" color="primary" />
            <span class="q-pl-md">{{ doc.name }}</span>
          </div>
        </div>
        <div v-if="!documents.length" class="fixed-heading">
          <span>No file in this folder</span>
        </div>
      </div>
    </div>

    <q-dialog v-model="addFolderDialog" persistent>
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
    <q-dialog v-model="addFileDialog" persistent>
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
  </q-page>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import request from '@api';
import { jsPDF } from 'jspdf';
import { Plugins, CameraResultType, CameraDirection } from '@capacitor/core';

const { Camera } = Plugins;

export default {
  name: 'FileManager',
  props: ['directoryId'],

  data() {
    return {
      depth: [],
      documents: [],
      addFolderDialog: false,
      addFileDialog: false,
      folderName: '',
      fileName: ''
    };
  },

  methods: {
    ...mapActions(['createDocuments', 'createDirectories']),
    ...mapMutations(['setLoading']),
    async addFile() {
      const imageData = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        direction: CameraDirection.Rear
      });
      this.setLoading(true);

      const jsPDFObj = new jsPDF('p', 'mm');
      jsPDFObj.addImage(imageData.dataUrl, 10, 10);
      this.pdfImage = jsPDFObj.output('datauristring');
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
          link: document.attributes.webViewLink
        }));
        this.addFolderDialog = false;
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
        const { data } = await request.get(
          `/documents?parent_id=${this.depth[this.depth.length - 1].id}`
        );
        this.documents = data.map(document => ({
          name: document.attributes.name,
          id: document.id,
          type: document.attributes.mimeType,
          link: document.attributes.webViewLink
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
          link: document.attributes.webViewLink
        }));
        this.depth.push({ name: 'home', id: this.directoryId });
        this.setLoading(false);
      } catch (e) {
        this.setLoading(false);
      }
    },

    async onClickOnFile(document) {
      if (document.type == 'folder') {
        this.setLoading(true);
        const { data } = await request.get(
          `/documents?parent_id=${document.id}`
        );
        this.documents = data.map(document => ({
          name: document.attributes.name,
          id: document.id,
          type: document.attributes.mimeType,
          link: document.attributes.webViewLink
        }));
        this.depth.push({ name: document.name, id: document.id });
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
        link: document.attributes.webViewLink
      }));
      this.depth.pop();
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
        link: document.attributes.webViewLink
      }));
      this.depth.splice(index + 1);
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
</style>
