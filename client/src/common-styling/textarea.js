import styled from "styled-components";
import Button from "./button";

const TextArea = styled.input`
  background-color: #292827;
  color: #999896;
  height: 50px;
  width: 50px;
  position: relative;
  bottom: -70px;
  right: -20px;
  border-color: grey;
  transition: width 0.4s ease-in-out;

  &:hover {
    background-color: #292827;
    width: 400px;
    border-color: grey;
    color: #999896;
  }

  &:focus {
    background-color: #292827;
  }
`;

export default TextArea;
