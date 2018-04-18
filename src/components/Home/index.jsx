import React from 'react';

import Header from 'components/Header';
import Search from 'containers/Search';

const Home = () => {
    return (
        <div>
            <Header title={'Air Quality Index'}
                    subtitle={'Take a deep breath'} />
            <Search />
        </div>
    )
};

export default Home;
