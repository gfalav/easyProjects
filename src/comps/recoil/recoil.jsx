import { atom } from "recoil"

export const user = atom({ key: 'user', default: null})
export const drawerWidth = atom({ key: 'drawerWidth', default: 240 })
export const isMobile = atom({ key: 'isMobile', default: false })
export const toggleMenu = atom({ key: 'toggleMenu', default: false })

export const vanoMaxSt = atom({ key: 'vanoMaxSt', default: 80 })
export const retMaxSt = atom({ key: 'retMaxSt', default: 3000 })
export const centerMapSt = atom({ key: 'centerMapSt', default: {lat: -33.3, lng: -66.33}})
export const arrPuntosSt = atom({ key: 'arrPuntosSt', default: [] })