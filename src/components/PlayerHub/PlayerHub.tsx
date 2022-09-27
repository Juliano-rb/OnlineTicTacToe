import { ReactNode, useState } from 'react'
import _uniqueId from 'lodash/uniqueId'
import Emoji from '../Emoji'
import ReactionPicker from './ReactionPicker'
import Modal from '../Modal'
import Reaction from './Reaction'
import ReactionList from './ReactionList'
import { Container, FlexDiv } from './PlayerHub.styles'

const DEFAULT_MESSAGE_DURATION = 3000
export { DEFAULT_MESSAGE_DURATION }
interface Props {
  avatar: string;
  name: string;
  messageDuration?: number;
  orientation?: 'left' | 'right';
}

function PlayerHub({
  avatar,
  name,
  orientation = 'left',
  messageDuration = DEFAULT_MESSAGE_DURATION,
}: Props) {
  const [messageList, setMessageList] = useState<ReactNode[]>([])
  const [showChat, setShowChat] = useState<boolean>(false)

  const newMessage = (message: string) => {
    setMessageList([
      ...messageList,
      <Reaction messageDuration={messageDuration} message={message} key={_uniqueId()} />,
    ])
  }

  const clickReactionAction = (data: string) => {
    newMessage(data)
    setShowChat(false)
  }

  return (
    <Container orientation={orientation}>
      <Emoji emoji={avatar} action={() => setShowChat(true)} />
      <FlexDiv orientation={orientation}>
        <p>{name}</p>
        <ReactionList messages={messageList} />
      </FlexDiv>
      {showChat && (
        <Modal setIsOpen={setShowChat}>
          <ReactionPicker action={clickReactionAction} />
        </Modal>
      )}
    </Container>
  )
}

export default PlayerHub
