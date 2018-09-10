
<!--视频资料-->
<template>

  <div class="iview-body animated fadeInRight">

    <div class="bln-card">
      <Card class="bln-card-d">

        <div class="bln-up-add" >
          <Upload class="upload-video"
                  :data='{parentId:parentId,type:type}'
                  name="file"
                  :format="['mp4']"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :on-format-error="uploadFormat"
                  :action="apiReate">
            <i class="ivu-icon ivu-icon-ios-videocam" style="font-size: 40px;"></i>
          </Upload>



        </div>

      </Card>
    </div>

    <div>

    <div class="bln-card" v-for="(item,index) in menuHome">
      <Card class="bln-card-d">
        <div style="float:left;width:100%;text-align:center; position: relative;">

          <div class="bln-card-d">
            <Button type="success" class="bln-upload-btn" @click.native="handleDel(item.id)">删除</Button>
          </div>
          <div class="bln-card-d">

            <Badge :count="item.level">

              <div class="bln-card-img">
                <video width="100%" height="130" :src="item.resUrl || index" :poster="item.resKey" controls controlsList='nofullscreen'>
                  <source v-if="item.data !=''" @load="load(index)"   type="video/mp4">
                  您的浏览器不支持 HTML5 video 标签。
                </video>
                <!--<div class="demo-upload-list-cover">-->
                  <!--<Icon type="ios-eye-outline" @click.native="handleView(item.resUrl)"></Icon>-->
                <!--</div>-->
              </div>
            </Badge>

          </div>
        </div>
      </Card>
    </div>
    </div>


    <Spin size="large" fix v-if="loading"></Spin>


  </div>

</template>

<script>
  import api from "../../api/index"
  export default {
    data(){
      return {
        loading: true,
        menuHome:[],
        apiReate:api.toRreate,
        type:3,
        parentId:sessionStorage.getItem("menu_active"),
      }
    },
    methods: {
      uploadFormat(){
        this.$Message.warning("上传格式有误，请选择mp4格式！");
      },
      handleDel(id){
        const _this = this;
        this.$Modal.confirm({
          title: '请确认',
          content: '<p>您确认删除此视频吗？</p>',
          loading: true,
          onOk: () => {
            const data = { "id":id,"ishide":1}
            _this.$post(api.toUpdata,data).then((response) => {
              _this.$Modal.remove();
              if(response.data.code ==0){
                _this.$Message.success("删除成功！");
                const sessionGet = sessionStorage.getItem("choice");
                sessionGet == "iphone" || sessionGet == null ? _this.toResquestFun(3):_this.toResquestFun(3)
              }else{
                _this.$Message.warning("删除失败！");
              }
            }).catch((err) => {
              _this.$Modal.remove();
              console.log(err.message)
            })
          }
        });
      },
      toResquestFun(type){
        const _this = this;
        _this.loading = true
        const data = {"parentId":_this.parentId,"type":type} //1手机图片 2pad图片  3视频
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
      sessionGet == "iphone" || sessionGet == null ? this.toResquestFun(3):this.toResquestFun(3)
    }
  }
</script>

