
<!--5大核心优势-->
<template>

  <div class="iview-body animated fadeInRight">


    <div class="bln-card" v-for="(item,index) in menuHome">
      <Card class="bln-card-d">
        <div style="float:left;width:100%;text-align:center; position: relative;">

          <div class="bln-card-d">
            <Button type="success" class="bln-upload-btn">上传
              <input :id="item.id" class="bln-upload" @change="pushImg($event,index)" type="file" accept="image/jpeg,image/x-png,image/gif" id="" value="" />
            </Button>
          </div>
          <div class="bln-card-d">

            <Badge :count="item.level">

              <div class="bln-card-img">
                <img v-if="item.data !=''" @load="load(index)" :src="item.resUrl || index" width="100%"/>
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.resUrl)"></Icon>
                </div>
              </div>
            </Badge>
            <Col :id="index" class="demo-spin-col" span="8">
              <Spin fix>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载中...</div>
              </Spin>
            </Col>

          </div>
        </div>
      </Card>

    </div>


    <Modal width="860" title="查看大图" v-model="visible">
      <img :src='imgName' v-if="visible" style="width: 100%"/>
    </Modal>

    <Spin size="large" fix v-if="loading"></Spin>

  </div>

</template>

<script>
  import api from "../../api/index"
  export default {
    data(){
      return {
        flag:{
          chang:false,
        },
        visible: false,
        loading: true,
        imgName:'',
        menuHome:[],
        isRouterAlive: true
      }
    },
    methods: {
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      load(uId){
        //this.imgLoad = false
        $("#"+uId).remove()
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
      toResquestFun(type){
        const _this = this;
        _this.loading = true
        const data = {"parentId":13,"type":type} //1手机图片 2pad图片  3视频
        _this.$post(api.toResource,data).then((response) => {
          _this.menuHome = response.data.data;
          _this.loading = false
          _this.$Loading.finish();
        }).catch((err) => {
          _this.loading = false;
          console.log(err.message)
        })
      },
    },
    created() {
      const sessionGet = sessionStorage.getItem("choice");
      sessionGet == "iphone" || sessionGet == null ? this.toResquestFun(1):this.toResquestFun(2)
    }
  }
</script>

