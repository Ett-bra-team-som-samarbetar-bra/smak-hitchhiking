export default interface UserTrip {
  tripIdId: string;
  tripRole: string;
  userId: [{ id: string; username: string }];
}
