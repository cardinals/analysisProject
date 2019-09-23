# oa-bpsc-sh/analysis-project-sh 分析系统

## 开发环境
### 安装依赖
```
yarn
```
### 运行开发环境
```
yarn serve
```
注：如果无法访问到有效数据，需要检查数据接口的状态。

## 构建
### Docker镜像
#### 安装依赖
```
yarn
```
#### 构建镜像
```
yarn build-image
```
#### 修改镜像tag
```
docker tag 192.168.93.172/oa-bpsc-sh/analysis-project-web:latest 192.168.93.172/oa-bpsc-sh/analysis-project-web:<版本号>
```
#### 将镜像启动为容器
```
docker run --name=analysis-project-web --restart=always -d -p <前端Port>:80 -e LOCATION='\/peopleMediate' -e PROXY_PASS='http:\/\/<接口IP>:<接口Port>' 192.168.93.172/oa-bpsc-sh/analysis-project-web:<版本号>
```
注：目前部署环境的启动命令
```
docker run --name=analysis-project-web --restart=always -d -p 9002:80 -e LOCATION='\/peopleMediate' -e PROXY_PASS='http:\/\/192.168.93.70:8851' 192.168.93.172/oa-bpsc-sh/analysis-project-sh:latest
```
