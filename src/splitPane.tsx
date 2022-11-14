import React, { cloneElement, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Resizer from "./resizer";

const columnStyle = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex: 1;
  outline: none;
  overflow: hidden;
  user-select: text;
`;

const rowStyle = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  flex: 1;
  outline: none;
  overflow: hidden;
  user-select: text;
`;

interface IProps {
  split: IDirection;
  children: React.ReactElement[];
}

const SplitPane: React.FC<IProps> = (props) => {
  const ThisStyle = props.split === "vertical" ? rowStyle : columnStyle;

  const [sizes, setSizes] = useState<number[]>([]);
  const paneRefs = useRef<any[]>([]);

  const resizerXY = useRef<number[]>([]);
  const paneWidths = useRef<number[]>([]);

  const onMouseMove = useCallback((event: MouseEvent) => {
    event.preventDefault();
    if (paneRefs.current.length > 0) {
      const dx = resizerXY.current[0] - event.clientX;
      const widths = paneWidths.current;
      setSizes([widths[0] - dx, widths[1] + dx]);
    }
  }, []);

  const onMouseUp = useCallback((event: MouseEvent) => {
    event.preventDefault();
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
  }, []);

  const onMouseDown = (event: React.MouseEvent) => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    resizerXY.current = [event.clientX, event.clientY];
    paneWidths.current = [
      paneRefs.current[0].getBoundingClientRect().width,
      paneRefs.current[1].getBoundingClientRect().width,
    ];
  };

  const setPaneRef = (index: number, ref: any) => {
    paneRefs.current[index] = ref;
  };

  const elements = props.children.reduce(
    (acc: React.ReactElement[], child, index) => {
      let pane;
      const paneProps = {
        index: index,
        innerRef: setPaneRef,
        width: sizes.length > 0 ? sizes[index] : child.props.width,
      };

      pane = cloneElement(child, paneProps);

      if (acc.length === 0) {
        return [...acc, pane];
      } else {
        const resizer = (
          <Resizer
            split={props.split}
            onMouseDown={(event) => onMouseDown(event)}
          />
        );

        return [...acc, resizer, pane];
      }
    },
    []
  );
  return <ThisStyle>{elements}</ThisStyle>;
};

export default SplitPane;
