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
}