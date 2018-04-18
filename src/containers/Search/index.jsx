import React, { Component } from 'react';
import api from 'api';

import SearchInput from 'components/SearchInput';
import SearchResults from "components/SearchResults";

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInput: '',
            searchResults: [],
            searchResultsVisible: false,
            loading: false
        };

        this.searchQuery = '';
    }

    handleInputChange = (evt) => {
        let inputValue = evt.target.value;

        this.setState({
            userInput: inputValue
        });
    };

    handleSearch = async (evt) => {
        evt.preventDefault();

        if (!!this.state.userInput === false || this.state.loading) {
            return;
        }

        this.setState({
            loading: true
        });

        const response = await api.search(this.state.userInput);

        this.searchQuery = this.state.userInput;
        this.setState({
            searchResults: response || [],
            searchResultsVisible: true,
            loading: false
        });
    };

    render() {
        return (
            <div>
                <SearchInput
                    inputValue={this.state.searchQuery}
                    inputHandle={this.handleInputChange}
                    searchHandle={this.handleSearch}
                    loading={this.state.loading}/>
                <SearchResults
                    searchQuery={this.searchQuery}
                    searchResults={this.state.searchResults}
                    searchResultsVisible={this.state.searchResultsVisible}
                />
            </div>
        )

    }
}

export default Search
