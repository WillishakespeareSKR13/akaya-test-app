import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const SelectedSeriesIdAtom = atom<string | null>(null);

const FavoriteIdsArrayAtom = atomWithStorage<string[]>("FAVORITIES", []);

export const FavoriteIdsSetAtom = atom(
  (get) => new Set(get(FavoriteIdsArrayAtom)),
  (get, set, action: { type: "toggle"; id: string }) => {
    const currentIds = get(FavoriteIdsArrayAtom);
    const id = action.id;

    if (action.type === "toggle") {
      if (currentIds.includes(id)) {
        set(
          FavoriteIdsArrayAtom,
          currentIds.filter((favId) => favId !== id)
        );
      } else {
        set(FavoriteIdsArrayAtom, [...currentIds, id]);
      }
    }
  }
);
