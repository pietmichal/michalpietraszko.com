import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";
import remark from "remark";
import html from "remark-html";
import Link from "next/link";
import Header from "../components/Header";

export default function Home(props) {
  return (
    <>
      <Header />
      <div className="container">
        <ul>
          {props.posts.map((post, index) => {
            return (
              <li key={index} className="my-4">
                <span className="text-4xl font-bold block hover:underline">
                  <Link href={post.href}>{post.data.title}</Link>
                </span>  
                <span className="font-light text-sm">
                  Last modified: {new Date(post.data.lastModified).toUTCString()}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const pathToPosts = join(process.cwd(), "posts");
  const posts = await Promise.all(
    readdirSync(pathToPosts).map(async (fileName) => {
      const slug = fileName.replace(".md", "");
      const fileContent = readFileSync(join(pathToPosts, fileName), "utf-8");
      const { data, content } = matter(fileContent);
      const result = await remark().use(html).process(content);
      return {
        href: "/posts/" + slug,
        data,
        content: result.toString(),
      };
    })
  );
  return {
    props: {
      posts,
    },
  };
}
