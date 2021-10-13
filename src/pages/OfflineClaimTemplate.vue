<template>
  <div>
    <q-card class="q-pa-sm input-style input-overlay  col-5">
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
      <div v-if="signedDocument" class="q-pa-md">
        <q-icon
          name="picture_as_pdf"
          size="sm"
          color="primary"
          class="q-ml-md"
        />
        <span class="q-pl-md cursor-pointer">
          <a id="dwnldLnk" @click="downloadPDF('SignedDocument')">
            SignedDocument</a
          >
        </span>
      </div>
    </q-card>
    <!-- Generate Document in Offline Mode Dialog  -->
    <q-dialog
      v-model="contractDocumentDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          dialogName="Contract Document"
          @closeDialog="contractDocumentDialog = false"
        />
        <q-card class="q-pa-md">
          <q-card v-if="contractDocument" class="q-pa-md">
            <q-icon
              name="picture_as_pdf"
              size="sm"
              color="primary"
              class="q-ml-md"
            />
            <span class="q-pl-md cursor-pointer">
              <a
                download="contractDocument"
                @click="downloadPDF('ContractDocument')"
              >
                ContractDocument</a
              >
            </span>
          </q-card>
          <q-btn
            v-if="contractDocument"
            class="q-ma-md"
            size="sm"
            label="PA Sign"
            color="primary"
            @click="onSignButtonClick('pa_sign')"
          />
          <q-btn
            v-if="contractDocument"
            class="q-ma-md"
            size="sm"
            label="Insured Sign"
            color="primary"
            @click="onSignButtonClick('insured_sign')"
          />
          <q-btn
            v-if="contractDocument"
            class="q-ma-md"
            size="sm"
            label="Co-Insured Sign"
            color="primary"
            @click="onSignButtonClick('co-insured_sign')"
          />

          <q-btn
            :disabled="!saveButtonEnable"
            label="Save Signed Document"
            size="sm"
            @click="onSavingDocument"
            class="q-ml-xl q-mt-md"
            color="primary"
          />
        </q-card>
      </q-card>
    </q-dialog>

    <!-- Signature Pad Dialog  -->
    <q-dialog
      v-model="signaturePadDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          dialogName="Claim Guru Signature Pad"
          @closeDialog="signaturePadDialog = false"
        />

        <VueSignaturePad @signData="signData" />
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import VueSignaturePad from 'components/VueSignaturePad';
import CustomBar from 'components/CustomBar';
import html2pdf from 'html2pdf.js';

