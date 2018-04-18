import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'reactbulma';

import './search-results.scss';

const SearchSuggestions = (props) => {
    if (!props.searchResultsVisible) {
        return null;
    }

    let searchResults = props.searchResults.map((searchItem) => {
        return (
            <li className='search-item' key={searchItem.uid}>
                <Link to={`/station/${searchItem.uid}`}>
                    <div className='search-item__content'>
                        <span className='search-item__text'>
                            {searchItem.station.name}
                        </span>
                        <Tag className={`is-pulled-right`}>
                            AQI: {searchItem.aqi}
                        </Tag>
                    </div>
                </Link>
            </li>
        );
    });

    if (searchResults.length === 0) {
        searchResults = 'Nothing found :(';
    }

    return (
        <ul className="search-results">
            {searchResults}
        </ul>
    );
};

export default SearchSuggestions;
