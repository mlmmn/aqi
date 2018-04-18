import React from 'react';
import {
    Hero,
    Container,
    Title,
    SubTitle
} from 'reactbulma';

const Header = (props) => {
    return (
        <Hero small bold>
            <Hero.Body>
                <Container>
                    <Title is='1'>
                        {props.title}
                    </Title>
                    <SubTitle>
                        {props.subtitle}
                    </SubTitle>
                </Container>
                <Container>
                    {props.children}
                </Container>
            </Hero.Body>
        </Hero>
    )
};

export default Header;
