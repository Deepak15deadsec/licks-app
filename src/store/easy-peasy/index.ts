import { action, Action, createStore, persist } from "easy-peasy";
import { User } from "../type";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface EasyPeasyStore {
  authenticate: Boolean;
  user: User;
  addUser: Action<this, User>;
  removeUser : Action<this>,
}

const initialState = {
  authenticate: false,
  user: {
    id: "",
    token: "",
    name: ""
  }
};

export const store = createStore<EasyPeasyStore>(
  persist({
    ...initialState,
    addUser: action((state: any, user: User) => {
      state.user = user
      state.authenticate = true
    }),
    removeUser: action((state: any) => {
      state.user = { name: '', id: '', token: ''},
      state.authenticate = false
    })
  },
    {
      storage: {
        getItem: async function (key) {
          const value: any = await AsyncStorage.getItem(key);
          return JSON.parse(value);
        },

        setItem: function (key, value) {
          AsyncStorage.setItem(key, JSON.stringify(value))
        },

        removeItem: function (key) {
          AsyncStorage.removeItem(key)
        },
      },
      allow : ["user", "authenticate"]
    }),
  {
    name: 'avni'
  }
);