/* eslint-disable @typescript-eslint/no-explicit-any */

const wrapPromise = (promise: Promise<any>) => {
    let status = "pending";
    let result:any;
    const suspender = promise.then(
      (data) => {
        status = "success";
        result = data;
      },
      (error) => {
        status = "error";
        result = error;
      }
    );
  
    return {
      read() {
        if (status === "pending") {
          throw suspender; 
        } else if (status === "error") {
          throw result; 
        }
        return result; 
      },
    };
  };

export {wrapPromise};
  