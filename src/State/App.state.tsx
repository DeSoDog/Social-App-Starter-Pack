import { atom } from "recoil";
import { ActionName } from "../Components/Actions";

export const PublicKey = atom({
  key: "key",
  default: "",
});

export const Action = atom({
  key: "action",
  default: "",
});
