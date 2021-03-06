import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../types/post";
import { PAGE_TITLE } from "../lib/constants";

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{PAGE_TITLE}</title>
        </Head>
        <Container>
          <Intro />
          {allPosts
            .filter((post) => !post.tags.includes("draft"))
            .map((post) => (
              <HeroPost
                key={post.slug}
                title={post.title}
                date={post.date}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            ))}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts("title", "date", "slug", "excerpt", "tags");

  return {
    props: { allPosts },
  };
};
