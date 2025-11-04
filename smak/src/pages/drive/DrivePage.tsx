import { useEffect, useState } from "react";
import { useDynamicMap } from "../../context/DynamicMapProvider";
import { useSmakTopAlert } from "../../context/SmakTopAlertProvider";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "react-bootstrap";
import { useTripCount } from "../../context/TripCountProvider";
import GeocodeInput from "../../components/inputForms/GeocodeInput";
import SubmitButton from "../../components/SubmitButton";
import CarModal from "../profile/CarModal";
import type Car from "../../interfaces/Cars";
import SmakMapButton from "../../components/SmakMapButton";

export default function DrivePage() {
  const { from, setFrom, to, setTo, centerMapOnLocations } = useDynamicMap();
  const { showAlert } = useSmakTopAlert();
  const { comingCount, setComingCount } = useTripCount();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Car | null>(null);
  const [showCarModal, setShowCarModal] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [carPayload, setCarPayload] = useState({
    id: "",
    brand: "",
    model: "",
    color: "",
    licensePlate: "",
    seats: 0,
  });

  // TODO calender
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!from || !to || !selectedVehicle) {
      showAlert({
        message: "Alla fält måste vara ifyllda.",
        backgroundColor: "warning",
        textColor: "white",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1400));

      setComingCount(comingCount + 1); // update footer counters
      showAlert({
        message: "Resa skapad!",
        backgroundColor: "success",
        textColor: "white",
        duration: 4000,
      });

    } catch (error) {
      showAlert({
        message: "Ett fel uppstod vid skapandet av resan. Försök igen.",
        backgroundColor: "danger",
        textColor: "white",
        duration: 5000,
      });

    } finally {
      setIsLoading(false);
    }
  };

  const handleOnCalenderClick = async () => {
    console.log("OnCalenderClick");
  };

  const handleClearInputs = () => {
    setSelectedVehicle(null);
    setFrom(null);
    setTo(null);
  };

  const handleAddVehicle = () => {
    setShowCarModal(true);
  };

  const handleCloseModal = () => {
    setShowCarModal(false);
    setShowVehicleDropdown(false);
    setCarPayload({ id: "", brand: "", model: "", color: "", licensePlate: "", seats: 0 });
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch(`/api/Car`);
        if (!response.ok)
          throw new Error('Failed to fetch cars');

        const allCars = await response.json();
        const userCars = allCars
          .filter((car: any) => car.userId === user!.id)
          .map((car: any) => ({
            id: car.id || '',
            brand: car.brand || '',
            model: car.model || '',
            color: car.color || '',
            licensePlate: car.licensePlate || '',
            seats: typeof car.seats === 'number' ? car.seats : parseInt(car.seats) || 0,
            userId: car.userId
          }));

        setCars(userCars);
      } catch (error) {
        //console.error('Error fetching cars:', error);
      }
    }
    fetchCars();
  }, [user]);


  async function handleSaveCar(car: typeof carPayload) {
    const isCreating = true;

    if (!user?.id) {
      //console.error("Cannot save car: user ID is missing");
      return;
    }

    const payload = {
      brand: car.brand,
      model: car.model,
      color: car.color,
      licensePlate: car.licensePlate,
      seats: Number(car.seats),
      userId: user.id,
    };


    const url = isCreating ? '/api/Car' : `/api/Car/${car.id}`;

    try {
      const response = await fetch(url, {
        method: isCreating ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to save car: ${errText}`);
      }

      const allCarsResponse = await fetch(`/api/Car`);
      const allCars = await allCarsResponse.json();
      const updatedCars = allCars
        .filter((car: any) => car.userId === user.id)
        .map((car: any) => ({
          id: car.id || '',
          brand: car.brand || '',
          model: car.model || '',
          color: car.color || '',
          licensePlate: car.licensePlate || '',
          seats: typeof car.seats === 'number' ? car.seats : parseInt(car.seats) || 0,
          userId: car.userId
        }));

      //console.log('Updated cars after save:', updatedCars);
      setCars(updatedCars);

      const newCar = updatedCars.find(
        (c: { licensePlate: string; brand: string; model: string; }) =>
          c.licensePlate === payload.licensePlate &&
          c.brand === payload.brand &&
          c.model === payload.model
      );
      setSelectedVehicle(newCar || null);
      handleCloseModal();

    } catch (error) {
      //console.error('Error saving car:', error);
    }
  }

  return (
    <div className="position-relative h-100 z-index-fix non-interactive">
      <div className="dynamic-map-ontop-content px-3 d-flex flex-column">
        <div className="d-flex flex-column">

          {/* Buttons */}
          <SmakMapButton
            onClick={centerMapOnLocations}
            icon="bi-geo-alt-fill"
            iconClassName="fs-5 dynamic-map-home-icon"
          />
          <SmakMapButton
            onClick={handleClearInputs}
            icon="bi-x"
            iconClassName="fs-2 dynamic-map-cross-icon"
          />

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="position-relative mb-1 interactive">
              <i className="bi bi-car-front-fill dynamic-map-input-icons fs-5" />
              <input
                type="text"
                className="form-control bg-primary text-white border-0 rounded-5 py-2 dynamic-map-input-field focus-no-outline cursor-pointer"
                placeholder="Välj fordon"
                value={selectedVehicle ? `${selectedVehicle.brand} ${selectedVehicle.model}` : "Välj fordon"}
                readOnly
                onClick={() => setShowVehicleDropdown(true)}
                onBlur={() => setShowVehicleDropdown(false)}
                autoComplete="off"
              />

              {showVehicleDropdown && (
                <ul
                  className="list-group position-absolute w-100 mt-1 rounded-4"
                  style={{ zIndex: 1050, maxHeight: "200px", overflowY: "auto" }}>

                  {cars.length > 0 && cars.map((car, idx) => (
                    <li
                      key={car.id || idx}
                      className="list-group-item list-group-item-action bg-white cursor-pointer dynamic-map-city-dropdown"
                      onMouseDown={() => {
                        setSelectedVehicle(car);
                        setShowVehicleDropdown(false);
                      }}>
                      <span className="me-2 text-secondary">{idx + 1}.</span>
                      {car.brand} {car.model}
                    </li>
                  ))}
                  <li
                    className="list-group-item list-group-item-action bg-white cursor-pointer d-flex align-items-center"
                    onMouseDown={() => {
                      handleAddVehicle();
                      setShowVehicleDropdown(false);
                    }}>
                    <i
                      className="bi bi-plus-circle-fill text-primary"
                      style={{ marginRight: "0.5rem", marginLeft: "-3px" }}
                    ></i>
                    Lägg till fordon
                  </li>
                </ul>
              )}
            </div>

            <GeocodeInput
              value={from}
              onChange={setFrom}
              placeholder="Från" />

            <GeocodeInput
              value={to}
              onChange={setTo}
              placeholder="Till" />

            <div className="position-relative">
              <i className="bi bi-calendar-fill dynamic-map-input-icons fs-5" />
              <Button
                className="btn bg-primary text-white border-0 rounded-5 py-2 dynamic-map-input-field w-100 text-start focus-no-outline interactive"
                onClick={handleOnCalenderClick}>
                Avgång
              </Button>
            </div>

            <SubmitButton
              isLoading={isLoading}
              className="mt-4 interactive"
              color={"primary"}>
              Skapa resa
            </SubmitButton>
          </form>
        </div>
      </div >

      <CarModal
        title="Lägg till fordon"
        show={showCarModal}
        onClose={handleCloseModal}
        payload={carPayload}
        setPayload={setCarPayload}
        isEdit={false}
        isOwnProfile={true}
        onSave={() => handleSaveCar(carPayload)}
      />
    </div >
  )
}
