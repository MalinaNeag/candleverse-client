import styled from "styled-components";
import { ButtonStyle } from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import { useContext, useEffect, useRef } from "react";

const primary = "#808080";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle};
    background-color: #fff; 
    color: ${primary}; 
    transition: background-color 0.3s, color 0.3s, border-color 0.3s; 

    border: 2px solid ${primary}; 

    &:hover {
      background-color: ${primary}; 
      color: #fff; 
      border-color: #fff; 
    }

    ${props => props.main && `
      font-weight: 600; 
    `}
  }

  @keyframes fly {
    100% {
      top: 0;
      left: 65%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }

  img {
    display: none;
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    z-index: 5;
    animation: fly 1s;
    border-radius: 10px;
  }
`;

export default function FlyingButton(props) {
    const { addProduct } = useContext(CartContext);
    const imgRef = useRef();

    function sendImageToCart(ev) {
        imgRef.current.style.display = 'inline-block';
        imgRef.current.style.left = (ev.clientX - 50) + 'px';
        imgRef.current.style.top = (ev.clientY - 50) + 'px';
        setTimeout(() => {
            imgRef.current.style.display = 'none';
        }, 1000);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const reveal = imgRef.current?.closest('div[data-sr-id]');
            if (reveal?.style.opacity === '1') {
                // visible
                reveal.style.transform = 'none';
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <FlyingButtonWrapper onClick={() => addProduct(props._id)}>
                <img src={props.src} alt="" ref={imgRef} />
                <button onClick={ev => sendImageToCart(ev)} {...props} />
            </FlyingButtonWrapper>
        </>
    );
}
