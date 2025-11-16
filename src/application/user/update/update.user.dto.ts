export class InputUpdateUserEmailDTO {
   id!: string;
   email!: string;
}

export class InputUpdateUserAddressDTO {
   userId!: string;
   street!: string;
   city!: string;
   state!: string;
   country!: string;
   postalCode!: string;
}

export class InputUpdateUserPasswordDTO {
   id!: string;
   password!: string;
}
