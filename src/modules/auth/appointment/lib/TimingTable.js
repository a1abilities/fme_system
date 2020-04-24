import {getDate, setTime, getCurrentDate, getTimeinDBFormat, getTime, get12HourTime } from '../../../../utils/datetime';
import moment from 'moment';

export const generateTimingTable = () => {
  let startTime = setTime('08:00');
  let endTime = setTime('20:00');
  let times = [];
  do {
    times.push({
      'original_time' : startTime,
      'time' : getTime(startTime),
      'start_time' : get12HourTime(startTime),
      'end_time' : get12HourTime(moment(startTime).add(15, 'minute')),
    });
    startTime = moment(startTime).add(15, 'minute');
  } while (getTime(startTime) !== getTime(endTime));

  return times;
}

