<template>
  <div class="FormData">
    <el-form :rules="rules" :model="form" ref="refs" label-width="100px">
      <el-form-item prop="title" label="课程名称">
        <el-input placeholder="请输入课程名称" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item prop="level" label="课程等级">
        <el-select placeholder="请选择课程等级" v-model="form.level">
          <el-option label="初级" value="初级"></el-option>
          <el-option label="中级" value="中级"></el-option>
          <el-option label="高级" value="高级"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="count" label="报名人数">
        <el-input placeholder="请输入报名人数" v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item label="上线日期" prop="date">
        <el-date-picker
          v-model="form.date"
          placeholder="请选择日期"
          type="date"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="type" label="技术栈">
        <el-radio-group v-model="form.type">
          <el-radio label="vue" name="type"></el-radio>
          <el-radio label="react" name="type"></el-radio>
          <el-radio label="node" name="type"></el-radio>
          <el-radio label="小程序" name="type"></el-radio>
          <el-radio label="angular" name="type"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('refs')" type="primary">创建课程</el-button>
        <el-button @click="resetForm('refs')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";

@Component
export default class FormData extends Vue {
  @Provide() form: object = {
    title: "",
    type: "",
    level: "",
    count: "",
    date: ""
  };

  @Provide() rules: any = {
    title: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
    level: [{ required: true, message: "请选择课程等级", trigger: "change" }],
    count: [{ required: true, message: "请输入报名人数", trigger: "blur" }],
    date: [
      {
        type: "string",
        required: true,
        message: "请选择日期",
        trigger: "change"
      }
    ],
    type: [
      {
        required: true,
        message: "请选择技术栈",
        trigger: "change"
      }
    ]
  };
  submitForm(refId: any) {
    (this as any).$refs[refId].validate((valid: boolean) => {
      if (valid == true) {
        (this as any).$axios
          .post(`/api/profiles/add`, this.form)
          .then((res: any) => {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            // this.resetForm(refId);
            (this as any).$router.push("./tableData");
          });
      }
    });
  }
  resetForm(refId: any) {
    (this as any).$refs[refId].resetFields();
  }
}
</script>
<style lang="less" scoped>
.FormData {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  padding: 35px;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

  .el-input,
  .el-select {
    width: 200px !important;
  }
  .division {
    margin: 0 10px;
    color: #606266;
  }
}
</style>