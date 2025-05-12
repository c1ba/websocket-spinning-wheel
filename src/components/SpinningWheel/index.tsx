import type React from "react";
import { DownArrow, SpinningWheelContainer, SpinningWheelPie, WheelWrapper } from "./styles";
import { useEffect, useState } from "react";

type SpinningWheelProps = {
    items: string[];
    id: string;
    endDegree?: number;
    isSpinning?: boolean;
}

const SpinningWheel: React.FC<SpinningWheelProps> = ({items, endDegree, isSpinning}) => {
    const [arrowDegree, setArrowDegree] = useState<number>(0);

    useEffect(() => {
        if (!isSpinning) {
            return;
        }
        setArrowDegree(-25);
        const reinstateTimeout = setTimeout(() => {
            setArrowDegree(0);
        }, 4950);

        return () => clearTimeout(reinstateTimeout);
    }, [isSpinning]);
    return <WheelWrapper>
    <DownArrow arrowDegree={arrowDegree}/>
    <SpinningWheelContainer endDegree={endDegree}>
    {items.map((item, index) => <SpinningWheelPie key={`pie-slice-${index}`} index={index} totalItems={items.length}><p>{item}</p></SpinningWheelPie>)}
    </SpinningWheelContainer>
    </WheelWrapper>
};

export default SpinningWheel;