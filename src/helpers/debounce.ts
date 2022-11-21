import { Option } from './utils';

export const debounce = (f: React.Dispatch<React.SetStateAction<Option>>,
  delay: number) => {
  let timerId: any;

  return (...args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(f , delay, ...args);
  };
};