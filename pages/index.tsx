import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../types/post";
import { PAGE_TITLE } from "../lib/constants";
import {Activity, getActivity, getLatestActivities, getStreams, Streams} from "../lib/activities";
import Link from "next/link";

type Props = {
  allPosts: Post[];
  activitiesWithStreams: Array<{ activity: Activity, streams: Streams }>
};

const Index = ({ allPosts, activitiesWithStreams }: Props) => {
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
        {activitiesWithStreams.map(a =>
          <Link as={`/activities/${a.activity.id}`} href="/activities/[id]" key={a.activity.id}>
            <a className="hover:underline">{a.activity.name}</a>
          </Link>
        )}
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts("title", "date", "slug", "excerpt", "tags");

  const latestActivities = await getLatestActivities();
  const activitiesWithStreams = await Promise.all(latestActivities.map(async activity => ({
    activity, stream: await getStreams(activity.id)
  })));

  return {
    props: { allPosts, activitiesWithStreams },
  };
};
