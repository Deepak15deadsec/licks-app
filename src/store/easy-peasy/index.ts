import {action, Action, createStore, persist} from 'easy-peasy';
import {User} from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface EasyPeasyStore {
  authenticate: Boolean;
  user: User;
  query: Date;
  artCoin: number;
  isInviteAccepted: boolean;
  isMailAttached: boolean;
  isProfileComplete: boolean;
  setQuery: Action<this, Date>;
  setArtCoin: Action<this, number>;
  setIsInviteAccepted: Action<this, boolean>;
  setIsMailAttached: Action<this, boolean>;
  setIsProfileComplete: Action<this, boolean>;
  addUser: Action<this, User>;
  removeUser: Action<this>;
}

const initialState = {
  authenticate: false,
  query: new Date(),
  artCoin: 0,
  isMailAttached: false,
  isInviteAccepted: false,
  isProfileComplete : false,
  user: {
    id: '',
    token: '',
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
        state.authenticate = true;
      }),
      removeUser: action((state: any) => {
        (state.user = {
          firstName: '',
          lastName: '',
          id: '',
          token: '',
          email: '',
          phone: '',
          dob: null,
          gender: null,
          referralCode: '',
        }),
        state.isMailAttached = false;
        state.isProfileComplete = false;
        state.authenticate = false;
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
      setIsProfileComplete: action((state: any, isProfileComplete: boolean) => {
        state.isProfileComplete = isProfileComplete;
      }),
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
        'authenticate',
        'artCoin',
        'isMailAttached',
        'isInviteAccepted',
        'isProfileComplete',
      ],
    },
  ),
  {
    name: 'avni',
  },
);
