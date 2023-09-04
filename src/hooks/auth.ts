
import React, {useEffect, useState, useCallback} from 'react';
import {useStoreActions, useStoreState} from '../store/easy-peasy/hooks';

type Cred = {
  id: string;
  token: string;
};

export const useAuth = () => {
  const [cred, setCred] = useState<Cred>({id: '', token: ''});
  const setIsAuthenticated = useStoreActions(store => store.setIsAuthenticated);
  const addUser = useStoreActions(store => store.addUser);
  const setToken = useStoreActions(store => store.setToken )
  const removeUser = useStoreActions(store => store.removeUser);
  const setIsMailAttached = useStoreActions(store => store.setIsMailAttached);
  const setIsInviteAccepted = useStoreActions(
    store => store.setIsInviteAccepted,
  );
  const setIsProfileCompleted = useStoreActions(
    store => store.setIsProfileCompleted,
  );
  const token = useStoreState(store=> store.token)



 
};
