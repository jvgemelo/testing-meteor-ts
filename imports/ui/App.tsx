import React from 'react';
import { Hello } from './Hello';
import { Info } from './Info';
import '/client/main.css';
import { Route, Switch } from 'wouter';
import { publicRoutes } from '../utils/constants/routes';

interface App {}

const App: React.FC<App> = () => {
  return (
    <div>
      <h1 className="text-red-400 border-black bg-black">Este es mi primer proyecto con meteor!</h1>
      <Hello />
      <Info />
      <Switch>
         {Object.values(publicRoutes).map((route) => (
           <Route key={route.path} path={route.path}>
               {route.element}
            </Route>
          ))}
      </Switch>
    </div>
  );
};

export default App;