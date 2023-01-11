import type { ChangeEvent } from 'react';

type CreateImgUrl = (e: ChangeEvent<HTMLInputElement>) => string;

const createImgUrl: CreateImgUrl = e => {
  if (e?.target.files) {
    const url = URL.createObjectURL(e.target.files[0] as Blob);
    return url;
  }
  return '';
};
export default createImgUrl;
