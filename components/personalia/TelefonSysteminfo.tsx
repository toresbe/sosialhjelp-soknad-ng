import {useQuery} from "@apollo/client";
import {Loader} from "@navikt/ds-react";
import * as React from "react";
import {useTranslation} from "next-i18next";
import {TelefonDataDocument, TelefonDataQuery} from "../../lib/generated";

// Viser telefonnummer fra KRR dersom telefon.brukerdefinert != true
export const TelefonSysteminfo = () => {
    const {t} = useTranslation("telefon");

    const {loading, error, data} = useQuery<TelefonDataQuery>(TelefonDataDocument, {
        variables: {soknadId: "110000001"},
    });

    if (loading) return <Loader />;

    if (error) throw error;

    return (
        <table>
            <tbody>
                <tr>
                    <th>{t("hentetFraKRR")}</th>
                    <td>{data?.soknad?.telefon?.fraKRR}</td>
                </tr>
            </tbody>
        </table>
    );
};
