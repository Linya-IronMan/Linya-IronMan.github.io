---
title: for 循环
date: 2022-05-16 22:40:45
tags:
    - 面试题
    - JavaScript
    - 问题
---

- [ ] forEach 是通过迭代器还是枚举实现的
- [ ] 迭代和枚举有什么区别
- [ ] 迭代器模式

<!-- more -->

# for in 与 for of 有什么区别

## key value

-   `for ... in` 遍历得到 key
-   `for ... of` 遍历得到 value

```javascript
const arr = [10, 20, 30];
for (let val of arr) {
    console.log(val);
}
```

`for ... of` 可以遍历函数的 `arguments`

```javascript
function fn() {
    for (let arg of arguments) {
        console.log(arg);
    }
}
```

`for ... of` 可以遍历 `NodeList`

```javascript
const pList = document.querySelectorAll('p');
for (let p of pList) {
    console.log(p);
}
```

---

## 两者适用于不同的数据类型

-   遍历对象： `for ... in` 可以，`for ... of` 不可以
-   遍历 Map Set：`for ... of` 可以，`for ... in` 不可以
-   遍历 generator: `for ... of` 可以，`for ... in` 不可以

```javascript
const obj = {
    name: '臭豆腐',
    city: '北京',
};

for (let val of obj) {
    console.log(val);
}
```

```javascript
const map = new Mpa([
    ['x', 100],
    ['y', 200],
    ['z', 300],
]);
for (let n in map) {
    console.log(n);
}
```

```javascript
function* foo() {
    yield 10;
    yield 20;
    yield 30;
}
for (let n of foo()) {
    console.log(n);
}
```

## 可枚举与可迭代

-   `for ... in `用于可枚举数据，如对象、数组、字符串
-   `for ... of ` 用于可迭代数据、如数组、字符串、Map、Set

### 可枚举的判断

```javascript
    const obj1 = { x: 100 }
    Object.getOwnPropertyDescriptors(obj1);

// 输出
{
    "x": {
        "value": 100,
        "writable": true,
        // 是否可枚举
        "enumerable": true,
        "configurable": true
    }
}
```

### 可迭代的判断

```javascript
const arr = [10, 20, 30];


// 输出迭代器函数
arr[Symbol.iterator];
ƒ values() { [native code] }
// 迭代器函数执行输出
arr[Symbol.iterator]();
Array Iterator {}
    [[Prototype]]: Array Iterator
    next: ƒ next()
    Symbol(Symbol.toStringTag): "Array Iterator"
    [[Prototype]]: Object

// 不可迭代输出
let obj = {}
obj[Symbol.iterator]
undefined
```

设计模式中有一种迭代器模式，就是在上一步的执行结果中包含一个启动下一步执行的 next 函数。

通过 next 函数，一步一步向下执行的叫做迭代器

# 总结

- `for...in` 用于可枚举数据，如对象、数组、字符串；得到 `key`
- `for...of` 用于可迭代数据，如数组、字符串、Map、Set；得到 `value`


