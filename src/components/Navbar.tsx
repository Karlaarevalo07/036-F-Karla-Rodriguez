import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkStyle = (path: string) =>
    `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
      pathname === path
        ? "bg-pink-500 text-white"
        : "text-pink-100 hover:bg-pink-400"
    }`;

  return (
    <nav className="bg-pink-300 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-lg font-bold text-pink-800">Karla Examen Final</h1>
        <div className="space-x-2">
          <Link to="/" className={linkStyle("/")}>Inicio</Link>
          <Link to="/acercade" className={linkStyle("/acercade")}>Acerca de</Link>
          <Link to="/consumo" className={linkStyle("/consumo")}>Consumo</Link>
        </div>
      </div>
    </nav>
  );
}
