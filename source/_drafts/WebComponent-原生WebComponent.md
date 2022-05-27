---
title: 'WebComponent: 原生WebComponent'
tags:
  - WebComponent
  - 待补充
hello: "slot is 的原生使用方式没有"
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

可以使用 `Element.attachShadow()`  方法来将一个 shadow root 附加到任何一个元素上

- 接收一个配置对象作为参数
    - 配置对象有一个 mode 属性，可以是 open 或者 closed
        - open：可以通过页面内的JavaScript获取Shadow DOM   Element.shadowRoot 属性
        - close：不可以从外部获取 Shadow DOM。Element.shadowRoot 将会返回 null
        - 比如 video 标签，包含了不可访问的Shadow DOM

```javascript
// 创建 shadow root, 在自定义组件的构造函数中执行
let shadow = this.attachShadow({mode: 'open'});
var para = document.createElement('p');
shadow.appendChild(para);

```

参考阅读： [open-vs-closed-shadow-dom](https://blog.revillweb.com/open-vs-closed-shadow-dom-9f3d7427d1af)

原生JS 书写 webcomponent 组件，相当麻烦，不仅是书写交互，即使是 template 的书写也是相当麻烦。

# Template Slot

用于创建一个灵活填充的 Shaddow DOM 模板


```html
<template id="my-paragraph">
  <p>My paragraph</p>
</template>
```

下面的代码，不会展示在你的页面中，直到你用 JavaScript 获取它的引用，然后添加到DOM中， 如下面的代码：

```javascript
let template = document.getElementById('my-paragraph');
let templateContent = template.content;
document.body.appendChild(templateContent);
```

参考：[WebComponent Template Slot 的使用](https://blog.csdn.net/m0_37566424/article/details/90738645)

```html
<template id="custome-fieldset">
    <style>
        fieldset {
            border: none;
            border-top: 1px solid #cccccc;
        }
    </style>
    <fieldset>
        <legend align="center">
            <slot name="title">custome fieldset</slot>
        </legend>
        <slot name="content">this is a paragraph</slot>
    </fieldset>
</template>

```

```html
<template id="custome-fieldset">
  <fieldset>
    <legend align="center">
      <slot name="title">custome fieldset</slot>
    </legend>
    <slot name="content">this is a paragraph</slot>
  </fieldset>
</template>
```

# 完整的 WebComponent 组件 demo

原生的 WebComponent 开发并不可取，非常麻烦，开发体验较差，效率也不会高。

在开发 WebComponent 组件的时候，容易受到其他前端框架的开发经验的影响。比如...
- 没有数据驱动，不支持任何数据监听，除了原生支持的生命周期 `attributeChangedCallback`
- 代码书写体验不好，html 以及 css 代码没有高亮
  - 可以通过写在其他 css/html 文件中，以文本的格式引入并插入。需要配置 webpack 以文本的方式获取 css html 文件内容
- 组件的使用上，没有数据的双向绑定
- 没有比较方便的自定义事件的方式
- 属性传递的时候只能传递字符串，传递对象的时候需要传递 JSON 字符串，并且在组件内部拿到数据之后进行解析

```javascript
class Badge extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement("template");
        template.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    position: relative;
                }
                :slot {
                    position: relative;
                    z-index: 0;
                }
                .ivy-badge-content {
                
                    position: absolute;
                    top: 0;
                    right: 10px;
                    z-index: 10;
                    transform: translateX(100%) translateY(-50%);
                    background-color: #f56c6c;
                    border-radius: 10px;
                    color: #fff;
                    display: inline-block;
                    font-size: 12px;
                    height: 18px;
                    line-height: 18px;
                    padding: 0 6px;
                    text-align: center;
                    white-space: nowrap;
                    border: 1px solid #fff;
                }
                :host([type="primary"]) .ivy-badge-content {
                    background-color: var(--color-primary, ${$_color_primary});
                    color: white;
                }
                :host([type="success"]) .ivy-badge-content {
                    background-color: var(--color-primary, ${$_color_success});
                    color: white;
                }
                :host([type="warning"]) .ivy-badge-content {
                    background-color: var(--color-warning, ${$_color_warn});
                    color: white;
                }
                :host([type="error"]) .ivy-badge-content {
                    background-color: var(--color-error, ${$_color_error});
                    color: white;
                }
                :host([type="info"]) .ivy-badge-content {
                    background-color: var(--color-info, ${$_color_info});
                    color: white;
                }

                :host([is-dot]) sup.ivy-badge-content {
                    height: 8px;
                    width: 8px;
                    line-height: 8px;
                    padding: 0;
                    right: 5px;
                    border-radius: 50%;
                    color: transparent;
                }
            </style>
            <sup class="ivy-badge-content">${this.value > this.max ? this.max + "+" : this.value}</sup>
            <slot></slot>
        `;

        this._shadowRoot = this.attachShadow({
            mode: "open",
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$sup = this._shadowRoot.querySelector(".ivy-badge-content");
    }

    static get observedAttributes() {
        return ["value", "max", "type", "hidden", "is-dot"];
    }

    connectedCallback() {}

    get value() {
        return this.getAttribute("value") || 0;
    }

    set value(text) {
        this.setAttribute("value", text);
    }

    get max() {
        return this.getAttribute("max") || 99;
    }

    set max(text) {
        this.setAttribute("max", text);
    }

    get type() {
        return this.getAttribute("type");
    }

    set type(text) {
        this.setAttribute("type", text);
    }

    get hidden() {
        return this.getAttribute("hidden");
    }

    set hidden(text) {
        this.setAttribute("hidden", text);
    }

    get isDot() {
        return this.getAttribute("is-dot");
    }

    set isDot(text) {
        this.setAttribute("is-dot", text);
    }

    valueReg = /^\d+$/;

    attributeChangedCallback(attr, oldVal, val) {
        if (attr === "value" && oldVal !== val) {
            this.$sup.innerText = this.valueReg.test(val) ? (val > this.max ? `${this.max}+` : this.value) : this.value;
        }
        if (attr === "max" && oldVal !== val) {
            this.$sup.innerText = this.valueReg.test(val) ? (val > this.max ? `${this.max}+` : this.value) : this.value;
        }
    }
}

if (!window.customElements.get("ivy-badge")) {
    window.customElements.define("ivy-badge", Badge);
}

```


