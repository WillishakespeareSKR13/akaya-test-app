import { MantineProvider } from "@mantine/core";
import { IonApp, setupIonicReact } from "@ionic/react";
import { RouterRoot } from "./routers/Root";
import { theme } from "./theme/base";

import "@mantine/core/styles.css";
import "@ionic/react/css/core.css";

import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "@ionic/react/css/palettes/dark.system.css";

import "./styles/global.css";

setupIonicReact();

const App: React.FC = () => (
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <IonApp>
      <RouterRoot />
    </IonApp>
  </MantineProvider>
);

export default App;
