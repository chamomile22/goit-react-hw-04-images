import { createPortal } from 'react-dom';
import { LoaderOverlay } from './Loader.styled';

const loaderRoot = document.querySelector('#loader-root');

export const Loader = ({ children }) => {
  return createPortal(<LoaderOverlay>{children}</LoaderOverlay>, loaderRoot);
};
