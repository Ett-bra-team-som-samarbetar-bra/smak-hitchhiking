export default interface Trip {
  id: string;
  driverId: [{ id: string; username: string }];
  carId: string;
  startPosition: string;
  endPosition: string;
  departureTime: Date;
  seats: number;
}
