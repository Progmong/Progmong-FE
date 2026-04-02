import { authHandlers } from './handlers/authHandlers'
import { petHandlers } from './handlers/petHandlers'
import { exploreHandlers } from './handlers/exploreHandlers'
import { communityHandlers } from './handlers/communityHandlers'
import { mypageHandlers } from './handlers/mypageHandlers'
import { solvedacHandlers } from './handlers/solvedacHandlers'
import { tagHandlers } from './handlers/tagHandlers'

export const handlers = [
  ...authHandlers,
  ...petHandlers,
  ...exploreHandlers,
  ...communityHandlers,
  ...mypageHandlers,
  ...solvedacHandlers,
  ...tagHandlers
]
