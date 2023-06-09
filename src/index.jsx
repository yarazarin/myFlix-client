import { createRoot } from "react-dom/client";
import { Container } from "react-bootstrap";
import "./index.scss";
import MainView from "./components/MainView/MainView";

const MyFlixApplication = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);
