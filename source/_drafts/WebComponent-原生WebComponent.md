---
title: 'WebComponent: 原生WebComponent'
tags:
  - WebComponent
---


# WebComponent 组成

- Custom Element（自定义元素）：通过一组JavaScriptAPI，允许自定义 custom elements 及其行为，之后可以在用户界面中按照需要使用他们
- Shadow DOM(影子 DOM)：一组JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
- HTML Templates(HTML 模板): 两个标签，`template` 以及 `slot` 标签，可以编写不在页面中显示的标记模板。他们可以作为自定义元素结构的基础被多次重用

在实际应用中，第三点 HTML Template 基本没用。

## Custom Element 的定义

下面就是一个简单组件的自定义方式

```javascript
// index.js
class MyComp extends HTMLElement{
    constructor() {
        super();
        this.innerHTML = "Hello World"
    }
}

// 组件名要求必须有一个 ”-“ 连接
window.customElements.define("my-component", MyComp)

export default MyComp
```

使用自定义组件的方式。在 import 组件所在文件的时候， define API 就已经被调用，全局注册组件了

```html
<!-- index.html -->
<body>
    <my-component> </my-component>
    <script type="module">
        import MyComp from "./components/mycomponent/index.js"
        console.log(MyComp)
    </script>
</body>
```

## 自定义组件的生命周期

- `connectedCallback`：当 custom element首次被插入文档DOM时，被调用。
- `disconnectedCallback`：当 custom element从文档DOM中删除时，被调用。
- `adoptedCallback`：当 custom element被移动到新的文档时，被调用。
- `attributeChangedCallback`: 当 custom element增加、删除、修改自身属性时，被调用。

`attributeChangedCallback`以及 `disconnectedCallback` 较为常用，`adoptedCallback`回调不理解其含义

自定义组件在组件的插入，删除，以及属性被改变的时候，都有对应的生命周期函数被执行

## Shadow DOM

 WebComponent 的组件封装，会将一个组件的标记结构，样式和行为隐藏起来，并与页面上的其他代码香格里拉，保证不同的部分不会混在一起，可以令代码更加干净、整洁

 shadow dom 就是来做这件事的，可以将一个隐藏的、独立的DOM附加到一个元素上。

 上面说到的 `customElements.define` API 只是为自定义组件提供了一个容器，样式以及模板的填充，都要依赖于 Shadow DOM。

 Shadow DOM 允许将隐藏的DOM 树附加到常规的DOM树中 —— 它以 shadow root 节点为其实根节点，在这个根节点下方，可以是任意元素和普通的DOM 元素一样。

**有一些 Shadow DOM 特有的术语需要我们了解：**

- Shadow host：一个常规 DOM节点，Shadow DOM 会被附加到这个节点上。
- Shadow tree：Shadow DOM内部的DOM树。
- Shadow boundary：Shadow DOM结束的地方，也是常规 DOM开始的地方。
- Shadow root: Shadow tree的根节点。

操作 ShadowDOM的方式和操作常规DOM一样。

除了:fucus-within，Shadow DOM 内部的元素始终不会影响到它外部的元素



