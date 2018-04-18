import React from 'react';
import {
    Control,
    Input,
    Field,
    Button
} from 'reactbulma';

const SearchInput = (props) => {
    return (
        <form onSubmit={props.searchHandle}>
            <Field hasAddons>
                <Control style={{flexGrow: 1, maxWidth: "600px"}}>
                    <Input placeholder="Search for a city..."
                           onChange={props.inputHandle}
                           value={props.inputValue}/>
                </Control>
                <Control>
                    <Button info loading={props.loading}>
                        <span>Search</span>
                    </Button>
                </Control>
            </Field>
        </form>
    )
};

export default SearchInput;
