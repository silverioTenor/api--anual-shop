export class InputRegisterDTO {
   name!: string;
   email!: string;
   password!: string;
   phone!: string;
   document!: string;
   address?: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
   }
}

export class OutputRegisterDTO {
   user!: {
      id: string;
   };
   access_token!: string;
}
