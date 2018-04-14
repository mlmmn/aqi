import React, { Component } from 'react';
import api from 'api';
import {
    Hero,
    Message,
    Heading,
    Title,
    SubTitle,
    Container
} from 'reactbulma';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';

import aqiRating from 'data/aqiRating';
import measurementParams from 'data/measurementParams';

class Station extends Component {
    constructor(props) {
        super(props);

        this.state = {
            station: '',
            color: null,
            measurementData: []
        }
    }

    getAqiRating = (aqi) => {
        let newState;

        for (let rating in aqiRating) {

            if (aqi >= parseInt(rating, 10)) {
                newState = {
                    rating: aqiRating[rating]["rating"],
                    description: aqiRating[rating]["description"],
                    color: aqiRating[rating]["tag"]
                }
            }
        }

        return newState;
    };

    async componentWillMount() {
        let response;

        try {
            response = await api.getStation(this.props.match.params.id);
            if (!response) {
                throw new Error('Could not fetch data from server');
            }
        }
        catch (error) {
            return;
        }

        let measurementData = [];
        let newState;

        for (let prop in response.iaqi) {
            if (measurementParams.hasOwnProperty(prop)) {
                measurementData.push({
                    name: measurementParams[prop],
                    value: response.iaqi[prop].v
                });
            }
        }

        newState = Object.assign({},
            {
                aqi: response.aqi,
                station: response.city.name,
                updatedOn: response.time.s,
                measurementData
            },
            this.getAqiRating(response.aqi)
        );

        this.setState(newState);
    };

    render() {
        if (this.state.station === '') {
            return null;
        }

        let measurementData = this.state.measurementData.map((item, index) => {
            return (
                <div className="column is-4-mobile is-3-tablet is-2-desktop"
                     key={index}>
                    <div className="has-text-centered">
                        <Heading dangerouslySetInnerHTML={{
                            __html: `${item.name}`
                        }} />
                        <Title is="3">
                            {item.value}
                        </Title>
                    </div>
                </div>
            );
        });

        return(
            <Hero className={`is-${this.state.color}`} fullheight bold>
                <Hero.Head style={{padding: '24px'}}>
                    <Container>
                        <button
                            style={{
                                background: 'transparent',
                                border: 0,
                                color: '#ffffff',
                                cursor: 'pointer'
                            }}
                            onClick={this.props.history.goBack}
                        >
                            <FontAwesomeIcon icon={faArrowLeft}
                                             transform="left-5"/>
                            Go back
                        </button>
                    </Container>
                </Hero.Head>
                <Hero.Body>
                    <Container>
                        <Title is="2">
                            {this.state.station}
                        </Title>
                        <SubTitle>
                            {`Overall air quality: ${this.state.rating} (AQI ${this.state.aqi})`}
                        </SubTitle>

                        <Message className={`is-${this.state.color}`}>
                            <Message.Body>
                                {this.state.description}
                            </Message.Body>
                        </Message>

                        <div className="columns is-multiline is-mobile">
                            {measurementData}
                        </div>
                    </Container>
                </Hero.Body>
                <Hero.Foot>
                    <Container className="has-text-centered is-size-7">
                        Updated on: {this.state.updatedOn}
                    </Container>
                </Hero.Foot>
            </Hero>
        )
    }
}

export default Station;
