import {
  Image,
  Text,
  Stack,
  Container,
  Center,
  Loader,
  Alert,
  Title,
  ScrollArea,
  Box,
  AspectRatio,
  Button,
  Group,
  Badge,
  Divider,
} from "@mantine/core";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonToolbar,
} from "@ionic/react";
import { useAtom } from "jotai";
import { SerieIdAtom } from "../../stores/serie";
import { useEffect, useState } from "react";
import { Serie } from "../../types/serie";
import { CONFIG } from "../../config/config";
import { GetSeriesDetail } from "../../api/series";
import { close } from "ionicons/icons";

export const SerieModal = () => {
  const [seriesId, setSeriesId] = useAtom(SerieIdAtom);
  const [serie, setSerie] = useState<Serie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOpen = !!seriesId;

  useEffect(() => {
    if (seriesId) {
      setIsLoading(true);
      setError(null);
      GetSeriesDetail(seriesId)
        .then((data) => {
          setSerie(data.item);
        })
        .catch((err) => {
          console.error("Error fetching detail:", err);
          setError("No se pudo cargar el detalle de la serie.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [seriesId]);

  const handleClose = () => {
    setSeriesId(null);
    setSerie(null);
  };

  if (isLoading && !serie) {
    return (
      <IonModal
        isOpen={isOpen}
        onDidDismiss={handleClose}
        initialBreakpoint={0.9}
        breakpoints={[0, 0.9, 1]}
        backdropBreakpoint={0.4}
        handle={false}
      >
        <Center h="100%">
          <Loader size="lg" color="red" />
        </Center>
      </IonModal>
    );
  }

  if (error || !serie) {
    return (
      <IonModal
        isOpen={isOpen}
        onDidDismiss={handleClose}
        initialBreakpoint={0.5}
        breakpoints={[0, 0.5, 0.8, 1]}
        backdropBreakpoint={0.4}
      >
        <IonContent className="ion-padding">
          <Alert color="red" title="Error de Carga" variant="filled">
            {error || "El detalle de la serie no está disponible."}
          </Alert>
          <Center mt="md">
            <Button
              onClick={handleClose}
              variant="outline"
              color="red"
              leftSection={<IonIcon icon={close} />}
            >
              Cerrar
            </Button>
          </Center>
        </IonContent>
      </IonModal>
    );
  }

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={handleClose}
      initialBreakpoint={0.9}
      breakpoints={[0, 0.9, 1]}
      backdropBreakpoint={0.4}
      handle={false}
    >
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton slot="end" onClick={handleClose} fill="clear" color="gray">
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <ScrollArea h="100%">
        <Box pos="relative">
          <AspectRatio ratio={16 / 9} maw="100%" mx="auto">
            <Image
              src={`${CONFIG.IMAGE_BASE_URL}${
                serie.imagelandscape || serie.image
              }`}
              alt={serie.name}
              fit="cover"
              fallbackSrc="https://placehold.co/1600x900/1a1b1e/FFF?text=Akaya+Media"
            />
          </AspectRatio>

          <Box
            pos="absolute"
            inset={0}
            style={{
              background:
                "linear-gradient(to top, var(--mantine-color-dark-8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)",
              display: "flex",
              alignItems: "flex-end",
              padding: "var(--mantine-spacing-md)",
            }}
          >
            <Title
              order={1}
              c="white"
              lineClamp={2}
              style={{ marginBottom: 0 }}
            >
              {serie.name}
            </Title>
          </Box>
        </Box>

        <Container size="sm" py="xl">
          <Stack gap="xl">
            <Stack gap="xs">
              <Text
                c="dimmed"
                size="lg"
                fw={500}
                style={{ fontStyle: "italic" }}
              >
                "{serie.tagline}"
              </Text>
              <Group>
                <Badge color="red" variant="filled" size="lg">
                  {serie.genre}
                </Badge>
                <Badge color="gray" size="lg">
                  {serie.clasification}
                </Badge>
                <Badge color="gray" size="lg">
                  {serie.total_chapters} Cap.
                </Badge>
              </Group>
            </Stack>

            <Divider />

            <Stack gap="md">
              <Title order={3}>Sinopsis</Title>
              <Text c="dimmed" style={{ whiteSpace: "pre-wrap" }}>
                {serie.description}
              </Text>

              {serie.comments && (
                <>
                  <Title order={3} mt="md">
                    Mensaje del Autor
                  </Title>
                  <Text c="dimmed" style={{ whiteSpace: "pre-wrap" }}>
                    {serie.comments.split("\r\n")[0]}{" "}
                    {/* Solo la primera línea */}
                  </Text>
                </>
              )}
            </Stack>

            <Divider />

            {/* C. DATOS TÉCNICOS/LEGALES (Clean Layout) */}
            <Title order={3} mb="sm">
              Ficha Técnica
            </Title>
            <Stack gap="xs">
              <MetadataRow label="País" value={serie.country} />
              <MetadataRow label="Idioma" value={serie.language} />
              <MetadataRow label="Créditos" value={serie.credits} />
              <MetadataRow label="Sentido de Lectura" value={serie.read} />
              <MetadataRow label="Legal" value={serie.legal} />
            </Stack>
          </Stack>
        </Container>
      </ScrollArea>
    </IonModal>
  );
};

const MetadataRow = ({ label, value }: { label: string; value: string }) => (
  <Group justify="space-between" wrap="nowrap">
    <Text size="sm" fw={700}>
      {label}:
    </Text>
    <Text size="sm" c="dimmed" ta="right" style={{ wordBreak: "break-word" }}>
      {value}
    </Text>
  </Group>
);
