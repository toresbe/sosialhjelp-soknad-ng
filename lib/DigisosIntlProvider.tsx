import {IntlProvider, MessageFormatElement} from "react-intl";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

export const DigisosIntlProvider = ({
    intlMessages,
    children,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
    <IntlProvider messages={intlMessages} defaultLocale="nb" locale="nb">
        {children}
    </IntlProvider>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch("/sosialhjelp/soknad/tekster.json");
    const intlMessages = await res.json();
    return {props: {intlMessages}};
};
