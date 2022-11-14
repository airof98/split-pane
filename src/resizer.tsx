import React, { useState } from "react";
import styled from "styled-components";

const ResizeDiv = styled.div`
  background: #fff;
  opacity: 0.2;
  z-index: 1;
  box-sizing: border-box;
  background-clip: padding-box;
  :hover {
    transition: all 2s ease;
  }
`;

const HorizontalResizeDiv = styled(ResizeDiv)`
  height: 11px;
  margin: -5px 0;
  border-top: 5px solid rgba(255, 255, 255, 0);
  border-bottom: 5px solid rgba(255, 255, 255, 0);
  cursor: row-resize;
  width: 100%;
  :hover {
    border-top: 5px solid rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
  }
  .disabled {
    cursor: not-allowed;
  }
  .disabled:hover {
    border-color: transparent;
  }
`;

const VerticalResizeDiv = styled(ResizeDiv)`
  width: 10px;
  margin: 0 -5px;
  border-left: 5px solid rgba(255, 255, 255, 0);
  border-right: 5px solid rgba(255, 255, 255, 0);
  cursor: col-resize;
  :hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
  }
  .disabled {
    cursor: not-allowed;
  }
  .disabled:hover {
    border-color: transparent;
  }
`;

interface IProps {
  children?: any;
  split: IDirection;
  onMouseDown: (event: React.MouseEvent) => void;
  style?: any;
}

const Resizer: React.FC<IProps> = (props) => {
  return props.split === "vertical" ? (
    <VerticalResizeDiv {...props} onMouseDown={props.onMouseDown} />
  ) : (
    <HorizontalResizeDiv {...props} />
  );
};

export default Resizer;
