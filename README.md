# vue-watermark

>>一个canvas制作背景水印，完全自定义。

## 安装
>>npm install vue-water-mark-tools --save
![](https://wuhaoran0409.github.io/waterMark/1.png)
![](https://wuhaoran0409.github.io/waterMark/2.png)
# 安装组件


# 启动本地项目
npm run dev


# 使用详情
一.在main.js
1. import VueWater from 'vue-water-mark-tools/src/lib/index';
2. Vue.use(VueWater);

二.在页面的引入
<div id="fatherid">
  <vue-water-mark-tools ref="waterMarkRef" :fatherId="'app-main'" :txt="'水印文本'"></vue-water-mark-tools>
</div>


三.详细配置及页面渲染时机
1.必须从父页面传过来一个fatherId,此字段为使用者想把canvas插入的div的id属性
2.props其他属性可以均为使用者自定义属性,均有默认值。
3.在父页面引入此组件之后需使用者在父页面中的mounted()钩子监并且在watch钩子中监听$route
4.在父页面使用详细:
<vue-water-mark-tools ref="waterMarkRef" :fatherId="'app-main'" :txt="'水印文本'"></vue-water-mark-tools>
  watch: {
    $route() {
      setTimeout(_ => {
        this.$refs.waterMarkRef.initPage();
      }, 500);
    }
  },
  mounted() {
    this.$refs.waterMarkRef.initPage();
  }
5.如果其他页面DOM频繁，可以把canvas的对象存入state中，再重新回调initPage()方法即可重新渲染水印。
this.$store.state.waterMark.waterRef.initPage();
四.用户可自定义属性
'fatherId': String, // canvas插入的div的id属性
'timeOut': { // 水印刷新间隔（此属性是为了防止某些页面DOM操作频繁，和页面渲染时间差）
  type: Number,
  default: 500
},
'txt': { // 水印文本
  type: String,
  default: '水印文本'
},
'font': { // 字体大小及类型
  type: String,
  default: '16px 微软雅黑'
},
'fontColor': { // 字体颜色
  type: String,
  default: '#aaa'
},
'opacity': { // 水印透明度
  type: Number,
  default: 0.1
},
'angle': { // 水印旋转角度
  type: Number,
  default: 20
},
'rowNum': { // 行数
  type: Number,
  default: 4
},
'colNum': { // 列数
  type: Number,
  default: 4
},
'waterMarkSpace': {
  type: Number, // 水印的margin-left的值
  default: 50
},
'waterMarkTop': {
  type: Number, // 水印的margin-top的值
  default: 50
},
'lineType': {
  type: String, //  strokeText虚线类型  fillText实线类型
  default: 'fillText'
},
'lineColorType': {
  type: String, //  strokeStyle虚线类型画笔  fillStyle实线类型画笔
  default: ' fillStyle'
}
