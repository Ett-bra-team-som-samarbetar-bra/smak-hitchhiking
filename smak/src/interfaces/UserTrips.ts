export default interface UserTrip {
  tripId: string;
  tripRole: string;
  userId: [{ id: string; username: string }];
}
