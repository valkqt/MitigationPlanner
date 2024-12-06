import "./App.css";
import RoutingComponent from "./components/RoutingComponent/RoutingComponent";

export let absoluteMousePosition: number;
document.addEventListener("mousemove", (e) => {
  absoluteMousePosition = e.pageX - 64;

  if (absoluteMousePosition % 8 === 0) {
    return absoluteMousePosition;
  }
});

function App() {
  return (
    <>
      <RoutingComponent />
    </>
  );
}

export default App;
