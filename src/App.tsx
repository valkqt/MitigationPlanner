import { SessionProvider } from "next-auth/react";
import "./App.css";
import RoutingComponent from "./components/RoutingComponent/RoutingComponent";
import { gridSize } from "./globals";

export let absoluteMousePosition: number;
document.addEventListener("mousemove", (e) => {
  absoluteMousePosition = e.pageX - 64;

  if (absoluteMousePosition % gridSize !== 0) {
    return;
  }
});

function App({...props}) {
  return (
    <SessionProvider session={props.session}>
      <RoutingComponent />
    </SessionProvider>
  );
}

export default App;
