import prisma from "../lib/prisma.jsx";

import Layout from "../components/Layout";
import Post from "../components/Post";

export default function Home({ posts }) {
  return (
    <>
      <Layout>
        <div className="justify-center">
          <div className="container-fluid">
            <h2 className="font-bold p-5">Public Feeds</h2>
            {posts.map((post, key) => (
              <Post key={key} title={post.title} content={post.content} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: {
      posts: res,
    },
  };
};
