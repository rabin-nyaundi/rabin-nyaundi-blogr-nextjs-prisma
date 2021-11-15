import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <div className="main overflow-hidden border-box bg-white-100">
        {/* Head component */}
        <div>
          <Head>
            <title>NextJS Prisma BlogApp</title>
            <meta name="description" content="Feeds App Next Prisma" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
        </div>
        <div className="overflow-hidden">
          <Header />
          <div className="py-4 px-4">{children}</div>
        </div>
      </div>
    </>
  );
}
