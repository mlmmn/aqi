import React, { Component } from 'react';
import { debounce } from 'lodash';
import api from 'api';

import SearchInput from 'components/SearchInput';
import SearchSuggestions from "components/SearchSuggestions";

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            searchResults: [],
            loading: false,
            suggestionsVisible: false
        }
    }

    updateSearchQuery = debounce((query) => {
        this.setState({
            searchQuery: query
        });
    }, 300);

    handleInputChange = (evt) => {
        let inputValue = evt.target.value;

        if (inputValue === '') {
            this.setState({
                searchResults: [],
                suggestionsVisible: false
            });

            return;
        }

        this.updateSearchQuery(inputValue);
        this.setState({
            loading: true
        });
    };

    async componentWillUpdate(nextProps, nextState) {

        if (this.state.searchQuery !== nextState.searchQuery) {
            const response = await api.search(nextState.searchQuery);

            this.setState({
                searchResults: response,
                loading: false,
                suggestionsVisible: true
            })
        }
    }

    render() {
        return (
            <div>
                <SearchInput
                    inputHandle={ this.handleInputChange }
                    loading={this.state.loading}/>
                <SearchSuggestions
                    searchResults={this.state.searchResults}
                    suggestionsVisible={this.state.suggestionsVisible}
                />
            </div>
        )

    }
}

export default Search
