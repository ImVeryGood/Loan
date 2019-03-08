# Loan
RN开发的一款Demo,主要使用Redux+Saga+Immutable
使用详情请到wiki：https://github.com/ImVeryGood/Loan/wiki/Redux--Saga--Immutable
                               Redux+Saga+Immutable
主要是学习Redux+Saga+Immutable的结合使用
## Redux
redux简介：
redux 是一个应用架构。其设计理念：所有的数据放在 store 里管理，一个组件改变了store中的内容，其他组件就会感知到store的这个变化，从而直接从store中获取数据来进行更新。
Redux:

[redux中文文档](http://cn.redux.js.org/)
   ## 使用React-Redux来传递数据
**使用步骤：**

  1. 安装

         npm install --save react-redux
         同时也需要安装 redux 模块：
         npm install --save redux

 2. 分别创建 action,reducer,store包，
   结构如下：

       ![目录](https://github.com/ImVeryGood/Loan/blob/master/img/mulu.png)

 reducer.js


         const defaultState = {
               ...
           }

         export default (state = defaultState, action) => {
         switch (action.type) {
                 ...
                 default:
                   return state;
          }
        }

store.js

          import { createStore } from 'redux';
          import reducer from './reducer';

          const store = createStore(reducer)

          export default store;

3.在入口文件中引入Provider组件，作为顶层App的分发点，在相关的页面组件中使用connect进行组件跟redux的store进行连接
入口文件：App.js

            import React, { Component } from "react";
            import { Provider } from "react-redux";
            import store from "./src/redux/store/ConfigStore";

            type Props = {};
            export default class App extends Component<Props> {
              render() {
                return (
                  <Provider store={store}>
                    <App />
                  </Provider>
                );
              }
            }

           
4.在页面中使用与store简历连接

          import {connect} from 'react-redux';
          ...
          class App extends Component {
              render() {
                  ...
              }
          }
          const mapStateToProps = state => {
            return {
                     ...
                  };
          };

          const mapDispatchToProps = dispatch => ({});

          module.exports = connect(
            mapStateToProps,
            mapDispatchToProps
          )(App);

**例子：使用react-redux实现数量的加减**
   
![加减](https://github.com/ImVeryGood/Loan/blob/master/img/count.png)

  action.js

       export const Increment = "increment";
       export const Decrement = "decrement";

       export const increaseAction = {
         type: Increment
       };
       export const decreaseAction = {
         type: Decrement
       };

reducer.js

      import {
        Decrement,
        Increment,
      } from "../action/CAction";
      const initState={
               count:0
                  }
      const setCounter = (state = initState, action) => {
        switch (action.type) {
          case Increment:
            return { count: state.count + 1 };
          case Decrement:
            return { count: state.count - 1 };
          default:
            return state;
        }
      };
      export default setCounter;

在写项目的时候，我们基本是一个页面要写一个对应的reducer
最后这些reducer我们要合并然后在传到store
     
combineReducers.js 用于合并reducer
 
       import { combineReducers } from "redux";
       import setCounter from "./CReducer";

       const appReducer = combineReducers({
       setCounter: setCounter
        });
       export default appReducer;

store.js

      import { createStore } from "redux";
      import appReducer from "../reducer/AllReducer";

      const store = createStore(appReducer);
      export default store;

加减页面MCounter.js

         import {
           View,
           Text,
           TextInput,
           Image,
           Button,
           StyleSheet,
           TouchableOpacity,
           NativeModules
         } from "react-native";
         import React from "react";
         import {
           decreaseAction,
           increaseAction,
         } from "../redux/action/CAction";
         import { connect } from "react-redux";
         import MColors from "../source/colors/Colors";

         class MCounter extends React.Component {
           render() {
             const { value, onIncreaseClick, onDecreaseClick } = this.props;
             return (
               <View>
                 <Text>点击按钮实现加减</Text>
                 <View style={styles.container}>
                   <TouchableOpacity onPress={onIncreaseClick}>
                     <Text style={styles.add}>增加</Text>
                   </TouchableOpacity>
                   <Text style={styles.number}>{value}</Text>
                   <TouchableOpacity onPress={onDecreaseClick}>
                     <Text style={styles.reduce}>减少</Text>
                   </TouchableOpacity>
                 </View>
               </View>
             );
           }
         }
         const styles = StyleSheet.create({
           title: {
             color: MColors.authOnGoing,
             height: 80,
             textAlign: "center"
           },
            container: {
             flexDirection: "row"
           },
           number: {
             color: MColors.authReject,
             marginLeft: 10
           },
           add: {
             color: MColors.authNotSubmit
           },
           reduce: {
             marginLeft: 10
           }
         });

         const mapStateToProps = state => {
  
           return {
             value: state.setCounter.count
           };
         };

         const mapDispatchToProps = dispatch => ({
           onIncreaseClick: () => {
             dispatch(increaseAction);
           },
           onDecreaseClick: () => dispatch(decreaseAction)
         });

         module.exports = connect(
           mapStateToProps,
           mapDispatchToProps
         )(MCounter);

最后程序入口App.js

      import MCounter from "./src/ui/MCounter";
      import { Provider } from "react-redux";
      import store from "./src/redux/store/CStore";
      type Props = {};
      export default class App extends Component<Props> {
        render() {
          return (
            <Provider store={store}>
              <MCounter />
            </Provider>
          );
        }
      }

以上是最基本的react-redux实现，mapDispatchToProps 写法还是可以再改进的，

       const mapDispatchToProps = dispatch => ({
           onIncreaseClick: () => {
             dispatch(increaseAction);
           },
           onDecreaseClick: () => dispatch(decreaseAction)
         });

还可以写成：对 UI 组件的操作映射成 Action

       const mapDispatchToProps = dispatch => {
         return {
             //对 UI 组件的操作映射成 Action
           actions: bindActionCreators(indexActions, dispatch)
         };
       };
此时Action 写法要有所变化

       const increaseAction= () => {
         return {
           type: Increment
         };
       };
       const decreaseAction= () => {
         return {
           type: Decrement
         };
       };

       export const action= {
         increaseAction,
         decreaseAction
       };

bindActionCreators参数一，要新建indexActions.js

      import { action} from "./action";
       module.exports = {
         ...action
       };

demo地址：[react-redux](https://github.com/ImVeryGood/MReact)

## immutable.js

   为什么要用immutable.js？

* 在reducer.js中，无法对state直接做修改，只能返回一个新的对象用来更新state，如果是基于原始state的修改，那么只能对他进行深拷贝后进行修改，再进行返回。
* 通过使用 immutable.js，就可以省略深拷贝这一步，因为任何对于 immutable对象的修改，最终都会返回一个新的immutable对象。
  
**使用immutable**

安装：
 
    npm install immutable

在reducer.js中引入 immutable，将原先的state对象转换为immutable类型

reducer.js

         import {
           Decrement,
           Increment
         } from "../action/CAction";
         import { Map } from "immutable";
         const iniState = Map({
           count: 0
         });
         const setCounter = (state = iniState, action) => {
           switch (action.type) {
             case Increment:
               return state.set("count",count+1);
             case Decrement:
               return state.set("count",count-1);;
             default:
               return state;
           }
         };
          export default setCounter;

调用使用的地方

      const mapStateToProps = (state) => {
      return {
        count: state.get("count"),
           }
        }
   
注意：state返回的是一个对象。如果reducer是抽离开来的取值的时候要：
       state.reducer.get(key)  

更多关于Immutable.js [https://facebook.github.io/immutable-js/](https://facebook.github.io/immutable-js/)

# redux-saga:
  
saga可以理解为一个用来处理复杂异步逻辑的模块，并由redux的action触发
## 使用：
**安装redux-saga**

    npm install --save redux-saga

 **给redux添加中间件**

1.创建saga中间件

    const sagaMiddleware = createSagaMiddleware();

2.在createStore的时候引入已经创建好的saga

     const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware)
    )
3. run saga 其中rootSaga 是自己定义的rootSaga.js来处理逻辑的js文件

     `sagaMiddleware.run(rootSaga);`

4.完整store配置代码：

     import { applyMiddleware, createStore } from "redux";
     import appReducer from "../reducer/AllReducer";
     import createSagaMiddleware from "redux-saga";
     import rootSaga from "../../saga/MSaga";

     const sagaMiddleware = createSagaMiddleware();
     const store = createStore(appReducer, applyMiddleware(sagaMiddleware));
     sagaMiddleware.run(rootSaga);
     export default store;

**Saga.js编写**

下边是通过网络请求获取列表数据

    `function* getList() {
     yield take(GetBannerList_saga);
       try {
         const res = yield call(fetchSmart, Api.bannerUrl, {
           method: "GET"
         });
         yield put({ type: GetBannerList, banner: res.result });
       } catch (error) {
         alert(error);
       }
     }`

fetchSnart.js

     export default async function fetchSmart(url, configObj) {
       const originObj = {
         headers: {
           "Content-Type": "application/x-www-form-urlencoded"
         }
       };
       const response = await fetch(url, Object.assign(originObj, configObj))
         .then(function(response) {
           return response;
         })
         .catch(function(err) {
           return err;
         });
       return response.json();
     }

其中：

       *yield take(GetBannerList_saga);
        是获取action，也是对action的筛选，只有你所发出的action和take一样就会触发getList方法

        *yield put({ type: GetBannerList, banner: res.result }); 
         put方法是把所获取的数据put给reducer，参数type要和reducer的 
         action type保持一致

**call方法**

call有些类似Javascript中的call函数， 不同的是它可以接受一个返回promise的函数，使用生成器的方式来把异步变同步。

**put方法**

put就是redux的dispatch，用来触发reducer更新store

**take方法**

筛选action

注意：

* dispatch发出的action要保持一致
* put数据时，type，要和reducer的action type保持一致，

**补充Saga的合并**

在实际开发中对应界面的逻辑一般放在对应的saga.js文件中，在配置store中间件的时候要传入一个combine的saga

1.在单个对应界面的saga.js中最后要导出

    export default function* root(): any {
    yield all([fork(getMoney), fork(getBanner)]);
    }

2.写一个总的rootSaga.js 

    import { fork } from "redux-saga/effects";
    import HomeSaga from "./HomeSaga";
    import MineSaga from "./MineSaga";

    export default function* rootSaga() {
      yield fork(HomeSaga);
      yield fork(MineSaga);
    }

3.最后把合并的rootSaga在store中配置即可

redux-saga文档：[redux-saga中文文档](https://redux-saga-in-chinese.js.org/docs/api/index.html)
