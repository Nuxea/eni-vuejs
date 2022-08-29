import Store from "@/stores";
import Router from "@/router";

export const authHeader = () => {
  const { currentUser } = Store.state;

  return {
    "Content-Type": "application/json",
    authorization: "Bearer " + currentUser?.token,
  };
};

export const handleResponseWithLoginCheck = (promise) => {
  return promise
    .then((data) => {
      return data;
    }).catch((error) => {
      const status = error?.response?.status;

      if (status === 403 || status === 401) {
        Store.dispatch("clearUser").then(() => {
          Router.push({name:"Login"}).catch((e) => console.log(e));
        });
      }
      return Promise.reject(error);
    });
}
