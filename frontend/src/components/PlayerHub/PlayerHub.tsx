import {
	forwardRef,
	ReactNode,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import _uniqueId from "lodash/uniqueId";
import Emoji from "../Emoji";
import ReactionPicker from "./ReactionPicker";
import Modal from "../Modal";
import Reaction from "./Reaction";
import ReactionList from "./ReactionList";
import { Container, FlexDiv } from "./PlayerHub.styles";

const DEFAULT_MESSAGE_DURATION = 3000;
export { DEFAULT_MESSAGE_DURATION };
interface Props {
	avatar: string;
	name: string;
	messageDuration?: number;
	enableReaction?: boolean;
	orientation?: "left" | "right";
	action?: (data: string) => void;
}

export interface PlayerHubHandle {
	receiveNewMessage: (data: string) => void;
}

const PlayerHub = forwardRef<PlayerHubHandle, Props>(
	(
		{
			avatar,
			name,
			orientation = "left",
			enableReaction = true,
			action,
			messageDuration = DEFAULT_MESSAGE_DURATION,
		}: Props,
		ref,
	) => {
		const [messageList, setMessageList] = useState<ReactNode[]>([]);
		const [showChat, setShowChat] = useState<boolean>(false);
		const element = useRef<HTMLDivElement>(null);
		const [reactionPosition, setReactionPosition] = useState<"top" | "bottom">(
			"top",
		);

		const newMessage = useCallback(
			(message: string) => {
				setMessageList([
					...messageList,
					<Reaction
						messageDuration={messageDuration}
						message={message}
						key={_uniqueId()}
					/>,
				]);
			},
			[messageDuration, messageList],
		);

		const clickReactionAction = (data: string) => {
			setShowChat(false);

			if (action) action(data);
		};
		useEffect(() => {
			const top = element?.current?.getBoundingClientRect()?.top || 0;
			const elDistanceToTop = window.pageYOffset + top;

			if (elDistanceToTop > 200) setReactionPosition("bottom");
			else setReactionPosition("top");
		}, []);

		useImperativeHandle(ref, () => ({
			receiveNewMessage(data: string) {
				newMessage(data);
			},
		}));

		return (
			<Container orientation={orientation} ref={element}>
				<Emoji
					emoji={avatar}
					action={() => enableReaction && setShowChat(true)}
				/>
				<FlexDiv orientation={orientation}>
					<span>{name}</span>
					<ReactionList
						messages={messageList}
						align={orientation}
						position={reactionPosition}
					/>
				</FlexDiv>
				{showChat && (
					<Modal setIsOpen={setShowChat}>
						<ReactionPicker action={clickReactionAction} />
					</Modal>
				)}
			</Container>
		);
	},
);

export default PlayerHub;
