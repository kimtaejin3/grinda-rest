'use client';

import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

export default function ToastContainerWrapper() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      theme="light"
      closeButton={false}
      rtl={false}
    />
  );
}
