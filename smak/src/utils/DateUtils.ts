
interface TripType {
  date: string;
  [key: string]: any;
}

// group trips by matching dates for printing out same day trips together
export function groupTripsByDate(trips: TripType[]) {
  const groupedTrips: { [date: string]: TripType[] } = {};
  for (const trip of trips) {
    const date = trip.date;
    if (!groupedTrips[date]) {
      groupedTrips[date] = [];
    }
    groupedTrips[date].push(trip);
  }

  return groupedTrips;
}

// get trip date with time included
export function getTripDateTime(trip: TripType, useEndTime = false): Date {
  const timeString = useEndTime ? trip.endTime : trip.startTime;
  const [hours, minutes] = timeString.split(":").map(Number);

  const tripDateTime = new Date(trip.date);
  tripDateTime.setHours(hours, minutes, 0, 0);

  return tripDateTime;
}

// generate some mock trips data
function formatDate(daysFromNow: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
}

export function getAllTrips() {
  const allTrips = [
    {
      firstName: "Iron",
      lastName: "Boy",
      userImage: "/images/development/user2.png",
      startTime: "08:00",
      endTime: "10:30",
      startCity: "Stockholm",
      endCity: "Malmö",
      rating: 2,
      distance: 420,
      date: formatDate(0),
    },
    {
      firstName: "Iron",
      lastName: "Boy",
      userImage: "/images/development/user2.png",
      startTime: "15:00",
      endTime: "19:30",
      startCity: "Stockholm",
      endCity: "Malmö",
      rating: 2,
      distance: 420,
      date: formatDate(0),
    },
    {
      firstName: "Jocke",
      lastName: "Bjers",
      userImage: "/images/development/user2.png",
      startTime: "12:00",
      endTime: "12:15",
      startCity: "Haga",
      endCity: "Världens bar",
      rating: 5,
      distance: 3,
      date: formatDate(-4),
    },
    {
      firstName: "Lena",
      lastName: "Tjo",
      userImage: "/images/development/user2.png",
      startTime: "15:00",
      endTime: "19:30",
      startCity: "Skummeslövsstrand",
      endCity: "Malmö",
      rating: 3,
      distance: 420,
      date: formatDate(-2),
    },
    {
      firstName: "Jocke",
      lastName: "Kek",
      userImage: "/images/development/user2.png",
      startTime: "12:00",
      endTime: "12:15",
      startCity: "Haga",
      endCity: "Världens bar",
      rating: 3,
      distance: 3,
      date: formatDate(-4),
    },
    {
      firstName: "Jocke",
      lastName: "Kek",
      userImage: "/images/development/user2.png",
      startTime: "12:00",
      endTime: "12:15",
      startCity: "Haga",
      endCity: "Världens bar",
      rating: 3,
      distance: 3,
      date: formatDate(2),
    },
    {
      firstName: "Jocke",
      lastName: "Jognle",
      userImage: "/images/development/user2.png",
      startTime: "12:00",
      endTime: "12:15",
      startCity: "Haga",
      endCity: "Världens bar",
      rating: 5,
      distance: 32,
      date: formatDate(2),
    },
    {
      firstName: "Jocke",
      lastName: "Pocke",
      userImage: "/images/development/user2.png",
      startTime: "12:00",
      endTime: "12:15",
      startCity: "Haga",
      endCity: "Världens bar",
      rating: 3,
      distance: 3,
      date: formatDate(5),
    },
    {
      firstName: "Jocke",
      lastName: "Glögg",
      userImage: "/images/harold.png",
      startTime: "12:00",
      endTime: "12:15",
      startCity: "Haga",
      endCity: "Världens bar",
      rating: 6,
      distance: 30,
      date: formatDate(1),
    },
  ];

  return allTrips;
}
