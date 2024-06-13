import { UserDto } from './user.dto';

export interface SignUpDto extends UserDto {
  password: string;
}
