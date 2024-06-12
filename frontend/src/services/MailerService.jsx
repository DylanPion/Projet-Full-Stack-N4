import instance from "../api/http";

export const SharingMail = (email) => {
  return instance.post("/mailer/", { email: email });
};
