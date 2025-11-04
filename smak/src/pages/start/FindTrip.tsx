import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDynamicMap } from "../../context/DynamicMapProvider";
import { useSmakTopAlert } from "../../context/SmakTopAlertProvider";
import { addDays } from "date-fns";
import { Button } from "react-bootstrap";
import { registerLocale } from "react-datepicker";
import { sv } from "date-fns/locale/sv";
import SubmitButton from "../../components/SubmitButton";
import GeocodeInput from "../../components/inputForms/GeocodeInput";
import SmakMapButton from "../../components/SmakMapButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FindTrip() {
  const { from, setFrom, to, setTo, centerMapOnLocations } = useDynamicMap();
  const { showAlert } = useSmakTopAlert();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  registerLocale("sv", sv);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!from || !to || !date) {
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
      handleClearInputs();
      // TODO fetch post
      navigate("/trips-found");

    } catch (error) {
      showAlert({
        message: "Ett fel uppstod vid sökningen av resor. Försök igen.",
        backgroundColor: "danger",
        textColor: "white",
        duration: 5000,
      });

    } finally {
      setIsLoading(false);
    }
  };

  const handleClearInputs = () => {
    setFrom(null);
    setTo(null);
    setDate(null);
    setOpen(false);
  };

  return (
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
          <GeocodeInput
            value={from}
            onChange={setFrom}
            placeholder="Från" />

          <GeocodeInput
            value={to}
            onChange={setTo}
            placeholder="Till" />

          {/* Calender */}
          <div className="position-relative interactive w-100" >
            <i className="bi bi-calendar-fill dynamic-map-input-icons fs-5" />
            <Button
              type="button"
              className="btn bg-primary text-white border-0 rounded-5 py-2 dynamic-map-input-field w-100 text-start focus-no-outline"
              onClick={() => setOpen(true)}>
              {date ? date.toLocaleDateString() : "Avgång"}
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
                minDate={new Date()}
                maxDate={addDays(new Date(), 14)}
                disabledKeyboardNavigation={true}
                showPopperArrow={false}
                showTimeInput={false}
                autoComplete={"off"}
                onChange={d => { setDate(d); }}
                onClickOutside={() => setOpen(false)}
                customInput={<span style={{ display: "none" }} />}
              />
            </div>
          </div>

          <SubmitButton
            isLoading={isLoading}
            className="mt-4 interactive"
            color={"primary"}>
            Sök resa
          </SubmitButton>
        </form>
      </div >
    </div >
  );
}
