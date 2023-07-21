import {action, Action, createStore, persist} from 'easy-peasy';
import {User} from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface EasyPeasyStore {
  isAuthenticated: boolean;
  user: User;
  query: Date;
  artCoin: number;
  isInviteAccepted: boolean;
  isMailAttached: boolean;
  isProfileCompleted: boolean;
  setQuery: Action<this, Date>;
  setArtCoin: Action<this, number>;
  setIsAuthenticated: Action<this, boolean>;
  setIsInviteAccepted: Action<this, boolean>;
  setIsMailAttached: Action<this, boolean>;
  setIsProfileCompleted: Action<this, boolean>;
  addUser: Action<this, User>;
  removeUser: Action<this>;
  token: string;
  setToken: Action<this, string>;
}

const initialState = {
  query: new Date(),
  artCoin: 0,
  token:'',
  isMailAttached: false,
  isAuthenticated: false,
  isInviteAccepted: false,
  isProfileCompleted: false,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: null,
    gender: null,
    referralCode: '',
  },
};

export const store = createStore<EasyPeasyStore>(
  persist(
    {
      ...initialState,
      addUser: action((state: any, user: User) => {
        state.user = user;
      }),
      removeUser: action((state: any) => {
        (state.user = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dob: null,
          gender: null,
          referralCode: '',
        }),
        state.isMailAttached = false;
        state.isProfileCompleted = false;
        state.isInviteAccepted = false;
      }),
      setQuery: action((state: any, query: Date) => {
        state.query = query;
      }),
      setArtCoin: action((state: any, artCoin: number) => {
        state.artCoin = artCoin;
      }),
      setIsMailAttached: action((state: any, isMailAttached: boolean) => {
        state.isMailAttached = isMailAttached;
      }),
      setIsInviteAccepted: action((state: any, isInviteAccepted: boolean) => {
        state.isInviteAccepted = isInviteAccepted;
      }),
      setIsProfileCompleted: action((state: any, isProfileCompleted: boolean) => {
        state.isProfileCompleted = isProfileCompleted;
      }),
      setIsAuthenticated: action((state: any, isAuthenticated: boolean) => {
        state.isAuthenticated= isAuthenticated;
      }),
      setToken: action((state: any, token: string) => {
        state.token= token;
      })
    },
    {
      storage: {
        getItem: async function (key) {
          const value: any = await AsyncStorage.getItem(key);
          return JSON.parse(value);
        },

        setItem: function (key, value) {
          AsyncStorage.setItem(key, JSON.stringify(value));
        },

        removeItem: function (key) {
          AsyncStorage.removeItem(key);
        },
      },
      allow: [
        'user',
        'isAuthenticated',
        'artCoin',
        'isMailAttached',
        'isInviteAccepted',
        'isProfileCompleted',
        'token',
      ],
    },
  ),
  {
    name: 'avni',
  },
);
