export default interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  description?: string;
  rating: string;
  tripCount?: string;
  preferences?: string[];
  roles: string[];
}
