import { getProfileLetters } from "./get-profile-letters";

describe("get profile letters", () => {
  test("should split by .", () => {
    const res = getProfileLetters({
      email: "ruslan.kharisov@gmail.com",
    });

    expect(res).toEqual("RK");
  });

  test("should split by -", () => {
    const res = getProfileLetters({
      email: "ruslan.kharisov@gmail.com",
      name: "Ruslan-Kharisov",
    });

    expect(res).toEqual("RK");
  });

  test("should split by _", () => {
    const res = getProfileLetters({
      email: "ruslan.kharisov@gmail.com",
      name: "Ruslan_Kharisov",
    });

    expect(res).toEqual("RK");
  });

  test("should split by space", () => {
    const res = getProfileLetters({
      email: "ruslan.kharisov@gmail.com",
      name: "Ruslan Kharisov",
    });

    expect(res).toEqual("RK");
  });

  test("should return first 2 letters if no sRKarator", () => {
    const res = getProfileLetters({
      email: "ruslan.kharisov@gmail.com",
      name: "RuslanKharisov",
    });

    expect(res).toEqual("Ru");
  });
  test("should return first 2 letters if no sRKarator email", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
    });

    expect(res).toEqual("AD");
  });
  test("should return email if empty username", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
      name: "",
    });

    expect(res).toEqual("AD");
  });

  test("should work with short names", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
      name: "R",
    });

    expect(res).toEqual("R");
  });
});