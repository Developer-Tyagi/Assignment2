<template>
  <q-page>
    <q-card class="form-card q-pa-md">
      <!-- <div
        v-for="(doc, index) in claimDocument.attributes.documents"
        class="row-div"
      > -->
      <!-- <div class="vertical-center q-px-sm q-py-sm">
        <div class="row">
          <q-icon :name="iconType(doc.mimeType)" size="sm" color="primary" />
          <span class="q-pl-md" @click="onDocClick(doc)"> {{ doc.name }}</span>
          <q-btn
            class="q-ml-auto"
            icon="delete"
            size="sm"
            text-color="primary"
            @click="onDeleteDocument(doc, index)"
            flat
          />
        </div>
      </div> -->
      <!-- </div> -->
      <!-- <div class="row" v-if="claimDocument.attributes.documents.length < 1"> -->
      <div class="row">
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
            @change="onPOLFileInputClick"
          />
        </div>
        <div>
          <q-btn
            class="q-ml-md"
            icon="add_a_photo"
            @click="addFile('estimate')"
            text-color="primary"
            style="width: 50px"
          />
          <div class="form-heading q-ml-lg">Scan</div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return { dataURl: '' };
  },

  computed: {
    ...mapGetters(['selectedClaimId'])
  },

  created() {},
  methods: {
    ...mapActions(['uploadClaimDocument']),
    onClickUploadButton() {
      document.getElementById('uploadFile').click();
    },
    async onPOLFileInputClick(event) {
      this.dataURl = await this.getBase64(event.target.files[0]);
      this.uploadPdfToServer();
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
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

    async uploadPdfToServer() {
      const formData = new FormData();
      formData.append('file', this.dataURItoBlob(this.dataURl));
      formData.append('type', 'pol_notarized');
      const payload = {
        id: this.selectedClaimId,
        formData: formData
      };
      await this.uploadClaimDocument(payload);
      //   this.getClaimEstimateDoc(this.selectedClaimId);
      this.setLoading(false);
      this.dataURl = '';
    }
  }
};
</script>
