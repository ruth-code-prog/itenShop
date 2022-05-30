import React, {useRef, useMemo, useEffect, memo} from 'react';
import {
  Animated,
  PanResponder,
  ImageBackground,
  Easing,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import {deviceHeight, deviceWidth} from '../../../utils';

// utils

// styles
import styles from './styles';

const FloatingPoint = props => {
  const {visible, onClose, onPress, imageUri} = props;

  const buttonWidth = 92;
  const buttonHeight = 64;
  const currentPosition = useRef();

  const position = useRef(
    new Animated.ValueXY({
      x: deviceWidth() - buttonWidth,
      y: deviceHeight() - buttonHeight - 120,
    }),
  );
  const _scale = useRef(new Animated.Value(visible ? 1 : 0));

  useEffect(() => {
    Animated.timing(_scale.current, {
      toValue: visible ? 1 : 0,
      duration: visible ? 900 : 50,
      useNativeDriver: false,
      easing: Easing.exp,
    }).start();
  }, [visible]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          currentPosition.current = JSON.parse(
            JSON.stringify(position.current),
          );
          const offsetY =
            position.current.y._offset + position.current.y._value;

          position.current.setOffset({
            x: deviceWidth() - buttonWidth,
            y: offsetY,
          });
          position.current.setValue({
            x: 0,
            y: 0,
          });
        },
        onPanResponderMove: Animated.event(
          [
            null,
            {
              dx: position.current.x,
              dy: position.current.y,
            },
          ],
          {useNativeDriver: false},
        ),
        onPanResponderRelease: () => {
          const {x: currentX, y: currentY} = currentPosition.current || {};
          const {x, y} = JSON.parse(JSON.stringify(position.current));

          const header = 150;
          const footer = 40;
          const maxHeight = deviceHeight() - header - footer;
          const inLineY = y <= currentY + 2 && y >= currentY - 2;
          const inLineX = x <= currentX + 2 && x >= currentX - 2;

          if (inLineX && inLineY) {
            return onPress && onPress();
          }

          const _currentOffset = position.current.y._offset;
          let verticalValue = position.current.y._value;
          let offsetY = verticalValue + _currentOffset;

          // measure current position if overflows
          if (verticalValue < 0) {
            if (Math.abs(verticalValue) > _currentOffset) {
              verticalValue = 8 - _currentOffset;
            }
          }
          verticalValue =
            offsetY > maxHeight ? maxHeight - _currentOffset : verticalValue;

          Animated.spring(position.current, {
            toValue: {
              x: 0,
              y: verticalValue,
            },
            useNativeDriver: false,
          }).start();
        },
      }),
    [],
  );

  const handleClose = () => {
    Animated.timing(_scale.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => onClose && onClose());
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        position.current.getLayout(),
        styles.container,
        {
          transform: [
            {
              scale: _scale.current,
            },
          ],
        },
      ]}>
      <ImageBackground
        source={{
          uri: imageUri,
        }}
        style={styles.image}
        borderRadius={200}
      />
      <TouchableOpacity onPress={handleClose} style={styles.close}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
          X
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.visible === nextProps.visible;
};

export default memo(FloatingPoint, areEqual);
