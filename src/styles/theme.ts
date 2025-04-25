import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: {
        main: string;
        light: string;
        dark: string;
        text: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
        text: string;
      };
      danger: {
        main: string;
        light: string;
        dark: string;
        text: string;
      };
      grey: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
      };
      border: {
        main: string;
        light: string;
        dark: string;
      };
      background: {
        default: string;
        paper: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      round: string;
      pill: string;
    };
    typography: {
      fontSizes: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
      fontWeights: {
        light: number;
        regular: number;
        medium: number;
        bold: number;
      };
      lineHeights: {
        tight: number;
        normal: number;
        loose: number;
      };
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    transitions: {
      duration: {
        fast: string;
        normal: string;
        slow: string;
      };
      easing: {
        easeInOut: string;
        easeOut: string;
        easeIn: string;
      };
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    zIndex: {
      modal: number;
      overlay: number;
      drawer: number;
      dropdown: number;
      header: number;
      toast: number;
    };
  }
}

const BASE_COLORS = {
  white: "#ffffff",
  black: "#333333",
  blue: {
    main: "#4a90e2",
    light: "#6aa9e9",
    dark: "#357abd",
  },
  red: {
    main: "#ff4444",
    light: "#ff6b6b",
    dark: "#cc0000",
  },
  grey: {
    light: "#f5f5f5",
    main: "#e0e0e0",
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
};

const lightTheme = {
  colors: {
    primary: {
      main: BASE_COLORS.blue.main,
      light: BASE_COLORS.blue.light,
      dark: BASE_COLORS.blue.dark,
      text: BASE_COLORS.white,
    },
    secondary: {
      main: BASE_COLORS.grey.light,
      light: BASE_COLORS.white,
      dark: BASE_COLORS.grey.main,
      text: BASE_COLORS.black,
    },
    danger: {
      main: BASE_COLORS.red.main,
      light: BASE_COLORS.red.light,
      dark: BASE_COLORS.red.dark,
      text: BASE_COLORS.white,
    },
    grey: {
      50: BASE_COLORS.grey[50],
      100: BASE_COLORS.grey[100],
      200: BASE_COLORS.grey[200],
      300: BASE_COLORS.grey[300],
      400: BASE_COLORS.grey[400],
      500: BASE_COLORS.grey[500],
      600: BASE_COLORS.grey[600],
      700: BASE_COLORS.grey[700],
      800: BASE_COLORS.grey[800],
      900: BASE_COLORS.grey[900],
    },
    text: {
      primary: BASE_COLORS.black,
      secondary: BASE_COLORS.grey.main,
      disabled: BASE_COLORS.grey[500],
    },
    border: {
      main: BASE_COLORS.grey.main,
      light: BASE_COLORS.grey.light,
      dark: BASE_COLORS.grey[700],
    },
    background: {
      default: BASE_COLORS.white,
      paper: BASE_COLORS.grey.light,
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    xxl: "32px",
  },
  borderRadius: {
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    round: "50%",
    pill: "9999px",
  },
  typography: {
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xxl: "1.5rem",
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      loose: 1.8,
    },
  },
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    md: "0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)",
    lg: "0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)",
    xl: "0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)",
  },
  transitions: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "450ms",
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    },
  },
  breakpoints: {
    xs: "320px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
  zIndex: {
    modal: 1000,
    overlay: 900,
    drawer: 800,
    dropdown: 700,
    header: 600,
    toast: 500,
  },
} as const;

export const theme = lightTheme;

// Theme 타입 추출
export type Theme = typeof theme;
