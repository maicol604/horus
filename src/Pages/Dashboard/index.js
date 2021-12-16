import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

import styled from "styled-components";
import Paper from '@mui/material/Paper';

import Chart from '../../Components/Chart';
import Plot from '../../Components/Plot';

const ReactGridLayout = WidthProvider(RGL);

const Wrapper = styled.div`
    width:100%;
  .react-resizable-handle.react-resizable-handle-se{
    width: .5em;
    height: .5em;
    position: absolute;
    bottom: 0;
    right: 0;
    border: 1px solid #333;
    border-top: none;
    border-left: none;
    cursor: nw-resize;
  }
`;

export default class GridPropertyLayout extends React.PureComponent {
  static defaultProps = {
    isDraggable: true,
    isResizable: true,
    items: 5,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 6
  };

  generateDOM() {
    // Generate items with properties from the layout, rather than pass the layout directly
    const layout = this.generateLayout();
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i} data-grid={layout[i]} style={{display: 'flex'}}>
          <Paper 
            variant="outlined"
            style={{padding:'1em', width: '100%', boxSizing:'border-box', overflow:'hidden', backgroundColor:'#eee'}}
          >
            <Plot/>
          </Paper>
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      var w = _.result(p, "w") || Math.ceil(Math.random() * 4);
      var y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: w,
        h: y,
        i: i.toString()
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <div style={{height: '50vh', display: 'flex', width: '50vw'}}><Plot/></div>
      
      // <Wrapper>
      //   <ReactGridLayout onLayoutChange={this.onLayoutChange} {...this.props}>
      //     {this.generateDOM()}
      //   </ReactGridLayout>
      // </Wrapper>
    );
  }
}