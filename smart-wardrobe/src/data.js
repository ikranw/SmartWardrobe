import bottomsJson from "./assets/bottoms.json"
import topsJson from "./assets/tops.json"

export const tops = topsJson.tops.map(item => ({ ...item }))
export const bottoms = bottomsJson.bottoms.map(item => ({ ...item }))
