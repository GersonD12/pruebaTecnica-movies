import React from "react";
import "./encabezado.css";

const Encabezado = () => {
  return (
    <header className="header">
      <nav className="nav-menu">
        <ul>
            <li>
                <a href="/">Inicio</a>
            </li>
            <li>
                <a href="/peliculas">Genero</a>
            </li>
            <li>
                <a href="/series">Pais</a>
            </li>
            <li>
                <a href="/series">TV Show</a>
            </li>
            <li>
                <a href="/series">Peliculas</a>
            </li>
        </ul>
        <input 
        type="text"
        value={""}
         placeholder="Buscar..." />
      </nav>
    </header>
  );
}
export default Encabezado;