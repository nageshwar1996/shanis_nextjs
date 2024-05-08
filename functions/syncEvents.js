export const syncEvents = (events, googleEvents) => {
  let withoutHanoutLink = events.filter(
    (e) => e.hangoutLink == null && e.google_event_id != null
  );
  let conferenceDataList = withoutHanoutLink.map((item, index) => {
    let temp = { ...item };
    googleEvents.forEach((it) => {
      if (
        temp.google_event_id == it?.conferenceData?.createRequest?.requestId
      ) {
        temp.hangoutLink = it?.conferenceData?.entryPoints[0].uri;
      }
    });
    return temp;
  });

  return conferenceDataList;
};
