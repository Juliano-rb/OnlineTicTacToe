import { useState } from 'react'
import Modal from '../Modal'
import Emoji from '../Emoji'
import EmojiList from './EmojiList'
import { Container, EmojiContainer } from './AvatarPick.styles'

const DEFAULT_AVATAR_LIST = ['🧓🏼', '👩🏼‍🦰', '👩🏼', '👨🏿', '👩🏿', '👶🏽', '👵🏼', '🧔🏼', '👨🏼', '👨🏼‍🦰', '👨🏼‍🦲', '🤶🏼']

interface Props {
  setAvatar: (data: string)=>void
  avatarList?: string[]
  avatar?: string
}

export default function ({
  avatar,
  avatarList = DEFAULT_AVATAR_LIST,
  setAvatar,
}: Props) {
  const [showEmojiList, setShowEmojiList] = useState<boolean>(false)
  if (!avatar) {
    setAvatar('👴🏼')
  }

  const clickAction = (data: string) => {
    if (setAvatar) setAvatar(data)
    setShowEmojiList(false)
  }

  return (
    <Container>
      <EmojiContainer style={{ position: 'absolute' }}>
        <Emoji
          emoji={avatar || ''}
          size='medium'
          action={() => setShowEmojiList(true)}
        />
      </EmojiContainer>
      {showEmojiList && (
        <Modal setIsOpen={setShowEmojiList}>
          <EmojiList emojiList={avatarList} action={clickAction} />
        </Modal>
      )}
    </Container>
  )
}
