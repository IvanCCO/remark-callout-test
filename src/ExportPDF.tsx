import { Page, Document, PDFDownloadLink, Text, View, StyleSheet, Image, PDFViewer, Font, Line, Svg } from '@react-pdf/renderer';
import parse from 'html-react-parser';
import { IMAGE_BASE_64, PENCIL_ICON, QUESTION_ICON } from './icons';
import documentStyle from './pdf-formatter/documentStyle';
import render from './pdf-formatter/render';
import contentStyle from './pdf-formatter/contentStyle';

Font.registerEmojiSource({
    format: 'png',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});

interface HtmlToPdfComponentsProps {
    html: string;
}

const HtmlToPdfComponents: React.FC<HtmlToPdfComponentsProps> = ({ html }) => {
    const options = {
        replace: (node: any) => render(node),
    };
    return <View style={documentStyle.content}>{parse(html, options)}</View>;
};

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
            <Text
                style={documentStyle.invisiblePadding}
                fixed
            ></Text>
            {/* Rodapé com número da página */}
            <Text
                style={documentStyle.footer}
                fixed
                render={({ pageNumber }) => `${pageNumber}`}
            />
        </Page>

        <Page size="A4" style={documentStyle.page} wrap>
            <View style={documentStyle.backgroundYellow} fixed />
            <View style={documentStyle.backgroundBlue} fixed />
            <View style={documentStyle.header} fixed>
                <Image style={documentStyle.image_logo} src={IMAGE_BASE_64} />
            </View>

            {/* Conteúdo principal */}
            <Text style={contentStyle.h1}>Exercícios</Text>
            {Array.from({ length: 3 }).map((_, index) => (
                <View style={documentStyle.content} key={index} wrap>
                    <View style={{ display: "flex", flexDirection: "row", gap: 6, marginBottom: 40 }} wrap>
                        <Text style={{ backgroundColor: "#C7C3C3", color: "#5B5B5B", fontSize: 16, fontWeight: "bold", textAlign: "center", alignSelf: "center", borderRadius: 50, paddingVertical: 5, paddingHorizontal: 10 }} break>{index + 1}</Text>
                        <Text style={{ fontSize: 14, fontWeight: "light", flex: 1 }} wrap>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, in dignissimos! Et magnam fugit enim magni blanditiis doloribus</Text>
                    </View>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Svg key={index} height="40" width="100%">
                            <Line
                                x1="0"
                                y1={index + 10}
                                x2="500"
                                y2={index + 10}
                                strokeWidth={2}
                                stroke="rgb(155, 155, 155)"
                            />
                        </Svg>
                    ))}
                </View>
            ))}
            <Text
                style={documentStyle.invisiblePadding}
                fixed
            ></Text>
        </Page>

    </Document>
);

interface MarkdownText {
    text: string;
}

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