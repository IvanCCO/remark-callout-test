import { Page, Document, PDFDownloadLink, Text, View, StyleSheet, Image, PDFViewer, Font } from '@react-pdf/renderer';
import parse from 'html-react-parser';
import { IMAGE_BASE_64, PENCIL_ICON, QUESTION_ICON } from './contants';

const HEX_COLORS = {
    PRIMARY_BLUE: "#08035D",
    PRIMARY_YELLOW: "#F5CD05"
}

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
        position: 'absolute',
        bottom: 10,
        right: 20,
        fontSize: 16,
        color: '#08035D',
        fontWeight: "bold"
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

const contentStyle = StyleSheet.create({
    h1: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 14,
    },
    h2: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 2,
        marginVertical: 12,
        borderBottom: "2px solid " + HEX_COLORS.PRIMARY_BLUE
    },
    h3: {
        fontSize: 14,
        fontWeight: "bold",
        marginVertical: 8
    },
    h4: {
        fontSize: 12,
        fontWeight: "bold",
        marginVertical: 4
    },
    p: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: "justify",
        lineHeight: 1.4
    },
    ul: {
        paddingLeft: 4,
    },
    liBullet: {
        marginHorizontal: 2,
        textAlign: 'center',
        height: 20, // Defina a altura da bolinha
        width: 20, // Defina a largura da bolinha
        display: 'flex',
        justifyContent: 'flex-start', // A bolinha vai se alinhar ao topo
        alignItems: 'center', // Alinha a bolinha horizontalmente no centro
    },
    olNumber: {
        fontSize: 10,
        fontWeight: "bold",
        marginHorizontal: 2,
        paddingTop: 4,
        textAlign: 'center',
        height: 20, // Defina a altura da bolinha
        width: 20, // Defina a largura da bolinha
        display: 'flex',
        justifyContent: 'flex-start', // A bolinha vai se alinhar ao topo
        alignItems: 'center', // Alinha a bolinha horizontalmente no centro
    },
    li: {
        paddingTop: 3,
        fontSize: 12,
        display: 'flex',
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
        flexWrap: 'wrap',
        maxWidth: "100%",
        flex: 1
    },
    divider: {
        width: 40,
        height: 40,
        alignSelf: "center",
        marginVertical: 30
    },
    div: {
        marginBottom: 10,
        padding: 8,
        backgroundColor: "#f5f5f5",
        borderRadius: 5
    },

});

const calloutStyle = StyleSheet.create({
    block: {
        padding: 16,
        paddingVertical: 20,
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
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        paddingTop: 3,
    },
    icon: {
        height: 20,
        width: 20,
    }
})

