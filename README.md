# vue-watermark
* 一个canvas制作的水印背景，可配组件，控制台删除canvas标签可重新渲染，防止水印被客户端去除。

### 效果展示     
![](https://wuhaoran0409.github.io/waterMark/1.png)

### 演示地址     
[演示地址](https://wuhaoran0409.github.io/study/dist/index.html#)

### 安装
* `npm install vue-water-mark-tools --save`

### 使用
* `import VueWater from 'vue-water-mark-tools/src/lib/index';`
* `Vue.use(VueWater);`

<div id="fatherid"> 
  <vue-water-mark-tools ref="waterMarkRef" :fatherId="'app-main'" :txt="'水印文本'"></vue-water-mark-tools>
</div>

### 功能介绍
* 水印字体、颜色、文本等等，都是可配资源。
* 水印背景会根据浏览器窗口大小实现自适应
* 水印增加防去除功能，IT用户无法通过删除标签或者js脚本删除

### 使用时机
1. 路由跳转时使用，可根据父页面的高度，水印自动适应分配高度及宽度
* 示例：
```vue
  <vue-water-mark-tools ref="waterMarkRef" :fatherId="'app-main'" :txt="'水印文本'"></vue-water-mark-tools>
  watch: {
    $route() {
       this.$refs.waterMarkRef.initPage();
    }
  },
  mounted() {
    this.$refs.waterMarkRef.initPage();
  }
```
2. 一个页面有频繁的DOM操作。例如：A种业务页面操作完成，想渲染B种业务页面。并没有跳转路由，但是，水印外层的div高度改变。此时需要使用。这里需要用到vuex，需要在mounted时，把ref="waterMarkRef"，存入state中，想重新渲染水印调用waterMark对象中的initPage()方法。
* 示例：
```vue
  <vue-water-mark-tools ref="waterMarkRef" :fatherId="'app-main'" :txt="'水印文本'"></vue-water-mark-tools>
  this.$store.state.waterMark.waterRef.initPage();
```

### 参数配置
|参数名称|参数说明|类型|默认值|
|:---|:---|:---|:---|
|fatherId|canvas插入的div的id属性值|String|必传项|
|timeOut|水印刷新间隔（此属性是为了防止某些页面DOM操作频繁，和页面渲染时间差）|Number|500|
|txt|水印文本|String|水印文本|
|font|字体大小及类型|String|16px 微软雅黑|
|fontColor|字体颜色|String|#aaa|
|opacity|水印透明度|Number|0.1|
|angle|水印旋转角度|Number|20|
|rowNum|行数|Number|4|
|colNum|列数|Number|4|
|waterMarkSpace|水印的margin-left的值|Number|50|
|waterMarkTop|水印的margin-top的值|Number|50|
|lineType|strokeText虚线类型  fillText实线类型|String|fillText|
|lineColorType|strokeStyle虚线类型画笔  fillStyle实线类型画笔|String|fillStyle|

### 方法
|方法名称|方法说明|是否可以重写或被调用|
|:---|:---|:---|
|initPage|初始化页面|是|
|observe|实时监听DOM变化，防止用户去除水印|否|
|setDomData|设置一些基本的属性数据|否|
|createdDiv|创建小的div来包含小的canvas|否|
|createdCanvas|创建小的canvas来画水印|否|
|canvasToImage|把canvas转化成base64格式的方法，实现用户保存|是|

* 如果用疑问请联系： 吴浩然<微信：MRJYZX-15-04-16  QQ：978434783  电话: 183-4746-0829>
* 转载请说明出处！
