
import React, {
  Suspense,
  SuspenseList
} from "react"

import { User, Resource, fetchUser, fetchBio } from "./api"

export default  () => {
  return (
    <div>
      <Suspense fallback={<div> loading user </div>}>
        <UserProfile resource={fetchUser()} />
      </Suspense>
    </div>
  )
}

export const UserProfile = (props: {resource: Resource<User>}) => {
  
  const user = props.resource.read()
  const bioResource = fetchBio(user.id)

  return (
    <>
      <h2>{user.id}/{user.name}</h2>
      <Suspense fallback={<div> loading bio </div>}>
        <UserBio resource={bioResource}></UserBio>
      </Suspense>
    </>
  )
}

const UserBio = (props: {resource: Resource<string>}) => {

  const bio = props.resource.read()

  return (
    <>
      <p>
        {bio}
      </p>
    </>
  )
}