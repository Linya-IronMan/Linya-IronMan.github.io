---
title: 'WebComponent:开发工具调研'
tags:
  - WebComponent
---

# 背景

原生JS开发WebComponent组件体验并不是很好，存在诸多问题：

1. 只能使用CSS，无法使用less，scss这样的预处理器
2. html css 代码没有语法高亮，开发体验不好
3. 组件的数据传递只能通过 Prop 来进行，而 Prop 只能传递字符串。要想传递复杂的数据类型，就只能传递可解析的JSON字符串才行。
   1. 无法保证传递的JSON字符串合法
   2. 组件内部需要对JSON字符串进行解析，麻烦！
4. 不符合主流数据驱动视图更新的开发方式，没有对数据变化的监听能力

所以在此探索了几个主流的 WebComponent 开发工具

- [x] lit
- [ ] stencil
- [ ] Omi
- [ ] Vue

没错，Vue 也具有开发 WebComponet 组件的能力

根据使用 Vue 与 React 的习惯，会从以下几个方面体验各个开发工具的实用性与易用性。

- prop 数据的传递方式，使用方式是否方便，是否需要手动解析
- 组件是否具有 ref 类似的，能够从组件外部访问组件内部状态和函数的方式
- 是否具有数据驱动视图更新的能力
- 是否支持 css 预处理器 less 或 scss
- 开发工具链是否完善，是否具备 VSCode 插件或其他工具提供良好的开发体验
- 对 TypeScript 的支持是否友好
- 是否具有自定义事件的能力
- 是否具有监听数据变化的能力，特别是监听对象中某个指定属性变化的能力
- 组件的定义方式是否方便，是否须有

# Lit

> 参考资料
> 
> [github: lit/lit Simple. Fast. Web Components.](https://github.com/lit/lit)
>
> [lit 官网](https://lit.dev/)

Lit 的核心功能都是通过装饰器的方式进行支持，使用较为简单

## 组件的定义

```TypeScript
@customElement('simple-greeting')
export class SimpleGreeting extends LitElement { /* ... */ }
```

还算方便，但是并没有避免不同组件之间重名的操作

## TypeScript 支持

```TypeScript
@customElement('my-element')
export class MyElement extends LitElement {
  @property({type: Number})
  aNumber: number = 5;
  /* ... */
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
// 会对 aNumber Prop 进行类型检查
const myElement = document.createElement('my-element');
myElement.aNumber = 10;
```

## Prop 外部数据传递与 State 内部状态管理

https://lit.dev/docs/components/properties/

Prop 的传递在使用上无需通过 JSON 解析，并且支持响应式驱动

```TypeScript
class MyElement extends LitElement {
  @property() name: string;
}
```

> 问题：组件的 Prop 是通过 JSON 字符串传递的，那么是不是就没办法传递复杂类型的引用了，并且 JSON 反序列化的时候也不会携带 Symbol 属性 

此处会对 name 属性的变化进行监听，只是此处的数据变化监听是通过 get/set 实现的，无法实现对复杂类型内部指定属性的监听。

通过 `@state` 装饰器能够实现对组件内部的状态管理

```TypeScript
@state() private _counter = 0;
```

数据监听的实现方式上都是一样的，都不支持对指定字段的监听

## Style 样式的书写

https://lit.dev/docs/components/styles/

这里使用的是 html，css 标签函数，参数为包含 html 与 css 的字符串。

html 模板代码与 css 样式代码还是以字符串的形式存在，语法高亮需要使用 VSCode 插件。在插件系统中直接搜索 lit 就行了

```TypeScript
import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    p {
      color: green;
    }
  `;
  protected render() {
    return html`<p>I am green!</p>`;
  }
}
```


