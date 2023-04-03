import { DateTime, Duration } from "luxon";
import { FC, useState } from "react";
import { RealTimeDurationFragment } from "../fragments/realTimeDurationFragment";
import { FragmentType, useFragment } from "../gql";
import { RealTimeDurationItemFragment } from "../gql/graphql";
import { useRequestAnimationFrame } from "../hooks/useRequestAnimationFrame";

const realTimeDurationToString = (
  realTimeDuration: RealTimeDurationItemFragment
): string => {
  let totalTime = Duration.fromISO(realTimeDuration.totalSavedTime);
  for (const startTime of realTimeDuration.startTimes) {
    totalTime = totalTime.plus(
      DateTime.now().diff(DateTime.fromISO(startTime))
    );
  }
  return totalTime.toFormat("hh:mm:ss");
};

export interface RealTimeDurationProps {
  time: FragmentType<typeof RealTimeDurationFragment>;
}

export const RealTimeDuration: FC<RealTimeDurationProps> = (props) => {
  const time = useFragment(RealTimeDurationFragment, props.time);
  const [displayTime, setDisplayTime] = useState("");
  useRequestAnimationFrame(() => {
    setDisplayTime(realTimeDurationToString(time));
  });

  return <>{displayTime}</>;
};
