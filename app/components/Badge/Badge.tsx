import * as React from "react"
import { Animated, StyleProp, StyleSheet, TextStyle, useWindowDimensions } from "react-native"

const defaultSize = 20

export type Props = React.ComponentProps<typeof Animated.Text> & {
  /**
   * Whether the badge is visible
   */
  visible?: boolean
  /**
   * Content of the `Badge`.
   */
  children?: string | number
  /**
   * Size of the `Badge`.
   */
  size?: number
  style?: StyleProp<TextStyle>
  textColor?: TextStyle["color"]
  backgroundColor?: TextStyle["backgroundColor"]
  borderRadius?: TextStyle["borderRadius"]
  ref?: React.RefObject<typeof Animated.Text>
  /**
   * @optional
   */
}

const Badge = ({
  children,
  size = defaultSize,
  visible = true,
  textColor,
  backgroundColor,
  borderRadius,
  ...rest
}: Props) => {
  const { current: opacity } = React.useRef<Animated.Value>(new Animated.Value(visible ? 1 : 0))
  const { fontScale } = useWindowDimensions()

  const isFirstRendering = React.useRef<boolean>(true)

  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false
      return
    }

    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }, [visible, opacity])

  const paddingHorizontal = 4

  return (
    <Animated.Text
      testID={"test-id-badge"}
      numberOfLines={1}
      style={[
        {
          opacity,
          backgroundColor,
          color: textColor,
          fontSize: size * 0.5,
          // ...(!theme.isV3 && theme.fonts.regular),
          lineHeight: size / fontScale,
          height: size,
          minWidth: size,
          borderRadius: borderRadius || size / 2,
          paddingHorizontal,
        },
        styles.container,
        // restStyle,
      ]}
      {...rest}
    >
      {children}
    </Animated.Text>
  )
}

export default Badge

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    overflow: "hidden",
    textAlign: "center",
    textAlignVertical: "center",
  },
})
