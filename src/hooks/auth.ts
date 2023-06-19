import React, {useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import { useStoreActions } from '../store/easy-peasy/hooks';

type Cred = {
  id: string;
  token: string;
};

export const useAuth = () => {
  const [authenticate, setAuthenticate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cred, setCred] = useState<Cred>({
    id: '',
    token: '',
  });

  const removeUser = useStoreActions((store)=> store.removeUser)

  const login = async (id: string, token: string) => {
    try {
        setLoading(true)
      await Keychain.setGenericPassword(id, token);
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    } finally {
      setAuthenticate(true);
      setCred({id, token});
      setLoading(false)
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    } finally {
      setAuthenticate(false);
      setCred({
        id: '',
        token: '',
      });
      removeUser()
      setLoading(false)
    }
  };

  useEffect(() => {
    (async () => {
      let cred;
      try {
        setLoading(true);
        const data: any = await Keychain.getGenericPassword();
        cred = data;
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      } finally {
        setAuthenticate(true);
        setCred(cred);
        setLoading(false);
      }
    })();
  }, []);

  return {
    authenticate,
    login,
    logout,
    loading,
    token: cred.token,
    id: cred.id
  };
};
