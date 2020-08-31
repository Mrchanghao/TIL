import * as d3 from 'd3';


const menuFactory = (x, y, menuItem, data, svgId) => {
  d3.select(`.${styles.contextMenu}`).remove();

  // draw item 
  d3.select(svgId)
    .append('g').attr('class', styles.contextMenu)
    .selectAll('tmp')
    .data(menuItem).enter()
    .append('g').attr('class', styles.menuFactory)
    .styles({'cursor': 'pointer'})
}