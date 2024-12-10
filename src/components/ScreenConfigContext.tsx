import React, { createContext, useContext, ReactNode } from "react";

interface ScreenConfig {
  height: number;
  backgroundColor: string;
}

const ScreenConfigContext = createContext<ScreenConfig | undefined>(undefined);

// Define una interfaz para las props del proveedor de contexto, que incluye a los hijos y la configuración de la pantalla.
interface ScreenConfigProviderProps {
  children: ReactNode; // Los hijos que se renderizarán dentro del provider.
  config: ScreenConfig;
}

// Se crea un componente llamado ScreenConfigProvider que se encarga de trasladar el contexto.
export const ScreenConfigProvider = ({
  children,
  config,
}: ScreenConfigProviderProps) => {
  // Devuelve el provider de contexto, envolviendo a los hijos y usando config anteriormente definido.
  return (
    <ScreenConfigContext.Provider value={config}>
      {children}
    </ScreenConfigContext.Provider>
  );
};

// Crea un hook personalizado para usar el contexto ScreenConfigContext de manera fácil.
export const useScreenConfig = () => {
  // Devuelve el valor actual del contexto.
  const context = useContext(ScreenConfigContext);
  if (!context) {
    throw new Error("Ha habido un error al proporcionar el contexto");
  }
  return context;
};
