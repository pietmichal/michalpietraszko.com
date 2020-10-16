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
      <div className="bg-gray-900">
        <h1
          className="font-semibold text-4xl container px-8 py-12"
          style={{ color: "#ecf0f1" }}
        >
          {props.data.title}
        </h1>
      </div>
      <div className="container mb-auto">
        <div className="bg-white mt-1 mb-1 px-6 mx-1 md:mx-8 md:mb-6 md:mt-6 py-4 border-0 shadow-md">
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: props.content }}
          ></div>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-b-md mx-1 mb-1">
        <div className="container py-4 px-2 flex items-center">
          <span>michalpietraszko.com</span>
        </div>
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
