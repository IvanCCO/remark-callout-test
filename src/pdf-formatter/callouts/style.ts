import {
  Page,
  Document,
  PDFDownloadLink,
  Text,
  View,
  StyleSheet,
  Image,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

const base = StyleSheet.create({
  block: {
    padding: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 16,
    borderWidth: 2,
  },
  content: {
    paddingRight: 4,
  },
  titleBlock: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    marginBottom: 5
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 3,
  },
  icon: {
    height: 20,
    width: 20,
  },
});

const note = StyleSheet.create({
  block: {
    backgroundColor: "#DFEDFE",
    borderColor: "#5CA6FF",
  },
  title: {
    color: "#498CF6",
  },
  icon: {
    transform: "scaleX(-1)",
  },
});

const warning = StyleSheet.create({
  block: {
    backgroundColor: "#fae5d4",
    borderColor: "#f97316",
  },
  title: {
    color: "#f97316",
  },
  icon: {},
});

const fallback = StyleSheet.create({
  block: {
    backgroundColor: "#e8e8ea",
    borderColor: "#71717A",
  },
  title: {
    color: "#71717A",
  },
  icon: {},
});

const example = StyleSheet.create({
  block: {
    backgroundColor: "#efe2fb",
    borderColor: "#a855f7",
  },
  title: {
    color: "#a855f7",
  },
  icon: {},
});

const calloutStyles = { base, note, warning, example, fallback };

export default calloutStyles;
