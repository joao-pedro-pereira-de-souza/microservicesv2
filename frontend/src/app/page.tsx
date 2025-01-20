"use client";

import dynamic from "next/dynamic";

// Carregar o componente App dinamicamente no cliente
const App = dynamic(() => import("./app"), { ssr: false });

export default function MyApp() {
  return <App />;
}
