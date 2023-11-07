import React from "react";
import * as FireActions from "../../FireActions";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../../firebase";
import { state } from "../../Store/Slices/Template";
import LoadingSpinner from "../Reuse/LoadingSpinner/Spinner";
import { TbDownload } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../Store/Slices/Slice";
import * as Functions from "../../Format/Functions";
import { RiCheckboxFill, RiSaveFill } from "react-icons/ri";
import { ImMenu3 } from "react-icons/im";
import "./HomeStyles.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function HomeLayout() {
  const [locationCode, setLocationCode] = React.useState("");
  const [locationData, setLocationData] = React.useState([]);
  const [existMessageShow, setExistMessageShow] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const UUID = useSelector((state) => state.data.Current.DataBaseUUID);
  const fullState = useSelector((state) => state.data);
  const [saveConfirm, setSaveConfirm] = React.useState(UUID === "" ? true : false);

  const dispatch = useDispatch();

  const user = FireActions.auth.currentUser;

  React.useEffect(() => {
    setLoading(true);
    const data = async () => {
      const db = getFirestore(app);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLocationData(docSnap.data().LocationsList);
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    data().catch((error) => {
      setLoading(false);
      console.error("Error adding document: ", error);
    });
  }, [reload, user.uid]);

  let Duplicate = null;

  if (locationData === undefined || locationData.length !== 0) {
    Duplicate = Functions.findOldestNonUniqueEntries(locationData);
    if (Duplicate) {
      Duplicate.forEach((item) => {
        FireActions.removeFromLocationList(item, user).then(() => {});
      });
      setReload(!reload);
    }
  }

  function createLocation(e) {
    let codeExists = false;
    e.preventDefault();
    setLoading(true);
    for (let i = 0; i < locationData.length; i++) {
      if (locationData[i].Location[0]["dcTrack Location Code *"].value === locationCode || locationCode === "") {
        codeExists = true;
        setExistMessageShow(true);
        setLoading(false);
        return;
      }
    }
    if (!codeExists) {
      let stateTemplate = structuredClone(state);
      stateTemplate.Location[0]["dcTrack Location Code *"].value = locationCode;
      stateTemplate.Current.DataBaseUUID = uuidv4();
      stateTemplate.Current.DataBaseTime = Functions.getCurrentTimeInFormat();
      FireActions.addToLocations(user, stateTemplate, reload).then(() => {
        setLoading(false);
        setReload(!reload);
      });
    }
    setLocationCode("");
  }

  function saveData(item) {
    setLoading(true);
    setSaveConfirm(false);
    let itemUUID = item.Current.DataBaseUUID;
    let stateCopy = structuredClone(fullState);
    stateCopy.Current.DataBaseTime = Functions.getCurrentTimeInFormat();
    // let newFireLocationData = FireLocationData.filter((item) => item.Current.DataBaseUUID !== itemUUID);
    let newFireLocationData = [];
    for (let i = 0; i < locationData.length; i++) {
      if (locationData[i].Current.DataBaseUUID !== itemUUID) {
        newFireLocationData.push(locationData[i]);
      }
    }

    newFireLocationData.push(stateCopy);
    FireActions.updateLocationsList(newFireLocationData, user).then(() => {
      setLocationData(newFireLocationData);
      setLoading(false);
      setReload(!reload);
    });
  }

  function downloadData(item) {
    setSaveConfirm(false);
    setLoading(true);
    if (saveConfirm) {
      const payload = { value: item };
      dispatch(Actions.setAllStateDataToActionPayloadValue(payload));
      setLoading(false);
      setReload(!reload);
    } else {
      setLoading(false);
      document.getElementById("confirmationDialog").style.display = "flex";
    }
  }

  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        Created Locations
      </div>
      <div className="flex flex-col gap-3 w-full items-center justify-center p-2 border-b-2 mb-2">
        <div className="flex flex-row">
          <form className="flex flex-row" onSubmit={createLocation}>
            <div className="w-[1rem] flex flex-row justify-center items-center text-red-500">*</div>
            <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[11rem] pl-2"}>
              dcTrack Location Code
            </label>
            <input
              type="text"
              required={true}
              className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"}
              placeholder="Location Name"
              defaultValue={locationCode}
              onChange={(e) => {
                setLocationCode(e.target.value);
                setExistMessageShow(false);
              }}
            />
            <input type="submit" className="orangeButton ml-3" value={"Create Location"} />
          </form>
          <button
            className="orangeButton ml-3"
            onClick={() => {
              let cards = document.querySelectorAll("#LocationCard");
              if (cards[0].classList.contains("extended")) {
                for (let i = 0; i < cards.length; i++) {
                  // cards[i].classList.remove("extended");
                  // cards[i].classList.remove("h-[10rem]");
                  // cards[i].classList.add("sm:h-[4rem]");
                  // cards[i].classList.add("md:h-[4rem]");
                  cards[i].classList.remove("extended");
                  cards[i].classList.remove("h-[10rem]");
                  cards[i].classList.add("h-[0rem]");
                }
              } else {
                for (let i = 0; i < cards.length; i++) {
                  // cards[i].classList.add("extended");
                  // cards[i].classList.remove("sm:h-[4rem]");
                  // cards[i].classList.remove("md:h-[4rem]");
                  // cards[i].classList.add("h-[10rem]");
                  cards[i].classList.add("extended");
                  cards[i].classList.remove("h-[0rem]");
                  cards[i].classList.add("h-[10rem]");
                }
              }
            }}>
            <ImMenu3 />
          </button>
        </div>
        {existMessageShow ? <div className="text-sm text-red-500">** Location Code in Use **</div> : null}
      </div>
      <div className="flex flex-col justify-center gap-6 px-6">
        {locationData.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="w-full border-b-2 flex flex-row gap-4 justify-between py-2 text-sm">
              <div className="flex flex-row gap-4 bg-[#F7F5F1] items-center">
                <label className="pl-4">Location Code:</label>
                <div className="flex flex-row gap-2">
                  <button
                    className="button orangeButton"
                    onClick={() => {
                      let locationDataCopy = structuredClone(locationData);
                      locationDataCopy = locationDataCopy.sort((a, b) => {
                        return a.Location[0]["dcTrack Location Code *"].value.localeCompare(
                          b.Location[0]["dcTrack Location Code *"].value
                        );
                      });
                      setLocationData(locationDataCopy);
                    }}>
                    <FaChevronUp />
                  </button>
                  <button
                    className="button orangeButton"
                    onClick={() => {
                      let locationDataCopy = structuredClone(locationData);
                      locationDataCopy = locationDataCopy.sort((a, b) => {
                        return b.Location[0]["dcTrack Location Code *"].value.localeCompare(
                          a.Location[0]["dcTrack Location Code *"].value
                        );
                      });
                      setLocationData(locationDataCopy);
                    }}>
                    <FaChevronDown />
                  </button>
                </div>
              </div>
              <div className="flex flex-row gap-4 bg-[#F7F5F1] items-center">
                <label className="pl-4">Location Name:</label>
                <div className="flex flex-row gap-2">
                  <button
                    className="button orangeButton"
                    onClick={() => {
                      let locationDataCopy = structuredClone(locationData);
                      locationDataCopy = locationDataCopy.sort((a, b) => {
                        return a.Location[0]["dcTrack Location Name *"].value.localeCompare(
                          b.Location[0]["dcTrack Location Name *"].value
                        );
                      });
                      setLocationData(locationDataCopy);
                    }}>
                    <FaChevronUp />
                  </button>
                  <button
                    className="button orangeButton"
                    onClick={() => {
                      let locationDataCopy = structuredClone(locationData);
                      locationDataCopy = locationDataCopy.sort((a, b) => {
                        return b.Location[0]["dcTrack Location Name *"].value.localeCompare(
                          a.Location[0]["dcTrack Location Name *"].value
                        );
                      });
                      setLocationData(locationDataCopy);
                    }}>
                    <FaChevronDown />
                  </button>
                </div>
              </div>
              <div className="flex flex-row gap-4 bg-[#F7F5F1] items-center">
                <label className="pl-4">Date Modified:</label>
                <div className="flex flex-row gap-2">
                  <button
                    className="button orangeButton"
                    onClick={() => {
                      let locationDataCopy = structuredClone(locationData);
                      locationDataCopy = locationDataCopy.sort((a, b) => {
                        return a.Current.DataBaseTime.localeCompare(b.Current.DataBaseTime);
                      });
                      setLocationData(locationDataCopy);
                    }}>
                    <FaChevronUp />
                  </button>
                  <button
                    className="button orangeButton"
                    onClick={() => {
                      let locationDataCopy = structuredClone(locationData);
                      locationDataCopy = locationDataCopy.sort((a, b) => {
                        return b.Current.DataBaseTime.localeCompare(a.Current.DataBaseTime);
                      });
                      setLocationData(locationDataCopy);
                    }}>
                    <FaChevronDown />
                  </button>
                </div>
              </div>
            </div>
            {locationData
              .filter((obj) => obj.Current.DataBaseUUID === UUID)
              .concat(locationData.filter((obj) => obj.Current.DataBaseUUID !== UUID))
              .map((item, index) => {
                let showButton = true;
                let Name = item.Location[0]["dcTrack Location Name *"].value;
                let Code = item.Location[0]["dcTrack Location Code *"].value;
                let Hierarchy = item.Location[0]["dcTrack Location Hierarchy *"].value;
                if (item.Current.DataBaseUUID === UUID) {
                  Name = fullState.Location[0]["dcTrack Location Name *"].value;
                  Code = fullState.Location[0]["dcTrack Location Code *"].value;
                  Hierarchy = fullState.Location[0]["dcTrack Location Hierarchy *"].value;

                  showButton = false;
                }
                console.log(item);
                return (
                  <div className={"border-2 w-full  py-3 px-2 rounded-md transition-all flex flex-col justify-start"}>
                    <div key={fullState + index} className={"flex flex-row  w-full px-2 h-full"}>
                      <div className="w-[2rem] flex flex-row justify-center items-center">
                        {!showButton ? <RiCheckboxFill className="text-[#f59439] text-2xl" /> : null}
                      </div>
                      <div className="lg:flex lg:flex-row justify-between md:grid md:grid-cols-2 w-full">
                        <div className="flex flex-row">
                          <div>
                            <label className="text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[7rem] h-[2rem] pl-2">
                              Location Code
                            </label>
                          </div>
                          <div>
                            <p className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"}>
                              {Code}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <div>
                            <label className="text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[7rem] h-[2rem] pl-2">
                              Location Name
                            </label>
                          </div>
                          <div>
                            <p className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"}>
                              {Name}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <div>
                            <label className="text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[7rem] h-[2rem] pl-2">
                              Hierarchy
                            </label>
                          </div>
                          <div>
                            <p className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"}>
                              {Hierarchy}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row justify-end">
                          {showButton ? (
                            <button
                              className="orangeButton w-[2.5rem]"
                              onClick={() => {
                                if (saveConfirm) {
                                  downloadData(item);
                                  setSaveConfirm(false);
                                  setReload(!reload);
                                } else {
                                  document.getElementById("confirmationDialog").style.display = "flex";
                                }
                              }}>
                              <TbDownload />
                            </button>
                          ) : (
                            <button
                              className="w-[2.5rem] orangeButton"
                              onClick={() => {
                                setSaveConfirm(true);
                                saveData(item);
                                setReload(!reload);
                              }}>
                              <RiSaveFill />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      id="LocationCard"
                      className="h-[0rem] overflow-clip transition-all flex flex-col justify-center">
                      <div className="flex flex-row justify-end w-full">
                        {showButton ? null : <p className="text-[red] text-sm">Save data to see most recent changes</p>}
                      </div>
                      <div className="border-2 rounded-md p-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
                        <div>Building: {item.SurveySite[0]["Building"].value}</div>
                        <div>Room Number: {item.SurveySite[0]["ATG Room Number"].value}</div>
                        <div>Site Contact Email: {item.SurveySite[0]["Site Contact Email"].value}</div>
                        <div>Site Contact Phone: {item.SurveySite[0]["Site Contact Phone"].value}</div>
                        <div>Updated: {Functions.formatTimestamp(item.Current.DataBaseTime)}</div>
                      </div>
                      <div className="border-2 rounded-md p-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
                        <div>Cabinets: {item.Racks.length}</div>
                        <div>Assets:{item.Assets.length}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="text-lg">No Locations Created</div>
        )}
      </div>
      {loading ? <LoadingSpinner /> : null}
      {/* <LoadingSpinner /> */}
      <div id="confirmationDialog" className="dialog">
        <div className="bg-white p-3 rounded-md">
          <p>Replace Current Data without Saving?</p>
          <div className="flex flex-row justify-between">
            <button
              id="yesButton"
              className="orangeButton"
              onClick={() => {
                document.getElementById("confirmationDialog").style.display = "none";
                setSaveConfirm(true);
              }}>
              Yes
            </button>
            <button
              id="noButton"
              className="redButton"
              onClick={() => {
                document.getElementById("confirmationDialog").style.display = "none";
                setSaveConfirm(false);
              }}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
