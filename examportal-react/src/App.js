import React from 'react';
import Header from "./component/header/Header";
import AppRouter from './app.router';
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <div>
      <Header />
      <AppRouter />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
