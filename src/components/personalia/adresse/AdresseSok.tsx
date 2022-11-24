import {TextField} from "@navikt/ds-react";
import {useQuery} from "@apollo/client";
import {AdresseSokDocument, InputVegadresse, Maybe, Vegadresse} from "../../../generated/apolloClientTypes";
import {useState} from "react";
import {useDebounce} from "usehooks-ts";
import {useCombobox} from "downshift";
import cx from "classnames";

const fmtVegadresse = ({adressenavn, bokstav, nummer, poststed, postnummer}: Vegadresse) =>
    `${adressenavn} ${nummer}${bokstav ? ` ${bokstav}` : ""}, ${postnummer} ${poststed}`;

const AdresseSok = ({onChange}: {onChange: (nyVegadresse?: Maybe<InputVegadresse>) => void}) => {
    const [query, setQuery] = useState<string>("");
    const debouncedQuery = useDebounce(query, 200);
    const {data} = useQuery(AdresseSokDocument, {
        variables: {query: debouncedQuery},
        skip: query.length <= 3,
    });

    const OutputToInputType = (vegadresse?: Maybe<Vegadresse>): Maybe<InputVegadresse> | undefined => {
        return Object.assign({}, vegadresse, {__typename: undefined});
    };

    const {isOpen, getLabelProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem} =
        useCombobox<Vegadresse>({
            onInputValueChange: (v) => setQuery(v.inputValue ?? ""),
            items: data?.adresseSok.treff ?? [],
            itemToString: (a) => (a ? fmtVegadresse(a) : ""),
            onSelectedItemChange: (nyAdresse) => onChange(OutputToInputType(nyAdresse.selectedItem)),
        });

    return (
        <div>
            <label {...getLabelProps()}>Søk etter adresse</label>
            <div>
                <TextField fullWidth {...getInputProps()} />
                <ul
                    {...getMenuProps()}
                    className="relative p-0 -mt-[1px] border-blue-200 border-2 border-t-0 z-20 bg-white shadow-md max-h-80 overflow-scroll"
                >
                    {isOpen &&
                        data?.adresseSok.treff.map((item, index) => (
                            <li
                                className={cx(
                                    highlightedIndex === index && "bg-green-200",
                                    selectedItem === item && "font-bold",
                                    "py-2 px-3 shadow-sm flex flex-col "
                                )}
                                key={index}
                                {...getItemProps({item, index})}
                            >
                                <span>{fmtVegadresse(item)}</span>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default AdresseSok;
