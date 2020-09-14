# Data Manager

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## CI

### 制作CI build image

当node依赖更新时，需重新制作image。在项目根目录下运行

```
docker build . -f ci/Dockerfile -t studio/data-manager-frontend
docker tag studio/data-manager-frontend 172.16.1.99/frontend/data-manager-frontend/build/data-manager-frontend-ci:latest
docker push 172.16.1.99/frontend/data-manager-frontend/build/data-manager-frontend-ci:latest
