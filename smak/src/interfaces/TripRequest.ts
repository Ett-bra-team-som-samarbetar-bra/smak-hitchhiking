export default interface TripRequest {
  title?: string;
  driver: [{ id: string; username: string }];
  carIdId: string;
  startPosition: string;
  endPosition: string;
  departureTime: string;
  arrivalTime: string;
  distance: number;
  seats: number;
}
