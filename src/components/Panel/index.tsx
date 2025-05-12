import type { PropsWithChildren } from "react";
import type React from "react";
import { PanelBackground } from "./styles";

const Panel: React.FC<PropsWithChildren> = ({children}) => {
    return <PanelBackground>{children}</PanelBackground>
}

export default Panel;