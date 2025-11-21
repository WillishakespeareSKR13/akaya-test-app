import {
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  Alert,
  Center,
  Container,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useAtomValue, useSetAtom } from "jotai";
import { UserAtom } from "../../../stores/user";
import { useSeries } from "./hook";
import { SerieIdAtom } from "../../../stores/serie";
import { SerieCard } from "../../../components/SerieCard";
import { SerieModal } from "../../../components/SerieModal";

export const HomeSeries = () => {
  const user = useAtomValue(UserAtom);
  const { series, isLoading, error, loadMore, hasMore } = useSeries();
  const setSelectedSeriesId = useSetAtom(SerieIdAtom);

  const handleSelectSeries = (id: string) => {
    setSelectedSeriesId(id);
  };

  if (isLoading && series.length === 0) {
    return (
      <IonPage>
        <Center style={{ height: "100vh" }}>
          <Stack align="center">
            <Loader size="lg" color="red" />
            <Text c="dimmed">Cargando la data de Akaya...</Text>
          </Stack>
        </Center>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <IonContent>
          <Alert color="red" title="Error Crítico" m="xl">
            {error}
          </Alert>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">
            <Title order={1} c="white">
              ¡Qué gusto verte, {user?.name}!
            </Title>
            <Text c="dimmed" size="sm">
              Series Publicadas: {series.length} de {series.length}
            </Text>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <Container size="xl" py="lg">
          <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
            {series.map((serie) => (
              <SerieCard
                key={serie.id}
                serie={serie}
                onClick={handleSelectSeries}
              />
            ))}
          </SimpleGrid>

          <IonInfiniteScroll
            onIonInfinite={loadMore}
            threshold="100px"
            disabled={!hasMore}
          >
            <IonInfiniteScrollContent
              loadingSpinner="lines"
              loadingText={
                hasMore ? "Cargando más series..." : "No hay más contenido."
              }
            ></IonInfiniteScrollContent>
          </IonInfiniteScroll>

          {!hasMore && (
            <Center py="xl">
              <Text c="dimmed">
                Has llegado al final del catálogo Akaya. 🎬
              </Text>
            </Center>
          )}
        </Container>
      </IonContent>

      <SerieModal />
    </IonPage>
  );
};
