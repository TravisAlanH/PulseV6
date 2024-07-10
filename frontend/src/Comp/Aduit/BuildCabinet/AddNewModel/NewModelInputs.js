import React from "react";
import * as ModelTempalates from "./Template";

export default function NewModelInputs({ Template, setTemplate, Key }) {
  function handleUpdate(e) {
    setTemplate({ ...Template, [Key]: e.target.value });
  }

  return (
    <div className="flex flex-row">
      <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-row justify-start items-center gap-1 w-[8rem]"}>
        {ModelTempalates.TemplateKeyRequired[Key] ? <p className="text-red-500 w-[.2rem]">*</p> : <p className="text-red-500  w-[.2rem]"></p>}
        {Key}
      </label>
      {ModelTempalates.TemplateKeyTypes[Key] === "select" ? (
        <select required={ModelTempalates.TemplateKeyRequired[Key]} className="border-b-[#F7F5F1] border-b-2 min-w-[10rem]" onChange={(e) => handleUpdate(e)}>
          <option value="" disabled selected>
            Select
          </option>
          {ModelTempalates.TemplateOptions[Key].map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : ModelTempalates.TemplateKeyTypes[Key] === "textarea" ? (
        <textarea
          required={ModelTempalates.TemplateKeyRequired[Key]}
          className="border-b-[#F7F5F1] border-b-2 min-w-[7rem]"
          rows={3}
          onChange={(e) => handleUpdate(e)}
        ></textarea>
      ) : (
        <input
          required={ModelTempalates.TemplateKeyRequired[Key]}
          className="border-b-[#F7F5F1] border-b-2 min-w-[7rem]"
          onChange={(e) => handleUpdate(e)}
          {...(ModelTempalates.TemplateKeyTypes[Key] === "text" ? { type: "text" } : {})}
          {...(ModelTempalates.TemplateKeyTypes[Key] === "number" ? { type: "number" } : {})}
          {...(ModelTempalates.TemplateKeyTypes[Key] === "textarea" ? { type: "textarea" } : {})}
          defaultValue={Template[Key]}
        />
      )}
    </div>
  );
}
