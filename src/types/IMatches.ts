import { LobbyAPI } from 'boardgame.io'

export default interface IMatches extends LobbyAPI.Match{
    setupData?:{
        matchName: string
    }
}
