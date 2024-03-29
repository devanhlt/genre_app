const vi = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
    save: "Save",
    edit: "Edit",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
    letsGo: "Let's go!",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    signIn: "Sign In",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    emailFieldLabel: "Email",
    usernameFieldLabel: "Username",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    usernameFieldPlaceholder: "Enter your username",
    passwordFieldPlaceholder: "Super secret password here",
    tapToSignIn: "Tap to sign in!",
    hint: "Hint: you can use any email address and your favorite password :)",
  },
  configScreen: {
    systemDetailForm: {
      systemName: "System name",
      baseURL: "Base URL",
      adminEmail: "Admin email",
      adminPhone: "Admin phone",
    },
    loggingDetailForm: {
      logLevel: "Log Level",
      color: "Color",
      description: "Description",
    },
  },
  mainNavigator: {
    dashboardTab: "Dashboard",
    loggingTab: "Logs",
    configurationTab: "Configuration",
    accountsTab: "Accounts",
  },
  screenTitle: {
    dashboardTab: "Dashboard",
    loggingTab: "Logging",
    configurationTab: "Configuration",
    accountsTab: "Accounts",
  },
}

export default vi

export type Translations = typeof vi
