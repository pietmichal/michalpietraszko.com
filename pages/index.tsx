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
      <div className="container px-6 md:px-8 my-6">
      <h1 className="container font-extrabold text-4xl my-6">Recent posts</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {props.posts.map((post, index) => {
            return (
              <li key={index} className="p-4 rounded-md shadow-md bg-white">
                <span className="text-xl md:text-3xl font-bold block hover:underline leading-none">
                  <Link href={post.href}>{post.data.title}</Link>
                </span>  
                <span className="font-light pt-1 md:pt-2 text-sm md:text-lg block leading-1">
                  {post.data.description} 
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
