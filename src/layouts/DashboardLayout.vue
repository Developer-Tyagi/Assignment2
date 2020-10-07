<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
         <div> 
        <img alt="Claimguru" src="~assets/CG_Text_White.png" width="150" height="50" align="center">
       </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          :to="link.link"
          v-bind="link"
          class="text-grey-1"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer >
       <q-tabs class="tablink">
        <q-route-tab
          exact
         v-for="link in essentialLinks"
          :key="link.title"
          :label="link.title"
          :icon="link.icon"
          :to="link.link"/>
      </q-tabs>
      </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
 {
    title: 'Client/Claim',
    icon: 'add',
    link: '/' 
  },
  {
    title: 'Lead',
    icon: 'add',
    link: '/leads'
  },
  {
    title: 'Company',
    icon: 'add',
    link: '/' 
  },
  {
    title: 'Vendor',
    icon: 'add',
    link: '/' 
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
<style>
@media screen and (min-width: 768px){
  .q-footer {
    display:none
  }
}
.q-tab {
  text-transform: none
}
</style>
