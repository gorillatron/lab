

export type ResultType = 'pending' | 'error' | 'success'

export interface Resource<T> {
  read(): T
}

const wrapPromise = <T> (promise: Promise<T>): Resource<T>  =>{
  let status: ResultType = "pending";
  let result: T

  let suspender = promise.then(
    r => {
      status = "success";
      result = r
    },
    e => {
      status = "error";
      result = e
    }
  )

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } 
      return result
    }
  }
}

export type User = {
  id: number,
  name: string
}

export const fetchUser = () => {
  return wrapPromise<User>(new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 123,
        name: "Lollersen"
      })
    }, Math.random() * 3000)
  }))
}

export const fetchBio = (userId: number) => {
  return wrapPromise<string>(new Promise((resolve) => {
    setTimeout(() => {
      resolve("user is amazing")
    }, Math.random() * 3000)
  }))
}