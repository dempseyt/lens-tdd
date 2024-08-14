import lens, { set, view } from "./lens";

type Address = {
  city: string;
  zip: string;
};

type User = {
  name: string;
  address: Address;
};

describe("lens", () => {
  const user: User = {
    name: "Alice",
    address: { city: "Wonderland", zip: "12345" },
  };
  const nameLens = lens<User, string>(
    (user) => user.name,
    (newName, user) => ({ ...user, name: newName })
  );
  const cityLens = lens<User, string>(
    (user) => user.address.city,
    (newCity, user) => ({
      ...user,
      address: { ...user.address, city: newCity },
    })
  );
  it("view should retrieve the value using the lens", () => {
    expect(view(nameLens, user)).toBe("Alice");
    expect(view(cityLens, user)).toBe("Wonderland");
  });
  it("set should update the value using the lens", () => {
    const updatedUser = set(nameLens, "Gerald", user);
    expect(updatedUser).not.toBe(user);
    expect(view(nameLens, updatedUser)).toBe("Gerald");
  });
});
