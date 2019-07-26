# fbstorage-img-uploader

>这是一个基于Vue和element-ui的组件，它能够将图片上传至firebase storage

##版本 v1.0.1
温馨提示：请墙后在使用firebase
常见问题：上传超时 （墙可解决）
## 使用前提及配置
项目中已引入element-ui 和 firebase
```
npm i element-ui -S
npm i firebase -S
npm i fbstorage-img-uploader -S
```
并且在main.js有如下配置
```
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import fbupload from "fbstorage-img-uploader"
import firebase from 'firebase'
const firebaseConfig =  {
  apiKey: "*********************",
  authDomain: "*********************",
  databaseURL: "*********************",
  projectId: "*********************",
  storageBucket: "*********************",//重点注意
  messagingSenderId: "*********************",
  appId: "*********************"
}
Vue.prototype.$firebase = firebase.initializeApp(firebaseConfig)//绑定在原型链上(必须)
Vue.use(ElementUI);
Vue.use(fbupload)//全局使用
```
### 组件使用
```
<fbs-img-uploader 
	:limitnum="limitnum" 
	:fileurl="fileurl" 
	@onchange="changeFun" 
	@onsuccess="successFun" 
	@onerror="errorFun" 
	:before-upload="beforeUpload"
	>
	</fbs-img-uploader>

```
选项
```
:limitnum : 限制条数;
:fileurl : 上传到storage中的文件路径，不可为"";
```
功能
```
@onchange : 上传图片时触发事件;
@onsuccess : 上传图片成功回调;
@onerror : 上传图片失败回调;
:befor-upload : 上传图片前触发事件;
```
For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
