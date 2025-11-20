import { atomWithStorage } from "jotai/utils";
import { User } from "../types/user";

export const UserAtom = atomWithStorage<User | null>("USER", null);
