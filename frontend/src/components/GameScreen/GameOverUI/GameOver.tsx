import { ChatMessage, Ctx, FilteredMetadata } from "boardgame.io";
import { useCallback, useEffect, useRef } from "react";
import { IGameState } from "../../../types/IGameState";
import Button from "../../Button";
import Board from "../../Board";
import { useJoinMatch } from "../../../pages/Home/GameModes/Actions";
import LobbyApi from "../../../api/LobbyApi";
import { useGetOpponent, useGetPlayer } from "../../../hooks/useGetPlayer";
import IPlayer from "../../../types/IPlayer";
import PlayerHub from "../../PlayerHub";
import { PlayerControllsContainer } from "../GameScreen.styles";
import { PlayerHubHandle } from "../../PlayerHub/PlayerHub";
import MatchResult from "../../MatchResult";
import { PanelContainer } from "./GameOver.styles";

interface IGameOver {
	exitMatchFn: () => void;
	G: IGameState;
	ctx: Ctx;
	matchID: string;
	playerID: string;
	matchData: FilteredMetadata;
	// rome-ignore lint/suspicious/noExplicitAny: inherited from boardgame.io
	moves: Record<string, (...args: any[]) => void>;
	credentials: string;
	cellValueMapping: { [key: string]: string };
	chatMessages: ChatMessage[];
	sendChatMessage: (message: string) => void;
}

export default function GameOver({
	exitMatchFn,
	cellValueMapping,
	playerID,
	matchID,
	G,
	moves,
	ctx,
	matchData,
	credentials,
	chatMessages,
	sendChatMessage,
}: IGameOver) {
	const joinMatch = useJoinMatch();
	const player = useGetPlayer(playerID, matchData);
	const opponent = useGetOpponent(playerID, matchData);
	const opponentHubRef = useRef<PlayerHubHandle>(null);
	const playerHubRef = useRef<PlayerHubHandle>(null);

	const newMatchID = G.gameOver?.newMatchID || "";
	const playAgain = G.gameOver?.playAgain || "";

	const joinNewMatch = useCallback(
		async (nextMatch: string, playerData: IPlayer, cred: string) => {
			await LobbyApi.leaveMatch(matchID, playerData.id, cred);
			await joinMatch(
				nextMatch,
				playerData.name || playerID,
				playerData.avatar,
				playerID,
			);
		},
		[joinMatch, matchID, playerID],
	);

	const createNewMatch = useCallback(
		async (playerName: string) => {
			const nextMatchID = await LobbyApi.createMath(
				playerName,
				ctx.playOrder.reverse(),
			);
			moves.setNewMatchID(nextMatchID);
			return nextMatchID;
		},
		[ctx.playOrder, moves],
	);

	useEffect(() => {
		const effect = async () => {
			if (!(credentials && playerID && player.id)) return;

			if (playAgain.length === ctx.numPlayers) {
				if (!newMatchID && playerID === playAgain[0]) {
					const nextMatchID = await createNewMatch(player.name);
					await joinNewMatch(nextMatchID, player, credentials);
				} else if (newMatchID && playerID !== playAgain[0]) {
					await joinNewMatch(newMatchID, player, credentials);
				}
			}
		};
		effect();
	}, [
		createNewMatch,
		credentials,
		ctx.numPlayers,
		joinNewMatch,
		newMatchID,
		playAgain,
		player,
		playerID,
	]);

	useEffect(() => {
		const totalMessages = chatMessages.length;
		if (!totalMessages) return;

		const lastMessage = chatMessages[totalMessages - 1];
		if (lastMessage.sender === playerID) {
			playerHubRef.current?.receiveNewMessage(lastMessage.payload);
			return;
		}

		opponentHubRef.current?.receiveNewMessage(lastMessage.payload);
	}, [chatMessages, playerID]);

	return (
		<>
			<PlayerControllsContainer>
				<PlayerHub
					ref={opponentHubRef}
					avatar={opponent.avatar}
					name={opponent.name}
					enableReaction={false}
				/>
				<Button variation='cancel' onClick={exitMatchFn}>
					Sair
				</Button>
			</PlayerControllsContainer>

			<PanelContainer>
				{G.matchResult && (
					<MatchResult
						player={player}
						matchResult={G.matchResult}
						matchData={matchData}
						moves={moves}
						playAgain={G.gameOver?.playAgain}
					/>
				)}

				<Board
					victoryLine={G.matchResult?.winner?.victoryData}
					player={ctx.currentPlayer}
					moveFunction={moves.clickCell}
					cells={G.cells}
					valueMapping={cellValueMapping}
				/>
			</PanelContainer>
			<PlayerControllsContainer>
				<div />
				<PlayerHub
					ref={playerHubRef}
					avatar={player.avatar}
					name={player.name}
					orientation='right'
					action={sendChatMessage}
				/>
			</PlayerControllsContainer>
		</>
	);
}
