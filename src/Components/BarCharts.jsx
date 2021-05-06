import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import PlaceholderChart from './PlaceholderChart'


export const SimpleBarChart = (props) => {
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
        const svg = d3.select(ref.current);
        svg.style('background-color', '').style('opacity', 1)
        svg.selectAll('line.placeholder-line').remove()
        svg.selectAll('rect.placeholder-bars').remove()

        let data = dataFromProps.map(o => { return { ...o, y: Object.values(o).reduce((p, c) => p + (c > 0 ? c : 0), 0) } })
        let selection = svg.selectAll("rect").data(data);

        let y = d3.scaleLinear()
            .domain([0, Math.max(...data.map(o => o.y)) * 1.1])
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
            .transition().duration(1000)
            .attr('height', function (d) { return height - y(d.y) })
            .attr('y', function (d) { return y(d.y) })


        selection
            .enter().append('rect')
            .style('fill', '#17a2b8')
            .attr('x', function (d) { return x(new Date(d.label)) })
            .attr('width', x.bandwidth())
            .attr('class', 'bars')
            .attr('y', function (d) { return y(d.y) })
            .attr('height', function (d) { return height - y(d.y) })

        selection
            .exit()
            .transition().duration(1000)
            .attr("y", (d) => height)
            .attr("height", 0)
            .remove()
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

export const SimpleStackedBarChart = (props) => {
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
        console.log(dataFromProps)
        let stackedData = d3.stack().keys(Object.keys(dataFromProps[0]).filter(f => !['label', 'type'].includes(f)))(dataFromProps)
        console.log(stackedData)

        const svg = d3.select(ref.current);
        svg.style('background-color', '').style('opacity', 1)
        svg.selectAll('line.placeholder-line').remove()
        svg.selectAll('rect.placeholder-bars').remove()

        let selection = svg.selectAll("rect").data(stackedData);

        let y = d3.scaleLinear()
            .domain([0, Math.max(...dataFromProps.map(o => Object.values(o).reduce((p, c) => p + (Number.isInteger(c) ? c : 0), 0))) * 1.1])
            .range([height, 0])

        let x = d3.scaleBand()
            .domain(dataFromProps.map(o => new Date(o.label)))
            .range([0, width])
            .padding([0.02])


        let xAxis = d3.axisBottom(x)
            .tickFormat(function (d, i) {
                var date = new Date(d)
                return i === 0 || i === (dataFromProps.length - 1) ? (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear().toString().substr(2)) : null
            })

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


        svg.selectAll("rect").transition().duration(250)
            .attr("y", (d) => height + margin.bottom)
            .attr("height", 0).remove()



        let rect = svg.selectAll("rect")
            .enter().append('g')
            .data(stackedData)
            .enter().append('g')
            .style('fill', (d, i) => {
                if (d.key === 'USD') return '#17a2b8'
                if (d.key === 'GBP') return '#d5ddde'
                if (d.key === 'BTC') return '#94d8e3'
                return 'yellow'
            })            .attr('class', 'bars')


        rect
            .selectAll('g')
            .enter().append('g')
            .data(d => d)
            .enter().append('rect')
            .attr('x', function (d) {
                return x(new Date(d.data.label))
            })
            .attr("y", (d) => height + margin.bottom)
            .attr("height", 0)
            .attr('width', x.bandwidth())
            .attr('class', 'bars')

        rect.selectAll('rect')
            .attr('x', function (d) {
                return x(new Date(d.data.label))
            }).transition().duration(1500)
            .attr('y', function (d) {
                return y(d[1])
            })
            .attr('height', function (d) {
                return y(d[0]) - y(d[1])
            })
            .attr('width', x.bandwidth())         .attr('class', 'bars')


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


