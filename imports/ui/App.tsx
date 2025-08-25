import React from 'react';
import '/client/main.css';
import { Route, Switch } from 'wouter';
import { protectedRoutes, publicRoutes } from '../utils/constants/routes';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button } from 'antd';

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

export interface BasicSiteProps extends React.PropsWithChildren<any> {
  userId?: string;

}

const App: React.FC = () => {
  const userId: AppUserIdModel = useTracker(() => Meteor.userId());

  if (userId === null) {
    return (
      <div>
        <h1 className="text-red-400 border-black bg-black">No estas logeado!</h1>

        <Switch>
          {Object.values(publicRoutes).map((route: any) => (
            <Route key={route.path} path={route.path}>
              {React.cloneElement(route.element, {
                userId,
              })}
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
      <Switch>
        {Object.values(protectedRoutes).map((route: any) => (
          <Route key={route.path} path={route.path}>
            {React.cloneElement(route.element, {
              userId,
            })}
          </Route>
        ))}
          {Object.values(publicRoutes).map((route: any) => (
            <Route key={route.path} path={route.path}>
              {React.cloneElement(route.element, {
                userId,
              })}
            </Route>
          ))}
      </Switch>

      <Button onClick={() => { Meteor.logout() }}>
        Logout
      </Button>
    </div>
  );

};

export default App;