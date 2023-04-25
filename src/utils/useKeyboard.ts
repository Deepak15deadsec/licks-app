import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboard = () => {
  const [isKeyboardEnabled, setIsKeyboardEnabled] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardEnabled(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardEnabled(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return isKeyboardEnabled
};


