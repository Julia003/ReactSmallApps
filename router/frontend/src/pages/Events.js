import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { useLoaderData, Await } from "react-router-dom";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => {
          return <EventsList events={loadedEvents} />;
        }}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //return { isError: true, message: "Could not fetch events" };
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    });
  } else {
    const responseData = await response.json();
    return responseData.events;
  }
}

export async function loader() {
  return {
    events: loadEvents(),
  };
}
