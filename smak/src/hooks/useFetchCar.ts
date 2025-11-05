import { useEffect, useState } from "react";
import type Car from "../interfaces/Cars";

export default function useFetchCar(carId: string) {
  const [car, setCar] = useState<Car>();

  useEffect(() => {
    async function fetchCar() {
      try {
        const result = await fetch(`api/Car/${carId}`);
        if (!result.ok) throw new Error("Kunde ej hämta bil");
        const data = await result.json();
        setCar(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCar();
  }, [carId]);

  return car;
}
