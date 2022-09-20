import React, {useState} from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Telefon from "../components/personalia/Telefon";
import {Maybe, TelefonData} from "../generated/apollo";
import {FakeQuestionWrapper} from "./FakeQuestionWrapper";

export const IngentingIKrr: ComponentStory<typeof Telefon> = () => {
    const [telefon, setTelefon] = useState<TelefonData>({brukerdefinert: null, fraKrr: null});

    const setTelefonnummer = async (tlfnr: Maybe<string>) => {
        setTelefon({...telefon, brukerdefinert: tlfnr});
        return null;
    };

    return (
        <FakeQuestionWrapper>
            <Telefon telefon={telefon} onSetTelefonnummer={setTelefonnummer} />
        </FakeQuestionWrapper>
    );
};

export const FraKrr: ComponentStory<typeof Telefon> = () => {
    const [telefon, setTelefon] = useState<TelefonData>({brukerdefinert: null, fraKrr: "+4722225555"});

    const setTelefonnummer = async (tlfnr: Maybe<string>) => {
        setTelefon({...telefon, brukerdefinert: tlfnr});
        return null;
    };

    return (
        <FakeQuestionWrapper>
            <Telefon telefon={telefon} onSetTelefonnummer={setTelefonnummer} />
        </FakeQuestionWrapper>
    );
};

export const TregLast: ComponentStory<typeof Telefon> = () => {
    const [telefon, setTelefon] = useState<TelefonData | undefined>(undefined);

    setTimeout(() => setTelefon({brukerdefinert: null, fraKrr: "+4722225555"}), 1000);

    const setTelefonnummer = async (tlfnr: Maybe<string>) => {
        setTelefon({...telefon, brukerdefinert: tlfnr});
        return null;
    };

    return (
        <FakeQuestionWrapper>
            <Telefon telefon={telefon} onSetTelefonnummer={setTelefonnummer} />
        </FakeQuestionWrapper>
    );
};

export default {
    title: "Telefon",
    component: Telefon,
} as ComponentMeta<typeof Telefon>;
