import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { PageProps } from "./types";

export const Page = (props: PageProps) => {
  const { children, title } = props;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title ?? "Example Page"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{title ?? "Example Page"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {children}
      </IonContent>
    </IonPage>
  );
};
