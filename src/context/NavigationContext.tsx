import React, { createContext, useContext, useEffect, useState } from "react";

type NavContext = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
};

const KEY = "rb:nav:v1";

const NavigationContext = createContext<NavContext | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveIdState] = useState<string | null>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed.activeId ?? null;
    } catch {
      return null;
    }
  });

  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return "light";
      const parsed = JSON.parse(raw);
      return parsed.theme === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      const payload = { activeId, theme };
      localStorage.setItem(KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }, [activeId, theme]);

  const setActiveId = (id: string | null) => setActiveIdState(id);
  const setTheme = (t: "light" | "dark") => setThemeState(t);

  return (
    <NavigationContext.Provider value={{ activeId, setActiveId, theme, setTheme }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useNavigation must be used inside NavigationProvider");
  return ctx;
}
