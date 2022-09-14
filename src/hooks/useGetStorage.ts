import { ILocalStorage } from '../types/ILocalStorage'

export const useGetStorage = (): ILocalStorage => JSON.parse(localStorage.getItem('playerData') || '{}') as ILocalStorage
