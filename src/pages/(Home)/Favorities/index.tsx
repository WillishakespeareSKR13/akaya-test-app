import { IonPage, IonContent, IonIcon } from "@ionic/react";
import {
  Container,
  SimpleGrid,
  Title,
  Text,
  Center,
  Stack,
  Flex,
} from "@mantine/core";
import { SerieCard } from "../../../components/SerieCard";
import { heart } from "ionicons/icons";
import { useFavorities } from "./hook";

export const HomeFavorities = () => {
  const { favorities } = useFavorities();

  const handleSelectSeries = (id: string) => {
    console.log(`Abriendo modal de detalle para favorito: ${id}`);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Container size="xl" py="lg" w="100%" h="100%">
          <Title order={2} mb="lg">
            Mis Favoritos
          </Title>

          {favorities.length === 0 ? (
            <Flex w="100%" h="100%" align="center" justify="center">
              <Center style={{ height: 300 }}>
                <Stack align="center" gap="md">
                  <IonIcon icon={heart} style={{ width: 32, height: 32 }} />
                  <Text c="dimmed" size="lg">
                    Aún no tienes series en favoritos. ¡Añade algunas!
                  </Text>
                </Stack>
              </Center>
            </Flex>
          ) : (
            <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
              {favorities.map((serie) => (
                <SerieCard
                  key={serie.id}
                  serie={serie}
                  onClick={handleSelectSeries}
                />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </IonContent>
    </IonPage>
  );
};