import { jsPDF } from 'jspdf';
import { makeId } from 'src/store/leads/actions';
import localDB, { getCollection } from '@services/dexie';
export default {
  components: { CustomBar, VueSignaturePad },
  data() {
    return {
      signedDocument: '',
      saveButtonEnable: false,
      claim: '',
      pa_signature: '',
      insured_signature: '',
      co_insured_signature: '',
      documentId: '',
      signImage: '',
      contractDocumentDialog: false,
      signaturePadDialog: false,
      finalDocumentString: '',
      contractDocument: '',
      tokenArray: [],
      document: '',

      templatetype: { value: '', machineValue: '' }
    };
  },
  async created() {
    this.claim = await this.getSingleClaims(this.selectedClaimId);
    await this.getTemplates();
    // await this.getPersonnelInfo(this.selectedClaimId);

    const offlineClientData = await this.getSingleClientDetails(
      this.claim.client.id
    );

    // Token Mappings

    this.tokens = [
      //Carrier Tokens
      {
        key: '{{.Carrier.Name}}',
        value: this.claim.policyInfo?.carrier?.value
      },
      {
        key: '{{.Carrier.Email}}',
        value: this.claim.policyInfo?.carrier?.email
      },

      //Client Tokens
      { key: '{{.Client.Email}}', value: this.claim.client.email },
      { key: '{{.Client.Name}}', value: this.claim.client.fname },
      {
        key: '{{.Client.PhoneNumber.Number}}',
        value: offlineClientData.insuredInfo?.primary.phoneNumber[0]?.number
      },
      { key: '{{.Client.Fax.Number}}', value: '' },
      { key: '{{.Client.Cell.Number}}', value: '' },
      {
        key: '{{.Client.Address.Address1}}',
        value: offlineClientData.insuredInfo?.mailingAddress?.address1
      },
      {
        key: '{{.Client.Address.Address2}}',
        value: offlineClientData.insuredInfo?.mailingAddress?.address2
      },
      {
        key: '{{.Client.Address.AddressRegion}}',
        value: offlineClientData.insuredInfo?.mailingAddress?.addressRegion
      },
      {
        key: '{{.Client.Address.PostalCode}}',
        value: offlineClientData.insuredInfo?.mailingAddress?.postalCode
      },
      {
        key: '{{.Client.Address.AddressCountry}}',
        value: offlineClientData.insuredInfo?.mailingAddress?.addressCountry
      },
      {
        key: '{{.Client.Address.AddressLocality}}',
        value: offlineClientData.insuredInfo?.mailingAddress?.addressLocality
      },

      // Claim Tokens

      { key: '{{.Claim.Number}}', value: this.claim.number },
      { key: '{{.Claim.Client.Name}}', value: this.claim.client.fname },
      { key: '{{.Claim.FileNumber}}', value: this.claim.fileNumber },
      { key: '{{.Claim.Status.Value}}', value: this.claim.status.value },
      {
        key: '{{.Claim.PolicyInfo.Number}}',
        value: this.claim.policyInfo?.number
      },
      { key: '{{localTZ .Claim.PolicyInfo.EffectiveDate}}', value: '' },
      { key: '{{localTZ .Claim.PolicyInfo.ExpirationDate}}', value: '' },
      { key: '{{.Claim.LossInfo.Date}}', value: this.claim.lossInfo?.date },
      {
        key: '{{.Claim.LossInfo.Cause.Value}}',
        value: this.claim.lossInfo.cause?.value
      },
      {
        key: '{{.Claim.LossInfo.Cause.Desc}}',
        value: this.claim.lossInfo.cause?.desc
      },
      // Adjuster Tokens

      // { key: '{{.Adjuster.Name}}', value: this.personnel.personnel[0].name },
      // { key: '{{.Adjuster.Email}}', value: '' },
      // { key: '{{.Adjuster.LicenseNo}}', value: '' },
      // { key: '{{.Adjuster.PhoneNumber.Number}}', value: '' },
      // { key: '{{.Adjuster.Fax.Number}}', value: '' },
      // { key: '{{.Adjuster.Cell.Number}}', value: '' },
      // { key: '{{.Adjuster.Address.Address1}}', value: '' },
      // { key: '{{.Adjuster.Address.Address2}}', value: '' },
      // { key: '{{.Adjuster.Address.AddressRegion}}', value: '' },
      // { key: '{{.Adjuster.Address.PostalCode}}', value: '' },
      // { key: '{{.Adjuster.Address.AddressCountry}}', value: '' },
      // { key: '{{.Adjuster.Address.AddressLocality}}', value: '' },

      // Claim Property Tokens

      {
        key: '{{.Claim.LossInfo.Property.Address1}}',
        value: this.claim.lossInfo.property?.address1
      },
      {
        key: '{{.Claim.LossInfo.Property.Address2}}',
        value: this.claim.lossInfo.property?.address2
      },
      {
        key: '{{.Claim.LossInfo.Property.AddressRegion}}',
        value: this.claim.lossInfo.property?.addressRegion
      },
      {
        key: '{{.Claim.LossInfo.Property.PostalCode}}',
        value: this.claim.lossInfo.property?.postalCode
      },
      {
        key: '{{.Claim.LossInfo.Property.AddressCountry}}',
        value: this.claim.lossInfo.property?.addressCountry
      },
      {
        key: '{{.Claim.LossInfo.Property.AddressLocality}}',
        value: this.claim.lossInfo.property?.addressLocality
      }
    ];
  },
  methods: {
    ...mapActions([
      'getTemplates',
      'addTemplateLocal',
      'getPersonnelInfo',
      'getSingleClientDetails',
      'getSingleClaims'
    ]),
    async setTypes(value) {
      const obj = this.templateOptions.find(item => {
        return item.name === value;
      });

      this.templatetype.machineValue = obj.machineValue;

      const result = this.templates.find(template => {
        return template.name.machineValue === this.templatetype.machineValue;
      });

      this.tokenReplacement(result.name.value);
    },

    downloadPDF(fileName) {
      const source =
        fileName == 'SignedDocument'
          ? this.signedDocument
          : this.contractDocument;
      const link = document.createElement('a');
      link.href = source;
      link.download = `${fileName}.pdf`;
      link.click();
    },
    tokenReplacement(tokenString) {
      //Regex for getting the all tokens from the String

      var regex = /\{{(.*?)\}}/g;
      var match;

      while ((match = regex.exec(tokenString)) != null) {
        if (!this.tokenArray.includes(match[0])) {
          this.tokenArray.push(match[0]);
        }
      }

      var testString = tokenString.replace(/\u200B/g, '');
      this.tokenArray.forEach(token => {
        let result = this.tokens.find(o => o.key === token);

        if (result && result.value) {
          testString = testString.replaceAll(token, result.value);
        } else {
          testString = testString.replaceAll(token, '');
        }
      });

      this.finalDocumentString = testString;
    },

    async convertHtmlToPdf(documentString, documentType) {
      var opt = {
        margin: [10, 5],
        filename: 'contract.pdf'
      };
      await html2pdf()
        .from(documentString)
        .set(opt)
        .save()
        .outputPdf('datauri')
        .then(async data => {
          this.document = data;

          this.contractDocument = '';
          if (documentType == 'signedDocument') {
            const signedContract = {
              signed_document: this.document
            };

            await localDB.contractDocument.update(
              this.documentId,
              signedContract
            );
            this.signedDocument = this.document;
            this.contractDocumentDialog = false;
          } else {
            const intialContract = {
              claimId: this.selectedClaimId,
              document: this.document,
              template_type: this.templatetype.machineValue
            };
            var response = await this.addTemplateLocal(intialContract);
            this.contractDocumentDialog = true;
            this.contractDocument = response.document;

            this.documentId = response.id;

            this.document = '';
          }
        });
    },

    onClickGenerateDocument() {
      this.convertHtmlToPdf(this.finalDocumentString);
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
    async onSavingDocument() {
      const contractDocument = await localDB.contractDocument
        .where({ id: this.documentId })
        .toArray();

      this.pa_signature = contractDocument[0].pa_sign;
      this.insured_signature = contractDocument[0].insured_sign;
      this.co_insured_signature = contractDocument[0].co_insured_sign;

      // Adding  Sign Tokens with the Value
      if (this.pa_signature) {
        this.tokens.push({
          key: '{{.Adjuster.Sign}}',
          value: this.pa_signature
        });
      }

      this.tokens.push({
        key: '{{.Client.InsuredSign}}',
        value: this.co_insured_signature
      });
      this.tokens.push({
        key: '{{.Client.CoInsuredSign}}',
        value: this.insured_signature
      });

      this.tokenReplacement(this.finalDocumentString);
      this.convertHtmlToPdf(this.finalDocumentString, 'signedDocument');
    },

    onSignButtonClick(tokenValue) {
      this.signTokenValue = tokenValue;
      this.signaturePadDialog = true;
    },
    //This function is used for accepting the values that are coming from signature pad component

    async signData(data) {
      this.signaturePadDialog = false;

      if (this.signTokenValue == 'pa_sign') {
        var payload = {
          pa_sign: data
        };
      } else if (this.signTokenValue == 'insured_sign') {
        var payload = {
          insured_sign: data
        };
      } else {
        var payload = {
          co_insured_sign: data
        };
      }
      this.saveButtonEnable = true;
      await localDB.contractDocument.update(this.documentId, payload);
    }
  },

  computed: {
    ...mapGetters([
      'templates',
      'templateOptions',

      'personnel',
      'editSelectedClient',
      'selectedClaimId'
    ])
  }
};
</script>
<style lang="scss"></style>
