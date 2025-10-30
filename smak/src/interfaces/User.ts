export default interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  description?: string;
  rating?: number;
  tripCount?: number;
  preferences?: string[];
}
