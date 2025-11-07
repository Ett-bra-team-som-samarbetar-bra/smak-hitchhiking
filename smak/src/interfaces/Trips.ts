export default interface Trip {
  id: string;
  driver: [{ id: string; username: string }];
  carIdId: string;
  startPosition: string;
  endPosition: string;
  departureTime: Date;
  arrivalTime: Date;
  distance: number;
  seats: number;
  tripInfo?: string;
}
