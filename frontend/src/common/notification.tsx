import { Alert, AlertColor, Snackbar } from "@mui/material";

interface NotificationProps {
    message: string;
    open: boolean;
    setOpen: Function;
    severity: AlertColor;
}

const Notification: React.FC<NotificationProps> = ({ message, open, setOpen, severity }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000}>
            <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
