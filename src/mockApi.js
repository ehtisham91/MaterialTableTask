import { v4 as uuidv4 } from "uuid";

// pseudo database
let users = [];
for (let i = 1; i <= 40; i++) {
  let id = uuidv4();
  users.push({
    id,
    firstName: `user-${i}`,
    lastName: "Wieruch",
    birthday: "31.12.1999",
  });
}

// pseudo API endpoints

export const getUsersReq = () =>
  new Promise((resolve, reject) => {
    if (!users) {
      return setTimeout(() => reject(new Error("Users not found")), 250);
    }

    setTimeout(() => resolve({ data: users }), 200);
  });

export const updateUserReq = (data) =>
  new Promise((resolve, reject) => {
    let found = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === data.id) {
        users[i] = { ...data };
        found = true;
        break;
      }
    }
    if (!found) {
      return setTimeout(() => reject(new Error("User not found")), 250);
    }
    return setTimeout(() => resolve({ data: users }), 204);
  });
