import Button from "../Button"
import ShareIcon from "@mui/icons-material/Share";

interface Props{
  buttonText?: string
  shareUrl: string
  shareTitle?: string
  shareText?: string
}

const ShareButton = ({buttonText, shareTitle, shareUrl, shareText}: Props)=>{
    const share = ()=>{
      try {
          navigator.share({
            url: shareUrl,
            title: shareTitle,
            text: shareText,
          });
          
        } catch (error) {
          alert("Erro ao compartilhar")
        }
    }
    return (
      <Button variation="share" onClick={share}>
        <ShareIcon fontSize="small" /> {buttonText}
      </Button>
    );
}

export default ShareButton