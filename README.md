# vue-watermark

>一个canvas制作背景水印，完全自定义。

## Build Setup

``` bash
# 安装组件
npm install vue-water-mark-tools --save

# 启动本地项目
npm run dev


# 使用详情
一.在main.js
1. import VueWater from 'vue-water-mark-tools/src/lib/index';
2. Vue.use(VueWater);

二.在使用的页面
<vue-water-mark-tools fatherId="hello"></vue-water-mark-tools>

三.详细配置及页面渲染时机
1.必须从父页面传过来一个fatherId,此字段为使用者想把canvas插入的div的id属性
2.props其他属性可以均为使用者自定义属性,均有默认值。
3.在父页面引入此组件之后需使用者在父页面中的mounted()钩子监并且在watch钩子中监听$route
4.在父页面使用详细:
<water-mark ref="waterMarkRef" :fatherId="'app-main'" :txt="'金融数据网关'"></water-mark>
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
5.如果其他页面变动频繁
this.$store.state.waterMark.waterRef.initPage();
