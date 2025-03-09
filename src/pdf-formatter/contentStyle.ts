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

const contentStyle = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 2,
    marginVertical: 12,
    borderBottom: "2px solid " + HEX_COLORS.PRIMARY_BLUE,
  },
  h3: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 8,
  },
  h4: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 4,
  },
  p: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: "justify",
    lineHeight: 1.6,
  },
  ul: {
    paddingLeft: 4,
    marginVertical: 8,
  },
  liBullet: {
    marginHorizontal: 2,
    textAlign: "center",
    height: 20, // Defina a altura da bolinha
    width: 20, // Defina a largura da bolinha
    display: "flex",
    justifyContent: "flex-start", // A bolinha vai se alinhar ao topo
    alignItems: "center", // Alinha a bolinha horizontalmente no centro
  },
  olNumber: {
    fontSize: 10,
    fontWeight: "bold",
    marginHorizontal: 2,
    paddingTop: 4,
    textAlign: "center",
    height: 20, // Defina a altura da bolinha
    width: 20, // Defina a largura da bolinha
    display: "flex",
    justifyContent: "flex-start", // A bolinha vai se alinhar ao topo
    alignItems: "center", // Alinha a bolinha horizontalmente no centro
  },
  li: {
    paddingTop: 3,
    fontSize: 12,
    display: "flex",
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
    flexWrap: "wrap",
    maxWidth: "100%",
    flex: 1,
  },
  divider: {
    width: 40,
    height: 40,
    alignSelf: "center",
    marginVertical: 30,
  },
  div: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
});

export default contentStyle;
