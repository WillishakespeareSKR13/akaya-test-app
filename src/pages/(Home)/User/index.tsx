import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { useAtom } from "jotai";
import { useHistory } from "react-router-dom";
import {
  Container,
  Title,
  Text,
  Button,
  Center,
  Stack,
  Divider,
  Avatar,
} from "@mantine/core";
import { UserAtom } from "../../../stores/user";
import { logOut } from "ionicons/icons";

export const HomeUser = () => {
  const [user, setUser] = useAtom(UserAtom);

  const history = useHistory();

  const handleLogout = () => {
    setUser(null);

    history.replace("/");
  };

  const userInitial = user ? user?.name.charAt(0).toUpperCase() : "?";

  return (
    <IonPage>
      <IonContent fullscreen>
        <Container size="sm" py="xl">
          <Title order={2} mb="lg">
            Mi Cuenta
          </Title>
          <Center>
            <Stack align="center" gap="xl" w="100%">
              <Avatar color="red" size="xl" radius="50%">
                <Text fw={700} size="3rem">
                  {userInitial}
                </Text>
              </Avatar>

              <Stack align="center" gap="xs">
                <Title order={1} c="white">
                  {user?.name || "Usuario Invitado"}
                </Title>
                <Text c="dimmed" size="lg">
                  Miembro de Akaya Media
                </Text>
              </Stack>

              <Divider size="sm" w="80%" />

              <Text c="dimmed" size="sm" ta="center" maw={300}>
                Aquí podrías ver tu historial de visualización, suscripciones y
                ajustes.
              </Text>

              <Button
                variant="light"
                color="red"
                size="md"
                leftSection={<IonIcon icon={logOut} />}
                onClick={handleLogout}
                fullWidth
                style={{ maxWidth: 300 }}
              >
                Cerrar Sesión
              </Button>
            </Stack>
          </Center>
        </Container>
      </IonContent>
    </IonPage>
  );
};
