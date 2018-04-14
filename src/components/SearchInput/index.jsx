import React from 'react';
import {
    Control,
    Input
} from 'reactbulma';

const SearchInput = (props) => {
    return (
        <Control loading={props.loading}>
            <Input
                placeholder="Search for a city..."
                onChange={props.inputHandle}
                onFocus={props.focusHandle}
                onBlur={props.focusHandle}
                type="text"/>
        </Control>
    )
};

export default SearchInput;
