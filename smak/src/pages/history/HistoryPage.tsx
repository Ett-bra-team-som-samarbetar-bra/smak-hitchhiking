import TripCardBig from "../../components/trip/TripCardBig";
import TripCardSmall from "../../components/trip/TripCardSmall";

export default function HistoryPage() {
  return (
    <div className="d-flex flex-column gap-3">
      <h2 className="m-0">Resor 07/12</h2>

      <TripCardSmall
        className=""
        firstName="Lena"
        lastName="Handen"
        userImage="/images/development/user2.png"
        startTime="15:00"
        endTime="19:30"
        startCity="Stockholm"
        endCity="Malmö"
        rating={2}
        distance={420} />

      <TripCardSmall
        className=""
        firstName="Jocke"
        lastName="Kek"
        userImage="/images/development/user2.png"
        startTime="12:00"
        endTime="12:15"
        startCity="Haga"
        endCity="Världens bar"
        rating={5}
        distance={3} />

      <h2 className="m-0">Resor 08/12</h2>

      <TripCardSmall
        className=""
        firstName="Jocke"
        lastName="Kek"
        userImage="/images/development/user2.png"
        startTime="12:00"
        endTime="12:15"
        startCity="Världens bar"
        endCity="Haga"
        rating={1}
        distance={3} />

      <TripCardBig
        className=""
        firstName="Lena"
        lastName="Handen"
        startTime="15:00"
        endTime="19:30"
        startCity="Stockholm"
        endCity="Malmö"
        rating={3}
        distance={420}
        date="13/03 25"
        vehicleInfo="Keken"
        numOfSeats="42" />

      <TripCardSmall
        className=""
        firstName="Jocke"
        lastName="Kek"
        userImage="/images/development/user2.png"
        startTime="12:00"
        endTime="12:15"
        startCity="Haga"
        endCity="Världens bar"
        rating={3}
        distance={3} />
    </div>
  )
}
