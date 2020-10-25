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
      <div className="bg-gray-700  test">
        <h1 className="font-semibold text-4xl container px-8 py-12  leading-none max-w-screen-lg text-white">
          {props.data.title}
        </h1>
      </div>
      <div className="container rounded-md px-8 pt-8 mb-auto max-w-screen-lg">
        <div className="relative" style={{ paddingBottom: "50%" }}>
          <img
            src={`/${props.slug}.jpg`}
            className="object-cover absolute w-full h-full rounded-md shadow-lg"
          />
        </div>
        <div
          className="prose prose-2xl pt-8 pb-48"
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
      slug: props.params.slug,
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
