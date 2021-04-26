import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

export const SimpleBarChart = (props) => {
    const data = props.chartData
    const margin = { top: 10, right: 10, bottom: 0, left: 10 }
    const width = 400 - margin.top - margin.right
    const height = 105 - margin.top - margin.bottom

    const ref = useRef()

    useEffect(() => {
        d3.select(ref.current)
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', '-20 -15 410 130')
            .append('g')
            .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')')

    }, [margin.top, margin.left, height, width])

    const drawChart = () => {
        const svg = d3.select(ref.current);
        let selection = svg.selectAll("rect").data(data);


        let y = d3.scaleLinear()
            .domain([0, Math.max(...data.map(o => o.y))*1.1])
            .range([height, 0])

        let x = d3.scaleBand()
            .domain(data.map(o => new Date(o.label)))
            .range([0, width])
            .padding([0.02])


        let xAxis = d3.axisBottom(x)
            .tickFormat(function (d, i) {
                var date = new Date(d)
                return i === 0 || i === (data.length - 1) ? (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear().toString().substr(2)) : null
            }
            )

        selection.enter().append('g')
            .attr('class', 'grid')
            .style('color', '#17a2b8')

        selection.enter().append('g')
            .attr('id', 'yAxis')
            .style('font-size', '50%')
            .style('color', '#17a2b8')
            .call(y)

        svg.select("#yAxis")
            .transition()
            .call(d3.axisLeft(y));


        selection.enter().append('g')
            .attr('id', 'xAxis')
            .attr('transform', `translate(0, ${height})`)
            .style('color', '#17a2b8')
            .style('font-size', '50%')
            .call(x)
            .selectAll('text')
            .style('text-anchor', 'middle')

        svg.select("#xAxis")
            .transition()
            .call(xAxis);

        selection
            .transition().duration(300)
            .attr('height', function (d) { return height - y(d.y) })
            .attr('y', function (d) { return  y(d.y) })


        selection
            .enter().append('rect')
            .style('fill', '#17a2b8')
            .attr('x', function (d) { return x(new Date(d.label)) })
            .attr('width', x.bandwidth())
            .attr('height', function (d) { return y(d.y) })
            .attr('y', function (d) { return height - y(d.y) })

        selection
            .exit()
            .transition().duration(300)
            .attr("y", (d) => height)
            .attr("height", 0)
            .remove()
    }

    useEffect(() => {
        drawChart()
        // eslint-disable-next-line
    }, [data])


    return (
        <div>
            <svg ref={ref}></svg>
        </div>
    )
}


