import { RouterAuth } from "../Auth";
import { RouterHome } from "../Home";
import { useAtomValue } from "jotai";
import { UserAtom } from "../../stores/user";

export const RouterRoot = () => {
  const user = useAtomValue(UserAtom);
  if (!user) return <RouterAuth />;
  return <RouterHome />;
};
