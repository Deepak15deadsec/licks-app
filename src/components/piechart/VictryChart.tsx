import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const PieChart = ({ data }:any) => {
  const total = data.reduce((sum: any, { value }: any) => sum + value, 0);
  let startAngle = 0;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {data.map(({ value, color }: any, index: any) => {
        const endAngle = startAngle + (value / total) * Math.PI * 2;
        const key = `arc${index}`;
        startAngle = endAngle;

        return (
          <View key={key}>
            <Svg
              width="100%"
              height="100%"
              viewBox="-1 -1 2 2"
              style={{ transform: [{ rotate: '-90deg' }] }}
            >
              <Path
                d={describeArc(0, 0, 1, startAngle, endAngle)}
                fill={color}
              />
            </Svg>
          </View>
        );
      })}
    </View>
  );
};

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';
  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    'L',
    x,
    y,
    'L',
    start.x,
    start.y,
    'z',
  ].join(' ');
  return d;
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInRadians: number) {
  const x = centerX + radius * Math.cos(angleInRadians);
  const y = centerY + radius * Math.sin(angleInRadians);
  return { x, y };
}

export default PieChart;