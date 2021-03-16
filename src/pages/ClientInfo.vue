<template>
  <q-page style="padding-top: 0; height: 100vh">
    <CustomHeader
      @backButton="$router.push('/view-client')"
      :showAddButton="false"
    />
    <div style="padding-top: 51px" class=" row  ">
      <q-card class="q-pa-md q-ma-md" style="width: 100%">
        <span class="form-heading q-mt-none">Insured Details</span><br />
        {{ editSelectedClient.attributes.insuredInfo.primary.fname }}
        {{ editSelectedClient.attributes.insuredInfo.primary.lname }}
        <p class="texts">
          Mobile:
          <span
            class="clickLink"
            v-if="editSelectedClient.attributes.insuredInfo.primary.phoneNumber"
            @click="
              onPhoneNumberClick(
                editSelectedClient.attributes.insuredInfo.primary.phoneNumber[0]
                  .number,
                $event
              )
            "
          >
            {{
              editSelectedClient.attributes.insuredInfo.primary.phoneNumber[0]
                .number
            }}
          </span>
        </p>
        <p class="texts">
          Email
          <span
            class="clickLink"
            v-if="editSelectedClient.attributes.insuredInfo.primary.email"
            @click="
              onEmailClick(
                editSelectedClient.attributes.insuredInfo.primary.email,
                $event
              )
            "
          >
            {{ editSelectedClient.attributes.insuredInfo.primary.email }}
          </span>
        </p>
        <div class="q-mt-md">
          <span class="form-heading q-mt-none">Co-Insured Details</span> <br />
          {{
            editSelectedClient.attributes.insuredInfo.secondary.fname
              ? editSelectedClient.attributes.insuredInfo.secondary.fname
              : '-'
          }}
          {{
            editSelectedClient.attributes.insuredInfo.secondary.lname
              ? editSelectedClient.attributes.insuredInfo.secondary.lname
              : '-'
          }}<br />
          {{
            editSelectedClient.attributes.insuredInfo.secondary.phoneNumber[0]
              .number
              ? editSelectedClient.attributes.insuredInfo.secondary
                  .phoneNumber[0].number
              : '-'
          }}
          <br />
          {{
            editSelectedClient.attributes.insuredInfo.primary.email
              ? editSelectedClient.attributes.insuredInfo.primary.email
              : '-'
          }}<br />
        </div>
        <div class="q-mt-md">
          <span class="form-heading q-mt-none">Source Of Lead / Client</span>
          <br />
          {{
            editSelectedClient.attributes.source.detail
              ? editSelectedClient.attributes.source.detail
              : '-'
          }}
        </div>
        <div class="q-mt-md">
          <span class="form-heading q-mt-none">Address Details</span> <br />
          {{ editSelectedClient.attributes.insuredInfo.address.houseNumber
          }}<br />
          {{ editSelectedClient.attributes.insuredInfo.address.streetAddress
          }}<br />
          {{ editSelectedClient.attributes.insuredInfo.address.addressCountry
          }}<br />
          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress
              .addressLocality
          }}<br />
          {{ editSelectedClient.attributes.insuredInfo.address.addressRegion }}
        </div>
        <div class="q-mt-md">
          <span class="form-heading q-mt-none">Additional Phone Numbers</span>
          <br />
          <span
            class="clickLink"
            v-if="editSelectedClient.attributes.insuredInfo.phoneNumbers"
            @click="
              onPhoneNumberClick(
                editSelectedClient.attributes.insuredInfo.phoneNumbers[0]
                  .number,
                $event
              )
            "
          >
            {{
              editSelectedClient.attributes.insuredInfo.phoneNumbers[0].number
                ? editSelectedClient.attributes.insuredInfo.phoneNumbers[0]
                    .number
                : '-'
            }}</span
          ><br />
          <span
            class="clickLink"
            v-if="editSelectedClient.attributes.insuredInfo.phoneNumbers"
            @click="
              onPhoneNumberClick(
                editSelectedClient.attributes.insuredInfo.phoneNumbers[1]
                  .number,
                $event
              )
            "
            >{{
              editSelectedClient.attributes.insuredInfo.phoneNumbers[1].number
                ? editSelectedClient.attributes.insuredInfo.phoneNumbers[1]
                    .number
                : '-'
            }}</span
          >
        </div>
        <div class="q-mt-md">
          <span class="form-heading q-mt-none">Tenant Details</span> <br />
          {{
            editSelectedClient.attributes.insuredInfo.tenantInfo.name
              ? editSelectedClient.attributes.insuredInfo.tenantInfo.name
              : '-'
          }}<br />
          <span
            class="clickLink"
            v-if="
              editSelectedClient.attributes.insuredInfo.tenantInfo.phoneNumber
                .number
            "
            @click="
              onPhoneNumberClick(
                editSelectedClient.attributes.insuredInfo.tenantInfo.phoneNumber
                  .number,
                $event
              )
            "
          >
            {{
              editSelectedClient.attributes.insuredInfo.tenantInfo.phoneNumber
                .number
                ? editSelectedClient.attributes.insuredInfo.tenantInfo
                    .phoneNumber.number
                : '-'
            }}</span
          >
        </div>
        <div class="q-mt-md">
          <span class="form-heading q-mt-none">Mailing Address</span> <br />

          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress
              .houseNumber
          }}<br />
          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress
              .streetAddress
          }}<br />
          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress
              .addressCountry
          }}<br />
          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress
              .addressLocality
          }}<br />
          {{ editSelectedClient.attributes.insuredInfo.address.addressRegion
          }}<br />
          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress.postalCode
              ? editSelectedClient.attributes.insuredInfo.mailingAddress
                  .postalCode
              : '-'
          }}<br />
          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress.dropBox
              .info
              ? editSelectedClient.attributes.insuredInfo.mailingAddress.dropBox
                  .info
              : '-'
          }}
        </div>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { mapGetters } from 'vuex';
import CustomHeader from 'components/CustomHeader';
export default {
  components: { CustomHeader },
  computed: {
    ...mapGetters(['editSelectedClient'])
  },
  methods: {
    onPhoneNumberClick(number, e) {
      e.stopPropagation();
      if (number) {
        window.open('tel:' + number);
      }
    },
    onEmailClick(email, e) {
      e.stopPropagation();
      if (email) {
        window.open('mailto:' + email);
      }
    }
  }
};
</script>
<style lang="scss">
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
}
.edit-icon {
  position: absolute;
  right: 20px;
  font-size: 20px;
}
.clickLink {
  color: $primary;
}
.texts {
  margin-bottom: 0;
  font-size: 15px;

  text-align: left;
}
</style>
