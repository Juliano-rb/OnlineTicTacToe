import { ILocalStorage } from '../types/ILocalStorage'

export const useSetStorage = () => (data: ILocalStorage) => {
  const playerData = JSON.parse(localStorage.getItem('playerData') || '{}') as ILocalStorage

  const newData = { ...playerData, ...data } as ILocalStorage
  localStorage.setItem('playerData', JSON.stringify(newData))
}
