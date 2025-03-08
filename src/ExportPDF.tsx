import { Page, Document, PDFDownloadLink, Text, View, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';
import parse from 'html-react-parser';
import { IMAGE_BASE_64 } from './contants';


const contentStyle = StyleSheet.create({
    h1: {
        fontSize: 24,
        fontWeight: "bold"
    },
    h2: {
        fontSize: 20,
        fontWeight: "bold"
    },
    h3: {
        fontSize: 16,
        fontWeight: "bold"
    },
    divider: {
        width: 40,
        height: 40,
        alignSelf: "center",
        marginVertical: 30
    },
})

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
        border: "2px solid purple",
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
        backgroundColor: "#F5CD05",
        borderTopRightRadius: 100,
    },
    backgroundBlue: {
        position: "absolute",
        right: 0,
        top: 0,
        width: "5%",
        height: "35%",
        borderBottomLeftRadius: 100,
        backgroundColor: "#08035D",
    },

});



interface HtmlToPdfComponentsProps {
    html: string;
}

const renderNode = (node: any) => {
    if (node.type === 'text') {
        return node.data;
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
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {node.children.map((child: any, index: number) => renderNode(child))}
                    </Text>
                );
            case 'h3':
                return (
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {node.children.map((child: any, index: number) => renderNode(child))}
                    </Text>
                );
            case 'p':
                return (
                    <Text style={{ fontSize: 12 }}>
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
                    <View style={{ marginLeft: 20 }}>
                        {node.children.map((child: any, index: number) => (
                            <Text key={index} style={{ fontSize: 12 }}>
                                {renderNode(child)}
                            </Text>
                        ))}
                    </View>
                );
            case 'li':
                return (
                    <Text style={{ fontSize: 12 }}>
                        {node.children.map((child: any, index: number) => renderNode(child))}
                    </Text>
                );
            case 'div':
                if (node.attribs['data-callout-type'] === "note") {
                    return (
                        <View style={{ borderLeftWidth: 4, borderLeftColor: '#3498db', padding: 10, backgroundColor: '#e8f4fd' }}>
                            {node.children.map((child: any, index: number) => (
                                <View key={index}>{renderNode(child)}</View>
                            ))}
                        </View>
                    );
                } else {
                    return (
                        <Text style={{ fontSize: 12 }}>
                            {node.children.map((child: any, index: number) => renderNode(child))}
                        </Text>
                    );
                }
            case 'hr':
                return (
                    <Image style={documentStyle.image_divider} src={IMAGE_BASE_64} />
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
const HtmlToPdfComponents: React.FC<HtmlToPdfComponentsProps> = ({ html }) => {
    console.log(html)
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