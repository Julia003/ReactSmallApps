import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, fetchEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: fetchResponse,
    isPending: isFetchPending,
    isError: isFetchError,
    error: fetchError,
  } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const {
    mutate,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  function startDeletingHandle() {
    setIsDeleting(true);
  }
  function stopDeletingHandle() {
    setIsDeleting(false);
  }

  function submitDelete() {
    mutate({ id });
  }

  let content;

  if (isFetchPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event data ...</p>
      </div>
    );
  }

  if (isFetchError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to load event"
          message={
            fetchError.info?.message ||
            "Failed to fetch event data. Please, try again later"
          }
        />
      </div>
    );
  }

  if (fetchResponse) {
    const formattedDate = new Date(fetchResponse.date).toLocaleDateString(
      "en-US",
      { day: "numeric", month: "short", year: "numeric" }
    );

    content = (
      <>
        <header>
          <h1>{fetchResponse.title}</h1>
          <nav>
            <button onClick={startDeletingHandle}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img
            src={`http://localhost:3000/${fetchResponse.image}`}
            alt={fetchResponse.title}
          />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{fetchResponse.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {fetchResponse.time}
              </time>
            </div>
            <p id="event-details-description">{fetchResponse.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={stopDeletingHandle}>
          <h>Are you sure?</h>
          <p>
            Do you really want to delete this event? This action cannot be
            undone
          </p>
          <div className="form-actions">
            {isDeletePending && <p>Deleting, please wait ...</p>}
            {isDeletePending && (
              <>
                <button onClick={stopDeletingHandle} className="button-text">
                  Cancel
                </button>
                <button onClick={submitDelete} className="button">
                  Delete
                </button>
              </>
            )}
          </div>
          {isDeleteError && (
            <ErrorBlock
              title="Failed to delete event"
              message={
                deleteError.info?.message ||
                "Failed to delete event. Please, try again later"
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
