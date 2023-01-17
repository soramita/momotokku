import type { ChangeEvent } from 'react';
import sessionStorageUtil from './sessionStorage-util';

type CreateImgUrl = (e: ChangeEvent<HTMLInputElement>) => string;

const createImgUrl: CreateImgUrl = e => {
  const { getSession, setSession } = sessionStorageUtil();
  if (e.target.files) {
    const url = URL.createObjectURL(e.target.files[0] as Blob);
    if (getSession('imgs')) {
      const imgs = getSession<Array<string>>('imgs');
      imgs.push(url);
      setSession('imgs', imgs);
    } else {
      setSession('imgs', [url]);
    }
    return url;
  }
  return '';
};
export default createImgUrl;
