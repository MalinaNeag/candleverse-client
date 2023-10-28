import Center from "@/components/Center";
import styled, { keyframes } from 'styled-components';
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import {RevealWrapper} from 'next-reveal'

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Bg = styled.div`
  animation: ${gradientAnimation} 4s linear infinite;
  background: linear-gradient(50deg, #5d6e6e, #7c9d7c, #756164, #5d6e6e, #888888, #2E2E2E, #595959, #464646, #888888);
  background-size: 1000% 400%;
  color: #fff;
  padding: 0px;
  box-shadow: 2px 2px 6px rgba(89, 83, 83, 0.2);
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}`;


const Title = styled.h1`
  margin:0;
  font-weight:normal;
  font-size:1.5rem;
  @media screen and (min-width: 768px) {
    font-size:2rem;
  }
`;
const Desc = styled.p`
  color: rgb(255, 255, 255);
  font-size: .8rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img.main{
    max-width: 100%;
    max-height: 900px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    & > div:nth-child(1) {
      order: 0;
    }
    img{
      max-width: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top:25px;
  @media screen and (max-width: 767px) {
    margin-bottom: 25px;
  }
`;
const CenterImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ImgColumn = styled(Column)`
  & > div {
    width: 100%;
  }

  img.main {
    max-width: 100%;
    max-height: 900px;
    display: block;
    margin: 0 auto;
    transition: transform 0.3s ease-in-out; 

    &:hover {
      transform: scale(1.05); 
    }
  }
`;


const ContentWrapper = styled.div`
  @media screen and (max-width: 767px) {
    margin-top: -50px; 
  }
`;

export default function Featured({product}) {
  return (
      <Bg>
        <Center>
          <ColumnsWrapper>
            <Column>
              <div>
                <RevealWrapper origin={'left'} delay={0}>
                  <ContentWrapper>
                    <Title>{product.title}</Title>
                    <Desc>Discover our 100% soy wax candles, hand-poured with love. Proudly vegan and cruelty-free, they offer up to 40 hours of burn time. Each 220g candle reflects our commitment to craftsmanship. </Desc>
                    <ButtonsWrapper>
                      <ButtonLink href={'/product/'+product._id} outline={1} white={1}>Read more</ButtonLink>
                      <FlyingButton white={1} _id={product._id} src={product.images?.[0]}>
                        <CartIcon />
                        Add to cart
                      </FlyingButton>
                    </ButtonsWrapper>
                  </ContentWrapper>
                </RevealWrapper>
              </div>
            </Column>
            <ImgColumn>
              <RevealWrapper delay={0}>
                <CenterImg>
                  <img className={'main'} src={product.images?.[0]} alt=""/>
                </CenterImg>
              </RevealWrapper>
            </ImgColumn>
          </ColumnsWrapper>
        </Center>

      </Bg>
  );
}