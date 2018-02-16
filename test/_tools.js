import {foldl} from '../src'

const append = xs => x => xs.concat([x])

export const decodeList = foldl(append)([])
