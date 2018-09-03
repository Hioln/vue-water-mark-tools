<template>
    <!--
              使用说明:
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
    -->
    <div></div>
</template>

<script>
export default {
    name: 'WaterMark',
    data() {
        return {
            mainWidth: 0, // 用户页面的宽度
            mainHigh: 0, // 用户页面的高度
            layerWidth: 0, // 组件外层的宽度
            layerHigh: 0, // 组件外层的高度
            smallDivWidth: 0, // 小div的宽度
            smallDivHigh: 0, // 小div的高度
            smallCanvasWidth: 0, // 小canvas的宽度
            smallCanvasHigh: 0, // 小canvas的高度
            deg: Math.PI / 180
        };
    },
    props: {
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
    },
    mounted() {
        //  根据浏览器窗口大小，水印自动适应窗口布局
        this.observe();
        const that = this;
        window.onresize = () => {
            return (() => {
                that.initPage();
            })();
        };
    },
    methods: {
        // 实时监听DOM变化，防止用户去除水印
        observe() {
            let bodyEl = document.body;
            let that = this;
            bodyEl.addEventListener('DOMNodeRemoved', function (event) {
                that.initPage();
            }, false);
        },
        // 初始化页面
        initPage() {
            setTimeout(_ => {
                let layerDiv = document.getElementById('layerDiv');
                //  判断是否存在最外层的div
                if (layerDiv) {
                    this.uploadCanvas();
                } else {
                    this.setDomData();
                }
            }, this.timeOut);
        },
        //  如果存在canvas，将重新改变canvas的高度及宽度
        uploadCanvas() {
            this.setDomData('uploadCanvas');
        },
        // 设置一些基本的属性数据
        setDomData(type) {
            this.mainWidth = (_ => {
                if (document.getElementById(this.fatherId)) {
                    return document.getElementById(this.fatherId).offsetWidth;
                }
            })();
            this.mainHigh = (_ => {
                if (document.getElementById(this.fatherId)) {
                    if (document.getElementById(this.fatherId).offsetHeight < 500) {
                        return 500;
                    } else {
                        return document.getElementById(this.fatherId).offsetHeight;
                    }
                }
            })();
            this.layerWidth = this.mainWidth;
            this.layerHigh = this.mainHigh;
            this.smallDivWidth = this.mainWidth / this.colNum;
            this.smallDivHigh = this.mainHigh / this.rowNum;
            this.smallCanvasWidth = this.mainWidth / this.colNum;
            this.smallCanvasHigh = this.mainHigh / this.rowNum;
            if (type !== 'uploadCanvas') {
                let layerDiv = document.createElement('div');
                layerDiv.setAttribute('id', 'layerDiv');
                layerDiv.setAttribute('style', 'position:absolute;z-index:999999;top:0px;pointer-events:none;opacity: ' + this.opacity + ';overflow:hidden;');
                layerDiv.style.width = this.layerWidth + 'px';
                layerDiv.style.height = this.layerHigh + 'px';
                if (document.getElementById(this.fatherId)) {
                    document.getElementById(this.fatherId).appendChild(layerDiv);
                }
            } else {
                let layerDiv = document.getElementById('layerDiv');
                layerDiv.style.width = this.layerWidth + 'px';
                layerDiv.style.height = this.layerHigh + 'px';
            }
            this.createdDiv(type);
        },
        // 创建小的div来包含小的canvas
        createdDiv(type) {
            if (type !== 'uploadCanvas') {
                for (let i = 1; i <= this.rowNum * this.colNum; i++) {
                    let div = document.createElement('div');
                    div.setAttribute('id', 'smallDiv' + i);
                    div.setAttribute('style', 'float: left;');
                    div.style.width = this.smallDivWidth + 'px';
                    div.style.height = this.smallDivHigh + 'px';
                    if (document.getElementById('layerDiv')) {
                        document.getElementById('layerDiv').appendChild(div);
                    }
                }
                this.createdCanvas();
            } else {
                for (let i = 1; i <= this.rowNum * this.colNum; i++) {
                    let divUpload = document.getElementById('smallDiv' + i);
                    divUpload.style.width = this.smallDivWidth + 'px';
                    divUpload.style.height = this.smallDivHigh + 'px';
                }
                this.createdCanvas(type);
            }
        },
        // 创建小的canvas来画水印
        createdCanvas(type) {
            if (type !== 'uploadCanvas') {
                for (let i = 1; i <= this.rowNum * this.colNum; i++) {
                    if (document.getElementById('smallDiv' + i)) {
                        let canvas = document.createElement('canvas');
                        document.getElementById('smallDiv' + i).appendChild(canvas);
                        canvas.setAttribute('id', 'canvas' + i);
                        canvas.width = this.smallCanvasWidth;
                        canvas.height = this.smallCanvasHigh;
                        let ctx = canvas.getContext('2d');
                        ctx.beginPath();
                        ctx.rotate(this.angle * this.deg);
                        ctx.font = this.font;
                        ctx[this.lineType](this.txt, this.waterMarkSpace, this.waterMarkTop);
                        ctx[this.lineColorType] = this.fontColor;
                        ctx.closePath();
                    }
                    //  this.canvasToImage(canvas);
                }
            } else {
                for (let i = 1; i <= this.rowNum * this.colNum; i++) {
                    let canvas = document.getElementById('canvas' + i);
                    canvas.width = this.smallCanvasWidth;
                    canvas.height = this.smallCanvasHigh;
                    let ctx = canvas.getContext('2d');
                    ctx.beginPath();
                    ctx.rotate(this.angle * this.deg);
                    ctx.font = this.font;
                    ctx[this.lineType](this.txt, this.waterMarkSpace, this.waterMarkTop);
                    ctx[this.lineColorType] = this.fontColor;
                    ctx.closePath();
                    //  this.canvasToImage(canvas);
                }
            }
        },
        //  把canvas转化成base64格式的方法
        canvasToImage(canvas) {
            let image = new Image();
            image.src = canvas.toDataURL('image/png');
        }
    }
};
</script>
