import { createGlobalStyle } from "styled-components"
import colors from "./assets/styles/colors";

export default createGlobalStyle`
    #root {
        font-size: 20px;
    }
    body{
        font-size: 20px;
        background-color: ${colors.main};
    }
    * {
        box-sizing: border-box;

        font-family: 'Fredoka One';
        font-style: normal;
        font-weight: 400;
        
        text-align: center;
        /* margin: 0 auto; */
    }
`;