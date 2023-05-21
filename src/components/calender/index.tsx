import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { useStoreActions, useStoreState } from '../../store/easy-peasy/hooks'
import MonthPicker from 'react-native-month-year-picker';
import Svg, { Path } from 'react-native-svg';
import { FONTS } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b2bec3',
    borderRadius: 4,
    padding: 10,
  },
  buttonText: {
    color: '#2d3436',
  },
});

const DEFAULT_OUTPUT_FORMAT = 'MMM-YYYY';

const App = () => {
  //const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);
  const date = useStoreState(store => store.query)
  
  const setQuery = useStoreActions((store) => store.setQuery)

  const showPicker = useCallback((value: boolean | ((prevState: boolean) => boolean)) => setShow(value), []);

  const onValueChange = useCallback(
    (event: any, newDate: any) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setQuery(selectedDate);
    },
    [date, showPicker],
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => showPicker(true)} style={{
        borderRadius: 9,
        padding: 8,
        borderWidth: 1,
        borderColor: '#DBDBDB',
      }}>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <Path
              d="M1.38033 4.63069H14.7545M2.93465 1.25146H13.066C13.5138 1.25146 13.9433 1.42948 14.26 1.74634C14.5766 2.0632 14.7545 2.49296 14.7545 2.94108V13.0703C14.7545 13.5184 14.5766 13.9482 14.26 14.265C13.9433 14.5819 13.5138 14.7599 13.066 14.7599H2.93465C2.48682 14.7599 2.05733 14.5819 1.74066 14.265C1.42399 13.9482 1.24609 13.5184 1.24609 13.0703V2.94108C1.24609 2.49296 1.42399 2.0632 1.74066 1.74634C2.05733 1.42948 2.48682 1.25146 2.93465 1.25146Z"
              stroke="#5C595F"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.88965 10.2528V9.3413H5.63262C6.19659 9.3413 6.5799 9.0076 6.5799 8.52015C6.5799 8.07493 6.22952 7.73701 5.64866 7.73701C5.04669 7.73701 4.67605 8.04621 4.63468 8.57844H3.48309C3.52615 7.48104 4.37042 6.74268 5.71029 6.74268C7.0299 6.74268 7.76357 7.47259 7.75935 8.34358C7.75513 9.06505 7.30175 9.53983 6.66264 9.69612V9.77468C7.49087 9.8938 7.99406 10.4218 7.99406 11.2185C7.99406 12.2618 7.01301 13.001 5.66892 13.001C4.32483 13.001 3.40963 12.2652 3.35645 11.139H4.54772C4.58487 11.6425 5.01376 11.9644 5.65288 11.9644C6.28356 11.9644 6.72511 11.6214 6.72511 11.1061C6.72511 10.5781 6.31226 10.2528 5.64444 10.2528H4.88965ZM10.5463 12.8481V8.10788H10.4729L9.0131 9.11489V7.95582L10.5505 6.89559H11.7916V12.8481H10.5463Z"
              fill="#5C595F"
            />
          </Svg>
          <Text style={{ ...FONTS.label, color: '#5C595F' }}> {moment(date).format(DEFAULT_OUTPUT_FORMAT)}</Text>
        </View>
      </TouchableOpacity>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          maximumDate={new Date()}
          locale="en"
          mode="full"
          autoTheme={false}
        />
      )}
    </SafeAreaView>
  );
};

export default App;