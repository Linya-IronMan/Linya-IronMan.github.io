---
title: ESModule 新特性
date: 2022-06-19 23:52:11
tags:
  - ESModule
---

# globalThis 

无论当前是处于什么环境，这个变量都会指向全局this对象。

- 浏览器 —— window
- nodejs —— global

# BigInt

大整数

```javascript
let n = 4345n;

let n = 123;
// 做类型转换
console.log(BigInt(n));
```

主要是用于大数值的运算。

JavaScript中的数字大小是存在限制的

#问题：JavaScript中的数字大小的限制是如何产生的？

如此，可以获取JavaScript中允许的最大数值

```javascript
let max = Number.Max_SAFE_INTEGER; // 9007199254740991

max + 1 // 能够正常相加 
max + 2 // 数值停在 ...992 不动，不管再如何相加
```

最大的数值大概是 九千零七兆两百亿 左右

需要注意的是，BigInt 无法与 Number 类型数据相加，需要将Number类型转成 BigInt 类型

# 动态 import 引入

经常会遇到在一个模块文件中大量import文件的情况，这令我们并不清楚这些模块是在初始化的时候就要立刻使用，还是会在将来的某一刻被使用。

我们通常都是在文件开头的时候一股脑引入。

ES11中引入了按需加载的功能，能够在我们需要的时候再加载文件内容

```javascript
const btn = document.getElementById("btn")

btn.onclick = function() {
  import("./hello.js").then(module => {
    console.log("module ====", module)
    module.hello();
  })
}
```


# Promise.allSettled

使用上和 `Promise.all` 一样，接收一个Promise数组。

不过`Promise.all`只要参数中有一个Promise失败，整体都返回失败

`Promise.allSettled`则是一定会返回成功，标志着数组中的所有Promise状态改变，但是并不会为参数Promise的状态负责。

```javascript

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("商品数据 - 1");
      }, 1000);
  })

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("出错了");
      }, 1000)
  })

const resolve1 = Promise.allSettled([p1, p2]);
const resolve2 = Promise.allSettled([p1, p2]);

```
 
# 私有属性符号 —— `#`

```javascript
class Person {
    // 公有属性
    name;
    // 私有属性
    #age;
    #weight;
  }
```

不用再写 private 来声明私有属性了


