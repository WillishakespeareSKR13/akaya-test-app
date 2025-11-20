import { useState } from "react";
import { RouterAuth } from "../Auth";
import { RouterHome } from "../Home";

export const RouterRoot = () => {
  const [user] = useState(true);
  if (!user) return <RouterAuth />;
  return <RouterHome />;
};
