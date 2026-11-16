import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { FLEET_VEHICLES, type FleetVehicle } from '../data/fleetData';

const STORAGE_KEY = 'auros_fleet_vehicles_v1';

interface FleetContextValue {
  vehicles: FleetVehicle[];
  availableVehicles: FleetVehicle[];
  addVehicle: (input: Omit<FleetVehicle, 'id'>) => FleetVehicle;
  toggleVehicleAvailability: (id: string) => void;
  deleteVehicle: (id: string) => void;
  resetDefaultFleet: () => void;
}

const FleetContext = createContext<FleetContextValue | null>(null);

function normalizeVehicle(v: FleetVehicle): FleetVehicle {
  return {
    ...v,
    isAvailable: v.isAvailable !== false,
  };
}

function loadInitialVehicles(): FleetVehicle[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return (parsed as FleetVehicle[]).map(normalizeVehicle);
      }
    }
  } catch {
    // Fallback to default seeded vehicles if storage is unavailable or corrupted
  }
  return FLEET_VEHICLES.map(normalizeVehicle);
}

export function FleetProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>(loadInitialVehicles);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [vehicles]);

  const availableVehicles = useMemo(
    () => vehicles.filter((v) => v.isAvailable !== false),
    [vehicles]
  );

  const addVehicle = (input: Omit<FleetVehicle, 'id'>): FleetVehicle => {
    const slug = input.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const newVehicle: FleetVehicle = normalizeVehicle({
      ...input,
      id: `${slug || 'vehicule'}-${Date.now().toString(36)}`,
      isAvailable: input.isAvailable !== false,
    });

    setVehicles((prev) => [newVehicle, ...prev]);
    return newVehicle;
  };

  const toggleVehicleAvailability = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, isAvailable: !(v.isAvailable !== false) }
          : v
      )
    );
  };

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const resetDefaultFleet = () => {
    setVehicles(FLEET_VEHICLES.map(normalizeVehicle));
  };

  return (
    <FleetContext.Provider
      value={{
        vehicles,
        availableVehicles,
        addVehicle,
        toggleVehicleAvailability,
        deleteVehicle,
        resetDefaultFleet,
      }}
    >
      {children}
    </FleetContext.Provider>
  );
}

export function useFleet() {
  const ctx = useContext(FleetContext);
  if (!ctx) {
    throw new Error('useFleet must be used within FleetProvider');
  }
  return ctx;
}
