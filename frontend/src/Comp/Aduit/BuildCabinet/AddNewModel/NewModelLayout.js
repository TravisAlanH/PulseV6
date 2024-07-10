import React from "react";
import * as ModelTempalates from "./Template";
import NewModelInputs from "./NewModelInputs";
import { addToMLTList } from "../../../../FireActions";
import * as FireActions from "../../../../FireActions";
import LoadingSpinner from "../../../Reuse/LoadingSpinner/Spinner";
import { useDispatch } from "react-redux";
import * as actions from "../../../../Store/Slices/Slice";

export default function NewModelLayout() {
  const dispatch = useDispatch();
  const user = FireActions.auth.currentUser;

  const [Template, setTemplate] = React.useState(ModelTempalates.Template);
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    addToMLTList(Template, user).then((res) => {
      if (res === "success") {
        dispatch(actions.addToMLTCreatedCount());
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    let modal = document.getElementById("ModalNewModel");
    modal.style.display = "none";
  }

  return (
    <div>
      <button
        className="orangeButton"
        onClick={() => {
          let modal = document.getElementById("ModalNewModel");
          modal.style.display = "block";
        }}
      >
        Create New
      </button>
      <div>
        <div id="ModalNewModel" className="modal">
          <div className="modal-content flex flex-col overflow-auto">
            <div
              className="w-full flex flex-row justify-end"
              onClick={() => {
                let modal = document.getElementById("ModalNewModel");
                modal.style.display = "none";
              }}
            >
              X
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="flex flex-row">
                <div className="flex flex-col gap-2">
                  {Object.keys(ModelTempalates.Template)
                    .splice(0, 15)
                    .map((key) => {
                      return <NewModelInputs Template={Template} setTemplate={setTemplate} Key={key} />;
                    })}
                </div>
                <div className="flex flex-col gap-2">
                  {Object.keys(ModelTempalates.Template)
                    .splice(15, 13)
                    .map((key) => {
                      return <NewModelInputs Template={Template} setTemplate={setTemplate} Key={key} />;
                    })}
                  <input type="submit" value="Submit" className="orangeButton" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading ? <LoadingSpinner /> : null}
    </div>
  );
}
