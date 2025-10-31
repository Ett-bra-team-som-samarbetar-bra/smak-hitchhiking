
export interface RegisterPayload {
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    description: string;
    preferences: string[];
    /* preferences: PreferenceOption[]; */
}