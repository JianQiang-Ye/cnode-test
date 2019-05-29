<template>
  <div id="app">
    <fm-generate-form :data="jsonData" :remote="remoteFuncs" :value="editData" ref="generateForm">

    </fm-generate-form>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>

<script>
    export default {
      name: "create-note",
      data() {
        return {
          jsonData: {
            "list": [{
              "type": "input",
              "name": "笔记名",
              "icon": "icon-input",
              "options": {
                "width": "30%",
                "defaultValue": "",
                "required": false,
                "dataType": "string",
                "pattern": "",
                "placeholder": "",
                "customClass": "",
                "remoteFunc": "func_1558975121042",
                "remoteOptions": []
              },
              "key": "1558975165704",
              "model": "input1558975165704",
              "rules": [{"type": "string", "message": "笔记名格式不正确"}]
            }, {
              "type": "textarea",
              "name": "笔记摘要",
              "icon": "icon-diy-com-textarea",
              "options": {
                "width": "30%",
                "defaultValue": "",
                "required": false,
                "disabled": false,
                "pattern": "",
                "placeholder": "",
                "customClass": "",
                "remoteFunc": "func_1558975222119",
                "remoteOptions": []
              },
              "key": "1558975222119",
              "model": "textarea_1558975222119",
              "rules": []
            }, {
              "type": "select",
              "name": "笔记领域",
              "icon": "icon-select",
              "options": {
                "defaultValue": "",
                "multiple": false,
                "disabled": false,
                "clearable": false,
                "placeholder": "",
                "required": false,
                "showLabel": false,
                "width": "",
                "options": [{"value": "下拉框1"}, {"value": "下拉框2"}, {"value": "下拉框3"}],
                "remote": false,
                "filterable": false,
                "remoteOptions": [],
                "props": {"value": "value", "label": "label"},
                "remoteFunc": "func_1558975281677",
                "customClass": ""
              },
              "key": "1558975358302",
              "model": "select1558975358302",
              "rules": []
            }, {
              "type": "select",
              "name": "笔记类型",
              "icon": "icon-select",
              "options": {
                "defaultValue": "",
                "multiple": false,
                "disabled": false,
                "clearable": false,
                "placeholder": "",
                "required": false,
                "showLabel": false,
                "width": "",
                "options": [{"value": "下拉框1"}, {"value": "下拉框2"}, {"value": "下拉框3"}],
                "remote": false,
                "filterable": false,
                "remoteOptions": [],
                "props": {"value": "value", "label": "label"},
                "remoteFunc": "func_1558975281677",
                "customClass": ""
              },
              "key": "1558975281677",
              "model": "select_1558975281677",
              "rules": []
            }, {
              "type": "imgupload",
              "name": "笔记封面",
              "icon": "icon-tupian",
              "options": {
                "defaultValue": [],
                "size": {"width": 100, "height": 100},
                "width": "",
                "tokenFunc": "funcGetToken",
                "token": "",
                "domain": "http://pfp81ptt6.bkt.clouddn.com/",
                "disabled": false,
                "length": 8,
                "multiple": false,
                "isQiniu": false,
                "isDelete": false,
                "min": 0,
                "isEdit": false,
                "action": "https://jsonplaceholder.typicode.com/photos/",
                "customClass": "",
                "remoteFunc": "func_1558975381460",
                "remoteOptions": []
              },
              "key": "1558975381460",
              "model": "imgupload_1558975381460",
              "rules": []
            }, {
              "type": "editor",
              "name": "笔记正文",
              "icon": "icon-fuwenbenkuang",
              "options": {
                "defaultValue": "",
                "width": "60%",
                "customClass": "",
                "remoteFunc": "func_1558975450630",
                "remoteOptions": []
              },
              "key": "1558975450630",
              "model": "editor_1558975450630",
              "rules": []
            }], "config": {"labelWidth": 100, "labelPosition": "right", "size": "small", "customClass": ""}
          },
          editData: {},
          remoteFuncs: {

            funcGetToken(resolve) {
              // 笔记封面 imgupload_1558975381460
              // 获取到token数据后执行回调函数
              // resolve(token)
            },
          }
        }
      },
      methods: {
        handleSubmit() {
          this.$refs.generateForm.getData().then(data => {
            console.log(data)
            // 数据校验成功
            // data 为获取的表单数据
          }).catch(e => {
            console.log(e)
            // 数据校验失败
          })
        }
      }
    }
</script>

<style scoped>

</style>
