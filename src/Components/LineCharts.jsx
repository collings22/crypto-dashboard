import * as d3 from 'd3';
import { nest } from 'd3-collection'
import React, { useRef, useEffect } from 'react';
import PlaceholderChart from './PlaceholderChart'

export const SimpleLineChart = (props) => {
    const dataFromProps = props.chartData
    const margin = { top: 10, right: 10, bottom: 0, left: 10 }
    const width = 400 - margin.top - margin.right
    const height = 105 - margin.top - margin.bottom

    const ref = useRef()

    useEffect(() => {
        d3.select(ref.current)
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', '-25 -15 410 130')
            .append('g')
            .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')')

    }, [margin.top, margin.left, height, width])


    const drawChart = () => {
        let data = dataFromProps.map(o => { return { ...o, y: Object.values(o).reduce((p, c) => p + (c > 0 ? c : 0), 0) } })

        const svg = d3.select(ref.current);
        svg.style('background-color', '').style('opacity', 1)
        svg.selectAll('line.placeholder-line').remove()
        svg.selectAll('rect.placeholder-bars').remove()

        let selection = svg.selectAll("rect").data(data);

        let y = d3.scaleLinear()
            .domain([0, Math.max(...data.map(o => o.y)) * 1.1])
            .range([height, 0])

        let x = d3.scaleTime()
            .domain(d3.extent(data, function (d) { return new Date(d.label) }))
            .range([0, width])

        selection.enter().append('g')
            .attr('class', 'grid')

        selection.enter().append('g')
            .attr('id', 'yAxis')
            .style('font-size', '50%')
            .call(y)

        svg.select("#yAxis")
            .attr("class", "axis axis--y")
            .transition()
            .call(d3.axisLeft(y));


        selection.enter().append('g')
            .attr('id', 'xAxis')
            .attr('transform', `translate(0, ${height})`)
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
            .data([data], function (d) { return new Date(d.label) })

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
        if (dataFromProps.length === 0 || [...new Set(dataFromProps.map(a => a.type))].length > 1) PlaceholderChart(ref)
        else {
            drawChart()
        }
        // eslint-disable-next-line
    }, [dataFromProps])


    return (
        <div>
            <svg ref={ref}></svg>
        </div>
    )
}


export const SimpleMultiLineChart = (props) => {
    const dataFromProps = props.chartData
    const margin = { top: 10, right: 10, bottom: 0, left: 10 }
    const width = 400 - margin.top - margin.right
    const height = 105 - margin.top - margin.bottom
    const filterSingleViewCharts = props.handleFilterSingleViewChartsCallback

    const ref = useRef()

    useEffect(() => {
        d3.select(ref.current)
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', '-25 -15 410 130')
            .append('g')
            .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')')

    }, [margin.top, margin.left, height, width])


    const drawChart = () => {
        let data = dataFromProps.map(o => { return { ...o, y: Object.values(o).reduce((p, c) => p + (c > 0 ? c : 0), 0) } })

        var sumstat = nest()
            .key(d => d.type)
            .entries(data);

        const svg = d3.select(ref.current)
        svg.style('background-color', '').style('opacity', 1)
        svg.selectAll('line.placeholder-line').remove()
        svg.selectAll('rect.placeholder-bars').remove()

        let selection = svg.selectAll("rect").data(sumstat);

        let y = d3.scaleLinear()
            .domain([0, Math.max(...data.map(o => o.y)) * 1.1])
            .range([height, 0])

        let x = d3.scaleTime()
            .domain(d3.extent(data, function (d) { return new Date(d.label) }))
            .range([0, width])

        selection.enter().append('g')
            .attr('class', 'grid')

        selection.enter().append('g')
            .attr('id', 'yAxis')
            .style('font-size', '50%')
            .call(y)

        svg.select("#yAxis")
            .attr("class", "axis axis--y")
            .transition()
            .call(d3.axisLeft(y));

        selection.enter().append('g')
            .attr('id', 'xAxis')
            .attr('transform', `translate(0, ${height})`)
            .style('font-size', '50%')
            .call(x)
            .selectAll('text')
            .style('text-anchor', 'middle')

        svg.select("#xAxis")
            .transition()
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.selectAll(".axis.axis--x").transition()
            .duration(1000)
            .call(x);

        svg.selectAll(".axis.axis--y").transition()
            .duration(1000)
            .call(y);

        svg.selectAll('.lineTest').remove()

        var line = svg.selectAll(".lineTest")
            .data([data], function (d) { return new Date(d.label) });


        line = line
            .data(sumstat).enter()
            .append("path")
            .attr("class", "lineTest")
            .merge(line);


        var valueline = d => d3.line()
            .x(d => x(new Date(d.label)))
            .y(d => y(d.y)).curve(d3.curveCardinal)(d.values)

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        line.transition().duration(1000)

        line.attr("d", d => valueline(d))
            .attr('id', function (d) { return d.key + "-line"; })
            .attr('stroke', (d, i) => color(i))
            .attr('stroke-width', 1.5)
            .attr('fill', 'none')

        line.on('mouseenter', d => {
            d3.selectAll('#' + d.srcElement.__data__.key + '-line').style("stroke-width", '3px');
            filterSingleViewCharts(d.srcElement.__data__.key)
        })

    }


    useEffect(() => {
        if (dataFromProps.length === 0) PlaceholderChart(ref)
        else {
            drawChart()
        }
        // eslint-disable-next-line
    }, [dataFromProps])


    return (
        <div>
            <svg ref={ref}></svg>
        </div>
    )
}
