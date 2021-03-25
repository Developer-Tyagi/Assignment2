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
            name="add"
            @click="addFileDialog = true"
            icon="post_add"
            text-color="primary"
          />
          <q-btn
            name="upload"
            @click="addFolderDialog = true"
            icon="create_new_folder"
            text-color="primary"
            class="q-ml-sm"
          />
        </div>
        <!-- <q-btn-dropdown color="primary" v-else>
          <q-list>
            <q-item clickable v-close-popup @click="addFileDialog = true">
              <q-item-section>
                <q-item-label>Add file</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="addFolderDialog = true">
              <q-item-section>
                <q-item-label>Add folder</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown> -->
      </div>
      <div>
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
          <q-input dense v-model="folderName" autofocus />
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
          <span class="q-ml-sm">Add file</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="fileName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="closeAddFile" />
          <q-btn flat label="Submit" color="primary" @click="addFile" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
import { Plugins, CameraResultType, CameraDirection } from '@capacitor/core';

const { Camera } = Plugins;
import request from '@api';
export default {
  name: 'ClientDocument',
  data() {
    return {
      depth: [],
      documents: [],
      claimId: '1HD84t8eOK25ZJGtPfMJOk4rjwM9zrv8t',
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
      if (this.fileName) {
        const image = await Camera.getPhoto({
          quality: 100,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          direction: CameraDirection.Rear
        });
        var byteString = atob(image.dataUrl.split(',')[1]);
        var mimeString = image.dataUrl
          .split(',')[0]
          .split(':')[1]
          .split(';')[0];
        // write the bytes of the string to a typed array
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var _ia = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
          _ia[i] = byteString.charCodeAt(i);
        }
        var dataView = new DataView(arrayBuffer);
        var file = new Blob([dataView], { type: mimeString });
        const formData = new FormData();
        formData.append('parentID', this.depth[this.depth.length - 1].id);
        formData.append('file', file, this.fileName);
        await this.createDocuments(formData);
        this.addFileDialog = false;
        this.fileName = '';
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
        this.setLoading(false);
      }
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
        this.setLoading(false);
      }
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
      const { data } = await request.get(
        `/documents?parent_id=${this.claimId}`
      );
      this.documents = data.map(document => ({
        name: document.attributes.name,
        id: document.id,
        type: document.attributes.mimeType,
        link: document.attributes.webViewLink
      }));
      this.depth.push({ name: 'home', id: this.claimId });
      this.setLoading(false);
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
