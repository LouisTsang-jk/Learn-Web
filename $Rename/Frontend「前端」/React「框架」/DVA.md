#plugin-dva使用
dva的使用比较简单，但是可能要记一下相关的数据结构
## 实践
models/index.ts
```
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface IndexModelState {
  name: string;
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'index', // 命名空间

  state: { // 存储数据
    name: '',
  },

  effects: {
    *query({ payload }, { call, put, select }) { // 异步，最终还是调用reducer
        // const { name } = yield select(state => state.index) // 获取state
        // const { data } = yield call(services.getName, params); // 异步请求
        // yield put({
        //    type
        // })
    },
  },
  reducers: { // 同步
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default IndexModel;
```
Pages
```
const dispatch = useDispatch();
// 调用
dispatch({
  type: 'index/save',
  payload: {
      name: 'hello'
  }
});
```


## 注意
1. 可能会报模块导出错误，这时候需要建立models文件夹，建立对应文件和引用，然后重启Ts服务器即可。