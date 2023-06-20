import React, {useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {useStoreActions} from '../store/easy-peasy/hooks';

type Cred = {
  id: string;
  token: string;
};

export const useAuth = () => {
  const [cred, setCred] = useState<Cred>({
    id: '',
    token: '',
  });

  const setIsAuthenticated = useStoreActions(store => store.setIsAuthenticated);
  const addUser = useStoreActions(store => store.addUser);
  const removeUser = useStoreActions(store => store.removeUser);
  const setIsMailAttached = useStoreActions(store => store.setIsMailAttached);
  const setIsInviteAccepted = useStoreActions(
    store => store.setIsInviteAccepted,
  );
  const setIsProfileCompleted = useStoreActions(
    store => store.setIsProfileCompleted,
  );

  const login = async (data: any) => {
    try {
      await Keychain.setGenericPassword(data.id, data.accessToken);
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    } finally {
      addUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: !!data.phone ? data.phone : '',
        gender: data.gender !== null ? data.gender : null,
        dob: data.dob !== null ? data.dob : null,
        referralCode: data.referralCode,
      });
      setIsMailAttached(data.isMailAttached);
      setIsInviteAccepted(data.isInviteAccepted);
      setIsProfileCompleted(data.isProfileComplete);
      setCred({id: data.id, token: data.token});
      setIsAuthenticated(true);
    }
  };

  const logout = async () => {
    try {
     await Keychain.resetGenericPassword();
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    } finally {
      setCred({
        id: '',
        token: '',
      });
      removeUser();
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const fetchCred = async () => {
      let data: any;
      try {
        data = await Keychain.getGenericPassword();
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      } finally {
        if (!!data) {
          setCred({
            id: data.username,
            token: data.password,
          });
          setIsAuthenticated(true);
        }
      }
    };
    fetchCred();
  }, []);

  return {
    login,
    logout,
    token: cred.token,
    id: cred.id,
  };
};
