import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES, icons, TYPES } from '../../../../constants'
import Svg, {
    Path,
    Circle
} from 'react-native-svg'
import * as Animatable from 'react-native-animatable';

let DURATION = 400

const FaqAccordion = ({ question, answer }: { question: string, answer: string }) => {
    const [expanded, setExpanded] = useState(false);

    const handlePress = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={{ gap: 6, paddingLeft: 20, paddingRight: 20 }}>
            <TouchableOpacity
                style={{
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#30D792',
                    padding: 12
                }}
                onPress={handlePress}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={{ ...FONTS.size16m, letterSpacing: -0.03, textAlign: 'justify', color: '#5C595F' }}>{question}</Text>

                    <Svg width="15" height="9" viewBox="0 0 15 9" fill="none" style={{ transform: [{ rotate: expanded ? '180deg' : "0deg" }] }}>
                        <Path d="M1.19899 0.34899C1.43165 0.116329 1.72777 -5.80148e-07 2.08733 -5.64431e-07C2.4469 -5.48713e-07 2.74301 0.116329 2.97567 0.34899L7.925 5.29832L12.8743 0.34899C13.107 0.11633 13.4031 -6.98026e-08 13.7627 -5.40855e-08C14.1222 -3.83683e-08 14.4183 0.11633 14.651 0.348991C14.8837 0.581651 15 0.877765 15 1.23733C15 1.5969 14.8837 1.89301 14.651 2.12567L8.81334 7.96334C8.68643 8.09025 8.54895 8.18035 8.4009 8.23365C8.25284 8.28695 8.09421 8.31318 7.925 8.31233C7.75579 8.31233 7.59716 8.28568 7.4491 8.23238C7.30105 8.17908 7.16357 8.0894 7.03666 7.96334L1.19899 2.12567C0.966332 1.89301 0.85 1.5969 0.85 1.23733C0.85 0.877764 0.966332 0.581651 1.19899 0.34899Z" fill="#5C595F" />
                    </Svg>

                </View>

                <Animatable.View
                    duration={200}
                    animation="zoomInUp"
                    delay={DURATION}
                    style={{ overflow: 'hidden', marginTop: expanded ? 6 : 0, height: expanded ? 'auto' : 0 }}
                >
                    <Text style={{ ...FONTS.size14r, letterSpacing: -0.03, textAlign: 'justify', color: '#5C595F' }}>{answer}</Text>
                </Animatable.View>
            </TouchableOpacity>

        </View>
    );
};

export default FaqAccordion;
