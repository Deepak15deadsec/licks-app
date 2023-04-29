import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { icons, SIZES, FONTS } from '../../constants'
import Svg, {
    Path
} from 'react-native-svg'
import { Keyboard } from 'react-native'

const SearchInput = (props: any) => {
    return (
        <View style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#DBDBDB',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            gap: 10

        }}>

            <Svg width="20" height="20" viewBox="0 0 20 20" fill="">
                <Path d="M14.6654 12.8982H13.7386L13.4101 12.5816C14.1433 11.7304 14.6791 10.7278 14.9792 9.64545C15.2794 8.56313 15.3364 7.42789 15.1463 6.32096C14.595 3.06167 11.8734 0.458926 8.58873 0.0603082C7.43396 -0.0856965 6.26107 0.0342475 5.15981 0.410962C4.05855 0.787676 3.05812 1.41118 2.23506 2.23375C1.412 3.05633 0.788138 4.05617 0.411203 5.15679C0.0342676 6.2574 -0.0857468 7.4296 0.0603435 8.5837C0.459195 11.8664 3.06346 14.5864 6.32466 15.1374C7.43224 15.3274 8.56815 15.2704 9.6511 14.9704C10.7341 14.6705 11.7373 14.135 12.589 13.4023L12.9057 13.7306V14.6568L17.8914 19.6395C18.3723 20.1202 19.1583 20.1202 19.6393 19.6395C20.1202 19.1588 20.1202 18.3733 19.6393 17.8926L14.6654 12.8982ZM7.6268 12.8982C4.70579 12.8982 2.34788 10.5416 2.34788 7.62233C2.34788 4.70304 4.70579 2.3465 7.6268 2.3465C10.5478 2.3465 12.9057 4.70304 12.9057 7.62233C12.9057 10.5416 10.5478 12.8982 7.6268 12.8982Z" fill="#5C595F" />
            </Svg>

            <TextInput
                
                {...props}
                placeholderTextColor="#00000080"
                style={{
                    ...FONTS.size14m,
                    color: '#4E656F',
                    opacity: 0.8,
                    flex: 1
                }}
            />

        </View>
    )
}

export default SearchInput

const styles = StyleSheet.create({})