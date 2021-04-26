import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

export const SimpleLineChart = (props) => {
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

        let x = d3.scaleTime()
            .domain(d3.extent(data, function (d) { return new Date(d.label) }))
            .range([0, width])

        selection.enter().append('g')
            .attr('class', 'grid')
            .style('color', '#17a2b8')

        selection.enter().append('g')
            .attr('id', 'yAxis')
            .style('font-size', '50%')
            .style('color', '#17a2b8')
            .call(y)

        svg.select("#yAxis")
            .attr("class", "axis axis--y")
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
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        let durations = 600
        svg.selectAll(".axis.axis--x").transition()
            .duration(durations)
            .call(x);

        selection.selectAll(".axis.axis--y").transition()
            .duration(durations)
            .call(y);

        var line = svg.selectAll(".lineTest")
            .data([data], function (d) { return new Date(d.label) });

            line = line
            .enter()
            .append("path")
            .attr("class", "lineTest")
            .merge(line);

        var valueline = d3.line()
            .x(function (d) { return x(new Date(d.label)); })
            .y(function (d) { return y(d.y); });

            line.transition()
            .attr("d", valueline)
            .attr('stroke', '#17a2b8')
            .attr('stroke-width', 1.5)
            .attr('fill', 'none')

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
