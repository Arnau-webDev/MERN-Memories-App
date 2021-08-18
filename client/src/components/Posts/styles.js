import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    mainContainer: {
        display: "flex",
        alignItems: "center",
    },
    loadingContainer: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    smMargin: {
        margin: theme.spacing(1),
    },
    actionDiv: {
        textAlign: "center",
    },
}));