import { Eq, eqString, getStructEq, eqDate } from 'fp-ts/lib/Eq';
import { getEq as getArrayEq } from 'fp-ts/lib/Array';
import { getEq as getSetEq, getIntersectionSemigroup } from 'fp-ts/lib/Set';
import { Ord, fromCompare, min, max, contramap, ordNumber, ordDate } from 'fp-ts/lib/Ord'
import { Semigroup, getStructSemigroup, getJoinSemigroup, getFirstSemigroup} from 'fp-ts/lib/Semigroup'


type Token = string

const eqToken: Eq<Token> = {
  equals: (a, b) => a === b
}

type Bong = {
  id: string
  tokens: Set<Token>
  createdDate: Date;
}

const eqBong: Eq<Bong> = getStructEq({
  id: eqString,
  tokens: getSetEq<Token>(eqToken),
  createdDate: eqDate
})


const ordBongByCreatedDate: Ord<Bong> = fromCompare((a, b) => 
  a.createdDate < b.createdDate ? -1 :
  a.createdDate > b.createdDate ? 1
  : 0
)

const minCreatedDate = min(ordBongByCreatedDate)
const maxCreatedDate = max(ordBongByCreatedDate)

const getMergedSetSemigroup: Semigroup<Set<Token>> = {
  concat: (a, b) => new Set([...a, ...b])
}

const semiGroupBong: Semigroup<Bong> = getStructSemigroup({
  id: getFirstSemigroup(),
  tokens: getMergedSetSemigroup,
  createdDate: getJoinSemigroup(ordDate),
})


const mergedA = semiGroupBong.concat(
  {
    id: "1",
    createdDate: new Date(2018, 1, 20),
    tokens: new Set([ "foo", "bar" ])
  },
  {
    id: "2",
    createdDate: new Date(2019, 1, 20),
    tokens: new Set([ "foos", "bar", "lol", "yo" ])
  },
)

const mergedB = semiGroupBong.concat(
  {
    id: "2",
    createdDate: new Date(2019, 1, 20),
    tokens: new Set([ "foos", "bar", "lol", "yo" ])
  },
  {
    id: "1",
    createdDate: new Date(2018, 1, 20),
    tokens: new Set([ "foo", "bar" ])
  }
)

console.log({
  ...mergedA,
  tokens: Array.from(mergedA.tokens)
})

console.log({
  ...mergedB,
  tokens: Array.from(mergedB.tokens)
})