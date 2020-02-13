import { fromIO } from 'fp-ts/lib/Task'
import { Option, fromNullable } from 'fp-ts/lib/Option'
import { IO } from 'fp-ts/lib/IO'


const items:Record<string, string> = {
  foo: "bar"
}

const getItem = (key: string): IO<Option<string>> =>
  new IO(() => fromNullable(items[key]))




const main = async () => {

  const key = "foos"
  const getItemTask = await fromIO(getItem(key)).run()
  
  if(getItemTask.isNone())
    console.log("couldnt find item", key)
  else
    console.log("found", getItemTask.value)
}

main()
