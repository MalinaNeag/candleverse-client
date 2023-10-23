import React, { useState } from "react";
import styled from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  cursor: pointer;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${(props) =>
    props.active
        ? `
      border-color: #ccc;
    `
        : `
      border-color: transparent;
    `}
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

const PopupImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  cursor: zoom-out;
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export default function ProductImages({ images }) {
    const [activeImage, setActiveImage] = useState(images?.[0]);
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = (image) => {
        setActiveImage(image);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <BigImageWrapper>
                <BigImage src={activeImage} onClick={() => openPopup(activeImage)} />
            </BigImageWrapper>
            <ImageButtons>
                {images.map((image) => (
                    <ImageButton
                        key={image}
                        active={image === activeImage}
                        onClick={() => setActiveImage(image)}
                    >
                        <Image src={image} alt="" onClick={() => openPopup(image)} />
                    </ImageButton>
                ))}
            </ImageButtons>

            {showPopup && (
                <Popup onClick={closePopup}>
                    <PopupImage
                        src={activeImage}
                        onClick={closePopup} 
                    />
                </Popup>
            )}
        </>
    );
}
