import type UserTrip from "../interfaces/UserTrips";

export const bookTrip = async (tripId: string, userId: string, username: string) => {
  const payload = {
    tripRole: "Passenger",
    tripId: tripId,
    user: [{
      id: userId,
      username: username
    }],
  };

  const response = await fetch(`/api/TripUsers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to book trip");
  }
};

export const cancelTrip = async (tripId: string, userId: string) => {
  try {

    const response = await fetch('/api/TripUsers');
    if (!response.ok) throw new Error("Failed to fetch bookings");

    const tripUsers: UserTrip[] = await response.json();
    const booking = tripUsers.find((tu) => {
      const bookingUserId = tu.user?.[0]?.id;
      const bookingTripId = tu.tripId;
      return bookingUserId === userId && bookingTripId === tripId;
    });

    if (!booking?.id) {
      throw new Error("No booking found to cancel");
    }

    const deleteResponse = await fetch(`/api/TripUsers/${booking.id}`, {
      method: "DELETE",
    });

    if (!deleteResponse.ok) {
      throw new Error("Failed to cancel trip");
    }
  } catch (error) {
    throw error;
  }
};

export const deleteTrip = async (tripId: string) => {
  try {
    const response = await fetch('/api/TripUsers');
    if (!response.ok) throw new Error("Failed to fetch trip users");

    const tripUsers: UserTrip[] = await response.json();
    const associatedBookings = tripUsers.filter((tu) => tu.tripId === tripId);

    // Delete all tripusers on the trip
    for (const booking of associatedBookings) {
      const deleteBookingResponse = await fetch(`/api/TripUsers/${booking.id}`, {
        method: "DELETE",
      });
      if (!deleteBookingResponse.ok) {
        throw new Error(`Failed to delete booking with id ${booking.id}`);
      }
    }

    const deleteTripResponse = await fetch(`/api/Trip/${tripId}`, {
      method: "DELETE",
    });

    if (!deleteTripResponse.ok) {
      throw new Error("Failed to delete trip");
    }
  } catch (error) {
    console.error("Failed to delete trip:", error);
    throw error;
  }
};

export const checkIfBooked = async (tripId: string, userId: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/TripUsers');
    if (!response.ok) return false;

    const tripUsers: UserTrip[] = await response.json();
    const booking = tripUsers.find((tu) => {
      const bookingUserId = tu.user?.[0]?.id;
      const bookingTripId = tu.tripId;
      return bookingUserId === userId && bookingTripId === tripId;
    });

    return !!booking;
  } catch (error) {
    return false;
  }
};