const calloutNoteStyle = StyleSheet.create({
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

const calloutWarningStyle = StyleSheet.create({
    block: {
        backgroundColor: "#fae5d4",
        borderColor: "#f97316",
    },
    title: {
        color: "#f97316",
    },
    icon: {
    },
});

const calloutDefaultStyle = StyleSheet.create({
    block: {
        backgroundColor: "#E7E7E7",
        borderColor: "#C7C3C3",
    },
    title: {
        color: "#C7C3C3",
    },
    icon: {
    },
});

Font.registerEmojiSource({
    format: 'png',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});

const renderNode = (node: any) => {

    if (node.type === 'text') {
        if (node.data === ":\n" || node.data === "\n") {
            return null
        }
        return node.data
    }

    if (node.type === 'tag') {
        console.log(node)
        switch (node.name) {
            case 'h1':
                return (
                    <Text style={contentStyle.h1}>
                        {node.children.map((child: any, index: number) => renderNode(child))}
                    </Text>
                );
            case 'h2':
                return (
                    <Text style={contentStyle.h2}>
                        {node.children.map((child: any, index: number) => renderNode(child))}
                    </Text>
                );
            case 'h3':
                return (
                    <Text style={contentStyle.h3}>
                        {node.children.map((child: any, index: number) => renderNode(child))}
                    </Text>
                );
            case 'p':
                return (
                    <Text style={contentStyle.p}>
                        {node.children.map((child: any, index: number) => renderNode(child))}
                    </Text>
                );
            case 'strong':
                return (
                    <Text style={{ fontWeight: 'bold' }}>
                        {node.children.map((child: any, index: number) => renderNode(child))}
                    </Text>
                );
            case 'em':
                return (
                    <Text style={{ fontStyle: 'italic' }}>
                        {node.children.map((child: any, index: number) => renderNode(child))}
                    </Text>
                );
            case 'ul':
                return (
                    <View style={contentStyle.ul}>
                        {node.children
                            .filter((child: any) => !(child.type === 'text' && (child.data === ':\\n' || child.data === '\n')))
                            .map((child: any, index: number) => (
                                <View style={{ flexDirection: 'row', marginBottom: 4 }} key={index}>
                                    <Text style={contentStyle.liBullet}>•</Text>
                                    <Text style={contentStyle.li}>{renderNode(child)}</Text>
                                </View>
                            ))}
                    </View>
                );
            case 'ol':
                return (
                    <View style={contentStyle.ul}>
                        {node.children
                            .filter((child: any) => !(child.type === 'text' && (child.data === ':\\n' || child.data === '\n')))
                            .map((child: any, index: number) => (
                                <View style={{ flexDirection: 'row', marginBottom: 4 }} key={index}>
                                    <Text style={contentStyle.olNumber}>{index + 1}.</Text>
                                    <Text style={contentStyle.li}>{renderNode(child)}</Text>
                                </View>
                            ))}
                    </View>
                );
            case 'li':
                return (
                    <Text style={contentStyle.li}>
                        {node.children
                            .filter((child: any) => !(child.type === 'text' && (child.data === ':\\n' || child.data === '\n')))
                            .map((child: any, index: number) => renderNode(child))}
                    </Text>
                );
            case 'div':
                if (["note", "warning"].includes(node.attribs["data-callout-type"])) {
                    console.log("entrou")
                    const filteredChildren = node.children
                        .filter((child: any) => !(child.type === 'text' && (child.data === ':\\n' || child.data === '\n')))

                    const calloutTypeStyle = () => {
                        switch (node.attribs['data-callout-type']) {
                            case "note": return { style: calloutNoteStyle, icon: PENCIL_ICON }
                            case "warning": return { style: calloutWarningStyle, icon: QUESTION_ICON }
                            default: return { style: calloutDefaultStyle, icon: QUESTION_ICON }
                        }
                    }

                    return (
                        <View style={[calloutStyle.block, calloutTypeStyle().style.block]}>
                            {filteredChildren.map((child: any, index: number) => {
                                if (child.attribs["data-callout-title"] == "") {
                                    return (
                                        <View style={[calloutStyle.titleBlock]}>
                                            <Image style={[calloutStyle.icon, calloutTypeStyle().style.icon]} src={calloutTypeStyle().icon}></Image>
                                            <Text style={[calloutStyle.title, calloutTypeStyle().style.title]}>{child.children[0].data}</Text>
                                        </View>
                                    );
                                }
                                return (
                                    <View key={index} style={calloutStyle.content}>
                                        {renderNode(child)}
                                    </View>
                                );
                            })}
                        </View>
                    );
                }

                return (
                    <View>
                        {node.children.map((child: any, index: number) => renderNode(child))}
                    </View>
                );
            case 'hr':
                return (
                    <Image style={contentStyle.divider} src={IMAGE_BASE_64} />
                )
            default:
                return (
                    <Text>
                        {node.children.map((child: any, index: number) => renderNode(child))}
                    </Text>
                );
        }
    }

    return null;
};


interface HtmlToPdfComponentsProps {
    html: string;
}

const HtmlToPdfComponents: React.FC<HtmlToPdfComponentsProps> = ({ html }) => {
    // console.log(html)
    const options = {
        replace: (node: any) => renderNode(node),
    };

    return <View style={documentStyle.content}>{parse(html, options)}</View>;
};
interface MarkdownText {
    text: string;
}

const MyDocument = ({ html }: { html: string }) => (
    <Document
        title='História do Brasil'
        author='Brio Educação'
        language='pt-BR'
    >
        {/* 📌 Capa do documento */}
        <Page size="A4" style={documentStyle.coverPage}>
            <Image style={documentStyle.coverLogo} src={IMAGE_BASE_64} />
            <Text style={documentStyle.coverTitle}>História do Brasil</Text>
            <Text style={documentStyle.coverSubtitle}>Brio Educação</Text>
        </Page>

        <Page size="A4" style={documentStyle.page}>
            <View style={documentStyle.backgroundYellow} fixed />
            <View style={documentStyle.backgroundBlue} fixed />
            <View style={documentStyle.header} fixed>
                <Image style={documentStyle.image_logo} src={IMAGE_BASE_64} />
            </View>

            {/* Conteúdo principal */}
            <HtmlToPdfComponents html={html} />

            {/* Rodapé com número da página */}
            <Text
                style={documentStyle.footer}
                fixed
                render={({ pageNumber }) => `${pageNumber}`}
            />
        </Page>
    </Document>
);


export default function ExportPDF({ text }: MarkdownText) {
    return (
        <PDFViewer
            height={1000}
            width={1000}
        // document={<MyDocument html={text} />}
        // fileName="document.pdf"
        >
            <MyDocument html={text} />
            {/* {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')} */}
        </PDFViewer>
    )
}