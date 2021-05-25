<template>
  <q-page>
    <div>
      <q-card class="q-pa-lg" flat bordered>
        <div class="row justify-between">
          <div class="text-h5">Account Summary</div>
          <div class="text-h5">
            <q-icon name="create" color="primary" @click="onEditClick" />
          </div>
        </div>

        <div class="row q-mt-lg text-bold">
          <div class="col">Company Name</div>
          <div class="col">Company Address</div>
          <div class="col">Company Mobile</div>
          <div class="col">Postal Company Code</div>
        </div>
        <q-separator />
        {{ user }}
        <div class="row q-mt-xs">
          <div class="col-3 column  ">
            {{ user.name }}
          </div>
          <div class="col-3">
            <!-- <div class="q-mr-md  " v-if="user.mailingAddress">
                      {{
                        user.mailingAddress.streetAddress
                          ? user.mailingAddress.streetAddress
                          : '-'
                      }},{{
                        user.mailingAddress.addressRegion
                          ? user.mailingAddress.addressRegion
                          : '-'
                      }},{{
                        user.mailingAddress.addressLocality
                          ? user.mailingAddress.addressLocality
                          : '-'
                      }}
                      ,
                      {{
                        user.mailingAddress.addressCountry
                          ? user.mailingAddress.addressCountry
                          : '-'
                      }},{{
                        user.mailingAddress.postalCode
                          ? user.mailingAddress.postalCode
                          : '-'
                      }}
                    </div> -->
          </div>
          <div class="col">
            <!-- {{ user.phoneNumber.number ? user.phoneNumber.number : '-' }} -->
          </div>
          <div class="col">
            <!-- {{
              user.mailingAddress.postalCode
                ? user.mailingAddress.postalCode
                : '-'
            }} -->
          </div>
        </div>

        <div class="row q-mt-xl text-bold">
          <div class="col">Company Administrator</div>
          <div class="col">Administrator Email</div>
        </div>
        <q-separator />
        <div class="row q-mt-xs">
          <div class="col">
            {{ user.contact.fname }} {{ user.contact.lname }}
          </div>
          <div class="col">{{ user.email }}</div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { getCurrentUser } from 'src/utils/auth';
export default {
  name: 'UserProfile',
  data() {
    return { user: {} };
  },
  created() {
    if (getCurrentUser().attributes) {
      console.log(getCurrentUser().attributes, 667);
      this.user = getCurrentUser().attributes;
      this.userId = getCurrentUser().id;
    }
  }
};
</script>
<style lang="scss">
.form-list {
  color: #333333;
  font-weight: bold;
  font-size: 16px;
  margin: 5px 0;
}
</style>
