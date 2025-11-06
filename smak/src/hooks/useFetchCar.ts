import { useEffect, useState } from "react";
import type Car from "../interfaces/Cars";

export default function useFetchCar(carId: string) {
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    if (!carId) {
      setCar(null);
      return;
    }

    const fetchCar = async () => {
      try {
        const result = await fetch(`api/Car/${carId}`);
        if (!result.ok) throw new Error("Kunde ej hämta bil");
        const data = await result.json();
        setCar(data);
      } catch (error) {
        console.log(error);
        setCar(null);
      }
    };

    fetchCar();
  }, [carId]);

  return car;
}
