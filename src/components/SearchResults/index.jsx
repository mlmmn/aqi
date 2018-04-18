import React from 'react';
import { Link } from 'react-router-dom';

import { SubTitle } from 'reactbulma';

const SearchSuggestions = (props) => {
    if (!props.searchResultsVisible) {
        return null;
    }

    let searchResults = props.searchResults.map((searchItem) => {
        return (
            <li key={searchItem.uid}>
                <Link to={`/station/${searchItem.uid}`}>
                    {searchItem.station.name}
                </Link>
            </li>
        );
    });

    if (searchResults.length === 0) {
        searchResults = <li>Nothing found :(</li>;
    }

    return (
        <div>
            <SubTitle is='5'>
                Search results for <strong>{props.searchQuery}</strong>
            </SubTitle>
            <ul>
                { searchResults }
            </ul>
        </div>
    )
};

export default SearchSuggestions;
