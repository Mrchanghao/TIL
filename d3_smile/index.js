const svg = d3.select('svg')

const circle = (svg.append('circle'));
const height = (svg.attr('height'))
const width = svg.attr('width')
circle.attr('r', 200)
  .attr('cx', width / 2)
  .attr('cy', height/ 2)
	.attr('fill', 'yellow')
	.attr('stroke', 'black');

let space = 70

const	leftEye = svg.append('circle')
	.attr('r', 30)
	.attr('cx', width / 2 - space)
	.attr('cy', height / 2 - 70)
	.attr('fill', 'black')

const rightEye = svg.append('circle')
	.attr('r', 30)
	.attr('cx', width / 2 + space)
	.attr('cy', height / 2 - 70)
	.attr('fill', 'black')

// shapes line arc generator 
// d3.arc
const arc = d3.arc();

const g = svg.append('g').attr('transform', `translate(250, 200)`)

const mouseLine = g.append('path')
	.attr('d', arc({
  	lineRadius: 100,
    innerRadius: 93,
    outerRadius: 110,
    startAngle: Math.PI / 2,
    endAngle: Math.PI * 3 / 2 
  }))