import React from "react";
import styled from "styled-components";

interface IProps {
  children?: any;
  width: number | string;
  innerRef?: any;
  index?: number;
  style?: any;
}

const PaneStyle = styled.div<IProps>`
  width: ${(props) => {
    if (typeof props.width === "number") {
      return `${props.width}px`;
    }
    return props.width;
  }};
  background: chartreuse;
  flex-wrap: wrap;
  display: flex;
  flex-shrink: 0;
`;

const Pane: React.FC<IProps> = (props) => {
  const setRef = (element: any) => {
    props.innerRef(props.index, element);
  };
  return (
    <PaneStyle {...props} ref={setRef}>
      {props.children}
    </PaneStyle>
  );
};

export default Pane;
