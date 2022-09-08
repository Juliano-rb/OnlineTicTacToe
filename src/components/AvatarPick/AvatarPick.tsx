import { useState } from 'react'
import Modal from '../Modal'
import Emoji from '../Emoji'
import EmojiList from './EmojiList'

interface Props {
  avatar?: string
  avatarList: string[]
}

export default function ({
  avatar,
  avatarList,
}: Props) {
  const [showEmojiList, setShowEmojiList] = useState<boolean>(false)
  const [currentAvatar, setCurrentAvatar] = useState<string>(avatar || '👴🏼')

  const clickAction = (data: string) => {
    setCurrentAvatar(data)
    setShowEmojiList(false)
  }

  return (
    <div>
      <Emoji emoji={currentAvatar} action={() => setShowEmojiList(true)} />
      {showEmojiList
        && (
        <Modal setIsOpen={setShowEmojiList}>
          <EmojiList emojiList={avatarList} action={clickAction} />
        </Modal>
        )}
    </div>
  )
}
