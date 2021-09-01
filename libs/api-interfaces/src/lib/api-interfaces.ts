export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: string;
  favoriteTreats: string;
  pottyTrained: boolean;
}

export interface User {
  email: string;
  password: string;
  name: string;
}

export const emptyDog = {
  id: '',
  name: '',
  breed: '',
  age: '',
  favoriteTreats: '',
  pottyTrained: false,
};

export const user00: User = {
  email: 'm@m.com',
  password: 'pass',
  name: 'Matthew Murray',
};
