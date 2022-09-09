import { useState } from 'react'
import Modal from '../Modal'
import Emoji from '../Emoji'
import EmojiList from './EmojiList'
import { Container } from './AvatarPick.styles'

const DEFAULT_AVATAR_LIST = ['🧓🏼', '👩🏼‍🦰', '👩🏼', '👨🏿', '👩🏿', '👶🏽', '👵🏼', '🧔🏼', '👨🏼', '👨🏼‍🦰', '👨🏼‍🦲', '🤶🏼']

interface Props {
  avatar?: string
  avatarList?: string[]
}

export default function ({
  avatar,
  avatarList = DEFAULT_AVATAR_LIST,
}: Props) {
  const [showEmojiList, setShowEmojiList] = useState<boolean>(false)
  const [currentAvatar, setCurrentAvatar] = useState<string>(avatar || '👴🏼')

  const clickAction = (data: string) => {
    setCurrentAvatar(data)
    setShowEmojiList(false)
  }

  return (
    <Container>
      <Emoji emoji={currentAvatar} size='medium' action={() => setShowEmojiList(true)} />
      {showEmojiList
        && (
        <Modal setIsOpen={setShowEmojiList}>
          <EmojiList emojiList={avatarList} action={clickAction} />
        </Modal>
        )}
    </Container>
  )
}
