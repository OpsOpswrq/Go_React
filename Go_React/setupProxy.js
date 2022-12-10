const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware(
        "/api", { // 遇见api前缀的请求，就会触发该代理的请求
            target: "http://localhost:7878", // 转发给谁
            changeOrigin: true, // 控制服务器收到的响应头中Host的字段,欺骗路由
            pathRewrite: { //
                "^/api": "" // 如果是/api开头的请求全部跳至target对应的地址
            }
        }
    ));
};
// axios.get('/api/getTaskList') 写接口时前面要加api
