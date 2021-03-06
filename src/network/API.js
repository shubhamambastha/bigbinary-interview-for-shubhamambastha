import axios from "axios";

axios.defaults.baseURL = "https://api.spacexdata.com/v4/launches/query";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.get["Accept"] = "application/json";
axios.defaults.headers.put["Accept"] = "application/json";

function makeReq(method, url, data, config) {
  let promiseResponse = { error: null, data: null };
  const onSuccess = (response) => {
    promiseResponse.data = response.data;
    return Promise.resolve(promiseResponse);
  };

  const onError = (error) => {
    const { response } = error;
    if (response) {
      const { data } = response;
      if (data.status === "500") {
        promiseResponse.error = {
          message: "Unable to connect with server. Try again after sometime",
        };
      } else {
        promiseResponse.error = { message: data.message };
      }
      return Promise.resolve(promiseResponse);
    } else {
      const { message } = error;
      promiseResponse.error = { message };
      return Promise.resolve(promiseResponse);
    }
  };
  return axios({
    method,
    url,
    data,
  })
    .then(onSuccess)
    .catch(onError);
}

export const API = {
  post: (url, data) => makeReq("post", url, data),
  get: (url, data) => makeReq("get", url, data),
  put: (url, data) => makeReq("put", url, data),
  delete: (url, data) => makeReq("delete", url, data),
};
