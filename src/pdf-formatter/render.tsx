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
import parse from "html-react-parser";
import { IMAGE_BASE_64 } from "../icons";
import Callout, { CALLOUTS, CalloutType } from "./callouts/callout";
import contentStyle from "./contentStyle";

const render = (node: any) => {
  if (node.type === "text") {
    if (node.data === ":\n" || node.data === "\n") {
      return null;
    }
    return node.data;
  }

  if (node.type === "tag") {
    console.log(node);
    switch (node.name) {
      case "h1":
        return (
          <Text style={contentStyle.h1}>
            {node.children.map((child: any, index: number) =>
              render(child)
            )}
          </Text>
        );
      case "h2":
        return (
          <Text style={contentStyle.h2}>
            {node.children.map((child: any, index: number) =>
              render(child)
            )}
          </Text>
        );
      case "h3":
        return (
          <Text style={contentStyle.h3}>
            {node.children.map((child: any, index: number) =>
              render(child)
            )}
          </Text>
        );
      case "p":
        return (
          <Text style={contentStyle.p}>
            {node.children.map((child: any, index: number) =>
              render(child)
            )}
          </Text>
        );
      case "strong":
        return (
          <Text style={{ fontWeight: "bold" }}>
            {node.children.map((child: any, index: number) =>
              render(child)
            )}
          </Text>
        );
      case "em":
        return (
          <Text style={{ fontStyle: "italic" }}>
            {node.children.map((child: any, index: number) =>
              render(child)
            )}
          </Text>
        );
      case "ul":
        return (
          <View style={contentStyle.ul}>
            {node.children
              .filter(
                (child: any) =>
                  !(
                    child.type === "text" &&
                    (child.data === ":\\n" || child.data === "\n")
                  )
              )
              .map((child: any, index: number) => (
                <View
                  style={{ flexDirection: "row", marginBottom: 4 }}
                  key={index}
                >
                  <Text style={contentStyle.liBullet}>•</Text>
                  <Text style={contentStyle.li}>{render(child)}</Text>
                </View>
              ))}
          </View>
        );
      case "ol":
        return (
          <View style={contentStyle.ul}>
            {node.children
              .filter(
                (child: any) =>
                  !(
                    child.type === "text" &&
                    (child.data === ":\\n" || child.data === "\n")
                  )
              )
              .map((child: any, index: number) => (
                <View
                  style={{ flexDirection: "row", marginBottom: 4 }}
                  key={index}
                >
                  <Text style={contentStyle.olNumber}>{index + 1}.</Text>
                  <Text style={contentStyle.li}>{render(child)}</Text>
                </View>
              ))}
          </View>
        );
      case "li":
        return (
          <Text style={contentStyle.li}>
            {node.children
              .filter(
                (child: any) =>
                  !(
                    child.type === "text" &&
                    (child.data === ":\\n" || child.data === "\n")
                  )
              )
              .map((child: any, index: number) => render(child))}
          </Text>
        );
      case "div":
        const isCallout = node.attribs["data-callout"] == "";
        if (isCallout) {
          const filteredChildren = node.children.filter(
            (child: any) =>
              !(
                child.type === "text" &&
                (child.data === ":\\n" || child.data === "\n")
              )
          );

          const titleChild = filteredChildren.find(
            (child: any) => child.attribs?.["data-callout-title"] === ""
          );
          const calloutType: CalloutType = CALLOUTS.includes(
            node.attribs["data-callout-type"]
          )
            ? (node.attribs["data-callout-type"] as CalloutType)
            : "fallback";

          return (
            <Callout type={calloutType} title={titleChild?.children[0]?.data}>
              {filteredChildren.map((child: any, index: number) =>
                titleChild === child ? null : render(child)
              )}
            </Callout>
          );
        }

        return (
          <View >
            {node.children.map((child: any, index: number) =>
              render(child)
            )}
          </View>
        );
      case "hr":
        return <Image style={contentStyle.divider} src={IMAGE_BASE_64} />;
      default:
        return (
          <Text>
            {node.children.map((child: any, index: number) =>
              render(child)
            )}
          </Text>
        );
    }
  }

  return null;
};

export default render