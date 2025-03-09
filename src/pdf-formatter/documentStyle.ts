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
import { HEX_COLORS } from "../constants";

const documentStyle = StyleSheet.create({
  coverPage: {
    backgroundColor: "#512DA8",
    color: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  coverLogo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  coverSubtitle: {
    fontSize: 18,
    marginTop: 10,
  },
  page: {
    paddingHorizontal: 0,
  },
  header: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    right: 20,
    fontSize: 16,
    color: "#08035D",
    fontWeight: "bold",
  },
  invisiblePadding: {
    height: 10,
    width: "100%",
    paddingVertical: 20,
  },
  image_logo: {
    width: 60,
    height: 60,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 50,
    paddingLeft: 60,
    paddingRight: 60,
  },
  backgroundYellow: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "5%",
    height: "35%",
    backgroundColor: HEX_COLORS.PRIMARY_YELLOW,
    borderTopRightRadius: 100,
  },
  backgroundBlue: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "5%",
    height: "35%",
    borderBottomLeftRadius: 100,
    backgroundColor: HEX_COLORS.PRIMARY_BLUE,
  },
});

export default documentStyle;
