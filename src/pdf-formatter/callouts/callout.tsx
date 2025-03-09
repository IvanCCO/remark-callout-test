import React from "react";
import { Page, Document, PDFDownloadLink, Text, View, StyleSheet, Image, PDFViewer, Font } from '@react-pdf/renderer';
import { INFO_ICON, LIST_ICON, PENCIL_ICON, QUESTION_ICON } from "../../icons";
import calloutStyles from "./style";


export const CALLOUTS = ["note", "warning", "example"] as const;
export type CalloutType = typeof CALLOUTS[number] | "fallback";

interface CalloutProps {
    type: CalloutType,
    title?: string;
    children: React.ReactNode;
}

const Callout: React.FC<CalloutProps> = ({ type, title, children }) => {

    const calloutConfig = {
        note: { style: calloutStyles.note, icon: PENCIL_ICON },
        warning: { style: calloutStyles.warning, icon: QUESTION_ICON },
        example: { style: calloutStyles.example, icon: LIST_ICON },
        fallback: { style: calloutStyles.fallback, icon: INFO_ICON },
    }[type] || { style: calloutStyles.fallback, icon: INFO_ICON };

    return (
        <View style={[calloutStyles.base.block, calloutConfig.style.block]} wrap>
            {title && (
                <View style={calloutStyles.base.titleBlock} wrap>
                    <Image style={[calloutStyles.base.icon, calloutConfig.style.icon]} source={calloutConfig.icon} />
                    <Text style={[calloutStyles.base.title, calloutConfig.style.title]}>{title}</Text>
                </View>
            )}
            <View style={calloutStyles.base.content} wrap>{children}</View>
        </View>
    );
};

export default Callout;
