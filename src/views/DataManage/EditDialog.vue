<template>
  <!-- 是否显示弹窗  :visible.sync="dialogVisible" -->
  <!-- 弹窗不显示✖号 :show-close="false"-->
  <!-- 弹窗外的页面部分不允许点击 :close-on-click-modal="false" -->
  <el-dialog
    :close-on-click-modal="false"
    title="编辑课程"
    :visible.sync="dialogVisible"
    :show-close="false"
  >
    <el-form
      :rules="rules"
      ref="ruleForm"
      :model="form"
      label-width="100px"
      size="small"
      class="form-box"
    >
      <el-form-item label="课程名称" prop="title">
        <el-input v-model="form.title" placeholder="请输入课程名称"></el-input>
      </el-form-item>
      <el-form-item label="课程等级" prop="level">
        <el-select v-model="form.level " placeholder="请选择课程等级">
          <el-option label="初级" value="初级"></el-option>
          <el-option label="中级" value="中级"></el-option>
          <el-option label="高级" value="高级"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报名人数" prop="count">
        <el-input v-model="form.count" placeholder="请输入报名人数"></el-input>
      </el-form-item>
      <el-form-item label="上线时间" prop="date">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="技术栈" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="vue" name="type"></el-radio>
          <el-radio label="react" name="type"></el-radio>
          <el-radio label="node" name="type"></el-radio>
          <el-radio label="小程序" name="type"></el-radio>
          <el-radio label="angular" name="type"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!-- 传递事件给父元素 更改dialogVisible 关闭el-dialog -->
      <el-button size="small" @click="$emit('closeDialog')">取消</el-button>
      <el-button type="primary" size="small" @click="submitForm('ruleForm')">确定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
@Component({
  components: {}
})
export default class EditDialog extends Vue {
  // 属性或参数中使用 ！：表示强制解析（告诉typescript编译器，这里一定有值），常用于vue-decorator中的@Prop
  @Prop(Boolean) dialogVisible!: boolean;
  @Prop(Object) form!: {
    title: string;
    type: string;
    level: string;
    count: string;
    date: string;
    _id: string;
  };
  //检验规则
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
  submitForm(formName: any): void {
    //接收ref 校验
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        //校验后通过id要更改的数据  发起请求 更改数据
        (this as any).$axios
          .post(`/api/profiles/edit/${this.form._id}`)
          .then((res: any) => {
            // console.log(res.data);
            // 给父组件传递事件关闭el-dialog
            this.$emit("closeDialog");
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          });
      }
    });
  }
}
</script>

<style lang="less" scoped>
.form-box {
  .el-input,
  .el-select {
    width: 200px !important;
  }
}
</style>
