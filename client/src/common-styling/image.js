import styled from "styled-components";
import image from "../shopping-list.svg";

const Image = styled.img`
  background-image: url(${image});

  transition: transform 0.8s ease-in-out;

  &:hover {
    transform: rotate(360deg);
  }
`;

export default Image;
