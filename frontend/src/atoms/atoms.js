import { atom } from "recoil";

export const userObjectState = atom({
  key: "userData",
  default: {
    userName: "",
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    postalCode: "",
    email: "",
    about: "",
    token: "",
  },
});
