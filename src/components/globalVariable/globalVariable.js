let isMathjaxConfig = false; //用于标识是否配置
const initMathjaxConfig = () => {
    if (!window.MathJax) {
        return;
    }
    /**配置版本为2.7.5 */
    if (window.MathJax.version == '2.7.5') {
        window.MathJax.Hub.processSectionDelay = 80, //MathJax处理的输入和输出阶段之间的暂停（以毫秒为单位）。设置此项以0避免频繁更新输出时（例如，在实时预览环境中）抖动。
            window.MathJax.Hub.processUpdateDelay = 0
        window.MathJax.Hub.Config({
            showProcessingMessages: false, //关闭js加载过程信息
            messageStyle: "simple", //不显示信息
            jax: ["input/TeX", "output/HTML-CSS"],
            delayStartupUntil: 'onload',

            tex2jax: {
                inlineMath: [
                    ["$", "$"],
                    ["\\(", "\\)"]
                ], //行内公式选择符
                displayMath: [
                    ["$$", "$$"],
                    ["\\[", "\\]"]
                ], //段内公式选择符
                skipTags: ["script", "noscript", "style", "textarea", "pre", "code", "a"] //避开某些标签
            },
            "HTML-CSS": {
                availableFonts: ["STIX", "TeX"], //可选字体
                showMathMenu: false, //关闭右击菜单显示
                // preferredFont: "",
                // EqnChunk: 50,
                // extensions: ["handle-floats.js"]
            },
            // errorSettings: {
            //     message: ["数学公式加载失败了,刷新页面重新加载吧!"],
            //     style: { color: '#811b1b', 'font-size': '12px' }
            // },
        });
        isMathjaxConfig = true; //配置完成，改为true
    } else if (window.MathJax.version == '3.1.2') { /**配置版本为3.1.2 */
        console.log("这是MathJax版本号为:" + window.MathJax.version)
    }
}

const MathQueue = function(elementId) {
    if (!window.MathJax) {
        return;
    }
    if (window.MathJax.version == '2.7.5') {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.getElementsByClassName(elementId)], function() {
            $('.' + elementId).css('opacity', 1)
            $('.math').children().css('font-size', '100%')
                // console.log('数学公式加载完成！！', '---', elementId)
        });
    } else if (window.MathJax.version == '3.1.2') {
        console.log("这是MathJax版本号为:" + window.MathJax.version)
            // window.MathJax = {
            //     loader: { load: ['input/tex', 'ui/menu'] },
            //     startup: { pageReady: () => MathJax.startup.document.render() },
            //     options: {
            //         renderActions: {
            //             typeset: [150,
            //                 (doc) => {
            //                     const toMML = MathJax.startup.toMML;
            //                     for (math of doc.math) {
            //                         math.typesetRoot = document.createElement('mjx-container');
            //                         math.typesetRoot.innerHTML = toMML(math.root);
            //                         math.display && math.typesetRoot.setAttribute('display', 'block');
            //                     }
            //                 },
            //                 (math, doc) => {
            //                     math.typesetRoot = document.createElement('mjx-container');
            //                     math.typesetRoot.innerHTML = MathJax.startup.toMML(math.root);
            //                     math.display && math.typesetRoot.setAttribute('display', 'block');
            //                 }
            //             ]
            //         }
            //     }
            // };
    }
};
// window.MathJax.Hub.Queue(function() {

// });

export default {
    isMathjaxConfig,
    initMathjaxConfig,
    MathQueue,
}