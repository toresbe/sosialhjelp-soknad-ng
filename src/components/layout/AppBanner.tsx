import * as React from "react";
import {Heading} from "@navikt/ds-react";
import {useTranslation} from "next-i18next";

export const AppBanner = () => {
    const {t} = useTranslation("skjema", {keyPrefix: "globalt"});

    return (
        <header className={"bg-[#9bd0b0] w-full border-b-4 border-b-[#38a161] text-center pt-4"}>
            <Heading level="1" size="xlarge" spacing>
                {t("applikasjonsNavn")}
            </Heading>
        </header>
    );
};

export default AppBanner;
