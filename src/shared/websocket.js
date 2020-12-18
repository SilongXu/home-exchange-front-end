var lockReconnect = false;//避免ws重复连接
import http from './services/http';
import axios from 'axios';
var ws = null;

export function createWebSocket(url) {
  try{
    if ("WebSocket" in window) {
      ws = new WebSocket(url);
      initEventHandle(url);
      return ws;
    }else{
      console.log("不支持websocket,请更换浏览器");
    }
  }catch(e){
    console.log("尝试重新连接");
    reconnect(url);
  }
}

//心跳检测
var heartCheck = {
  timeout: 540000,
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function() {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function() {
    var self = this;
    this.timeoutObj = setTimeout(function() {
      //这里发送一个心跳，后端收到后，返回一个心跳消息
      //onmessage拿到返回的心跳就说明连接正常
      ws.send("ping");
      self.serverTimeoutObj = setTimeout(function() {
        //如果超过一定时间还没重置，说明后端主动断开了
        //ws.close;//如果onclose会执行reconnect，我们执行ws.close()就行了， 如果直接执行reconnect会触发onclose导致重连两次
      }, self.timeout);
    }, this.timeout);
  }
};

function reconnect(url){
  if(lockReconnect) return;
  lockReconnect = true;
  setTimeout(function() {
    //没连接上会一直重连,设置延迟避免请求过多
    createWebSocket(url);
    lockReconnect = false;
  }, 5000);
}

//socket连接
export function initEventHandle(url){
  ws.onclose = function(){
    //reconnect(url)
    lockReconnect = false;
  };
  ws.onerror = function() {
    lockReconnect = false;
    //reconnect(url);
  };
  ws.onopen = function() {
    heartCheck.reset().start();//心跳检测重置
    lockReconnect= true;
  };
}

//获取socketIP地址
export function getSocketIp() {
  return http.get(`ws://192.168.51.37:1235/`)
}

export function getLockReconnect() {
  return lockReconnect;
}

export default{
  createWebSocket,
  initEventHandle,
  getLockReconnect
}