import { Header } from "./sections/Header/Header";
import { AppLayout } from "./shared/features/AppLayout/AppLayout";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <AppLayout />
    </div>
  );
}

export default App;
