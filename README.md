# API Management Mobile A

## Important for Xcode 15

Issue: .../ios/Pods/boost/boost/container_hash/hash.hpp:131:33 No template named 'unary_function' in namespace 'std'; did you mean '\_\_unary_function'?

Description: unary_function and binary_function are no longer provided in C++17 and newer Standard modes. They can be re-enabled with \_LIBCPP_ENABLE_CXX17_REMOVED_UNARY_BINARY_FUNCTION(Cre: Xcode 15 release notes)

Solution 1: Edit Podfile:

    ```
    post_install do |installer|
      installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
          config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] ||= ['$(inherited)', '_LIBCPP_ENABLE_CXX17_REMOVED_UNARY_BINARY_FUNCTION']
        end
      end
    end
    ```

Solution 2:
Select Pods > Build Settings > In Apple Clang - Preprocessing section > under Macro section > Add "\_LIBCPP_ENABLE_CXX17_REMOVED_UNARY_BINARY_FUNCTION" in Release & Debug

## Quick Start

Currently includes:

- React Native
- React Navigation
- MobX State Tree
- TypeScript
- And more!

```
APIManagement
├── app
│   ├── components
│   ├── config
│   ├── i18n
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── themes
│   ├── utils
│   ├── app.tsx
├── test
│   ├── __snapshots__
│   ├── mockFile.ts
│   ├── setup.ts
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── index.js
├── ios
│   ├── APIManagement
│   ├── APIManagement-tvOS
│   ├── APIManagement-tvOSTests
│   ├── APIManagement.xcodeproj
│   └── APIManagementTests
├── .env
└── package.json

```

### Start guide

Require NodeJS >=16.

1. Clone the repo:
   `git clone https://git.generali-life.com.vn/dattran/api-management-mobile.git`
2. Install dependencies:
   `yarn install`
3. To start iOS:
   - `cd ios && pod install`
   - `yarn ios`
4. To start Android:
   - `yarn android`
   - Note: Mac ARM has to install arm Android image to run simulator.

### ./app directory

Included in an Ignite boilerplate project is the `app` directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the `app` directory looks similar to the following:

```
app
├── components
├── config
├── i18n
├── models
├── navigators
├── screens
├── services
├── themes
├── utils
├── app.tsx
```

**components**
This is where your reusable components live which help you build your screens.

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigators**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truly shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

### ./test directory

This directory will hold your Jest configs and mocks.

## Running Detox end-to-end tests

## Running Maestro end-to-end tests

Install maestro:
`curl -Ls "https://get.maestro.mobile.dev" | bash`

Run maestro studio:
`yarn test:studio`

Run maestro:
`yarn test:maestro`

# Theming Apps

Theming involves creating a consistent look & feel across your application. It's a collection of style attributes and building blocks that are used everywhere.

Theming involves a few different things: palettes, colors, animation timings, fonts, typography, and spacing. You can find everything that we use for theming in the `app/themes` folder. When we at Infinite Red receive a custom design, one of the first places we start is in this directory matching the values to the design. It's a great idea to match the design language used by the designers with the semantic names you will be providing in these files.

## Colors & Palettes

In `app/themes/colors.ts`, we define a palette of colors and the semantic names to be used in the app. The palette is meant to be a simple list of colors, and the semantic names are meant to be used throughout the app. This matches how designers often think of colors & palettes, and lets us match designs which define these easily.

The palette color names are meant to be semantically neutral names matching the color. For example, `neutral100` defines a neutral color, but has no specific semantic meaning for its use. If you find yourself using a color in multiple places for the same purpose (e.g. background, border, text), define a semantic color and replace the palette color usage with the semantic one. For example, if you are styling all your text field components with a border of `colors.accent100`, define a semantic color such as `textFieldBorder` that is set to `accent100`. You would then use `colors.textFieldBorder` in your components in place of the `colors.accent100` color.

```tsx
<Text color={colors.common.characterBlueDefault}>
```

## Fonts & Typography

Fonts are defined in `app/theme/typography.ts`. We use a similar approach to [colors](./Theming-Colors-And-Palettes.md), defining a set of fonts and then using those fonts to define semantic font names to be used throughout the app. This allows us to have a consistent font usage across the app, and also allows us to change the fonts easily.

### Fonts

