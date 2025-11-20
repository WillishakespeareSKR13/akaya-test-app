import { IonContent, IonPage } from "@ionic/react";
import { UserAtom } from "../../../stores/user";
import { useSetAtom } from "jotai";
import { useHistory } from "react-router";
import { useState } from "react";
import {
  Button,
  Container,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

export const AuthLogin = () => {
  const [name, setName] = useState("");
  const setUserName = useSetAtom(UserAtom);
  const history = useHistory();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setUserName({ name });
    history.replace("/");
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Container
          size="xs"
          h="100vh"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Paper shadow="md" radius="md" p="xl" withBorder>
            <Stack gap="lg">
              <Stack ta="center" gap={0}>
                <Title order={2} c="white">
                  Bienvenido a Akaya
                </Title>
                <Text c="dimmed" size="sm" mt={5}>
                  Ingresa tu nombre para comenzar la experiencia
                </Text>
              </Stack>

              <TextInput
                label="Nombre de usuario"
                placeholder="Ej: Jon Doe"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                required
                size="md"
              />

              <Button
                fullWidth
                mt="xl"
                size="md"
                color="red"
                onClick={handleLogin}
                disabled={!name.trim()}
              >
                Ingresar
              </Button>
            </Stack>
          </Paper>
        </Container>
      </IonContent>
    </IonPage>
  );
};
