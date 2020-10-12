<template>
  <q-page class="bg-index">
    <div>
      <q-icon name="account_box" size="xl" color="orange"></q-icon>
      <b>
        <span style="font-size:24px">Username</span>
      </b>
      <br />user@claimguru.com
    </div>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          v-for="link in essentialLinks"
          :key="link.title"
          :to="link.link"
          v-bind="link"
          class="text-grey-1"
          style="font-size:15px"
        >
          <q-item-section>
            {{link.title}}
            <br />
            {{link.description}}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>
<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Leads",
    link: "/leads",
    description: "View Lead Dashboard, all leads and add new lead."
  },
  {
    title: "Clients",
    link: "/",
    description: "View Lead Clients, all leads and add new clients."
  },
  {
    title: "Claims",
    link: "/",
    description: "View Lead Claims, all leads and add new claims."
  },
  {
    title: "My Schedule",
    link: "/",
    description: "View Schedule all leads and add/edit schedule."
  }
];

export default {
  data() {
    return {
      essentialLinks: linksData
    };
  }
};
</script>
<style>
img {
  display: block;
  margin-bottom: auto;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
}
.bg-index {
  background: #212663;
  color: white;
}
.listmenu {
  font-style: bold;
}
.q-list--separator {
  color: white;
}
</style>
