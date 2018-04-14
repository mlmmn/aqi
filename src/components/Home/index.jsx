import React from 'react';
import {
    Container,
    Hero,
    Title,
    SubTitle
} from 'reactbulma';

import Search from 'containers/Search';

const Home = () => {
    return (
        <div>
            <Hero medium bold>
                <Hero.Body>
                    <Container>
                        <Title is='1'>
                            Air Quality Index
                        </Title>
                        <SubTitle>
                            Take a deep breath
                        </SubTitle>
                    </Container>
                    <Container>
                        <Search/>
                    </Container>
                </Hero.Body>
            </Hero>
        </div>
    )
};

export default Home;
