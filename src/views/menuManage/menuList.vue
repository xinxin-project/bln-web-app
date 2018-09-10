<template>

  <div class="iview-body animated fadeInRight">
    <div>
    <Card style="width:100%">
      <Row>
        <Col span="8">
          <RadioGroup v-model="menuId">
            <Menu accordion>
                <Submenu :name="item.id" v-for="item in mangerList" :key="item.id">
                  <template slot="title">
                    <Radio :label="item.id">{{ item.id }}</Radio> {{ item.name }}
                  </template>
                  <MenuItem :name="subMenu.id" v-for="subMenu in item.nodes" :key="subMenu.id">
                    <Radio :label="subMenu.id">{{ subMenu.id }}</Radio> {{ subMenu.name }}
                  </MenuItem>
                </Submenu>
            </Menu>
          </RadioGroup>
        </Col>
        <Col span="8">
          <RadioGroup v-model="menuId">
            <Menu accordion>
              <Submenu :name="item.id" v-for="item in appList" :key="item.id">
                <template slot="title">
                  <Radio :label="item.id">{{ item.id }}</Radio> {{ item.name }}
                </template>
                <MenuItem :name="subMenu.id" v-for="subMenu in item.nodes" :key="subMenu.id">
                  <Radio :label="subMenu.id">{{ subMenu.id }}</Radio> {{ subMenu.name }}
                </MenuItem>
              </Submenu>
            </Menu>
          </RadioGroup>
        </Col>
        <Col>
          <Button type="primary" @click="menuUp">修改菜单</Button>
        </Col>
      </Row>
    </Card>
    </div>
    <Spin size="large" fix v-if="loading"></Spin>
    <Modal
      v-model="menuModal"
      title="修改菜单"
      @on-ok="menuKeep"
      >
      <Row>
        <Col span="6" style="line-height: 32px">ID:</Col>
        <Col span="12"><Input v-model="menuId"  style="width: 300px" /></Col>
      </Row>
      <br>
      <Row>
        <Col span="6" style="line-height: 32px">菜单名称：</Col>
        <Col span="12"><Input v-model="menuName"  style="width: 300px" /></Col>
      </Row>
    </Modal>
  </div>

</template>

<script>
  import api from "../../api/index"
  export default {
    data(){
      return {
        mangerList:{},
        appList:{},
        menuId:'',
        loading:false,
        menuModal:false,
        menuName:''
      }
    },
    methods: {
      toMenu(){
        const _this = this;
        _this.loading = true
        _this.$post(api.toGetAll,'').then((response) => {
          _this.$Loading.finish();
          _this.mangerList = response.data.data.mangerList
          _this.appList = response.data.data.appList
          _this.loading = false;
        }).catch((err) => {
          _this.loading = false;
          console.log(err.message)
        })
      },
      menuUp(){
        this.menuId!='' ? this.menuModal = true : this.$Message.warning("请选择内容！");
      },
      menuKeep(){
        const _this = this
        _this.loading = true;
        const data = { "name": _this.menuName,"id":_this.menuId }
        _this.$post(api.toMenuUpdate,data).then((response) => {
          if(response.data.code == 0){
            _this.$Loading.finish();
            _this.loading = false;
            _this.$Message.success("保存成功！");
            _this.toMenu();
          }else{
            _this.loading = false;
            _this.$Loading.error();
            _this.$Message.warning("保存失败！");
          }
        }).catch((err) => {
          _this.loading = false;
          console.log(err.message)
        })
      }
    },
    created() {
      this.toMenu();
    }
  }
</script>

<style scoped>

</style>
