import bottomsJson from "./assets/bottoms.json"
import shoesJson from "./assets/shoes.json"
import topsJson from "./assets/tops.json"
import shoesJson from "./assets/shoes.json"

export const tops = topsJson.tops.map(item => ({ ...item }))
export const bottoms = bottomsJson.bottoms.map(item => ({ ...item }))
export const shoes = shoesJson.shoes.map(item => ({ ...item }))
