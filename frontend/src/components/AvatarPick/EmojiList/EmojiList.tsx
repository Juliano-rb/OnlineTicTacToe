import _uniqueId from 'lodash/uniqueId'
import Card from '../../Card'
import { EmojiList } from './EmojiList.styles'

interface Props {
  emojiList: string[];
  action?: (data: string) => void;
}

export default function ({
  emojiList,
  action,
}: Props) {
  return (
    <EmojiList>
      {emojiList.map((emoji) => (
        <Card key={_uniqueId()} action={() => action?.(emoji)} text={emoji} />
      ))}
    </EmojiList>
  )
}
