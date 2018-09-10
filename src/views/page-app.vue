<template>

  <div class="iview-body animated fadeInRight">

    <draggable v-model="menuHome" @update="datadragEnd" :options = "{animation:300}">
      <transition-group>
    <div class="bln-card" v-for="(item,index) in menuHome" :key="item.level">
      <Card class="bln-card-d">
        <div style="text-align:center">

          <Button type="success" class="bln-upload-btn">上传
            <input :id="item.id" class="bln-upload" @change="pushImg($event,index)" type="file" accept="image/jpeg,image/x-png,image/gif" id="" value="" />
          </Button>
          <Badge :count="index+1">

          <div class="bln-card-img">
            <img v-if="item.data !=''" :src="item.icon || index" width="100%"/>

            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.icon)"></Icon>
            </div>
          </div>

          </Badge>

        </div>
      </Card>
    </div>
      </transition-group>
    </draggable>

    <Modal width="860" title="查看大图" v-model="visible">
      <img :src='imgName' v-if="visible" style="width: 100%"/>
    </Modal>

    <Spin size="large" fix v-if="loading"></Spin>
  </div>

</template>

<script>
  import api from "../api/index"
  import draggable from 'vuedraggable'
  export default {
    data(){
      return {
        flag:{
          chang:false,
        },
        visible: false,
        loading: true,
        imgName:'',
        menuHome:[]
      }
    },
    components: {
      draggable
    },
    methods: {
      datadragEnd (evt) {
        evt.preventDefault();
        const _this = this;
        for(var i = 0;i<_this.menuHome.length;i++){
          _this.menuHome[i].level = i+1;
        }
        const data = { "list": _this.menuHome}
        _this.$post(api.toSortMenu,data).then((response) => {
          _this.$Loading.finish();
         if(response.data.code == 0){
           _this.$Message.success("操作成功！");
           }else{
           _this.$Message.warning("操作失败！");
         }
        }).catch((err) => {
          console.log(err.message)
        })
      },
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      pushImg(e,i){

         const mm = this.data,flag = this.flag,file = e.target,reader = new FileReader();
         const fileSize = file.files[0].size/1024;

         if(fileSize>2048){
           this.$Notice.warning({
             title: '文件大小超过限制',
             desc: '请上传小于2M的图片.'
           });

         }else{
           reader.readAsDataURL(file.files[0]);
           reader.onload = function() {
             mm[i].data = this.result;
             flag.chang = true;
           }
         }

      },
      toHome(type){
        const _this = this;
        _this.loading = true
        const data = {"parentId":1,"type":type} //1手机图片 2pad图片  3视频
        _this.$post(api.homeByUrl,data).then((response) => {
          _this.menuHome = response.data.data;
          _this.loading = false
          _this.$Loading.finish();

        }).catch((err) => {
          _this.loading = false;
          console.log(err.message)
        })
      }

    },
    created() {
      const sessionGet = sessionStorage.getItem("choice");
      sessionGet == "iphone" || sessionGet == null ? this.toHome(1):this.toHome(2)
    }
  }
</script>

<style scoped>

</style>
