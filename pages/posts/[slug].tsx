import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { GetStaticPathsResult } from "next";
import { join } from "path";
import remark from "remark";
import html from "remark-html";
import Header from "../../components/Header";

export default function Post(props) {
  return (
    <>
      <Header />
      <div className="container">
        <div className="bg-white rounded-md mt-6 px-6 mx-6 md:mx-8 mb-6 py-4">
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: props.content }}
          ></div>
        </div>
      </div>
    </>
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
