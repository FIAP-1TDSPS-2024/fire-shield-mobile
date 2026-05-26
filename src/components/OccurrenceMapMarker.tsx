import React from 'react';
import { Marker, Circle } from 'react-native-maps';
import { URGENCY_COLOR, URGENCY_LABEL } from '../constants/urgency';
import { Occurrence } from '../types';

type Props = {
  occurrence: Occurrence;
  onPress: (occurrence: Occurrence) => void;
};

export default function OccurrenceMapMarker({ occurrence, onPress }: Props) {
  const color = URGENCY_COLOR[occurrence.urgency];
  return (
    <>
      <Circle
        center={{ latitude: occurrence.latitude, longitude: occurrence.longitude }}
        radius={occurrence.area * 50}
        fillColor={color + '33'}
        strokeColor={color}
        strokeWidth={1}
      />
      <Marker
        coordinate={{ latitude: occurrence.latitude, longitude: occurrence.longitude }}
        pinColor={color}
        onPress={() => onPress(occurrence)}
        title={occurrence.title}
        description={URGENCY_LABEL[occurrence.urgency]}
      />
    </>
  );
}
