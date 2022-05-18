---
title: for 循环
date: 2022-05-16 22:40:45
tags:
    - 面试题
    - JavaScript
    - 问题
# description: 
#     1. 数组方式定义 Map <br/>
#     2. 迭代类型与枚举类型的判断方式 <br/>
#     3. JS中，哪些是迭代类型；哪些是枚举类型 <br/>
#     4. for await of 遍历 Promise，取代 Promise.all <br/>
#     5. Promise 并发与非并发
---

1. 数组方式定义 Map <br/>
2. 迭代类型与枚举类型的判断方式 <br/>
3. JS中，哪些是迭代类型；哪些是枚举类型 <br/>
4. for await of 遍历 Promise，取代 Promise.all <br/>
5. Promise 并发与非并发

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

# for await ... of

用于遍历多个 Promise 函数，实际上就是 `Promise.all` 的替代品

```javascript

function createPromise(val) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(val)
        }, 1000);
    })
}

(async function() {
    const p1 = createPromise(100)
    const p2 = createPromise(200)
    const p3 = createPromise(300)

    // 笨笨地打印
    const res1 = await p1;
    console.log(res1)
    const res2 = await p2;
    console.log(res2)
    const res3 = await p3;
    console.log(res3)

    // Promise.all 
    const list = [p1, p2, p3]
    Promise.all(list).all((res) => console.log(res))
    
    // for await of 
    for await (let res of list) {
        console.log(res)
    }


})

```

场景：用户选择了很多图片，需要传递到服务端。应该如何调用 Promise？
-  两种调用方式，一种是并发上传；另一种就是一个一个上传
-  区别在于什么时候创建 Promsie

上面的代码都是将 Promise 全部创建完毕，然后遍历获取结果

下面的代码，一个一个创建 Promise，就可以实现一个一个上传图片。等上一个异步执行完毕后再执行下一个异步

```javascript
function createPromise(val) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(val)
        }, 1000);
    })
}

(async function() {
    const p1 = createPromise(100)
    const p2 = createPromise(200)
    const p3 = createPromise(300)

    const res1 = await createPromise(100);
    console.log(res1)
    const res2 = await createPromise(200);
    console.log(res2)
    const res3 = await createPromise(300);
    console.log(res3)

    const arr = [10, 20, 30]
    for (let num of arr) {
        const res = await createPromise(num);
        console.log(res);
    }
})

```


# 总结

- `for...in` 用于可枚举数据，如对象、数组、字符串；得到 `key`
- `for...of` 用于可迭代数据，如数组、字符串、Map、Set；得到 `value`
- `for await of` 遍历 Promise

