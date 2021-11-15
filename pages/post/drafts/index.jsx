import { getSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import Post from "../../../components/Post";
import prisma from "../../../lib/prisma";

export default function Drafts({ drafts, session }) {
  const router = useRouter();

  async function handleViewPost(id) {
    await router.push(`/post/${id}`);
  }
  if (!session) {
    return (
      <Layout>
        <h3>My Drafts</h3>
        <p>
          You must be logged in to view the drafts{" "}
          <button
            className="btn text-2xl text-blue-500 py-5 px-5"
            onClick={signIn}
          >
            Sign In
          </button>
        </p>
      </Layout>
    );
  }

  if (drafts.length === 0) {
    return (
      <Layout>
        <p className="mt-10 py-5 px-4 m-3">No drafts found.</p>
      </Layout>
    );
  }

  return (
    <div>
      <>
        <Layout>
          <h2 className="font-bold p-5">My Drafts</h2>
          {drafts.map((post, key) => (
            <Post
              key={key}
              title={post.title}
              content={post.content}
              handleClick={() => handleViewPost(post?.id)}
            />
          ))}
        </Layout>
      </>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });

  console.log(session);

  if (!session) {
    res.statuscode = 403;
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session?.user?.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: {
      drafts: drafts,
      session: session,
    },
  };
}
