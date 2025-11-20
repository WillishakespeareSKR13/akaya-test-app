import { IonRouterOutlet, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import { AuthLogin } from "../../pages/(Auth)/Login";

export const RouterAuth = () => (
  <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/login">
          <AuthLogin />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  </IonReactRouter>
);
