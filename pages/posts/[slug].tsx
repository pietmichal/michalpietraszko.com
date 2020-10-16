import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { GetStaticPathsResult } from "next";
import { join } from "path";
import remark from "remark";
import html from "remark-html";
import Header from "../../components/Header";

export default function Post(props) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <div className="bg-gray-700 pb-16 test">
        <h1
          className="font-semibold text-4xl container px-8 py-24"
          style={{ color: "#ecf0f1" }}
        >
          {props.data.title}
        </h1>
      </div>
      <div
        className="container rounded-md px-8 mb-auto bg-white shadow-xl"
        style={{ marginTop: "-130px" }}
      >
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: props.content }}
          ></div>
        </div>
    </div>
  );
}

export async function getStaticProps(props) {
  const pathToPostContent = join(
    process.cwd(),
    "posts",
    props.params.slug + ".md"
  );
  const fileContent = readFileSync(pathToPostContent, "utf-8");
  const { data, content } = matter(fileContent);
  const result = await remark().use(html).process(content);
  return {
    props: {
      data: data,
      content: result.toString(),
    },
  };
}

export function getStaticPaths(): GetStaticPathsResult {
  const pathToPosts = join(process.cwd(), "posts");
  const paths = readdirSync(pathToPosts)
    .map((file) => file.replace(".md", ""))
    .map((file) => ({ params: { slug: file } }));
  return {
    paths,
    fallback: false,
  };
}
