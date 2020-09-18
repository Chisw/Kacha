import { IWatermark } from './type'

export const BG_GRID_DATA_DARK = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%231A202C' d='M0 0h10v10H0zM10 10h10v10H10z'/%3E%3Cpath fill='%232D3748' d='M10 0h10v10H10zM0 10h10v10H0z'/%3E%3C/svg%3E"
export const BG_GRID_DATA_LIGHT = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' d='M0 0h10v10H0zM10 10h10v10H10z'/%3E%3Cpath fill='%23EDF2F7' d='M10 0h10v10H10zM0 10h10v10H0z'/%3E%3C/svg%3E"

export const DEFAULT_WATERMARK_LIST: IWatermark[] = [
  {
    id: 'bj93tu',
    type: 'text',
    theme: 'light',
    src: '',
    text: 'Kacha',
    position: 'bottom-right',
    scaleType: 'none',
    scalePixel: 200,
    scalePercent: 10,
    offsetType: 'none',
    offsetPixelX: 20,
    offsetPixelY: 20,
    offsetPercentX: 5,
    offsetPercentY: 5,
    repeat: 'no-repeat',
    opacity: 1,
    rotate: 0,
    font: '',
    exportSetting: {
      format: 'jpeg',
      quality: .92,
      scaleType: 'none',
      scalePixel: 1080,
      scalePercent: 80,
      saveEXIF: false,
    }
  },
  {
    id: '44m9a8',
    type: 'text',
    theme: 'dark',
    src: '',
    text: '尚在开发中',
    position: 'bottom-right',
    scaleType: 'none',
    scalePixel: 200,
    scalePercent: 10,
    offsetType: 'none',
    offsetPixelX: 20,
    offsetPixelY: 20,
    offsetPercentX: 5,
    offsetPercentY: 5,
    repeat: 'no-repeat',
    opacity: 1,
    rotate: 0,
    font: '',
    exportSetting: {
      format: 'jpeg',
      quality: .92,
      scaleType: 'none',
      scalePixel: 1080,
      scalePercent: 80,
      saveEXIF: false,
    }
  },
]