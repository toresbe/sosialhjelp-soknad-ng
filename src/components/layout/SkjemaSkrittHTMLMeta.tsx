import Head from "next/head";

export interface SkjemaSkrittHeaderProps {
    activeStep: number;
}

// FIXME: Hard-coded to page 1 - must look up page headings from i18n
export const SkjemaSkrittHTMLMeta = ({activeStep}: SkjemaSkrittHeaderProps) => (
    <Head>
        <title>Sosialhjelpsøknad - Personopplysninger</title>
    </Head>
);
