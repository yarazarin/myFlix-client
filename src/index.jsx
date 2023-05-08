import { createRoot } from "react-dom/client";
import "./index.scss";
import MainView from "./components/MainView/Mainview";

const MyFlixApplication = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);
