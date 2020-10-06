<template>
    <q-page class = "bg-index">
        <div>
     <q-icon name="account_box" size="xl"  color="orange"></q-icon> <b><span style="font-size:24px"> Username</span></b> <br>user@claimguru.com
    </div>
      <div class="q-pa-md">
      <q-list bordered separator>
      <q-item clickable v-ripple  v-for="link in essentialLinks"
          :key="link.title"
          :to="link.link"
          v-bind="link"
         class="text-grey-1" style="font-size:15px" >
        <q-item-section>{{link.title}}</q-item-section>
      </q-item>
      </q-list>
      </div>
    </q-page>   
</template>
<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
 {
    title: 'Leads',
    link: '/leads' 
  },
  {
    title: 'Clients',
    link: '/'
  },
  {
    title: 'Claims',
    link: '/' 
  },
  {
    title: 'My Schedule',
    link: '/' 
  }
];

export default {
    data () {
    return {
      essentialLinks: linksData
    }
  }
    
}
</script>
<style>
img {
  display: block;
  margin-bottom:auto;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
}
.bg-index {
background : #212663;
color:white;
}
.listmenu {
    font-style: bold;
}
.q-list--separator{
    color: white;
}
</style>
