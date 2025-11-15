import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import AcercaDe from "./pages/AcercaDe";
import Consumo from "./pages/Consumo";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/acercade" element={<AcercaDe />} />
        <Route path="/consumo" element={<Consumo />} />
      </Routes>
    </Layout>
  );
}
