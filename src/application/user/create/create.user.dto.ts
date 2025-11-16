export class InputCreateUserDTO {
   name!: string;
   email!: string;
   document!: string;
   phone!: string;
   password!: string;
   address?: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
   }
}

export class OutputCreateUserDTO {
   id!: string;
}
