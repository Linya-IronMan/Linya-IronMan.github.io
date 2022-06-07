---
title: 路由的 hash 模式与 history 模式
tags:
  - 面试题
  - VueRouter
  - 路由
---

SPA 的路由机制实际上就是一个 ajax 更新页面的过程。不过一般 ajax 只会更新部分页面，SPA 会将整个页面容器作为更新目标。

通常存在两种 router 的实现方式

- Hash Router
- History Router

这两种方式实际上的区别在于调用的浏览器的 API 不同。核心在于解决两个问题：
1. URL 更新的时候，不引起页面的刷新
2. 如何检测 URL 的变化

# Hash Router

hash 路由是 URL 中 `#` 后面的内容，一般会用于与 `a` 标签配合，实现页面内的锚点跳转。

hash Router 有一个天然的优势：改变 URL 中的 hash 部分不会引起页面的刷新。

而使用下面几种方法改变 URL 的时候，可以通过`hashchange`事件监听 URL 的变化
- 通过浏览器的前进、后退改变 URL
- 通过 `a` 标签改变 URL
- 通过 `window.location` 改变 URL
- 通过 `history` 的 `go` `back` `forward` 方法触发 `hashchange` 事件

需要注意的是，Hash Router 会覆盖页面内的锚点跳转功能。并且由于 Hash Router 的 `#` 不美观，一般情况并不选择 Hash Router

# Hash Router 实现

```html

<!DOCTYPE html>
<html lang="en">
<body>
<ul>
    <ul>
        <!-- 定义路由 -->
        <li><a href="#/home">home</a></li>
        <li><a href="#/about">about</a></li>

        <!-- 渲染路由对应的 UI -->
        <div id="routeView"></div>
    </ul>
</ul>
</body>
<script>
    let routerView = routeView
    window.addEventListener('hashchange', ()=>{
        let hash = location.hash;
        routerView.innerHTML = hash
    })
    window.addEventListener('DOMContentLoaded', ()=>{
        if(!location.hash){//如果不存在hash值，那么重定向到#/
            location.hash="/"
        }else{//如果存在hash值，那就渲染对应UI
            let hash = location.hash;
            routerView.innerHTML = hash
        }
    })
</script>
</html>
```
> 作者：阳光是sunny
> 
> 链接：https://juejin.cn/post/6854573222231605256
> 
> 来源：稀土掘金
> 
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

1. 通过 a 标签/location.hash/浏览器的前进后退 修改 URL 的 hash
2. 监听 hashchange 事件，在事件处理函数将 router 对应的内容渲染到容器中去
3. 页面第一次加载的时候不会触发 hashchange 事件，所以


# History Router

浏览器的 `history` 提供了 `pushState` 和 `replaceState` 两个方法，这两个方法改变 URL 的 path 部分的时候，不会引起页面的刷新

```javascript
// 执行前：https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState
history.pushState({ name: "cdt" }, "test title", "/user");
// 执行后：https://developer.mozilla.org/user
```

需要注意的是，这个行为会向当前浏览器的历史堆栈中添加一个状态（新增一条历史记录），当使用浏览器后退之后再回到 `/user` 路由，会发现页面会发起请求。

[MDN - History.pushState( )](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState)

[MDN - History.replaceState( )](https://developer.mozilla.org/zh-CN/docs/Web/API/History/replaceState)

```html
<!DOCTYPE html>
<html lang="en">
<body>
<ul>
    <ul>
        <li><a href='/home'>home</a></li>
        <li><a href='/about'>about</a></li>

        <div id="routeView"></div>
    </ul>
</ul>
</body>
<script>
    let routerView = routeView
    window.addEventListener('DOMContentLoaded', onLoad)
    window.addEventListener('popstate', ()=>{
        routerView.innerHTML = location.pathname
    })
    function onLoad () {
        routerView.innerHTML = location.pathname
        var linkList = document.querySelectorAll('a[href]')
        linkList.forEach(el => el.addEventListener('click', function (e) {
            e.preventDefault()
            history.pushState(null, '', el.getAttribute('href'))
            routerView.innerHTML = location.pathname
        }))
    }

</script>
</html>
```
> 作者：阳光是sunny
> 
> 链接：https://juejin.cn/post/6854573222231605256
> 
> 来源：稀土掘金
> 
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

history router 也可以通过 a 标签来进行路由跳转，只是需要禁用它的默认行为，并且在监听到 a 标签的点击事件发生时，执行对应路由的渲染机制。

history router 的改变需要监听 `popState`事件，一旦触发，执行对应的模块渲染。

同样需要添加 load 事件的处理

