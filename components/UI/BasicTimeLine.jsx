import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import { toFarsiNumber } from "@/app/utils/toFarsiNumber";
import { duration } from "@mui/material";

export default function travelTimeline({
  startStation,
  endStation,
  startArrival,
  endArrival,
  travelDuration,
}) {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineOppositeContent sx={{ fontSize: "1.3rem" }}>
          {startStation}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector
            sx={{
              height: "60px",
              backgroundColor: "transparent",
              borderRight: "3px dotted gray",
            }}
          />
        </TimelineSeparator>
        <TimelineContent sx={{ fontSize: "1.3rem" }}>
          {toFarsiNumber(startArrival)}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary" />
          <TimelineConnector
            sx={{
              height: "60px",
              backgroundColor: "transparent",
              borderRight: "3px dotted gray",
            }}
          />
        </TimelineSeparator>
        <TimelineContent>{toFarsiNumber(travelDuration)} دقیقه</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent sx={{ fontSize: "1.3rem" }}>
          {endStation}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent sx={{ fontSize: "1.3rem" }}>
          {toFarsiNumber(endArrival)}
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
