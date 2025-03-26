import Image from "next/image";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
function MarkdownComponent({ content }: { content: string }) {
    return (
        <>
            {/* <div className="prose lg:prose-xl markdown-body"> */}
            {/* <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown> */}
            <div className="prose lg:prose-xl markdown-body max-w-none">
                <Markdown
                    // className=" prose lg:prose-xl"

                    remarkPlugins={[remarkGfm]}
                    components={{
                        code(props) {
                            const { children, className, node, ...rest } = props;
                            const match = /language-(\w+)/.exec(className || "");
                            return match ? (
                                <SyntaxHighlighter
                                    {...rest}
                                    PreTag="div"
                                    children={String(children).replace(/\n$/, "")}
                                    language={match[1]}
                                    style={okaidia}
                                />
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
