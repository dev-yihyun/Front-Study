"use client";
import Image from "next/image";
import { useRef } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
function MarkdownComponent({ content }: { content: string }) {
    const ref = useRef<SyntaxHighlighter>(null);
    return (
        <>
            <div className="prose lg:prose-xl markdown-body max-w-none">
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code(props) {
                            const { children, className, ...rest } = props;
                            const match = /language-(\w+)/.exec(className || "");
                            return match ? (
                                <SyntaxHighlighter
                                    {...rest}
                                    PreTag="div"
                                    ref={ref}
                                    language={match[1]}
                                    style={okaidia}
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code {...rest} className={className}>
                                    {children}
                                </code>
                            );
                        },
                        img: (image) => (
                            <Image
                                className="w-full max-h-60 object-cover"
                                src={image.src || ""}
                                alt={image.alt || ""}
                                width={500}
                                height={300}
                            />
                        ),
                    }}
                >
                    {content}
                </Markdown>
            </div>
        </>
    );
}
export default MarkdownComponent;
