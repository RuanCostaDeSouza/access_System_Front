import React from "react";
import Box from "../components/Box";
import Container from "../components/Container";
import image from"../public/img/image.png" 

export default function errorPage (){
    return (
        <>
            <Container>
                <Box>
                <img src={image} alt="" />
                <a href="/login"><h2>Go to home</h2></a>
                </Box>
            </Container>
        </>
    )
}