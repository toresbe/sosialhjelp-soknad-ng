import {ReactNode} from "react";
import {Radio} from "@navikt/ds-react";

interface HorisontalRadioProps {
    value: any;
    children?: ReactNode;
    hide?: boolean;
}

export const HorisontalRadio = ({value, hide, children}: HorisontalRadioProps) =>
    hide ? null : (
        <Radio value={value} className={"border rounded-2xl my-1 p-3 px-6 w-full"}>
            <div className="px-3">{children}</div>
        </Radio>
    );
