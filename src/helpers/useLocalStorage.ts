import { useState } from 'react';

export const useLocalStorage = (key: string, initValue: []) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key) as string) || initValue
  )

  const save = (value: {}) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [value, save];
}