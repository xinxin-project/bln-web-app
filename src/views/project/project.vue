
<!--工程项目-->
<template>

  <div class="iview-body animated fadeInRight">
    <div class="bln-card">
      <Card class="bln-card-d">

        <div class="bln-up-add" @click="toAdd">

          <i class="ivu-icon ivu-icon-ios-camera" style="font-size: 40px;"></i>

        </div>

      </Card>
    </div>
    <div>
      <draggable v-model="menuHome" @update="datadragEnd" :options = "{animation:300}">
        <transition-group>
          <div class="bln-card" v-for="(item,index) in menuHome" :key="item.id">
            <Card class="bln-card-d">
              <div style="float:left;width:100%;text-align:center; position: relative;">
                <div class="bln-card-d">
                  <Button type="success" class="bln-upload-btn">上传
                    <input :id="item.id" class="bln-upload" @change="pushImg($event,index,item.id)" type="file" accept="image/jpeg,image/x-png,image/gif" id="" value="" />
                  </Button>
                </div>
                <div class="bln-card-d">
                  <Badge :count="item.level">
                    <div class="bln-card-img">
                      <img v-if="item.data !=''" @load="load(index)" :src="item.resUrl || index" width="100%"/>
                      <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.resUrl)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleDel(item.id)"></Icon>
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
        </transition-group>
      </draggable>
    </div>

    <Modal width="860" title="查看大图" v-model="visible">
      <img :src='imgName' style="width: 100%"/>
    </Modal>

    <Spin size="large" fix v-if="loading"></Spin>
    <Modal
      v-model="blnAdd"
      title="添加图片">
      <row>
        <Col span="12" style="line-height: 32px">
          请选择上传的类型：
          <RadioGroup v-model="batch">
            <Radio label="1">图片</Radio>
            <Radio label="2">盒子</Radio>
          </RadioGroup>
        </Col>
        <Col span="12">
          <Upload v-if="batch"
                  multiple
                  :data='{parentId:5,type:type}'
                  name="file"
                  :format="['jpg','jpeg','png','gif']"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :action="rReate">
            <Button icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </Col>
      </row>
    </Modal>

  </div>

</template>

<script>
  import api from "../../api/index"
  import draggable from 'vuedraggable'
  export default {
    data(){
      return {
        flag:{
          chang:false,
        },
        visible: false,
        blnAdd:false,
        loading: true,
        imgName:'',
        menuHome:[],
        isRouterAlive: true,
        batch:"1",
        rReate:api.toRreate,
        headers:{},
        type:sessionStorage.getItem("choice") == "iphone" || sessionStorage.getItem("choice") == null ? 1:2
      }
    },
    components: {
      draggable
    },
    methods: {
      uploadError(){
        this.$Message.success("上传成功！");
        const sessionGet = sessionStorage.getItem("choice");
        sessionGet == "iphone" || sessionGet == null ? this.toResquestFun(1):this.toResquestFun(2)
        this.$Modal.remove();
      },
      uploadSuccess(){
        this.$Message.success("上传成功！");
        const sessionGet = sessionStorage.getItem("choice");
        sessionGet == "iphone" || sessionGet == null ? this.toResquestFun(1):this.toResquestFun(2)
        this.$Modal.remove();
      },
      handleDel(id){
        const _this = this;
        this.$Modal.confirm({
          title: '请确认',
          content: '<p>您确认删除此图片吗？</p>',
          loading: true,
          onOk: () => {
            const data = { "id":id,"ishide":1}
            _this.$post(api.toUpdata,data).then((response) => {
              _this.$Modal.remove();
              if(response.data.code ==0){
                _this.$Message.success("删除成功！");
                const sessionGet = sessionStorage.getItem("choice");
                sessionGet == "iphone" || sessionGet == null ? _this.toResquestFun(1):_this.toResquestFun(2)
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
      datadragEnd (evt) {
        evt.preventDefault();
        const _this = this;
        for(var i = 0;i<_this.menuHome.length;i++){
          _this.menuHome[i].level = i+1;
        }
        const data = { "list": _this.menuHome}
        _this.$post(api.toResourceSort,data).then((response) => {
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
      load(uId){
        //this.imgLoad = false
        $("#"+uId).remove()
      },
      pushImg(e,i,id){
        const mm = this.data,flag = this.flag,file = e.target,reader = new FileReader();
        const fileSize = file.files[0].size/1024;
        const _this = this

        if(fileSize>500){
          this.$Notice.warning({
            title: '文件大小超过限制',
            desc: '请上传小于500KB的图片.'
          });
        }else{
          reader.readAsDataURL(file.files[0]);
          reader.onload = function() {
            const data = { "id":id,"imageStr":this.result}
            _this.$post(api.toUpdata,data).then((response) => {

              if(response.data.code ==0){
                _this.$Message.success("替换成功！");
                const sessionGet = sessionStorage.getItem("choice");
                sessionGet == "iphone" || sessionGet == null ? _this.toResquestFun(1):_this.toResquestFun(2)
              }else{
                _this.$Message.warning("替换失败！");
                _this.$Loading.error();
              }
            }).catch((err) => {
              console.log(err.message)
            })
            e.target.value=''
          }
        }

      },
      toResquestFun(type){
        const _this = this;
        _this.loading = true
        const data = {"parentId":5,"type":type} //1手机图片 2pad图片  3视频
        _this.$post(api.toResource,data).then((response) => {
          _this.menuHome = response.data.data;
          _this.loading = false
          _this.$Loading.finish();
        }).catch((err) => {
          _this.loading = false;
          console.log(err.message)
        })
      },
      toAdd(){
        this.blnAdd = true;
      }
    },
    created() {
      const sessionGet = sessionStorage.getItem("choice");
      sessionGet == "iphone" || sessionGet == null ? this.toResquestFun(1):this.toResquestFun(2)

    }
  }
</script>

