import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import { book, heart, body } from "ionicons/icons";

import { HomeSeries } from "../../pages/(Home)/Series";
import { HomeFavorities } from "../../pages/(Home)/Favorities";
import { HomeUser } from "../../pages/(Home)/User";

export const RouterHome = () => (
  <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/series">
          <HomeSeries />
        </Route>
        <Route exact path="/favorites">
          <HomeFavorities />
        </Route>
        <Route path="/user">
          <HomeUser />
        </Route>
        <Route exact path="/">
          <Redirect to="/series" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/series">
          <IonIcon aria-hidden="true" icon={book} />
          <IonLabel>Series</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/favorites">
          <IonIcon aria-hidden="true" icon={heart} />
          <IonLabel>Favoritos</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/user">
          <IonIcon aria-hidden="true" icon={body} />
          <IonLabel>Cuenta</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonReactRouter>
);
