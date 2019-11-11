//让ts能够识别以vue结尾的文件
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
