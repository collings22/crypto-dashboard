import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

export const SimpleLineChart = (props) => {
    const data = props.chartData

    const margin = { top: 10, right: 10, bottom: 0, left: 30 }
    const width = 400 - margin.top - margin.right
    const height = 105 - margin.top - margin.bottom

    const ref = useRef()

    useEffect(() => {
        d3.select(ref.current).selectAll('svg').remove()

        const svg = d3.select(ref.current)
            .append('svg')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', '0 0 420 135')
            .append('g')
            .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')')

        svg
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'none')
            .attr('stroke', 'transparent')
            .attr('stroke-width', 4)

        const groups = d3.map(data, function (d) {
            return (d.label)
        })

        const x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.02])

        const xAxis = d3.axisBottom(x)
            .tickFormat(function (d, i) {
                var date = new Date(d)
                return i === 0 || i === (data.length - 1) ? (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear().toString().substr(2)) : null
            })

        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .style('color', '#17a2b8')
            .style('font-size', '50%')
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'middle')


        const y = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return +d.y })])
            .range([height, 0])

        svg.append('g')
            .attr('class', 'grid')
            .style('color', '#17a2b8')

        svg.append('g')
            .style('font-size', '50%')
            .style('color', '#17a2b8')
            .call(d3.axisLeft(y))


        // Add the line
        svg.append('path')
            .datum(data)
            .attr('stroke', '#17a2b8')
            .attr('stroke-width', 2.5)
            .attr('fill', 'none')
            .attr('d', d3.line()
                .x(function (d) {
                    return x(d.label)
                })
                .y(function (d) {
                    return y(d.y)
                })
            )

        // if (props.trendline) {
        //   const lr = drawTrendline(data, ['y'])
        //   svg.append('line')
        //     .attr('x1', width)
        //     .attr('y1', yAxis(lr[0].intercept + (lr[0].slope * lr[0].n)))
        //     .attr('y2', yAxis(lr[0].intercept))
        //     .style('stroke', 'grey')
        //     .style('opacity', '0.6')
        //     .style('stroke-width', '1px')
        // }
    }, [data, margin.left, margin.top, height, width])

    return <div ref={ref} />
}
