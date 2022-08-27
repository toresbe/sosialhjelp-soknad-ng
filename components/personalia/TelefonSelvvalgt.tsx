import {useEffect, useState} from "react";
import {useQuery, useMutation} from "@apollo/client";
import {useTranslation} from "next-i18next";
import {
    SettTelefonnummerDocument,
    SettTelefonnummerMutation,
    TelefonDataDocument,
    TelefonDataQuery,
} from "../../lib/generated";
import {Accordion, Button, TextField} from "@navikt/ds-react";
import styled from "styled-components";

// Formatterer et telefonnummer ihht ITU E.123; dvs. E.164 med + foran
const fmtNummerSomE123 = (tlfnr: string) => "+47" + tlfnr.replace(/^(?:\+|00)47/, "");

const FlexHorizontalDiv = styled(Accordion.Content)`
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: flex-end;
    button {
        margin-left: 1em;
    }
`;

export const TelefonSelvvalgt = () => {
    const {t} = useTranslation("telefon");

    const {loading, error, data} = useQuery<TelefonDataQuery>(TelefonDataDocument, {variables: {soknadId: 110000001}});
    const [tlfnr, setTlfnr] = useState<string>("Laster...");

    const [mutate] = useMutation<SettTelefonnummerMutation>(SettTelefonnummerDocument, {
        variables: {soknadId: 110000001},
    });

    useEffect(() => {
        tlfnr === "Laster..." && setTlfnr(data?.soknad?.telefon?.brukerdefinert ?? "");
    }, [data]);

    const [showEditBox, setShowEditBox] = useState<boolean>(false);

    return (
        <Accordion>
            <Accordion.Item open={showEditBox}>
                <Accordion.Header onClick={() => setShowEditBox(!showEditBox)}>
                    Jeg vil kontaktes på et annet nummer
                </Accordion.Header>
                <FlexHorizontalDiv>
                    <TextField
                        label={"Norsk telefonnummer"}
                        type="tel"
                        autoComplete={"tel"}
                        maxLength={11}
                        value={tlfnr}
                        onChange={(e) => setTlfnr(e.target.value)}
                        required={false}
                    />
                    <Button
                        onClick={async () => {
                            await mutate({variables: {tlfNr: tlfnr}});
                            setShowEditBox(false);
                        }}
                    >
                        Lagre
                    </Button>
                    <Button variant="secondary" onClick={() => setShowEditBox(false)}>
                        Avbryt
                    </Button>
                </FlexHorizontalDiv>
            </Accordion.Item>
        </Accordion>
    );
};
