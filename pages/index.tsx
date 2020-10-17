import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";
import remark from "remark";
import html from "remark-html";
import Link from "next/link";
import Header from "../components/Header";

export default function Home(props) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <div className="bg-gray-700 pb-16 test shadow-inner">
        <h1
          className="font-semibold text-4xl container px-8 py-24"
          style={{ color: "#ecf0f1" }}
        >
          Recent posts
        </h1>
      </div>
      <div
        className="container p-4 mb-auto"
        style={{ marginTop: "-130px" }}
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4">
          {props.posts.map((post, index) => {
            return (
              <Link href={post.href}>
                <li key={index} className="rounded-md shadow-md bg-white group cursor-pointer">
                  <div className="relative pb-64 md:pb-48">
                    <img
                      className="rounded-t-md w-full h-full absolute object-cover"
                      src={`/test${index+1}.jpg`}
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xl pb-1 font-bold block group-hover:underline leading-none">
                      {post.data.title}
                    </span>
                    <span className="font-light text-md block text-gray-700">
                      {post.data.description}
                    </span>
                    <span>
                      Read more &#8594;
                    </span>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
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
