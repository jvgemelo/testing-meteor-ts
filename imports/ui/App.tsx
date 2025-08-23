import React from 'react';
import { Hello } from './Hello';
import { Info } from './Info';
import '/client/main.css';
import { Route, Switch } from 'wouter';
import { protectedRoutes, publicRoutes } from '../utils/constants/routes';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

/**
 * 
 * Define el tipo del id de usuuario en el login
 * 
 * será null si no está logeado
 * undefined si aún no se ha determinado
 * string si está logeado (userId)
 * 
 */
export type AppUserIdModel = string | undefined | null;

interface App { }

const App: React.FC<App> = () => {
  const userId: AppUserIdModel = useTracker(() => Meteor.userId());

  if (userId === null) {
    return (
      <div>
        <h1 className="text-red-400 border-black bg-black">No estas logeado!</h1>
        <Hello />
        <Info />
        <Switch>
          {Object.values(publicRoutes).map((route: any) => (
            <Route key={route.path} path={route.path}>
              {route.element}
            </Route>
          ))}
        </Switch>
      </div>
    );
  }
  if (userId === undefined) {
    return <div>Loading...</div>;
  }

   return (
      <div>
        <h1 className="text-red-400 border-black bg-black">Estas logeado</h1>
        <Hello />
        <Info />
        <Switch>
          {Object.values(protectedRoutes).map((route: any) => (
            <Route key={route.path} path={route.path}>
              {route.element}
            </Route>
          ))}
        </Switch>
      </div>
    );

};

export default App;