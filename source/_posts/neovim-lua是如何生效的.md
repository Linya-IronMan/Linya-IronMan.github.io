---
title: 'neovim: lua是如何生效的'
date: 2022-07-30 09:38:36
tags:
  - neovim
  - vim
  - lua
---

# neovim 配置文件目录结构

```text

├── LICENSE
├── README.md
├── init.lua
└── lua
    ├── autocmds.lua
    ├── basic.lua
    ├── colorscheme.lua
    ├── keybindings.lua
    ├── lsp
    │   ├── cmp.lua
    │   ├── config
    │   │   ├── bash.lua
    │   │   ├── emmet.lua
    │   │   ├── html.lua
    │   │   ├── json.lua
    │   │   ├── lua.lua
    │   │   ├── markdown.lua
    │   │   ├── pyright.lua
    │   │   ├── rust.lua
    │   │   └── ts.lua
    │   ├── formatter.lua
    │   ├── null-ls.lua
    │   ├── setup.lua
    │   └── ui.lua
    ├── plugin-config
    │   ├── bufferline.lua
    │   ├── comment.lua
    │   ├── dashboard.lua
    │   ├── gitsigns.lua
    │   ├── indent-blankline.lua
    │   ├── lualine.lua
    │   ├── nvim-autopairs.lua
    │   ├── nvim-tree.lua
    │   ├── nvim-treesitter.lua
    │   ├── project.lua
    │   ├── surround.lua
    │   ├── telescope.lua
    │   ├── toggleterm.lua
    │   ├── vimspector.lua
    │   └── which-key.lua
    ├── plugins.lua
    └── utils
        ├── fix-yank.lua
        ├── global.lua
        └── im-select.lua

```

- basic.lua：基础配置，是对默认配置的一个重置
- colorscheme.lua：安装的主题皮肤配置，这里可以切换主题
- keybindings.lua：快捷键的设置，所有插件的快捷键都会放在这里
- lsp 文件夹： 是对Neovim 内置LSP功能的配置，包括常见编程语言与语法提示
  - config：文件夹包含各种语言服务器（LSP）功能的配置，包括常见编程语法与语法提示等
  - setup.lua：内置LSP的配置
  - cmp.lua：语法自动补全的配置，包括各种补全源与自定义代码段
  - ui.lua：对内置LSP功能增强和UI美化
  - formatter.lua：独立代码格式化功能
- plugin-config文件夹：对第三方插件的配置，未来没添加一个插件，这里就多一个配置文件。
- utils文件夹：对常见问题的修改，包括输入法切换，针对windows的特殊配置。

# Neovim 需要关注的基础配置项

## 配置文件入口 init.lua

`~/.config/nvim/init.lua` 文件，存在于用户的Home目录中

```lua
require("keybindings")
```

`require` 函数用于加载一个lua模块，这些模块通常位于 `runtimepath` 中的 `lua/` 目录下，也就是 `~/.config/nvim/lua`目录。
这又是一种约定式的模块查询机制。

上面的代码，就是加载 `~/.config/nvim/lua/basic.lua` 文件。也可以创建 `~/.config/nvim/lua/basic/init.lua` 文件，也是可以被加载成功的。


## 基础配置文件 basic.lua

创建对应的`~/.config/nvim/lua/basic.lua` 文件，作为基础配置文件。

详细的基础配置内容去查询对应文件即可。这里需要了解基础配置的分类

- `vim.g.{name}`：全局变量
- `vim.b.{name}`：缓冲区变量
- `vim.w.{name}`：窗口变量
- `vim.bo.{name}`：buffer-local 选项
- `vim.wo.{option}`：window-local 选项

看起来有点混乱并且不知所云，如果想要设置一个变量，但是不知道应该放在哪个分类里。一般来说，全部设置在 `vim.opt` 也是可以的

### 重点设置项

- `vim.o.timeout = 500`：vim快捷键中京城又多个键连敲的情况，这里表示快捷键连击时限设置为 500ms，超过500ms就不认为是连续快捷键了。
- `vim.o.list = true; vim.o.listcarts = "space:·"`：控制不可见字符的显示，这里将不可见空格显示为一个点，这样容易看清哪里又空格，如果不喜欢可以设置为false关闭。

--- 未完待续 ---







