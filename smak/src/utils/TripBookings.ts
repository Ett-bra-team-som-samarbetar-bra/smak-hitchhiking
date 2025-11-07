import type UserTrip from "../interfaces/UserTrips";

export default function useTripBookings() {
  const bookTrip = async (tripId: string, userId: string, username: string) => {
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

  const cancelTrip = async (tripId: string, userId: string) => {
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

  const checkIfBooked = async (tripId: string, userId: string): Promise<boolean> => {
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

  return { bookTrip, cancelTrip, checkIfBooked };
}