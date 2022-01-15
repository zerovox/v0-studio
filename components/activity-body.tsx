import {Activity, Streams} from "../lib/activities";
import {
 VictoryLine,
  VictoryChart
} from 'victory';

type Props = {
  activity: Activity;
  streams: Streams;
}

export const ActivityBody = ({ activity, streams }: Props) => {
  const out = [];
  for (let i = 0; i < streams.velocity_smooth.data.length; i++) {
    out.push({
     time: streams.time.data[i],
    velocity_smooth: streams.velocity_smooth.data[i],
     distance: streams.distance.data[i],
  })
  }

  return (
    <div>
      <VictoryChart>
        <VictoryLine style={{
          data: { stroke: "#c43a31", strokeWidth: 1 }
        }} data={out} x={"time"} y={"velocity_smooth"}/>
      </VictoryChart>
    </div>
  )
};
