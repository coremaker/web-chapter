import { deepOrange, orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
export default createTheme({
    status: {
        danger: orange[500],
    },
    palette: {
        primary: { main: deepOrange[500] },
        danger: { main: "#F06666" },
        ink: { main: "#A4A9AE" },
        surface: { main: "#3B4551" },
        charcoal: { main: "rgba(22, 23, 24, 0.64)" },
        chalk: { main: "rgba(250, 252, 252, 0.64)" },
    },
});
