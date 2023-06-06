import React from 'react';
import { Text, Linking, TextStyle } from 'react-native';

interface TextWithLinksProps {
  text: string;
  linkStyle?: TextStyle;
}

const TextWithLinks: React.FC<TextWithLinksProps> = ({ text, linkStyle }) => {
  const extractLinks = (str: string): string[] => {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Extracting links from the text
    const links = str.match(urlRegex);

    return links || [];
  };

  const handleLinkPress = (url: string): void => {
    Linking.openURL(url);
  };

  const renderTextWithLinks = (str: string): JSX.Element => {
    const links = extractLinks(str);

    if (links.length === 0) {
      return <Text style={{ color: 'black' }}>{str}</Text>;
    }

    const parts = str.split(/(https?:\/\/[^\s]+)/);

    return (
      <Text>
        {parts.map((part, index) => {
          if (part.match(/(https?:\/\/[^\s]+)/)) {
            const link = links.shift();
            return (
              <Text
                key={index}
                style={[{ color: 'blue', textDecorationLine: 'underline' }, linkStyle]}
                onPress={() => handleLinkPress(link!)}
              >
                {link}
              </Text>
            );
          }

          return (
            <Text key={index} style={{ color: 'black' }}>
              {part}
            </Text>
          );
        })}
      </Text>
    );
  };

  return <Text>{renderTextWithLinks(text)}</Text>;
};

export default TextWithLinks;
