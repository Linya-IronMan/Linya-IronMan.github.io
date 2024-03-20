---
# https://vitepress.dev/reference/default-theme-home-page
layout: "home"

hero:
  name: "Linya's Blog"
  tagline: 晨要担当，暮要担当；大丈夫遇事似山岗；毁也端庄，誉也端庄
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 在线可视化设计器
      link: /demo/designer
    - theme: alt
      text: 博客专栏
      link: https://blog.csdn.net/ssrc0604hx/category_12570844.html
  image:
      src: /designer.png
      alt: GRID-FORM

features:
  - title: 个人简历 
    details: 基于 <a target=_blank href="https://www.naiveui.com">Naive UI</a> 组件库，所见即所得
    icon:
      src: /rocket.svg
      width: 40
  - title: Github 
    details: 默认渲染器，支持设计器中的全部组件
    icon:
      src: /naive-ui.svg
      width: 33
  - title: Wolai笔记 
    details: 使用优秀 <a target=_blank href="https://element-plus.org/">Element Plus</a> 组件库的渲染器
    icon:
      src: /element-plus.svg
      width: 40
  - title: ToDo List
    details: 适配移动终端的渲染器（<a target=_blank href="https://vant-ui.github.io">Vant4</a> 以上版本）
    icon:
      src: vant.png
      width: 40
---