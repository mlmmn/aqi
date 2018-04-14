import React from 'react';
import { Link } from 'react-router-dom';

const SearchSuggestions = (props) => {
    if (!props.suggestionsVisible) {
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

    return (
        <ul>
            { (searchResults.length > 0) ? searchResults : <li>Nothing found :(</li> }
        </ul>
    )
};

export default SearchSuggestions;
