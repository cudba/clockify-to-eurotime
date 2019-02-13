#!/usr/bin/env node
const fs = require('fs')
const Papa = require('papaparse')
const moment = require('moment')

const args = process.argv

if (args.length !== 3) {
    console.log('Invalid arguments length')
    process.exit(1)
}

const file = args[2];


const clockifyCsv = fs.readFileSync(file, {encoding: 'ucs2'});

const clockifyRows = Papa.parse(clockifyCsv, {header: true,})

const reportPerDay = clockifyRows.data.reverse().reduce((perDay, row) => {
    const startDate = row['Start date'];
    const startTime = moment(row['Start time'], 'HH:mm').format('HHmm')
    const endTime = moment(row['End time'], 'HH:mm').format('HHmm')
    const duration = parseFloat(row['Duration (decimal)']);
    if (!perDay[startDate]) {
        perDay[startDate] = {
            times: [],
            duration: 0
        }
    }
    perDay[startDate].times.push(startTime, endTime)
    perDay[startDate].duration = perDay[startDate].duration + duration
    return perDay;
}, {})


const eurotimeOutput = Object.keys(reportPerDay).reduce((output, date) => {
    const day = reportPerDay[date];
    return output + date + '\t' + 'duration(h): '
        + day.duration + '\t' + 'times: '
        + day.times.reduce((timeString, time) => timeString + '\t' + time, '') + '\n'
}, '')


fs.writeFileSync(process.cwd() + '/eurotime.txt', eurotimeOutput)

process.exit(0)
