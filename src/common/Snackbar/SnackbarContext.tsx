import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { AlertColor } from "@mui/material";

interface ISnackbarConfig {
  open: boolean;
  type?: AlertColor;
  message?: string;
}

interface ISnackbarContextValues {
  snackbar: ISnackbarConfig;
  handleOpenSnackbar: (type: AlertColor, message: string) => void;
  handleCloseSnackbar: () => void;
}

export const SnackbarContext = createContext<ISnackbarContextValues>(
  {} as ISnackbarContextValues
);

export const SnackbarContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<ISnackbarConfig>({ open: false });

  const handleOpenSnackbar = (type: AlertColor, message: string) => {
    setSnackbar({ open: true, type, message });
  };

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar({ ...snackbar, open: false });
  }, [snackbar]);

  const value = useMemo(
    () => ({
      snackbar,
      handleOpenSnackbar,
      handleCloseSnackbar,
    }),
    [snackbar, handleCloseSnackbar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};
