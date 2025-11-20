import {
  Image,
  Text,
  Stack,
  Container,
  Center,
  Loader,
  Alert,
  Title,
} from "@mantine/core";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAtom } from "jotai";
import { SerieIdAtom } from "../../stores/serie";
import { useEffect, useState } from "react";
import { GetSeries } from "../../api/series";
import { Serie } from "../../types/serie";
import { CONFIG } from "../../config/config";

export const SerieModal = () => {
  const [seriesId, setSeriesId] = useAtom(SerieIdAtom);
  const [serie, setSerie] = useState<Serie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOpen = !!seriesId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetSeries();
        const serie = data.items.find((e: Serie) => e.id === seriesId);
        setSerie(serie);
      } catch (err) {
        console.error("Error fetching series:", err);
        setError("Falló la conexión con el servidor. Revisa el endpoint POST.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [seriesId]);

  const handleClose = () => {
    setSeriesId(null);
    setSerie(null);
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={handleClose}
      initialBreakpoint={0.9}
      breakpoints={[0, 0.9, 1]}
      backdropBreakpoint={0.4}
      handle={false}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{serie?.name || "Detalle de Serie"}</IonTitle>
          <IonButton slot="end" onClick={handleClose} fill="clear" color="red">
            Cerrar
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container size="sm">
          {isLoading && (
            <Center my="xl">
              <Loader size="lg" color="red" />
            </Center>
          )}

          {error && (
            <Alert color="red" title="Error">
              {error}
            </Alert>
          )}
          {serie && !isLoading && (
            <Stack gap="xl">
              <Center>
                <Image
                  src={`${CONFIG.IMAGE_BASE_URL}${serie.image}`}
                  width={200}
                  height={300}
                  radius="md"
                  fit="cover"
                  alt={serie.name}
                  fallbackSrc="https://placehold.co/200x300/1a1b1e/FFF?text=Sin+Imagen"
                />
              </Center>

              <Title order={2} ta="center">
                {serie.name}
              </Title>

              <Stack gap="xs">
                {Object.entries(serie).map(([key, value]) =>
                  [
                    "id",
                    "name",
                    "image",
                    "description",
                    "status",
                    "total_chapters",
                  ].includes(key) || typeof value === "object" ? null : (
                    <Text key={key}>
                      <Text component="span" fw={700}>
                        {key.replace(/_/g, " ")}:
                      </Text>{" "}
                      {String(value)}
                    </Text>
                  )
                )}

                <Text>
                  <Text component="span" fw={700}>
                    Estado:
                  </Text>{" "}
                  {serie.status}
                </Text>
                <Text>
                  <Text component="span" fw={700}>
                    Capítulos:
                  </Text>{" "}
                  {serie.total_chapters}
                </Text>

                <>
                  <Title order={3} mt="md">
                    Sinopsis
                  </Title>
                  <Text c="dimmed" style={{ whiteSpace: "pre-wrap" }}>
                    Sinopsis
                  </Text>
                </>
              </Stack>
            </Stack>
          )}
        </Container>
      </IonContent>
    </IonModal>
  );
};
