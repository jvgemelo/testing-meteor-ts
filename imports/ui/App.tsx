import React from 'react';
import { Hello } from './Hello';
import { Info } from './Info';
import './main.css';

export const App = () => (
  <div>
    <h1 className="text-red-400 border-black bg-black">Este es mi primer proyecto con meteor!</h1>
    <Hello />
    <Info />
  </div>
);
