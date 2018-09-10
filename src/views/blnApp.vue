<template>

  <div class="layout">

    <!--s: header-->
    <childHeader></childHeader>
    <!--e: header-->

    <section class="layout-sec">

      <!--s: section left-->
      <div class="layout-menu">

        <Menu :active-name="active" :open-names="openNames" @on-open-change="openSubmenu"  @on-select="routeTo" accordion>
          <Submenu v-for="item in menuList" :key="item.id" v-if=" item.nodes ==null || item.nodes != '' " :name="item.id">
            <template slot="title">
              {{ item.name }}
            </template>
            <MenuItem :name="subMenu.id" :to="subMenu.resKey" v-for="subMenu in item.nodes" :key="subMenu.id">
              {{ subMenu.name }}
            </MenuItem>
          </Submenu>
          <Menu-Item  v-for="item in menuList" :to="item.resKey" :key="item.id" v-if=" item.nodes == '' " :name="item.id">
            {{ item.name }}
          </Menu-Item>
        </Menu>

      </div>
      <!--e: section left-->

      <!--s: section right-->
      <div class="layout-view">
        <router-view v-if="isRouterAlive"></router-view>
      </div>
      <!--e: section right-->

    </section>

  </div>


</template>


<script>

  import childHeader  from '../components/header.vue'
  import api from "../api"
  export default {
    components: { childHeader },
    provide(){
      return {
        reload:this.reload
      }
    },
    data() {
      return {
        isRouterAlive:true,
        userInfo:{},
        stationList:{},
        active:sessionStorage.getItem('menu_active'),
        openNames:sessionStorage.getItem("menu_open") == null ? [] : [sessionStorage.getItem("menu_open")],
        menuList:{},
      }
    },
    methods: {
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function(){
          this.isRouterAlive = true;
        })
      },
      routeTo:function(id){
        sessionStorage.setItem('menu_active',id);
      },
      openSubmenu:function(name){
        sessionStorage.setItem('menu_open',name);

      },
      toMenu(){
        const _this = this;
        _this.$post(api.menuBylist,'').then((response) => {
          _this.menuList = response.data.data
        }).catch((err) => {
          _this.loading = false;
          console.log(err.message)
        })
      }
    },
    created(){
      this.toMenu();
    }
  }

</script>
