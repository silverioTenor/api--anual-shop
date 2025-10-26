export interface InputUpdateUserEmailDTO {
   id: string;
   email: string;
}

export interface InputUpdateUserAddressDTO {
   userId: string;
   street: string;
   city: string;
   state: string;
   country: string;
   postalCode: string;
}

export interface InputUpdateUserPasswordDTO {
   id: string;
   password: string;
}
