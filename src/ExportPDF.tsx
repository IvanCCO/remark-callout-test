import { Page, Document, PDFDownloadLink, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import parse from 'html-react-parser';

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
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
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

const styles = StyleSheet.create({
    page: {
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 10,
        color: '#666',
    },
    image_logo: {
        marginVertical: 10,
        marginHorizontal: 10,
        width: 60,
        height: 60,
    },
});

const HtmlToPdfComponents: React.FC<HtmlToPdfComponentsProps> = ({ html }) => {
    console.log(html)
    const options = {
        replace: (node: any) => renderNode(node),
    };


    return <View>{parse(html, options)}</View>;
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
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Image style={styles.image_logo} src="https://static.wixstatic.com/media/41893d_0a71ebc4ef5b4562a90d766b04d77088~mv2.png/v1/fit/w_2500,h_1330,al_c/41893d_0a71ebc4ef5b4562a90d766b04d77088~mv2.png" />
                <Text>Brio Educação</Text>
            </View>

            {/* Conteúdo principal */}
            <HtmlToPdfComponents html={html} />

            {/* Rodapé com número da página */}
            <Text
                style={styles.footer}
                render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`}
            />
        </Page>
    </Document>
);


export default function ExportPDF({ text }: MarkdownText) {
    return (
        <PDFDownloadLink
            document={<MyDocument html={text} />}
            fileName="document.pdf"
        >
            {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
    )
}