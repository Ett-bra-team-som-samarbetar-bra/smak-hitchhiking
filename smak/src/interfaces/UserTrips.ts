export default interface UserTrip {
  id: string;
  tripId: string;
  tripRole: string;
  user: [{ id: string; username: string }];
}
