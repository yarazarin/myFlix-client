import { createRoot } from "react-dom/client";
import { Container } from "react-bootstrap";
import "./index.css";
import App from "./components/App/App";

const MyFlixApplication = () => {
  return (
    <Container>
      <App />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);
