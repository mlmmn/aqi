import React from 'react';
import {
    Control,
    Input,
    Field,
    Button
} from 'reactbulma';

const SearchInput = (props) => {
    return (
        <form onSubmit={props.searchHandle} style={{marginBottom: "1.5rem"}}>
            <Field hasAddons className="is-marginless">
                <Control style={{flexGrow: 1}}>
                    <Input placeholder="Search for a city..."
                           onChange={props.inputHandle}
                           value={props.inputValue}
                           className="is-shadowless"/>
                </Control>
                <Control>
                    <Button info loading={props.loading}>
                        <span>Search</span>
                    </Button>
                </Control>
            </Field>
            <p className="help">
                {(!!props.searchQuery) ? 'Search results for ' : null}
                <strong>
                    {props.searchQuery}
                </strong>
            </p>
        </form>
    )
};

export default SearchInput;
