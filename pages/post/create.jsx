import { useSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Layout from "../../components/Layout";

export default function CreatePost() {
  const [title, settTitle] = useState([]);
    const [content, setContent] = useState([]);
    
    const [session, loading] = useSession();

  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Submit form data");
    try {
      const body = { title, content };
      await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      await router.push("/post/drafts");
    } catch (error) {
      console.log(error);
    }
  }
    if (!session) {
        return (
          <Layout>
            <div className="mt-5">
              <h3>My Drafts</h3>
              <p>
                You must be logged in to create post{" "}
                <button
                  className="btn text-2xl text-blue-500 py-5 px-5"
                  onClick={signIn}
                >
                  Sign In
                </button>
              </p>
            </div>
          </Layout>
        );
    }
  return (
    <>
      <Layout>
        <div className="flex justify-center">
          <div className="w-3/4 bg-gray-100 p-5">
            <form onSubmit={handleSubmit}>
              <h2 className="font-bold py-3"> New Draft</h2>
              <div className="flex flex-col">
                <label className="mb-5" htmlFor="title">
                  {" "}
                  Title
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Title"
                    onChange={(e) => settTitle(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex flex-col">
                <label htmlFor="title">
                  {" "}
                  Content
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="content"
                    type="text"
                    cols={50}
                    rows={10}
                    placeholder="Content"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex items-center justify-end py-6">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
