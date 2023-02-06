import { useSearchParams } from "react-router-dom";
import Button from "../../../../components/Button";
import Toast from "../../../../components/Toast";
import { useJoinMatch } from "../Actions";

interface IJoinBtn {
	joinID: string;
	avatar: string;
	playerName: string;
	disabled?: boolean;
}

export function JoinBtn({ joinID, avatar, playerName, disabled }: IJoinBtn) {
	const joinMatch = useJoinMatch();

	return (
		<Button
			disabled={disabled}
			onClick={async () => joinMatch(joinID, playerName, avatar)}
		>
			Entrar
		</Button>
	);
}

interface IDescription {
	matchName: string;
	error: boolean;
}
export function JoinDescription({ matchName, error }: IDescription) {
	const [searchParams, setSearchParams] = useSearchParams();

	return !error ? (
		<Toast title='Entrar' description={matchName} />
	) : (
		<Toast
			variation='error'
			handleClick={() => setSearchParams({ join: "" })}
			title='Erro'
			description='Erro ao carregar partida'
		/>
	);
}
