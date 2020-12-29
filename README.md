# 专业分流系统

- 应用场景：华中科技大学（HUST）电信学院（EIC）专业分流系统
- 已服务年段：18级、19级

## 后台（backStage）

启动库之前需要安装包环境：

```shell
$ npm install
```

> 如果显示包安装冲突等，删除node_modules目录，并重新运行上命令

启动后台

```shell
$ npm start
```

### 数据库

采用的数据库为：MongoDB

## 前端（FrontStage）

运行前端前需要安装依赖包

```shell
$ npm install
```

运行前端

```shell
$ npm run dev
```

### 常见问题Q&A

- 报错找不到main.js

    更改“build\webpack.base.conf.js”目录下的“entry”为合适的本地路径
