import { LobbyAPI } from 'boardgame.io'

export default interface Matches extends LobbyAPI.Match{
    setupData?:{
        matchName: string
    }
}
