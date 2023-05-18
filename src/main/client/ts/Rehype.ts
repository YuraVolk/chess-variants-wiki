import { createElement, Fragment, useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import rehypeRaw from "rehype-raw";
import { templates } from "./templates/TemplateInterface";

const text = `# Hello world!

<sidebar>

<div><board-display variantname="2PC" pgn4='${`[StartFen4 "2PC"]
[Variant "FFA"]
[RuleVariants "EnPassant Play4Mate Teammate=1"]
[CurrentMove "0"]
[TimeControl "1|5"]`
	.replace(/'/g, "&#39;")
	.replace(/\n/g, " ")}'></board-display></div>

<div><composites-display composites='{"barePieceRule":18,"chess960":72}'></composites-display></div>

</sidebar>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt diam nec elit lacinia porta. Nunc at odio dapibus, auctor lacus id, laoreet ipsum. Etiam commodo, dolor molestie aliquam varius, purus justo hendrerit lectus, ut congue eros tortor eu elit. Donec augue risus, pharetra sit amet ex rutrum, placerat bibendum purus. Etiam vulputate ex ex, in dignissim nibh ornare in. Suspendisse nisl nisl, malesuada nec urna quis, elementum euismod nibh. Donec dignissim et leo nec faucibus.

Donec id mauris ipsum. Vestibulum tortor nulla, iaculis vitae mauris ut, congue convallis nisi. Nam varius in sem nec aliquet. Proin dapibus nec dui porttitor congue. Nullam facilisis risus egestas, dictum tortor blandit, tempus massa. Integer ac enim mollis, mattis turpis eu, sagittis urna. Etiam dignissim dignissim imperdiet. Nulla maximus nunc nulla, ac faucibus arcu hendrerit non. Suspendisse at dignissim mi, ut facilisis est. Nulla ultrices est bibendum, iaculis orci ultricies, congue justo.

Aliquam erat volutpat. Ut viverra tincidunt condimentum. Suspendisse faucibus arcu id nibh cursus porttitor. Donec vitae neque vel neque aliquet pellentesque. Nam eleifend, augue nec rutrum viverra, est urna pharetra magna, scelerisque lobortis lorem ante id metus. In posuere metus quis nibh laoreet, quis bibendum sapien suscipit. Fusce imperdiet dolor sed pharetra sollicitudin. Integer placerat nunc porttitor lobortis suscipit.

<section><game-controller variantname="2PC" pgn4='${`[StartFen4 "2PC"]
[Variant "FFA"]
[RuleVariants "EnPassant Play4Mate Teammate=1"]
[CurrentMove "0"]
[TimeControl "1|5"]`
	.replace(/'/g, "&#39;")
	.replace(/\n/g, " ")}'></game-controller></section>

`;

function useProcessor(text: string) {
	const [Content, setContent] = useState<JSX.Element | undefined>(() => createElement(Fragment));

	useEffect(() => {
		void (async function () {
			await unified()
				.use(remarkParse)
				.use(remarkRehype, { allowDangerousHtml: true })
				.use(rehypeRaw)
				.use(rehypeFormat)
				.use(rehypeStringify)
				.process(text)
				.then((file) => {
					void unified()
						.use(rehypeParse, { fragment: true })
						.use(rehypeReact, {
							createElement,
							Fragment,
							components: {
								...templates
							}
						})
						.process(file.value)
						.then((file) => {
							setContent(file.result);
						});
				});
		})();
	}, [text]);

	return Content ?? null;
}

export default function MarkdownParse() {
	return useProcessor(text);
}
