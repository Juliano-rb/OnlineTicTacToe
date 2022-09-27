import {
  ReactNode, useEffect, useRef, useState,
} from 'react'
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
  const element = useRef<HTMLDivElement>(null)
  const [reactionPosition, setReactionPosition] = useState<'top' | 'bottom'>('top')

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
  useEffect(() => {
    const top = element?.current?.getBoundingClientRect()?.top || 0
    const elDistanceToTop = window.pageYOffset + top

    if (elDistanceToTop > 200) setReactionPosition('bottom')
    else setReactionPosition('top')
  }, [])

  return (
    <Container orientation={orientation} ref={element}>
      <Emoji emoji={avatar} action={() => enableReaction && setShowChat(true)} />
      <FlexDiv orientation={orientation}>
        <p>{name}</p>
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
  )
}

export default PlayerHub
