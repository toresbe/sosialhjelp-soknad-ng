enum ActionKind {
    setErrors,
    setCurrentPage,
}

type Action = {
    type: ActionKind;
};

type State = {
    currentPage: number;
};

const formReducer = (state: State, action: Action): State => {
    return state;
};

const PaginatedForm = () => {};

export default PaginatedForm;
