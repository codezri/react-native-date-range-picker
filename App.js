import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

function CustomCalendar(props) {
  const initDate = '2022-12-01';
  const [range, setRange] = useState({});

  // Using useMemo to perform calculations only if range is modified
  const marked = useMemo(() => {
    if(!range.startDate) return {};

    let start = new Date(range.startDate).getTime();
    let end = new Date(range.endDate || range.startDate).getTime();
    let marked = {};

    for(let cur = start; cur <= end; cur += 60 * 60 * 24000) {
      let curStr = new Date(cur).toISOString().substr(0, 10);
      marked[curStr] = {
        selected: true,
        color: '#aabbee',
        textColor: 'black',
        startingDay: cur == start,
        endingDay: cur == end,
      };
    }
    return marked;
  }, [range]);

  function handleDayPress(day) {
    if(range.startDate && !range.endDate) {
      // startDate is selected. Complete the range selection
      let newRange = {...range, ...{endDate: day.dateString}};
      props.onRangeSelected &&
        props.onRangeSelected(newRange);
      setRange(newRange);
    }
    else {
      // startDate isn't selected. Start the range selection
      setRange({
        startDate: day.dateString
      });
    }
  }

  return (
    <Calendar
      initialDate={initDate}
      markedDates={marked}
      markingType="period"
      onDayPress={handleDayPress}
      {...props}
    />
  );
}

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomCalendar
        onRangeSelected={(range) => console.log('Range selected: ', range)}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
