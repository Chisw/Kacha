import localforage from 'localforage'
import { IWatermark } from './type'

const LIST_KEY = 'kacha-list'

export default class Local {
  static getList = async () => {
    const list: IWatermark[] | null = await localforage.getItem(LIST_KEY)
    return list
  }

  static setList = async (list: IWatermark[]) => {
    return await localforage.setItem(LIST_KEY, list)
  }

  static updateList = async (watermark?: IWatermark, spliceId?: string) => {
    const list: IWatermark[] = await Local.getList() || []
    if (spliceId) {
      const index = list.findIndex(({ id }) => id === spliceId)
      if (index > -1) list.splice(index, 1)
    }
    if (watermark) {
      list.unshift(watermark)
    }
    return await Local.setList(list)
  }
  
}