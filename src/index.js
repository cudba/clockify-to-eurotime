import Papa from 'papaparse';
import {writeFileSync, readFileSync} from 'fs';
import moment from 'moment'

const args = process.argv

const foo = {
    User: 'Curdin Barandun',
    Email: 'cbarandun@gmail.com',
    Client: 'Bonfire',
    Project: 'Insidelabs MatterhornApp',
    Task: '',
    Description: 'Shop: Provide user infos in skidata orders (DTA)',
    Billable: 'Yes',
    'Start date': '02/13/2019',
    'Start time': '16:19',
    'End date': '02/13/2019',
    'End time': '16:58',
    'Duration (h)': '00:39:11',
    'Duration (decimal)': '0.65',
    Tags: '[MA] Mobile App,[MA] Sprint 1.5',
    'Hourly rate': '0',
    'Amount (USD)': '0',
    '': ''
}

if (args.length !== 3) {
    console.log('Invalid arguments length')
    process.exit(1)
}

const file = args[2];


const clockifyCsv = readFileSync(file, {encoding: 'ucs2'});

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


writeFileSync(process.cwd() + '/eurotime.txt', eurotimeOutput)

process.exit(0)
