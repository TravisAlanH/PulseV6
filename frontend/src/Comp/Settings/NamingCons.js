import React from "react";
import { useSelector } from "react-redux";
import { TiPlus } from "react-icons/ti";

export default function NamingCons() {
  const UUID = useSelector((state) => state.data.Current.DataBaseUUID);
  const [selectedStep, setSelectedStep] = React.useState("");
  const [selectedEditListIndex, setselectedEditListIndex] = React.useState(0);
  const [customTag, setCustomTag] = React.useState("");
  const currentLocationSettingData = JSON.parse(localStorage.getItem("NamingList")).filter((item) => item.DataBaseUUID === UUID);

  const [namingCon, setNamingCon] = React.useState(JSON.parse(localStorage.getItem("NamingList")).filter((item) => item.DataBaseUUID === UUID)[0].NamingCon);
  console.log(namingCon);
  const OptionListRackable = [
    {
      Step: "Assets",
      Associated: ["Location", "Make", "Model", "Cabinet", "UP", "Count In Rack", "Count In Location", "Custom"],
    },
    {
      Step: "Racks",
      Associated: ["Location", "Make", "Model", "Count In Location", "Custom"],
    },
  ];

  const addToNamingButtons = ["Location", "Make", "Model", "Cabinet", "UP", "Count In Rack", "Count In Location", "Custom"];

  const Steps = ["Racks", "Assets"];

  let NamingTemplate = {
    Step: selectedStep,
    Format: [],
    CharacterCount: [],
    Delimiters: "",
  };

  function handleAddingToNamingCon() {
    setNamingCon([...namingCon, NamingTemplate]);
    document.getElementById("StepSelection").value = "N/A";
  }

  return (
    <div className="w-full border-2">
      <div className="flex flex-row">
        <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"}>Load Location Presets</label>
        <select>
          <option>{currentLocationSettingData[0].dcTrackLocationCode}</option>
          {JSON.parse(localStorage.getItem("NamingList"))
            .filter((item) => item.DataBaseUUID !== UUID)
            .map((item, index) => {
              return (
                <option key={index} value={item.NamingCon}>
                  {item.dcTrackLocationCode}
                </option>
              );
            })}
        </select>
      </div>
      <div className="p-3">
        <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"}>Custom Naming</label>
        <div className="flex flex-row">
          <div className="w-[12rem] border-2 flex flex-col gap-2">
            {addToNamingButtons.map((item) => {
              const AssociatedToStep = OptionListRackable.find((atIndex) => atIndex.Step === selectedStep);
              return (
                <div>
                  <button
                    disabled={AssociatedToStep && !AssociatedToStep.Associated.includes(item)}
                    className={AssociatedToStep && AssociatedToStep.Associated.includes(item) ? "orangeButton" : "grayButton"}
                    onClick={() => {
                      if (item === "Custom") {
                        document.getElementById("ModalRackable").style.display = "block";
                        console.log("Custom");
                      } else if (item !== "Custom") {
                        setNamingCon(
                          namingCon.map((namingConItem, index) => {
                            if (namingConItem.Step === selectedStep) {
                              return {
                                ...namingConItem,
                                Format: [...namingConItem.Format, item],
                                CharacterCount: [...namingConItem.CharacterCount, -1],
                              };
                            }
                            return namingConItem;
                          })
                        );
                      }
                    }}
                  >
                    {item}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-3 w-full overflow-x-auto">
            {namingCon.map((item, index) => {
              console.log(item);
              return (
                <div className="flex flex-col border-2">
                  <div className="flex flex-row justify-between">
                    <div key={index} className="overflow-x-auto flex flex-row">
                      <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-between w-[6rem]"}>
                        <p className="text-xl">{item.Step}</p>
                        <div>
                          <p>Delimiter:</p>
                          <select
                            onChange={(e) => {
                              if (e.target.value !== "N/A") {
                                let namingComUpdated = namingCon.find((item) => item.Step === selectedStep);
                                namingComUpdated.Delimiters = e.target.value;
                                setNamingCon(
                                  namingCon.map((namingConItem) => {
                                    if (namingConItem.Step === selectedStep) {
                                      return namingComUpdated;
                                    }
                                    return namingConItem;
                                  })
                                );
                              }
                            }}
                          >
                            <option value="N/A">Select</option>
                            <option value="-">-</option>
                            <option value="_">_</option>
                            <option value=".">.</option>
                            <option value=" ">Space</option>
                            <option value="">None</option>
                          </select>
                        </div>
                      </label>
                      <div className="flex flex-row gap-2">
                        {item.Format.map((itemParameter, index) => {
                          return (
                            <div className="flex flex-col border-2 p-2">
                              <div className="flex flex-row justify-between gap-2">
                                <p>{itemParameter}</p>
                                <button
                                  className="redButton"
                                  onClick={() => {
                                    let namingComUpdated = namingCon.find((item) => item.Step === selectedStep);
                                    namingComUpdated.Format.splice(index, 1);
                                    namingComUpdated.CharacterCount.splice(index, 1);
                                    setNamingCon(
                                      namingCon.map((namingConItem) => {
                                        if (namingConItem.Step === selectedStep) {
                                          return namingComUpdated;
                                        }
                                        return namingConItem;
                                      })
                                    );
                                  }}
                                >
                                  X
                                </button>
                              </div>
                              {itemParameter.includes("Count") ? null : (
                                <select
                                  className="w-full"
                                  onChange={(e) => {
                                    if (e.target.value !== "N/A") {
                                      let namingComUpdated = namingCon.find((item) => item.Step === selectedStep);
                                      namingComUpdated.CharacterCount[index] = parseInt(e.target.value);
                                      setNamingCon(
                                        namingCon.map((namingConItem) => {
                                          if (namingConItem.Step === selectedStep) {
                                            return namingComUpdated;
                                          }
                                          return namingConItem;
                                        })
                                      );
                                    }
                                  }}
                                >
                                  <option value="N/A">Chars</option>
                                  <option value={-1}>Show All</option>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={5}>5</option>
                                </select>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {selectedEditListIndex === index ? null : (
                      <button
                        className="orangeButton"
                        onClick={() => {
                          setSelectedStep(item.Step);
                          setselectedEditListIndex(index);
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <div id="Preview">
                    <div className="flex flex-row overflow-x-auto">
                      <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-between w-[6rem]"}>Preview:</label>
                      {item.Format.map((itemParameter, index) => {
                        console.log(item);
                        return (
                          <div key={index} className="flex flex-row text-nowrap">
                            {item.CharacterCount[index] === -1 ? <p>{itemParameter}</p> : <p>{itemParameter.slice(0, item.CharacterCount[index])}</p>}
                            {item.CharacterCount.length > index + 1 ? <p>{item.Delimiters === " " ? <p>&nbsp;</p> : item.Delimiters}</p> : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex flex-row justify-center items-center">
              <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"}>Select Type</label>
              <select
                className="border-2"
                id="StepSelection"
                onChange={(e) => {
                  if (e.target.value === "N/A") setSelectedStep("");
                  if (e.target.value !== "N/A") {
                    setSelectedStep(e.target.value);
                  }
                }}
              >
                <option value="N/A">Select Type</option>
                {Steps.filter((step) => !namingCon.some((item) => item.Step === step)).map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <button
                className="orangeButton"
                onClick={() => {
                  if (selectedStep !== "") handleAddingToNamingCon();
                }}
              >
                <TiPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="ModalRackable" className="modal w-full">
        <div className="modal-content">
          <div className="flex flex-col">
            <div className="flex flex-row justify-end">{CloseButton()}</div>
            <div className="flex flex-row justify-center">
              <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[8rem]"}>Custom Tag</label>
              <input type="text" className="border-2" onChange={(e) => setCustomTag(e.target.value)} />
              <button
                className="orangeButton"
                onClick={() => {
                  setNamingCon(
                    namingCon.map((namingConItem) => {
                      if (namingConItem.Step === selectedStep) {
                        return {
                          ...namingConItem,
                          Format: [...namingConItem.Format, customTag],
                          CharacterCount: [...namingConItem.CharacterCount, -1],
                        };
                      }
                      return namingConItem;
                    })
                  );
                  document.getElementById("ModalRackable").style.display = "none";
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function CloseButton() {
    return (
      <div id="closeButton">
        <button
          className="redButton flex flex-row justify-center items-center"
          onClick={() => {
            document.getElementById("ModalRackable").style.display = "none";
          }}
        >
          x
        </button>
      </div>
    );
  }
}
