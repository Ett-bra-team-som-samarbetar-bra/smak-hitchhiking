import { useEffect, useState } from "react";
import { useDynamicMap } from "../../context/DynamicMapProvider";
import { useSmakTopAlert } from "../../context/SmakTopAlertProvider";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "react-bootstrap";
import { useTripCount } from "../../context/TripCountProvider";
import { registerLocale } from "react-datepicker";
import { sv } from "date-fns/locale/sv";
import { addDays } from "date-fns";
import type Car from "../../interfaces/Cars";
import GeocodeInput from "../../components/inputForms/GeocodeInput";
import SubmitButton from "../../components/SubmitButton";
import CarModal from "../profile/CarModal";
import SmakMapButton from "../../components/SmakMapButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type TripRequest from "../../interfaces/TripRequest";

export default function DrivePage() {
  const {
    from,
    setFrom,
    to,
    setTo,
    distance,
    setDistance,
    duration,
    setDuration,
    centerMapOnLocations,
  } = useDynamicMap();
  const { comingCount, setComingCount } = useTripCount();
  const { showAlert } = useSmakTopAlert();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Car | null>(null);
  const [showCarModal, setShowCarModal] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [carPayload, setCarPayload] = useState({
    id: "",
    brand: "",
    model: "",
    color: "",
    licensePlate: "",
    seats: 0,
  });

  if (!user) return;

  registerLocale("sv", sv);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!from || !to || !selectedVehicle || !date || !distance || !duration) {
      showAlert({
        message: "Alla fält måste vara ifyllda.",
        backgroundColor: "warning",
        textColor: "white",
        duration: 3000,
      });
      return;
    }

    const departureUTC = date.toISOString();
    const arrivalUTC = new Date(date.getTime() + duration * 1000).toISOString();

    const payload: TripRequest = {
      title: `${user.firstName} ${user.lastName} - ${from.name} till ${to.name}`,
      driver: [{ id: user?.id, username: user?.username }],
      carIdId: selectedVehicle.id,
      startPosition: from.name,
      endPosition: to.name,
      departureTime: departureUTC,
      arrivalTime: arrivalUTC,
      distance: Math.round(distance / 1000),
      seats: selectedVehicle.seats,
    };

    setIsLoading(true);

    try {
      const response = await fetch("api/Trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Inlogg misslyckades");
      }

      const data = await response.json();
      await Promise.all([data, new Promise((res) => setTimeout(res, 1000))]);

      setComingCount(comingCount + 1); // Update footer counters
      showAlert({
        message: "Resa skapad!",
        backgroundColor: "success",
        textColor: "white",
        duration: 4000,
      });

      setSelectedVehicle(null);
      setDate(null);
      setOpen(false);
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

  const clearInputs = () => {
    setSelectedVehicle(null);
    setFrom(null);
    setTo(null);
    setDistance(null);
    setDuration(null);
    setDate(null);
    setOpen(false);
  };

  const handleAddVehicle = () => {
    setShowCarModal(true);
  };

  const handleCloseModal = () => {
    setShowCarModal(false);
    setShowVehicleDropdown(false);
    setCarPayload({
      id: "",
      brand: "",
      model: "",
      color: "",
      licensePlate: "",
      seats: 0,
    });
  };

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch(`/api/Car`);
        if (!response.ok) throw new Error("Failed to fetch cars");

        const allCars = await response.json();

        const userCars = allCars
          .filter((car: any) => car.user[0].id === user!.id) // lul
          .map((car: any) => ({
            id: car.id || "",
            brand: car.brand || "",
            model: car.model || "",
            color: car.color || "",
            licensePlate: car.licensePlate || "",
            seats:
              typeof car.seats === "number"
                ? car.seats
                : parseInt(car.seats) || 0,
            user: car.user,
          }));

        setCars(userCars);
      } catch (error) {
        showAlert({
          message: "Okänt fel. Försök igen.",
          backgroundColor: "danger",
          textColor: "white",
          duration: 5000,
        });
      }
    }
    fetchCars();
  }, [user]);

  async function handleSaveCar(car: typeof carPayload) {
    const isCreating = true;

    if (!user?.id) {
      return;
    }

    const payload = {
      title: `${user.lastName} - ${car.brand} ${car.model}`,
      brand: car.brand,
      model: car.model,
      color: car.color,
      licensePlate: car.licensePlate,
      seats: Number(car.seats),
      user: [
        {
          id: user.id,
          username: user.username,
        },
      ],
    };

    const url = isCreating ? "/api/Car" : `/api/Car/${car.id}`;

    try {
      const response = await fetch(url, {
        method: isCreating ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        showAlert({
          message: "Kunde inte spara bil. Försök igen.",
          backgroundColor: "danger",
          textColor: "white",
          duration: 5000,
        });
        return;
      }

      const allCarsResponse = await fetch(`/api/Car`);
      const allCars = await allCarsResponse.json();
      const updatedCars = allCars
        .filter((car: any) => car.user[0].id === user.id)
        .map((car: any) => ({
          id: car.id || "",
          brand: car.brand || "",
          model: car.model || "",
          color: car.color || "",
          licensePlate: car.licensePlate || "",
          seats:
            typeof car.seats === "number"
              ? car.seats
              : parseInt(car.seats) || 0,
          user: car.user,
        }));

      setCars(updatedCars);

      const newCar = updatedCars.find(
        (c: { licensePlate: string; brand: string; model: string }) =>
          c.licensePlate === payload.licensePlate &&
          c.brand === payload.brand &&
          c.model === payload.model
      );
      setSelectedVehicle(newCar || null);
      handleCloseModal();
    } catch (error) {
      showAlert({
        message: "Okänt fel. Försök igen.",
        backgroundColor: "danger",
        textColor: "white",
        duration: 5000,
      });
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
            onClick={clearInputs}
            icon="bi-x"
            iconClassName="fs-2 dynamic-map-cross-icon"
          />

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="position-relative mb-1 interactive">
              <i className="bi bi-car-front-fill dynamic-map-input-icons fs-5 non-interactive" />
              <input
                type="text"
                className="form-control bg-primary text-white border-0 rounded-5 py-2 dynamic-map-input-field focus-no-outline cursor-pointer"
                placeholder="Välj fordon"
                value={
                  selectedVehicle
                    ? `${selectedVehicle.brand} ${selectedVehicle.model}`
                    : "Välj fordon"
                }
                readOnly
                onClick={() => setShowVehicleDropdown(true)}
                onBlur={() => setShowVehicleDropdown(false)}
                autoComplete="off"
              />

              {showVehicleDropdown && (
                <ul
                  className="list-group position-absolute w-100 mt-1 rounded-4"
                  style={{
                    zIndex: 1050,
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {cars.length > 0 &&
                    cars.map((car, idx) => (
                      <li
                        key={car.id || idx}
                        className="list-group-item list-group-item-action bg-white cursor-pointer dynamic-map-city-dropdown"
                        onMouseDown={() => {
                          setSelectedVehicle(car);
                          setShowVehicleDropdown(false);
                        }}
                      >
                        <span className="me-2 text-secondary">{idx + 1}.</span>
                        {car.brand} {car.model}
                      </li>
                    ))}
                  <li
                    className="list-group-item list-group-item-action bg-white cursor-pointer d-flex align-items-center"
                    onMouseDown={() => {
                      handleAddVehicle();
                      setShowVehicleDropdown(false);
                    }}
                  >
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
              placeholder="Från"
              excludeCity={to?.name}
              icon="bi-pin-fill"
            />

            <GeocodeInput
              value={to}
              onChange={setTo}
              placeholder="Till"
              excludeCity={from?.name}
              icon="bi-flag-fill"
            />

            {/* Calender */}
            <div className="position-relative interactive w-100">
              <i className="bi bi-calendar-fill dynamic-map-input-icons fs-5 non-interactive" />
              <Button
                type="button"
                className="btn bg-primary text-white border-0 rounded-5 py-2 dynamic-map-input-field w-100 text-start focus-no-outline"
                onClick={() => setOpen(true)}
              >
                {date
                  ? date.toLocaleString("sv-SE", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })
                  : "Avgång"}
              </Button>

              <div className="datepicker-popup">
                <DatePicker
                  open={open}
                  calendarClassName="bg-white rounded-3 overflow-hidden interactive cursor-pointer"
                  locale="sv"
                  placeholderText="Avgång"
                  popperPlacement="top"
                  showIcon={false}
                  selected={date}
                  onChange={(d) => setDate(d)}
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 14)}
                  disabledKeyboardNavigation
                  showPopperArrow={false}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  timeCaption="Tid"
                  dateFormat="yyyy-MM-dd HH:mm"
                  autoComplete="off"
                  onClickOutside={() => setOpen(false)}
                  onCalendarClose={() => setOpen(false)}
                  customInput={<span style={{ display: "none" }} />}
                />
              </div>
            </div>

            <SubmitButton
              isLoading={isLoading}
              className="mt-4 interactive"
              color={"primary"}
            >
              Skapa resa
            </SubmitButton>
          </form>
        </div>
      </div>

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
    </div>
  );
}
