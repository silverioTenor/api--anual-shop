import { OutputUserDTO } from "../../user/user.dto";

export class InputLoginDTO {
   email!: string;
   password!: string;
}

export class OutputLoginDTO {
   // @AutoMap(() => OutputUserDTO)
   user!: OutputUserDTO;
   accessToken!: string;
}
