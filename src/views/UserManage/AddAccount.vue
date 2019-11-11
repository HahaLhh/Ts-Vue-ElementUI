 <template>
  <div class="user-info">
    <el-dialog
      title="新增账户"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <el-form :rules="rules" ref="ruleForm" :model="account" class="form-box" label-width="100px">
        <el-form-item label="请选择角色" prop="role">
          <el-select @change="selectChange" v-model="account.role" placeholder="请选择角色">
            <!-- 对数组进行遍历 -->
            <el-option
              v-for="option in options"
              :label="option.role"
              :value="option.role"
              :key="option.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入账号" prop="username">
          <el-input v-model="account.username" placeholder="请输入账号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('closeDialog')">取消</el-button>
        <el-button @click="handleAdd" type="primary">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Prop, Emit } from "vue-property-decorator";

@Component
export default class AddAccount extends Vue {
  //接收prop
  @Prop(Boolean) dialogVisible!: boolean;
  @Prop(Array) options!: any;
  //数据对象
  @Provide() account: object = {
    key: "",
    role: "",
    username: "",
    des: ""
  };
  //验证规则
  @Provide() rules: object = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    role: [{ required: true, message: "请选择角色", trigger: "change" }]
  };
  selectChange(select: string) {
    this.options.map((option: any) => {
      //判断身份 role是否相同 赋值
      if (option.role == select) {
        (this as any).account.key = option.key;
        (this as any).account.des = option.des;
      }
    });
  }

  //   确定 添加账户
  //   @Emit handleAdd()中调用$emit("closeDialog")
  @Emit("closeDialog")
  handleAdd() {
    // console.log(this.account);
    (this as any).$refs["ruleForm"].validate((valid: boolean) => {
      if (valid) {
        (this as any).$axios
          .post("/api/users/addUser", this.account)
          .then((res: any) => {
            //传递事件给父级 点击确认后关闭弹窗重新加载数据
            this.$emit("update");
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          })
          .catch((error: any) => {
            console.log(error);
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