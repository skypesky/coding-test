# coding-test

## 安装依赖

```sh
npm install
```

## 运行服务

```sh
# 如需配置代理,请在执行npm start之前,在控制台执行以下代码:
# export proxy_host=<代理服务器的ip> proxy_port=<代理服务器的端口号>
npm start
```

请在浏览器中打开 http://127.0.0.1:3000/explorer

## 检验接口

请在浏览器中打开 http://127.0.0.1:3000/explorer/#/EthereumTransactionInfoController/EthereumTransactionInfoController.fastFindByAddress 检验.

## 执行测试

```sh
npm run test
```

> tips: 执行`npm run test`之后,可以打开`coverage/lcov-report/index.html`查看测试覆盖率相关信息
