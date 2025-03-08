import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import React, { useEffect } from "react";
import Markdown from "react-markdown";
import remarkCallout from "@r4ai/remark-callout";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype"
import remarkParse from "remark-parse"
import rehypeStringify from "rehype-stringify"
import { unified } from "unified";


const YOUTUBE_URL = "https://www.youtube.com"


interface MarkdownFormatterProps {
    text: string;
    onHtmlRendered?: (html: string) => void;
}

export default function MarkdownFormatter({ text, onHtmlRendered }: MarkdownFormatterProps) {

    useEffect(() => {
        const convertMarkdownToHtml = async () => {
            const result = await unified()
                .use(remarkParse)
                .use(remarkCallout)
                .use(remarkRehype)
                .use(rehypeRaw)
                .use(rehypeStringify)
                .process(text);

            const html = result.toString();
            if (onHtmlRendered) {
                onHtmlRendered(html);
            }
        };

        convertMarkdownToHtml();
    }, [text, onHtmlRendered]);
    return (
        <Markdown
            remarkPlugins={[remarkCallout, remarkParse, remarkRehype]}
            rehypePlugins={[rehypeRaw, rehypeStringify]}
            components={{
                strong(props) {
                    return (
                        <strong className="font-bold text-[#F19953]">
                            {props.children}
                        </strong>
                    );
                },
                hr() {
                    return (
                        <div className="w-full flex justify-center place-items-baseline my-20">
                            <p className="font-itim text-xl ">ههههه</p>
                        </div>
                    );
                },
            }}
        >
            {text}
        </Markdown>
    );
}
