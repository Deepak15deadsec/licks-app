import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Svg, { Path, Text as SvgText, TSpan } from 'react-native-svg';
import Orbit from '../orbit/Orbit';

type DataItem = {
  category: string;
  totalRewardedAmount: number;

};

type Props = {
  data: DataItem[];
  size?: number;
  holeSize?: number;
};

const PieChart = ({ data, size = 310, holeSize = 0.7 }: Props) => {
  const total = data.reduce((sum, { totalRewardedAmount }) => sum + totalRewardedAmount, 0);
  const outerRadius = size / 3;
  const innerRadius = outerRadius * holeSize;
  const cx = outerRadius;
  const cy = outerRadius;
  const isFullCircle = data.length === 1; // Check if there's only one data item



  let startAngle = -Math.PI / 2;

  const generateColors = (count: number) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      const color = `hsl(${hue}, 70%, 50%)`;
      colors.push(color);
    }
    return colors;
  };

  const colors = generateColors(data.length);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: size, height: size, marginTop: 20 }}>
      <Svg width={size} height={size} style={{ marginLeft: 60 }}>
        {data.map(({ category, totalRewardedAmount }, index) => {
          const color = colors[index];
          const endAngle = isFullCircle ? startAngle + Math.PI * 2 : startAngle + (totalRewardedAmount / total) * Math.PI * 2;
          const key = `arc${index}`;
          const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';
          const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle);
          const outerEnd = polarToCartesian(cx, cy, outerRadius, endAngle);
          const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle);
          const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle);
          const pathData = [
            'M', outerStart.x, outerStart.y,
            'A', outerRadius, outerRadius, 0, largeArcFlag, 1, outerEnd.x, outerEnd.y,
            'L', innerEnd.x, innerEnd.y,
            'A', innerRadius, innerRadius, 0, largeArcFlag, 0, innerStart.x, innerStart.y,
            'z'
          ].join(' ');

          startAngle = endAngle;

          return <Path key={key} d={isFullCircle ? `M ${cx + outerRadius} ${cy}
          A ${outerRadius} ${outerRadius} 0 1 0 ${cx - outerRadius} ${cy}
          A ${outerRadius} ${outerRadius} 0 1 0 ${cx + outerRadius} ${cy}
          M ${cx + innerRadius} ${cy}
          A ${innerRadius} ${innerRadius} 0 1 1 ${cx - innerRadius} ${cy}
          A ${innerRadius} ${innerRadius} 0 1 1 ${cx + innerRadius} ${cy}
          Z` : pathData} fill={color} />;
        })}

        {data.find(({ category }) => category === 'Savings') && (
          <SvgText
            x={cx}
            y={cy}
            textAnchor="middle"
            fontSize={15}
            fontWeight="bold"
            fill="#000000"
          >
            <TSpan x={cx} dy="-0.5em">Total Rewarded</TSpan>
            <TSpan x={cx} dy="1.5em">{total}</TSpan>
            {/* <TSpan x={cx} dy="2em">Total Savings</TSpan>
            <TSpan x={cx} dy="1.5em">
              {data.find(({ category }) => category === 'Savings')?.totalRewardedAmount}
            </TSpan> */}
          </SvgText>
        )}
      </Svg>

      <View style={{ marginBottom: 10, marginTop: -50 }}>
        {data.map(({ category, totalRewardedAmount }, index) =>{ 
          const percentage = (totalRewardedAmount / total) * 100;
          return (
          <View key={`label${index}`} style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' ,marginLeft: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 10, height: 10, backgroundColor: colors[index], marginRight: 5 }} />
              <Text>{category}</Text>
              
            </View>
            <View>
                {/* <Text>{totalRewardedAmount}</Text> */}
                <Text>{percentage.toFixed(2)} %</Text>
              </View>

          </View>
        )})}
      </View>

      <Orbit />
    </ScrollView>
  );
};

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInRadians: number) {
  const x = centerX + radius * Math.cos(angleInRadians);
  const y = centerY + radius * Math.sin(angleInRadians);
  return { x, y };
}

export default PieChart;