We define the fonts used in `app/themes/typography.ts`. The custom fonts are loaded using the `useFonts` hook from [`expo-fonts`](https://docs.expo.dev/guides/using-custom-fonts/) to load the fonts.

To add additional custom fonts to your project, obtain the proper OTF/TTF file(s) or install the desired Google Font package. Make the necessary additions to the `customFontsToLoad` object in `app/themes/typography.ts` and `fonts` object to reference the font family in the typography theming object.

```tsx
const customFontsToLoad = {
  robotoLight,
  robotoRegular,
  robotoMedium,
  robotoBold,
}

const fonts = {
  roboto: {
    // Cross-platform Google font.
    light: "robotoLight",
    normal: "robotoRegular",
    medium: "robotoMedium",
    bold: "robotoBold",
  },
  sfPro: {
    // iOS only font.
    normal: "System",
  },
}
```

Keep in mind that when utilizing custom fonts, it is a better user experience to wait on rendering anything within the app until the fonts are loaded (this will prevent any text from changing in front of the user's eyes). This functionality is baked into Ignite for you! Check out `app/app.tsx` to see it in action.

### Typography

Since we use the `Typography` component to encapsulate almost all text within an ignite app, the semantic names are essentially presets. As with all presets, they should only be created where there's a consistent pattern of usage across the app. To do this you'd add a new preset to the `Typography` component with the associated styles. For one-off cases, it's recommended to use the `size` and `weight` props on the `Typography` component.

```tsx
<Typography preset="body02" text="body02 - Cillum eu laboris in labore" />

<Typography preset="body03" text="body03 - Cillum eu laboris in labore" />

<Typography preset="body04" text="body04 - Cillum eu laboris in labore" />

 <Typography preset="headline01" text="headline01 - Cillum eu laboris in labore" />

 <Typography preset="headline02" text="headline02 - Cillum eu laboris in labore" />

 <Typography preset="label01" text="label01 - Cillum eu laboris in labore" />

 <Typography preset="label02" text="label02 - Cillum eu laboris in labore" />

 <Typography preset="label03" text="label03 - Cillum eu laboris in labore" />

 <Typography preset="link01" text="link01 - Cillum eu laboris in labore" />

 <Typography preset="link02" text="link02 - Cillum eu laboris in labore" />

 <Typography preset="support01" text="support01 - Cillum eu laboris in labore" />

 <Typography preset="support02" text="support02 - Cillum eu laboris in labore" />

 <Typography preset="title01" text="title01 - Cillum eu laboris in labore" />

 <Typography preset="title02" text="title02 - Cillum eu laboris in labore" />
```

## Timings

Timings are defined in `app/themes/timing.ts`. They can be used for consistent animation timings throughout the app.

## Spacing

Spacing is a first class citizen in Ignite. We use a spacing scale to define the spacing between elements in the app. This allows us to have a consistent spacing scale across the app, and also allows us to change the spacing easily. It is recommended to use the spacing scale for all spacing in the app if possible.

Spacing refers to the whitespace in between the elements in your app.

Spacing should be consistent and thought of as a first class technique right alongside `colors` and `typography`.

Anytime you add margins, or padding, they should come from this spacing scale, with relatively few exceptions.

Spacings are defined in `app/themes/spacing.ts`. The scale we use in Ignite is:

```ts
export const spacing = {
  size02: 2,
  size04: 4,
  size08: 8,
  size10: 10,
  size12: 12,
  size16: 16,
  size20: 20,
  size24: 24,
  size32: 32,
  size40: 40,
  size48: 48,
}
```

Example:

```ts
import { spacing } from "../themes"
OR
import { spacing } from "app/themes"

$containerStyle = {
  margin: spacing.size16,
  paddingHorizontal: spacing.size48,
}
```

Which type of scale you use is based on the design.

Try to stick with your scale and not use custom values if possible, as consistent spacing will give your app a very polished look and feel.

# Styling apps

Ignite's approach to styling individual components is, like many other things in Ignite, straightforward and direct.

If you're looking to set app-wide styles such as fonts/typography or colors,

We don't use `StyleSheet.create()` as a general rule, as it doesn't provide any real benefits over bare objects.

We instead use a strategy of bare JS objects, colocated with our components (usually below the component in the file), prefixed with `$`, and typed with TypeScript:

```tsx
import { View, ViewStyle } from "react-native"
import { colors } from "../themes"

const MyComponent = () => {
  return <View style={$container}>...</View>
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.systems.bgWhite,
}
```

With this strategy, you can tell a variable is a style if it has the $ prefix. You can also spread in other styles to compose styles:

```tsx
const $bold: TextStyle = {
  fontWeight: "bold",
}
const $larger: TextStyle = {
  fontSize: 22,
}
const $title: TextStyle = {
  ...$bold,
  ...$larger,
}
```

## Sharing Styles via Presets

Most of the components we include with Ignite include a `preset` property:

```tsx
<Button preset="primary" icon="Plus" />
```

Presets are defined in the component file itself, usually something like this:

```tsx
const $baseTextStyle: TextStyle = {
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
  marginStart: spacing.size04,
}

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  primary: [$baseTextStyle, typography.label01, { color: colors.systems.characterWhite }],
  secondary: [$baseTextStyle, typography.label01, { color: colors.systems.characterBlueDefault }],
  tertiary: [$baseTextStyle, typography.label01, { color: colors.systems.characterBlueDefault }],
}
```

These presets are usually composed of other styles, using arrays (which React Native will properly merge).

So, let's say we want a button that is a destructive action. We might add a "destructive" preset to the Button component.

The preset might look like this:

```tsx
const $warning = {
  backgroundColor: colors.systems.bgWhite,
  color: colors.systems.characterWhite,
}

const $viewPresets = {
  destructive: [$baseViewStyle, $warning],
}
```

You can then use it with your Button like this:

```tsx
<Button
  // set the preset here
  preset="primary"
  icon="Plus"
  onPress={() => thisItem.destroy()}
/>
```

# Components

Here's a summary of each component. Click through to view detailed documentation and code examples!

## Button

This is a component that renders a [`Pressable `](https://reactnative.dev/docs/pressable) with given text or children.

```tsx
<Button style={$fullWidth} preset="primary" size="small" text="Primary Button" icon="Plus" />
```

```tsx
<Button preset="secondary" icon="Plus" disabled />
<Button preset="tertiary" icon="Plus" />
```

### Props

#### `text`

The `text` prop is required if `tx` or `children` are not provided. This is the text to be rendered in the button.

```tsx
<Button text="Click me" />
```

#### `tx`

The `tx` prop is required if `text` or `children` are not provided. This is the translation key to be used to translate the text.

```tsx
<Button tx="button.clickMe" />
```

#### `children`

The `children` prop is required if no `tx` or `text` prop is passed. This is the content to be rendered in the button in the place of the default `Text` component.

```tsx
<Button>
  <Text>Click me</Text>
</Button>
```

#### `preset`

The `preset` prop is optional. This is the preset style of the button. It can be one of the following built in options: `primary`, `secondary`, `tertiary`

```tsx
<Button preset="default" tx="button.clickMe" />
```

To make a custom preset, add a key to the `$viewPresets`, `$textPresets`, `$pressedViewPresets` and `$pressedTextPresets` objects in `app/components/Button.tsx` and then pass the name of the preset to the `preset` prop.

```tsx
const $viewPresets = {
  primary: {
    medium: [
      $baseViewStyle,
      { backgroundColor: colors.components.button.primary },
    ] as StyleProp<ViewStyle>,
    small: [
      $baseViewStyle,
      {
        backgroundColor: colors.components.button.primary,
        paddingVertical: spacing.size08,
        paddingHorizontal: spacing.size16,
      },
    ] as StyleProp<ViewStyle>,
  },
  secondary: {
    medium: [
      $baseViewStyle,
      {
        backgroundColor: colors.components.button.secondary,
        borderWidth: 1,
        borderColor: colors.systems.borderDefault,
      },
    ] as StyleProp<ViewStyle>,
    small: [
      $baseViewStyle,
      {
        backgroundColor: colors.components.button.secondary,
        borderWidth: 1,
        borderColor: colors.systems.borderDefault,
        paddingVertical: spacing.size08,
        paddingHorizontal: spacing.size12,
      },
    ] as StyleProp<ViewStyle>,
  },
  tertiary: {
    medium: [$baseViewStyle, { backgroundColor: colors.ref.transparent }] as StyleProp<ViewStyle>,
    small: [
      $baseViewStyle,
      {
        backgroundColor: colors.ref.transparent,
        paddingVertical: spacing.size08,
        paddingHorizontal: spacing.size12,
      },
    ] as StyleProp<ViewStyle>,
  },
}

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  primary: [$baseTextStyle, typography.label01, { color: colors.systems.characterWhite }],
  secondary: [$baseTextStyle, typography.label01, { color: colors.systems.characterBlueDefault }],
  tertiary: [$baseTextStyle, typography.label01, { color: colors.systems.characterBlueDefault }],
}

const $pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  primary: { backgroundColor: colors.components.button.primaryPress },
  secondary: {
    backgroundColor: colors.components.button.secondary,
    borderColor: colors.systems.borderPress,
  },
  tertiary: { backgroundColor: colors.ref.transparent },
}

const $pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  primary: { opacity: 1 },
  secondary: { color: colors.systems.characterBluePress },
  tertiary: { color: colors.systems.characterBluePress },
}
```

```tsx
<Button preset="tertiary" text="Delete" />
```

#### `textStyle`

The `textStyle` prop is optional. This can be used to style text in the button. Values passed here will override anything set in the preset.

```tsx
<Button textStyle={{ fontSize: 20, color: "#a511dc" }} />
```

#### `pressedTextStyle`

The `pressedTextStyle` prop is optional. This can be used to style text in the button when it is pressed. Values passed here will override anything set in the preset.

```tsx
<Button pressedTextStyle={{ fontSize: 20, color: "#a51111" }} />
```

#### `style`

The `style` prop is optional. This can be used to style the `Pressable` component of the `Button`. Values passed here will override anything set in the preset.

```tsx
<Button style={{ paddingVertical: 20, borderRadius: 10 }}>
```

#### `pressedStyle`

The `pressedStyle` prop is optional. This can be used to style the `Pressable` component of the `Button` when it is pressed. Values passed here will override anything set in the preset.

```tsx
<Button pressedStyle={{ backgroundColor: "red" }} />
```

#### `RightAccessory`

The `RightAccessory` props are optional. They can be used to render an accessory on the left or right side of the button. It can be a React component or a function that returns a React component. The accessory component will receive the pressed state of the `Pressable` via the the `pressableState` prop, so you can make a custom accessory component render differently when pressed. Additionally, you can utilize the default accessory styles via the `style` prop.

```tsx
<Button
  RightAccessory={(props) => (
    <Icon containerStyle={props.style} size={props.pressableState.pressed ? 50 : 40} icon="check" />
  )}
/>
```

If the accessories flicker when some prop or state changes, you can memoize the accessory with `useMemo`.

```tsx
<Button
  RightAccessory={useMemo(
    () =>
      function LeftIcon(props: ButtonAccessoryProps) {
        return <Icon icon={props.pressableState.pressed ? "view" : "hidden"} />
      },
    [],
  )}
/>
```

## Icon

This is a component that renders an icon.

```tsx
<Icon
  icon={isAuthPasswordHidden ? "view" : "hidden"}
  color={colors.systems.characterBlueDefault}
  containerStyle={props.style}
  size={iconSizes.small}
  onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
/>
```

Or you can use the icon from Phosphor Icon like this:

```tsx
<PhosphorIcon name={name} size={24} weight={weight} mirrored={mirrorActive} />
```

## Text

This is an enhanced version of the built-in React Native Text component. It adds internationalization and property presets.

```tsx
<Text preset="body02" text="body02 - Cillum eu laboris in labore" />

<Text preset="body03" text="body03 - Cillum eu laboris in labore" />

<Text preset="body04" text="body04 - Cillum eu laboris in labore" />

 <Text preset="headline01" text="headline01 - Cillum eu laboris in labore" />

 <Text preset="headline02" text="headline02 - Cillum eu laboris in labore" />

 <Text preset="label01" text="label01 - Cillum eu laboris in labore" />

 <Text preset="label02" text="label02 - Cillum eu laboris in labore" />

 <Text preset="label03" text="label03 - Cillum eu laboris in labore" />

 <Text preset="link01" text="link01 - Cillum eu laboris in labore" />

 <Text preset="link02" text="link02 - Cillum eu laboris in labore" />

 <Text preset="support01" text="support01 - Cillum eu laboris in labore" />

 <Text preset="support02" text="support02 - Cillum eu laboris in labore" />

 <Text preset="title01" text="title01 - Cillum eu laboris in labore" />

 <Text preset="title02" text="title02 - Cillum eu laboris in labore" />
```

### Props

The `TextField` component accepts all the props of the built-in React Native [`TextInput`](https://reactnative.dev/docs/textinput) component which will be forwarded to the `TextInput` component, as well as the following props:

#### `status`

The `status` prop is used to set an `'error'` or `'disabled'` state on the component. The default value is `null`. You can use it to show an error style for validations or to disable the component. By default the `'error'` status will set the `borderColor` on the input wrapper to whatever `colors.error` is set to. Setting the status to `'disabled'` will disable editing on the `TextInput` component.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} status="error" />
```

#### `label`

The `label` optional prop is a string that is used to set the label. If this is not set, the `labelTx` prop must be present to set the label. If both are set, the `label` value will be used.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} label="Name" />
```

#### `labelTx`

The `labelTx` optional prop is the string key used to look up the translated text for the user's locale. Ignite uses [`i18n-js`](http://i18njs.com/) for internationalization. If this is not set, the `label` prop must be present to set the label. If both are set, the `label` value will be used.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} labelTx="signup.name" />
```

#### `labelTxOptions`

The `labelTxOptions` is an optional prop that is used to pass props to the translation lookup for the header title. This is useful if you need to pass in dynamic values to the translation.

```tsx
<TextField
  value={input}
  labelTx="signup.name"
  labelTxOptions={{ name: "John" }}
  onChangeText={(value) => setInput(value)}
/>
```

#### `LabelTextProps`

The `LabelTextProps` is an optional prop that is used to pass props to the [`Text`](./Components-Text.md) component that renders the label.

```tsx
<TextField
  value={input}
  labelTx="signup.name"
  onChangeText={(value) => setInput(value)}
  LabelTextProps={{ style: { color: "red" } }}
/>
```

#### `helper`

The `helper` optional prop is a string that is used to set the helper text. If this is not set, the `helperTx` prop must be present to set the helper text. If both are set, the `helper` value will be used. The helper text is rendered with a [`Text`](./Components-Text.md) component.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} helper="This is a helper text" />
```

#### `helperTx`

The `helperTx` optional prop is the string key used to look up the translated text for the user's locale. Ignite uses [`i18n-js`](http://i18njs.com/) for internationalization. If this is not set, the `helper` prop must be present to set the helper text. If both are set, the `helper` value will be used.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} helperTx="signup.name" />
```

#### `helperTxOptions`

The `helperTxOptions` is an optional prop that is used to pass props to the translation lookup for the helper text. This is useful if you need to pass in dynamic values to the translation.

```tsx
<TextField
  value={input}
  helperTx="login.name"
  helperTxOptions={{ name: "John" }}
  onChangeText={(value) => setInput(value)}
/>
```

#### `HelperTextProps`

The `HelperTextProps` is an optional prop that is used to pass props to the [`Text`](./Components-Text.md) component that renders the helper text.

```tsx
<TextField
  value={input}
  helper="Name"
  onChangeText={(value) => setInput(value)}
  HelperTextProps={{ style: { color: "red" } }}
/>
```

#### `placeholder`

The `placeholder` optional prop is a string that is used to set the placeholder. If this is not set, the `placeholderTx` prop must be present to set the placeholder. If both are set, the `placeholder` value will be used.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} placeholder="Name" />
```

#### `placeholderTx`

The `placeholderTx` optional prop is the string key used to look up the translated text for the user's locale. Ignite uses [`i18n-js`](http://i18njs.com/) for internationalization. If this is not set, the `placeholder` prop must be present to set the placeholder. If both are set, the `placeholder` value will be used.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} placeholderTx="signup.name" />
```

#### `placeholderTxOptions`

The `placeholderTxOptions` is an optional prop that is used to pass props to the translation lookup for the placeholder text. This is useful if you need to pass in dynamic values to the translation.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} />
```

#### `style`

The `style` optional prop is an object used to override the input style.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  style={{ backgroundColor: "red" }}
/>
```

#### `containerStyle`

The `containerStyle` optional prop is an object used to override the container style.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  containerStyle={{ backgroundColor: "red" }}
/>
```

#### `inputWrapperStyle`

The `inputWrapperStyle` optional prop is an object used to override the input wrapper style.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  inputWrapperStyle={{ backgroundColor: "red" }}
/>
```

#### `RightAccessory` and `LeftAccessory`

The `RightAccessory` and `LeftAccessory` optional props are components that are rendered on the right and left sides of the input, respectively. This is useful for rendering icons or buttons. The [`status`](#status), `multiline` from the `TextInputProps`, `editable` (negation of `disabled` status), and a default `style` attribute are passed into it via props for custom usage.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  RightAccessory={(props) => (
    // props has `multiline`, `status`, `disabled`, and `style` attributes
    {disabled, status} = props

    if (!!disabled) return <Icon icon="lock" color="gray" />
    if (status === 'error') return <Icon icon="x" color="red" />

    return <Icon icon="check" color="green" />
  )}
/>
```

It's also recommended to use `useMemo` on accessories to prevent flickering, as without `useMemo` they will rerender whenever the input value changes.

```tsx
const PasswordRightAccessory = useMemo(
  () =>
    function PasswordRightAccessory(props: TextFieldAccessoryProps) {
      return (
        <Icon
          icon={isAuthPasswordHidden ? "view" : "hidden"}
          color={colors.palette.neutral800}
          containerStyle={props.style}
          onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
        />
      )
    },
  [isAuthPasswordHidden],
)
```

This could then be passed to the `TextField` component directly.

```tsx
<TextField
  value={password}
  onChangeText={(value) => setPassword(password)}
  RightAccessory={PasswordRightAccessory}
/>
```

```tsx
import { Icon, TextField, TextFieldProps } from "app/components"
```

```tsx
<TextField
  value={authEmail}
  onChangeText={setAuthEmail}
  containerStyle={$textField}
  autoCapitalize="none"
  autoComplete="email"
  autoCorrect={false}
  keyboardType="email-address"
  labelTx="loginScreen.emailFieldLabel"
  placeholderTx="loginScreen.emailFieldPlaceholder"
  helper={errors?.authEmail}
  status={errors?.authEmail ? "error" : undefined}
  onSubmitEditing={() => authPasswordInput.current?.focus()}
/>
```

```tsx
function ControlledTextField(props: TextFieldProps) {
  const [value, setValue] = React.useState(props.value || "")
  const onClear = () => setValue("")
  return (
    <TextField {...props} value={value} onChangeText={(text) => setValue(text)} onClear={onClear} />
  )
}

;<ControlledTextField
  label="ControlledTextField"
  value="Placeholder"
  helper="Support text"
  placeholder="Placeholder"
/>
```

### Props

#### `cellCount?: number`

Number of characters in input (optional, default: 6)

#### `size?: number`

Size to display width/height for the `OTPField` (optional, default: 44)

## SearchField

```tsx
import SearchField from "app/components/SearchField"
```

```tsx
<SearchField preset="outline" label="Search Controlled TextField" placeholder="Search" />
```

### Props

Similar to props of the `TextField` component and:

#### `preset`

The `preset` prop is one of the different types of search field presets.

### Props

Similar to props of the `TextField` component and:

#### `activeBorderColor`

The `activeBorderColor` prop is used to style an object that is applied to the border container of the `NumberField`.

#### `maxValue`

The `maxValue` prop is used to provides an initial value that will change when the user starts typing.

#### `minValue`

The `minValue` prop is used to provides an initial value that will change when the user starts typing.

#### `onClear`

The `onClear` prop is used to callback that is called when the text input is clear.

## PasswordField

```tsx
import PasswordField from "app/components/PasswordField"
```

```tsx
<PasswordField placeholder="Placeholder" label="Password Field" helper="Support text" />
```

### Props

Similar to props of the `TextField` component.

## DatePickerField

```tsx
<DatePickerField helper="Support text" label="Label" multiple />
```

### Props

#### `status`

The `status` prop is used to set an `'error'` or `'disabled'` state on the component. The default value is `null`. You can use it to show an error style for validations or to disable the component. By default the `'error'` status will set the `borderColor` on the input wrapper to whatever `colors.error` is set to. Setting the status to `'disabled'` will disable editing on the `DatePickerField` component.

#### `label`

The `label` optional prop is a string that is used to set the label. If this is not set, the `labelTx` prop must be present to set the label. If both are set, the `label` value will be used.

#### `labelTx`

The `labelTx` optional prop is the string key used to look up the translated text for the user's locale. Ignite uses [`i18n-js`](http://i18njs.com/) for internationalization. If this is not set, the `label` prop must be present to set the label. If both are set, the `label` value will be used.

#### `labelTxOptions`

The `labelTxOptions` is an optional prop that is used to pass props to the translation lookup for the header title. This is useful if you need to pass in dynamic values to the translation.

#### `LabelTextProps`

The `LabelTextProps` is an optional prop that is used to pass props to the `Text` component that renders the label.

#### `helper`

The `helper` optional prop is a string that is used to set the helper text. If this is not set, the `helperTx` prop must be present to set the helper text. If both are set, the `helper` value will be used. The helper text is rendered with a `Text` component.

#### `helperTx`

The `helperTx` optional prop is the string key used to look up the translated text for the user's locale. Ignite uses [`i18n-js`](http://i18njs.com/) for internationalization. If this is not set, the `helper` prop must be present to set the helper text. If both are set, the `helper` value will be used.

#### `helperTxOptions`

The `helperTxOptions` is an optional prop that is used to pass props to the translation lookup for the helper text. This is useful if you need to pass in dynamic values to the translation.

#### `HelperTextProps`

The `HelperTextProps` is an optional prop that is used to pass props to the `Text` component that renders the helper text.

#### `multiple`

The `multiple` is an optional prop that is used for multiple date picker selections.

## Toggle

This component is a flexible component that can be used to toggle a boolean value. It can be used to render a switch, checkbox, or radio button.

```tsx
import { Toggle } from "app/components"
```

```tsx
function ControlledToggle(props: ToggleProps) {
  const [value, setValue] = React.useState(props.value || false)
  return <Toggle {...props} value={value} onPress={() => setValue(!value)} />
}
```

```tsx
<ControlledToggle
 checkboxIcon="Minus"
 variant="checkbox"
 label="checkbox` variant"
 helper="This can be used for a single on/off input."
/>

<ControlledToggle
  variant="radio"
  label="`radio` variant"
  helper="Use this when you have multiple options."
/>

<ControlledToggle
  variant="switch"
  label="`switch` variant"
  helper="A more prominent on/off input. Has better accessibility support."
/>

<ControlledToggle variant="checkbox" containerStyle={$centeredOneThirdCol} />
<ControlledToggle variant="radio" containerStyle={$centeredOneThirdCol} />
<ControlledToggle variant="switch" containerStyle={$centeredOneThirdCol} />

<Toggle  variant="checkbox" value={value} onPress={() => setValue(!value)} />
<Toggle  variant="radio" value={value} onPress={() => setValue(!value)} />
<Toggle  variant="switch" value={value} onPress={() => setValue(!value)} />
```

### Props

#### `variant`

The `variant` prop determines the type of toggle to render. It can be one of the following: `switch`, `checkbox`, or `radio`.

```tsx
<Toggle value={value} onValueChange={setValue} variant="checkbox" />
```

#### `status`

The `status` prop is used to determine the interactability or style of the toggle. It can be set to `disabled` or `error`. It is `null` by default.

When set to `error`, elements of the toggle will have their colors set to `colors.errorBackground` or `colors.error`.

```tsx
<Toggle value={value} onValueChange={setValue} status="disabled" />
```

#### `editable`

The `editable` prop determines whether the toggle is interactable. It is `true` by default. Setting the `status` prop to `disabled` also will set `editable` to `false`.

```tsx
<Toggle value={value} onValueChange={setValue} editable={false} />
```

#### `value`

The `value` prop determines whether the toggle is on or off. It is `false` by default.

```tsx
<Toggle value={value} onValueChange={setValue} value={true} />
```

#### `onValueChange`

The `onValueChange` prop is a callback that is called when the toggle is toggled. It is `undefined` by default. Since the toggle is controlled, you must set the `value` prop in this callback to update the toggle.

```tsx
<Toggle value={value} onValueChange={setValue} onValueChange={setValue} />
```

#### `containerStyle`

The `containerStyle` prop is a style object that is applied to the container of the toggle.

```tsx
<Toggle value={value} onValueChange={setValue} containerStyle={{ backgroundColor: "#fff" }} />
```

#### `inputOuterStyle`

The `inputOuterStyle` prop is a style object that is applied to the outer container of the toggle input. This gives the inputs their size, shape, "off" background-color, and outer border.

```tsx
<Toggle value={value} onValueChange={setValue} inputOuterStyle={{ backgroundColor: "#fff" }} />
```

#### `inputInnerStyle`

The `inputInnerStyle` prop is a style object that is applied to the inner container of the toggle input. This gives the inputs their "on" background-color and inner border.

```tsx
<Toggle value={value} onValueChange={setValue} inputInnerStyle={{ backgroundColor: "#000" }} />
```

#### `inputDetailStyle`

The `inputDetailStyle` prop is a style object that is applied to the detail container of the toggle input. For checkbox, this affects the Image component. For radio, this affects the dot View. For switch, this affects the knob View.

```tsx
<Toggle value={value} onValueChange={setValue} inputDetailStyle={{ backgroundColor: "#000" }} />
```

#### `labelPosition`

The `labelPosition` prop determines the position of the label relative to the action component. It can be `left` or `right`. It is `right` by default.

```tsx
<Toggle value={value} onValueChange={setValue} labelPosition="left" />
```

#### `label`

The `label` prop is a string that is used as the label for the toggle.

```tsx
<Toggle value={value} onValueChange={setValue} label="Remember Me" />
```

#### `labelTx`

The `labelTx` prop is a key to a string in the `i18n` translation file. It is used as the label for the toggle.

```tsx
<Toggle value={value} onValueChange={setValue} labelTx="login.rememberUsername" />
```

#### `labelTxOptions`

The `labelTxOptions` prop is an object that is passed to the `i18n` translation function. It is used to pass in values to the translation string.

```tsx
<Toggle
  value={value}
  onValueChange={setValue}
  labelTx="login.rememberUsername"
  labelTxOptions={{ username: "john" }}
/>
```

#### `labelStyle`

The `labelStyle` prop is a `StyleProp<TextStyle>` object that is applied to the label.

```tsx
<Toggle value={value} onValueChange={setValue} labelStyle={{ color: "#000" }} />
```

#### `LabelTextProps`

The `LabelTextProps` prop is a `TextProps` object (from the [`Text`](./Components-Text.md)) component that is applied to the label.

```tsx
<Toggle value={value} onValueChange={setValue} LabelTextProps={{ size: "lg" }} />
```

#### `helper`

The `helper` prop is a string that is used as the helper for the toggle.

```tsx
<Toggle value={value} onValueChange={setValue} helper="Remember Me" />
```

#### `helperTx`

The `helperTx` prop is a key to a string in the `i18n` translation file. It is used as the helper for the toggle.

```tsx
<Toggle value={value} onValueChange={setValue} helperTx="login.rememberUsername" />
```

#### `helperTxOptions`

The `helperTxOptions` prop is an object that is passed to the `i18n` translation function. It is used to pass in values to the translation string.

```tsx
<Toggle
  value={value}
  onValueChange={setValue}
  helperTx="login.rememberUsername"
  helperTxOptions={{ username: "john" }}
/>
```

#### `HelperTextProps`

The `HelperTextProps` prop is a `TextProps` object (from the [`Text`](./Components-Text.md)) component that is applied to the helper.

```tsx
<Toggle value={value} onValueChange={setValue} HelperTextProps={{ size: "lg" }} />
```

#### `switchAccessibilityMode`

The `switchAccessibilityMode` is a special prop for the switch variant that adds a text/icon label for on/off states. Options are `text` and `icon`

```tsx
<Toggle value={value} onValueChange={setValue} variant="switch" switchAccessibilityMode="icon" />
```

#### `checkboxIcon`

The `checkboxIcon` is a prop for the checkbox variant that allows you to customize the icon used for the "on" state.

```tsx
<Toggle variant="checkbox" checkboxIcon="ladybug" />
```

## Tag

```tsx
import Tag from "app/components/Tag"
```

```tsx
 <Tag
  backgroundColor={colors.components.tag.containerGrey}
  color={colors.systems.characterPrimary}
/>

<Tag
  backgroundColor={colors.components.tag.containerBlue}
  color={colors.systems.characterBlueDefault}
/>

<Tag
  backgroundColor={colors.components.tag.containerGreen}
  color={colors.systems.successDefault}
/>

<Tag
  backgroundColor={colors.components.tag.containerOrange}
  color={colors.systems.warningDefault}
/>

<Tag
  backgroundColor={colors.components.tag.containerRed}
  color={colors.systems.errorDefault}
/>
```

### Props

#### `backgroundColor`

The `backgroundColor` requried prop is color of background of the component.

```tsx
<Tag backgroundColor={colors.components.tag.containerGrey} />
```

#### `color`

The `color` requried prop is the color to use for the label and icon. It utilizes the fonts defined in the `app/theme/colors.tsx` file.

```tsx
<Tag color={colors.systems.errorDefault} />
```

#### `icon`

The `icon` prop is optional. This is the string name of the icon to be rendered. It utilizes the type defined of the PhosphorIcon.

```tsx
<Tag icon={"Smiley"} />
```

#### `iconSize`

The `iconSize` optional prop is the icon size to use for the icon.

```tsx
<Tag iconSize={20} />
```
