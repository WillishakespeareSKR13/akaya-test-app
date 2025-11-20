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
import { ellipse, square, triangle } from "ionicons/icons";

import Tab1 from "../../pages/(Home)/Tab1";
import Tab2 from "../../pages/(Home)/Tab2";
import Tab3 from "../../pages/(Home)/Tab3";

export const RouterHome = () => (
  <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tab1">
          <Tab1 />
        </Route>
        <Route exact path="/tab2">
          <Tab2 />
        </Route>
        <Route path="/tab3">
          <Tab3 />
        </Route>
        <Route exact path="/">
          <Redirect to="/tab1" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
          <IonIcon aria-hidden="true" icon={triangle} />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon aria-hidden="true" icon={ellipse} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon aria-hidden="true" icon={square} />
          <IonLabel>Tab 3</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonReactRouter>
);
