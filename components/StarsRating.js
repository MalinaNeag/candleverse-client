import StarOutline from "@/components/icons/StarOutline";
import styled from "styled-components";
import { useState } from "react";
import StarSolid from "@/components/icons/StarSolid";
import { primary } from "@/lib/colors";

const StarsWrapper = styled.div`
  display: inline-flex;
  gap: 1px;
  align-items: center;
`;

const StarWrapper = styled.button`
  ${props => props.size === 'md' && `
    height: 1.4rem;
    width: 1.4rem;
  `}
  ${props => props.size === 'sm' && `
    height: 1rem;
    width: 1rem;
  `}
  ${props => !props.disabled && `
    cursor: pointer;
  `}
  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color: ${props => (props.isHovered || props.isActive) ? primary : 'gray'}; 
  transition: color 0.2s; 

  &:hover { 
    color: ${primary};
  }
`;

export default function StarsRating({
                                      size = 'md',
                                      defaultHowMany = 0,
                                      disabled,
                                      onChange
                                    }) {
  const [howMany, setHowMany] = useState(defaultHowMany);
  const [hoveredStar, setHoveredStar] = useState(null);

  function handleStarClick(n) {
    if (disabled) {
      return;
    }
    setHowMany(n);
    onChange(n);
  }

  const stars = [1, 2, 3, 4, 5];

  return (
      <StarsWrapper>
        {stars.map(n => (
            <StarWrapper
                key={n}
                disabled={disabled}
                size={size}
                onClick={() => handleStarClick(n)}
                onMouseEnter={() => setHoveredStar(n)}
                onMouseLeave={() => setHoveredStar(null)}
                isHovered={n <= hoveredStar}
                isActive={n <= howMany}
            >
              {n <= howMany ? <StarSolid /> : <StarOutline />}
            </StarWrapper>
        ))}
      </StarsWrapper>
  );
}
