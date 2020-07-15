import React, { useEffect, useReducer } from 'react';
import { Carousel } from 'react-bootstrap';

const Carousels = () => {
    const INITIAL_STATE = {
        images: [],
    }
    const reducer = (state, action) => {
        const { type, data } = action;
        switch (type) {
            case 'Fetch_Data': {
                return {
                    ...state, ...data
                }
            }
        }
    }
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const { images } = state
    useEffect(() => {
        fetch('https://jsonblob.com/api/dd1fc94c-b4a6-11ea-a2fd-7318d9570993').then(response => response.json()).then(json => {
            dispatch({ type: 'Fetch_Data', data: { images: [...json] } })
        })
    }, []);
    return (
        <>
            <Carousel >
                {images.map(({image,tagline}) => (
                    <Carousel.Item style={{height:"380px"}}>
                        <img   style = {{width:"100%",height:"380px",opacity: 0.8}} src={image} alt="slider" />
                <Carousel.Caption><h5 style={{color:"black"}}><b>{tagline}</b></h5></Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}

export default Carousels;
