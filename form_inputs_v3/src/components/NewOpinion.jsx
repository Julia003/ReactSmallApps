import { useActionState, useContext } from "react";
import { OpinionsContext } from "../store/opinions-context.jsx";
import Submit from "./Submit.jsx";

export function NewOpinion() {
  const { addOpinion } = useContext(OpinionsContext);

  async function shareOptionAction(prevFromState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (!userName.trim()) {
      errors.push("Please, provide your username");
    }

    if (title.trim().length < 5) {
      errors.push("Title must be at least 5 characters long");
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinion must be between 10 and 300 characters long");
    }

    if (errors.length > 0) {
      return { errors, values: { userName, title, body } };
    }

    await addOpinion({ userName, title, body });

    return { errors: null };
  }

  const [formState, formAction] = useActionState(shareOptionAction, {
    errors: [],
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.values?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.values?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.values?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
