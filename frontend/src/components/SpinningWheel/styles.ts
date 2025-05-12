import styled from "styled-components";

const SPINNING_WHEEL_SIZE = 750;

export const SpinningWheelContainer = styled.div<{endDegree?: number}>`
border-radius: 50%;
background-color: white;
width: ${SPINNING_WHEEL_SIZE}px;
height: ${SPINNING_WHEEL_SIZE}px;
transform: ${({endDegree}) => `rotate(${endDegree}deg)`};
transition: transform 5s ease-out;
clip-path: inset(0 0 0 0 round 50%);
display: flex;
justify-content: flex-start;
align-items: center;
`;

export const SpinningWheelPie = styled.div<{index: number, totalItems: number;}>`
display: flex;
align-items: center;
justify-content: center;
position: absolute;
background: ${({index, totalItems}) => `hsl(calc(360deg / ${totalItems} *
  calc(${index + 1})), 100%, 35%)`}; 
width: 50%;
transform-origin: center right;
transform: ${({index, totalItems}) => `rotate(-${360 / totalItems * index}deg)`};
clip-path: polygon(0% -15%, 100% 50%, 0% 115%);
height: ${({totalItems}) => `calc(${SPINNING_WHEEL_SIZE / totalItems}px * pi)`};

p {
  margin: 0;
  padding: 0;
}
`;

export const DownArrow = styled.div<{arrowDegree: number}>`
  width: 0; 
  height: 0; 
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  
  border-top: 20px solid #fff;

  margin-bottom: -13px;
  z-index: 1;

  transform-origin: center top;
  transform: ${({arrowDegree}) => `rotate(${arrowDegree}deg)`};
  transition: transform 0.1s ease-out;
`;

export const WheelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`