import { User, UserCheck, UserCog } from "lucide-react";

export class Data {
  static role = [
    {
      value: "admin",
      label: "Admin",
      icon: UserCog,
    },
    {
      value: "user",
      label: "User",
      icon: UserCheck,
    },
    {
      value: "guest",
      label: "Guest",
      icon: User,
    },
  ];
}
