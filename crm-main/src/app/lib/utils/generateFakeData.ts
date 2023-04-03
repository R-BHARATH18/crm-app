import { faker } from "@faker-js/faker";

export function GenerateFakeData() {
  const name = faker.name.fullName();
  const email = faker.internet.email(
    name.split(" ")[0],
    name.split(" ")[name.split(" ").length - 1]
  );
  const phone = faker.phone.number("+91 ##########");
  const leadStatus = "New";

  return { name, email, phone, leadStatus };
}
