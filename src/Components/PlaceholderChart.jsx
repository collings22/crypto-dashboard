import * as d3 from 'd3';

const PlaceholderChart = ref => {
    const margin = { top: 10, right: 10, bottom: 0, left: 10 }
    const width = 400 - margin.top - margin.right
    const height = 105 - margin.top - margin.bottom
    

    d3.select(ref.current)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', '-25 -15 410 130')
        .append('g')
        .attr('transform',
            'translate(' + margin.left + ',' + margin.top + ')')


    const svg = d3.select(ref.current).style('background-color', 'lightgrey').style('opacity', 0.6);
    svg.selectAll('path.lineTest').remove()
    svg.selectAll('rect.bars').remove()


    let data = new Array(10).fill().map((e, i) => {
        return { label: 1 + i, y: (Math.random() * 100) }
    })
    let selection = svg.selectAll("rect").data(data);

    let y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0])

    let x = d3.scaleBand()
        .domain(data.map(o => o.label))
        .range([0, width])
        .padding([0.02])


    let xAxis = d3.axisBottom(x)
    // .tickFormat(function (d, i) {
    //     var date = new Date(d)
    //     return i === 0 || i === (data.length - 1) ? (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear().toString().substr(2)) : null
    // }
    // )

    selection.enter().append('g')
        .attr('class', 'grid')
        .style('color', 'grey')

    selection.enter().append('g')
        .attr('id', 'yAxis')
        .style('font-size', '50%')
        .style('color', 'grey')
        .call(y)

    svg.select("#yAxis")
        .transition()
        .call(d3.axisLeft(y));


    selection.enter().append('g')
        .attr('id', 'xAxis')
        .attr('transform', `translate(0, ${height})`)
        .style('color', 'grey')
        .style('font-size', '50%')
        .call(x)
        .selectAll('text')
        .style('text-anchor', 'middle')

    svg.select("#xAxis")
        .transition()
        .call(xAxis);

    selection
        .transition().duration(1000)
        .attr('height', function (d) { return height - y(d.y) })
        .attr('y', function (d) { return y(d.y) })


    selection
        .enter().append('rect')
        .attr('class','placeholder-bars')
        .style('fill', 'grey')
        .attr('x', function (d) { return x(d.label) })
        .attr('width', x.bandwidth())
        .attr('y', function (d) { return y(d.y) })
        .attr('height', function (d) { return height - y(d.y) })

    selection
        .exit()
        .transition().duration(1000)
        .attr("y", (d) => height)
        .attr("height", 0)
        .remove()

    svg.append('line')
    .attr('class','placeholder-line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', width)
        .attr('y2', height)
        .attr('stroke', 'darkgrey')
        .attr('opacity', 0.7)

    svg.append('line')
    .attr('class','placeholder-line')
        .attr('x1', 0)
        .attr('y1', height)
        .attr('x2', width)
        .attr('y2', 0)
        .attr('stroke', 'darkgrey')
        .attr('opacity', 0.7)



}

export default PlaceholderChart
