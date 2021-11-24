export interface UserLoginForResponse {
  user: {
    id: number;
    email: string;
    name: string;
    phone: string;
    state: string;
    gender: boolean;
    birthday: string;
    age: number;
    favoriteFood: string[];
    discount: number;
  };
  accessToken: string;
}
