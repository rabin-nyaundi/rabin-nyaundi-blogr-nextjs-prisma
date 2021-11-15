import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Post from "../../components/Post";
import prisma from "../../lib/prisma";

export default function PostId({ post }) {
  const [session, loading] = useSession();
  const router = useRouter();
  const userHasValidSession = Boolean(session);

  const postBelongsToUser = session?.user?.email === post?.author?.email;

  async function publishPost(id) {
    await fetch(`/api/publish/${id}`, {
      method: "PUT",
    });
    await router.push("/");
  };

  async function deletePost(id) {
    await fetch(`/api/post/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    await router.push("/");
  }

  if (loading) {
    return <div>Authenticating ...</div>;
  }

  let title = post?.title;
  if (!post?.published) {
    title = `${title} (Draft)`;
  }
  return (
    <>
      <Layout>
        <div className="mt-10">
          <div className="flex flex-col px-4">
            <div className="px-4 pt-5">
              <h2>{title}</h2>
              <p>By: {post?.author?.name || "Author unknown"}</p>
            </div>
            <Post title={post?.title} content={post?.content} />
          </div>
          <div className="flex flex-row">
            {!post?.published && userHasValidSession && postBelongsToUser && (
              <>
                <div className="flex py-5 px-10">
                  <button
                    className="bg-blue-400 text-white font-bold px-5 py-2 hover:bg-blue-900 rounded"
                    onClick={() => publishPost(post?.id)}
                  >
                    Publish
                  </button>
                </div>
              </>
            )}
            {!post?.published && userHasValidSession && (
              <>
                <div className="flex py-5 px-10">
                  <button
                    className="bg-blue-400 text-white font-bold px-5 py-2 hover:bg-blue-900 rounded"
                    onClick={() => deletePost(post?.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  
  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post,
    },
  };
}
