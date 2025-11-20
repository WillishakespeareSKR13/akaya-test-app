import "./index.css";
import { ContainerProps } from "./types";

export const Container = (props: ContainerProps) => {
  const { name } = props;
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>
        Explore{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          UI Components
        </a>
      </p>
    </div>
  );
};
