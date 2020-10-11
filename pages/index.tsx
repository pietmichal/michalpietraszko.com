import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";
import remark from "remark";
import html from "remark-html";
import Link from "next/link";

export default function Home(props) {
  return (
    <>
      <div className="container py-4 flex items-center">
        <img
          className="h-12 w-12 rounded-full"
          src="https://pbs.twimg.com/profile_images/1245998426396831744/fcQ36KJ9_400x400.jpg"
        />
        <span className="pl-4 text-3xl font-medium">Michał Pietraszko</span>
        <div className="flex-auto"></div>
        <span className="pr-4">
          <Link href="/">Home</Link>
        </span>
        <span className="pr-4">
          <Link href="/about">About</Link>
        </span>
      </div>
      <div className="container">
        <ul>
          {props.posts.map((post, index) => {
            return (
              <li key={index}>
                <Link href={post.href}>{post.data.title}</Link>
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
