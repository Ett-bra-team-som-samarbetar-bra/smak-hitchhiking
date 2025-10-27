import { formatDate } from "./DateUtils";

export function getMockUser() {
  return {
    firstName: "Harold",
    lastName: "H. Pain",
    profileImage: "/images/development/harold-pain.png",
    trips: 40,
    rating: 5,
    activeYears: "1.4 ",
    preferences: ["Rökfri", "Inga pälsdjur", "Gillar musik", "Pratglad"],
  };
}

export function getMockCars() {
  return [
    {
      brand: "Audi",
      model: "A3",
      licensePlate: "KEK 057",
      color: "vit",
      seats: 4,
    },
    {
      brand: "Volvo",
      model: "V60",
      licensePlate: "FBI 007",
      color: "svart",
      seats: 4,
    },
  ];
}

export function getMockUsers() {
  return [
    {
      firstName: "Lennart",
      lastName: "Glassman",
      profileImage: "/images/harold.png",
      description: "En passionerad gubbe som älskar bilar babes och båtar.",
      rating: 4,
      trips: 12,
      activeYears: "1.5",
      preferences: ["Rökfri", "Inga pälsdjur", "Gillar musik", "Pratglad"]
    },
    {
      firstName: "Lorem",
      lastName: "Ipsumsson",
      profileImage: "/images/development/user2.png",
      description: "En resglad person som älskar att upptäcka nya platser och kulturer.",
      rating: 1,
      trips: 5,
      activeYears: "1",
      preferences: ["Rökfri", "Inga pälsdjur", "Pratglad", "Gillar glass"]
    },
    {
      firstName: "Kent",
      lastName: "Stark",
      profileImage: "/images/harold.png",
      description: "En äventyrlig själ som alltid är redo för nästa resa.",
      rating: 4,
      trips: 8,
      activeYears: "2",
      preferences: ["Rökfri", "Gillar musik"]
    },
    {
      firstName: "Anaconda",
      lastName: "Snake",
      profileImage: "/images/development/user2.png",
      description: "En naturälskare som finner ro i skogens lugn och fjällens majestät.",
      rating: 5,
      trips: 20,
      activeYears: "3",
      preferences: ["Inga pälsdjur", "Pratglad", "Gillar musik", "Rökfri"]
    },

  ];
}

export function getAllTrips() {
  const users = getMockUsers();

  return [
    {
      ...users[0],
      startTime: "08:00",
      endTime: "10:30",
      startCity: "Stockholm",
      endCity: "Malmö",
      distance: 420,
      date: formatDate(0),
    },
    {
      ...users[0],
      startTime: "15:00",
      endTime: "19:30",
      startCity: "Stockholm",
      endCity: "Malmö",
      distance: 420,
      date: formatDate(0),
    },
    {
      ...users[2],
      startTime: "15:00",
      endTime: "19:30",
      startCity: "Skummeslövsstrand",
      endCity: "Malmö",
      distance: 420,
      date: formatDate(-2),
    },
    {
      ...users[1],
      startTime: "12:00",
      endTime: "12:15",
      startCity: "Haga",
      endCity: "Världens bar",
      distance: 3,
      date: formatDate(-4),
    },
    {
      ...users[3],
      startTime: "12:00",
      endTime: "12:15",
      startCity: "Haga",
      endCity: "Världens bar",
      distance: 3,
      date: formatDate(2),
    },
    {
      ...users[2],
      startTime: "12:00",
      endTime: "12:15",
      startCity: "Haga",
      endCity: "Världens bar",
      distance: 32,
      date: formatDate(2),
    },
    {
      ...users[1],
      startTime: "12:00",
      endTime: "12:15",
      startCity: "Haga",
      endCity: "Världens bar",
      distance: 3,
      date: formatDate(5),
    },
    {
      ...users[1],
      startTime: "19:00",
      endTime: "22:15",
      startCity: "Världens bar",
      endCity: "Haga",
      distance: 3,
      date: formatDate(-4),
    },
    {
      ...users[3],
      startTime: "12:00",
      endTime: "12:15",
      startCity: "Haga",
      endCity: "Världens bar",
      distance: 30,
      date: formatDate(1),
    },
  ];
}