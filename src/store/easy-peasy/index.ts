import { action, Action, createStore, persist } from "easy-peasy";
import { User } from "../type";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface EasyPeasyStore {
  authenticate: Boolean;
  user: User;
  query: Date;
  artCoin: number;
  isMailAttached: boolean;
  setQuery: Action<this, Date>;
  setArtCoin: Action<this, number>;
  setIsMailAttached: Action<this, boolean>; 
  addUser: Action<this, User>;
  removeUser : Action<this>,
}

const initialState = {
  authenticate: false,
  query: new Date(),
  artCoin: 0,
  isMailAttached: false,
  user: {
    id: "",
    token: "",
    firstName: "",
    lastName: "",
    email:"",
    phone:"",
    dob:null,
    gender:null,
    referralCode:""
    
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
      state.user = { firstName: '',lastName: '', id: '', token: '', email:'', phone: '', dob: null, gender:null,referralCode:''},
      state.isMailAttached = false
      state.authenticate = false
    }),
    setQuery: action((state: any, query: Date) => {
      state.query = query
      
    }),
    setArtCoin: action((state: any, artCoin: number) => {
      state.artCoin = artCoin
      
    }),
    setIsMailAttached: action((state: any, isMailAttached: boolean) => {
      state.isMailAttached = isMailAttached
      
    }),
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
      allow : ["user", "authenticate","artCoin","isMailAttached"]
    }),
  {
    name: 'avni'
  }
);