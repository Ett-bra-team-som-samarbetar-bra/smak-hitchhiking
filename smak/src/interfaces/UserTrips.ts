export default interface UserTrip {
  tripId: string;
  tripRole: string;
  user: [{ id: string; username: string }];
}
