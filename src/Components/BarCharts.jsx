import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

export const SimpleBarChart = (props) => {
    const data = props.chartData

    const colour = props.colour
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


        let subgroups = Object.keys(data[0])
        subgroups = subgroups.filter(e => !['label'].includes(e))

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
            }
            )


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

        svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .style('fill', '#17a2b8')
            .attr('x', function (d) { return x(d.label) })
            .attr('width', x.bandwidth())
            .attr('y', function (d) { return y(d.y) })
            .attr('height', function (d) { return height - y(d.y) })

    }, [data, margin.top, margin.left, height, width, colour])

    // useEffect(() => {
    //     d3.select(ref.current)
    //         .attr("width", width)
    //         .attr("height", height)
    //         .style("border", "1px solid black")
    // }, [height, width]);

    // useEffect(() => {
    //     draw();
    // }, [data]);

    // const draw = () => {

    //     const svg = d3.select(ref.current);
    //     var selection = svg.selectAll("rect").data(data);
    //     var yScale = d3.scaleLinear()
    //                         .domain([0, d3.max(data)])
    //                         .range([0, height-100]);

    //     selection
    //         .transition().duration(300)
    //             .attr("height", (d) => yScale(d))
    //             .attr("y", (d) => height - yScale(d))

    //     selection
    //         .enter()
    //         .append("rect")
    //         .attr("x", (d, i) => i * 45)
    //         .attr("y", (d) => height)
    //         .attr("width", 40)
    //         .attr("height", 0)
    //         .attr("fill", "orange")
    //         .transition().duration(300)
    //             .attr("height", (d) => yScale(d))
    //             .attr("y", (d) => height - yScale(d))

    //     selection
    //         .exit()
    //         .transition().duration(300)
    //             .attr("y", (d) => height)
    //             .attr("height", 0)
    //         .remove()
    // }



    return (
        <div ref={ref}>
        </div>
    )
}



//   useEffect(() => {
//     d3.select(ref.current).selectAll('svg').remove()

//     const svg = d3.select(ref.current)
//       .append('svg')
//       .attr('preserveAspectRatio', 'xMinYMin meet')
//       .attr('viewBox', '0 -10 420 225')
//       .append('g')
//       .attr('transform',
//         'translate(' + margin.left + ',' + margin.top + ')')

//     svg
//       .append('rect')
//       .attr('x', 0)
//       .attr('y', 0)
//       .attr('width', width)
//       .attr('height', height)
//       .attr('fill', 'none')
//       .attr('stroke', 'transparent')
//       .attr('stroke-width', 4)

//     if (data.length === 0) {
//       svg.append('text')
//         .attr('x', (width / 2))
//         .attr('y', 0 - (margin.top / 2))
//         .attr('text-anchor', 'middle')
//         .style('font-size', '10px')
//         .text('NO DATA BETWEEN THESE DATES')
//     } else {
//       let subgroups = Object.keys(data[0])
//       subgroups = subgroups.filter(e => !['label'].includes(e))

//       const groups = d3.map(data, function (d) {
//         return (d.label)
//       }).keys()

//       const x = d3.scaleBand()
//         .domain(groups)
//         .range([0, width])
//         .padding([0.4])

//       const xAxis = d3.axisBottom(x)
//         .tickFormat(d => d)

//       const maxBarSum = Math.max.apply(Math, data.map(o => parseInt(o[subgroups[0]]))) * 1.02

//       svg.append('g')
//         .attr('transform', `translate(0, ${height})`)
//         .style('color', 'darkgray')
//         .style('font-size', '50%')
//         .call(xAxis)
//         .selectAll('text')
//         .style('text-anchor', 'end')
//         .attr('dx', '-.8em')
//         .attr('dy', '.15em')
//         .attr('transform', function (d) {
//           return 'rotate(-30)'
//         })

//       const y = d3.scaleLinear()
//         .domain([0, maxBarSum])
//         .range([height, 0])

//       svg.append('g')
//         .attr('class', 'grid')
//         .style('color', 'darkgray')
//         .call(drawYAxisGridlines(y)
//           .tickSize(-width)
//           .tickFormat(''))

//       svg.append('g')
//         .style('font-size', '50%')
//         .style('color', 'darkgray')
//         .call(d3.axisLeft(y).tickFormat((d) => Number.isInteger(d) ? d : null))

//       svg.selectAll('.bar')
//         .data(data)
//         .enter().append('rect')
//         .style('fill', colour)
//         .attr('x', function (d) { return x(d.label) })
//         .attr('width', x.bandwidth())
//         .attr('y', function (d) { return y(d[subgroups[0]]) })
//         .attr('height', function (d) { return height - y(d[subgroups[0]]) })
//     }
//   }, [data, margin, height, width, colour])

//   function drawYAxisGridlines (y) {
//     return d3.axisLeft(y)
//       .ticks(5)
//   }

//   function linearRegression (y, x) {
//     const lr = {}
//     y = y.filter(a => a > 0)
//     const n = y.length
//     let sumX = 0
//     let sumY = 0
//     let sumXy = 0
//     let sumXx = 0

//     for (var i = 0; i < y.length; i++) {
//       sumX += x[i].index
//       sumY += y[i]
//       sumXy += (x[i].index * y[i])
//       sumXx += (x[i].index * x[i].index)
//     }

//     lr.slope = (n * sumXy - sumX * sumY) / (n * sumXx - sumX * sumX)
//     lr.intercept = (sumY - lr.slope * sumX) / n
//     lr.n = n

//     const endSlope = lr.intercept + (lr.slope * lr.n)

//     function getRange (upper, lower, steps) {
//       const difference = upper - lower
//       const increment = difference / (steps - 1)
//       return [lower, ...Array(steps - 2).fill('').map((_, index) =>
//         lower + (increment * (index + 1))
//       ), upper]
//     }

//     const dates = x.map(a => a.data.label)

//     const steppedRange = []
//     getRange(lr.intercept, endSlope, lr.n).sort((k, l) => endSlope > lr.intercept ? k - l : l - k)
//       .map((a, i) => steppedRange.push({ label: dates[i], intercept: a }))

//     return [lr, steppedRange]
//   }

//   function drawTrendline (data, subgroups) {
//     var xval = data.map(function (d, i) { return { index: i, data: d } })
//     const yval = (data.map(function (d) {
//       let total = 0
//       for (const [k, v] of Object.entries(d)) {
//         if (subgroups.includes(k)) total += parseFloat(v)
//       }
//       return total
//     }))
//     return linearRegression(yval, xval)
//   }
