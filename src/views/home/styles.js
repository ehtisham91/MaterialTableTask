import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableCell-sizeSmall": {
      padding: "0px 16px !important",
    },
  },
  header: {
    background: "#f9fafa",
  },
  headerTitle: {
    fontWeight: "600",
    color: "rgba(0, 0, 0, 0.5)",
    lineHeight: "1rem",
  },
  disabled: {
    pointerEvents: "none",
    opacity: "0.6",
  },
  title: {
    fontWeight: "600",
  },
});
