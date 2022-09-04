import { useState } from "react";
import styled from "styled-components";
import colors from "../../assets/styles/colors";

interface SwitchProps{
  options: string[],
  setOption: (value: string)=>void
}

const Container = styled.div`
  width: 202px;
  height: 36px;
  color: ${colors.confirm};
  background-color: white;
  border-radius: 5px;
  cursor: pointer;

  border: none;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div{
    font-size: 0.9rem;
  }
`

const BtnStyle = styled.div`
  width: 31px;
  height: 100%;
  text-align: center;

  :active{
    background-color: ${colors.shadow};
  }

  ::before {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
`

const Switch = ({ options, setOption }: SwitchProps) => {
  const [currOption, setCurrOption] = useState<string>(options[0])
  
  const next = ()=>{
    const actual = options.indexOf(currOption);
    let nextIndex = actual+1;
    if(nextIndex>=options.length)
      nextIndex = 0
    
    const value = options[nextIndex]
    setCurrOption(value)
    setOption(value)
  }

  const prev = ()=>{
    const actual = options.indexOf(currOption);
    let nextIndex = actual-1;
    if(nextIndex<0)
      nextIndex = options.length-1
    
    const value = options[nextIndex]
    setCurrOption(value)
    setOption(value)
  }

  return (
    <Container>
      <BtnStyle onClick={()=>prev()}>{'<'}</BtnStyle>
      <div>
        {currOption}
      </div>
      <BtnStyle onClick={()=>next()}>{'>'}</BtnStyle>
    </Container>
  );
};

export default Switch;
