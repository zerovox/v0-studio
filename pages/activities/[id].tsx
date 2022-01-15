import {Activity, getActivity, getLatestActivities, getStreams, Streams} from "../../lib/activities";
import {useRouter} from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import Container from "../../components/container";
import Header from "../../components/header";
import Head from "next/head";
import {PAGE_TITLE} from "../../lib/constants";
import ActivityHeader from "../../components/activity-header";
import {ActivityBody} from "../../components/activity-body";

type Props = {
  activity: Activity;
  streams: Streams;
}

const ActivityPage = ({ activity, streams }: Props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container>
        <Header />
        <article className="mb-32">
          <Head>
            <title>
              {activity.name} | {PAGE_TITLE}
            </title>
          </Head>
          <ActivityHeader title={activity.name} date={activity.start_date} />
          <ActivityBody activity={activity} streams={streams} />
        </article>
      </Container>
    </Layout>
  )
}

export default ActivityPage;

type Params = {
  params: {
    id: string;
  };
};


export async function getStaticProps({ params }: Params) {
  const activity = await getActivity(params.id)
  const streams = await getStreams(params.id)

  return {
    props: {
      activity,
      streams,
    },
  };
}

export async function getStaticPaths() {
  const activities = await getLatestActivities();

  return {
    paths: activities.map((activity) => {
      return {
        params: {
          id: activity.id.toString(),
        },
      };
    }),
    fallback: false,
  };
}
