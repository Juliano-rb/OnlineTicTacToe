import Button from "../Button"
import ShareIcon from "@mui/icons-material/Share";

const ShareButton = ()=>{
    return <Button variation="share" onClick={()=>{
        try {
          navigator.share({ url:"https://velha.onrender.com", title:"Você já conhece o melhor jogo da velha?", text:"Jogue aqui" })
          
        } catch (error) {
          alert("Erro ao compartilhar")
        }
      }}><ShareIcon fontSize="small" /> Compartilhar</Button>
}

export default ShareButton