import { View } from 'react-native';
import React, { memo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScreenWrapper = memo(({ children, bg = '#fff', style = {} }) => {
  const { top, bottom } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  const paddingBottom = bottom;

  return (
    <View
      style={[
        { flex: 1, paddingTop, paddingBottom, backgroundColor: bg },
        style,
      ]}
    >
      {children}
    </View>
  );
});

export default ScreenWrapper;
