import { motion } from "framer-motion";
import {
  Card,
  Image,
  Text,
  Box,
  Stack,
  Badge,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { Serie } from "../../types/serie";
import { CONFIG } from "../../config/config";
import { useAtom } from "jotai";
import { FavoriteIdsSetAtom } from "../../stores/favorities";
import { heart } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

interface SerieCardProps {
  serie: Serie;
  onClick: (id: string) => void;
}

const VARIANTS = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
} as const;

export const SerieCard = (props: SerieCardProps) => {
  const { serie, onClick } = props;
  const [favoriteIds, toggleFavorite] = useAtom(FavoriteIdsSetAtom);

  const isFavorite = favoriteIds.has(serie.id);
  const isPublished = serie?.status === "Published";

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({ type: "toggle", id: serie.id });
  };

  return (
    <motion.div
      variants={VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      style={{ height: "100%" }}
    >
      <Card
        shadow="sm"
        p={0}
        radius="md"
        withBorder
        h="100%"
        bg="dark.8"
        style={{ overflow: "hidden", position: "relative" }}
        onClick={() => onClick(serie.id)}
      >
        <Badge
          fz="12px"
          fw={600}
          size="md"
          color={isPublished ? "green" : "gray"}
          pos="absolute"
          top={10}
          left={10}
          style={{ zIndex: 10 }}
        >
          {isPublished ? "Publicado" : "No Publicado"}
        </Badge>
        <Box pos="relative" h={320}>
          <Image
            src={`${CONFIG.IMAGE_BASE_URL}${serie.image}`}
            height={320}
            alt={serie.name}
            fit="cover"
            fallbackSrc="https://placehold.co/400x600/1a1b1e/FFF?text=Sin+Imagen"
          />
          <Tooltip
            label={isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
            position="left"
            withArrow
          >
            <ActionIcon
              variant="filled"
              color={isFavorite ? "red.7" : "gray.6"}
              size="lg"
              radius="xl"
              pos="absolute"
              top={10}
              right={10}
              style={{ zIndex: 10 }}
              onClick={handleToggleFavorite}
            >
              <IonIcon icon={heart} />
            </ActionIcon>
          </Tooltip>
          <Box
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "70%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)",
              zIndex: 1,
            }}
          />

          <Stack
            pos="absolute"
            bottom={0}
            left={0}
            p="md"
            w="100%"
            style={{ zIndex: 2 }}
            gap="xs"
          >
            <Stack gap={0}>
              <Text
                fw={700}
                size="lg"
                c="white"
                lineClamp={2}
                title={serie.name}
              >
                {serie.name}
              </Text>

              <Text c="dimmed" size="sm">
                Capítulos: {serie.total_chapters}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </motion.div>
  );
};
