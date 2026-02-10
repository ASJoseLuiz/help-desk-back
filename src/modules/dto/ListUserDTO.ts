import GetUserDTO from "./GetUserDTO";

export default interface ListUserDTO {
  users: GetUserDTO[];
  total: number;
}
