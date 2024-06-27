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
import ImportButton from "./Import/ImportButton";
import { SMALLtoLARGE, LARGEtoSMALL } from "./ResizeData";

//    // "@babel/plugin-transform-private-property-in-object": "^7.24.7",

export default function HomeLayout() {
  const [locationCode, setLocationCode] = React.useState("");
  const [locationData, setLocationData] = React.useState([]);
  const [existMessageShow, setExistMessageShow] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const UUID = useSelector((state) => state.data.Current.DataBaseUUID);
  const fullState = useSelector((state) => state.data);
  const [saveConfirm, setSaveConfirm] = React.useState(
    UUID === "" ? true : false
  );
  const [downloadedItem, setDownloadedItem] = React.useState({});

  const dispatch = useDispatch();

  const user = FireActions.auth.currentUser;

  React.useEffect(() => {
    setLoading(true);
    const data = async () => {
      const db = getFirestore(app);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let incomingData = docSnap.data().LocationsList;
        let dataHold = [];
        for (let i = 0; i < incomingData.length; i++) {
          if (typeof incomingData[i] === "string") {
            dataHold.push(JSON.parse(incomingData[i]));
          } else {
            dataHold.push(incomingData[i]);
          }
        }
        // if (user.displayName === "Travis Heidelberger") {
        let dataHold2 = [];
        let settingsPush = [];
        dataHold.forEach((element) => {
          settingsPush.push({
            DataBaseUUID: element.Current.DataBaseUUID,
            dcTrackLocationCode:
              element.Location[0]["dcTrack Location Code *"].value,
            NamingCon: element.Current.NamingCon ?? [],
          });
        });
        localStorage.setItem("NamingList", JSON.stringify(settingsPush));
        console.log(settingsPush);
        for (let i = 0; i < dataHold.length; i++) {
          dataHold2.push(SMALLtoLARGE(dataHold[i]));
          console.log(
            dataHold2[i]["Location"][0]["dcTrack Location Code *"].value
          );
        }
        setLocationData(dataHold2);
        // } else {
        //   setLocationData(dataHold);
        // }
        // setLocationData((docSnap.data().LocationsList));
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    data().catch((error) => {
      setLoading(false);
      console.error("Error adding document: ", error);
    });
  }, [reload, user.uid, user.displayName]);

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
      if (
        locationData[i].Location[0]["dcTrack Location Code *"].value ===
          locationCode ||
        locationCode === ""
      ) {
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

  function newSaveData(item) {
    let holdItem = structuredClone(item);
    console.log("Old Save Data", holdItem);
    // if (user.displayName === "Travis Heidelberger") {
    holdItem = LARGEtoSMALL(holdItem);
    console.log("New Save Datas", holdItem);
    holdItem.Current.DataBaseTime = Functions.getCurrentTimeInFormat();
    // } else {
    //   holdItem.Current.DataBaseTime = Functions.getCurrentTimeInFormat();
    // }
    setLoading(true);
    setSaveConfirm(true);
    FireActions.replaceLocationWithUpdate(holdItem).then(() => {
      setLoading(false);
    });
    setReload(!reload);
  }

  function downloadData(item) {
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
    setSaveConfirm(false);
  }

  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                  BREAK RETURN                                  ||
  // ! ||--------------------------------------------------------------------------------||

  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        Created Locations
      </div>
      <div className="flex flex-col gap-3 w-full items-center justify-center p-2 border-b-2 mb-2">
        <div className="flex flex-row">
          {CreateLocationForm()}
          <button
            className="orangeButton ml-3"
            onClick={() => {
              let cards = document.querySelectorAll("#LocationCard");
              if (cards.length === 0) return;
              if (cards[0].classList.contains("extended")) {
                for (let i = 0; i < cards.length; i++) {
                  cards[i].classList.remove("extended");
                  cards[i].classList.remove("h-[12rem]");
                  cards[i].classList.add("h-[0rem]");
                }
              } else {
                for (let i = 0; i < cards.length; i++) {
                  cards[i].classList.add("extended");
                  cards[i].classList.remove("h-[0rem]");
                  cards[i].classList.add("h-[12rem]");
                }
              }
            }}
          >
            <ImMenu3 />
          </button>
          <ImportButton />
        </div>
        {existMessageShow ? (
          <div className="text-sm text-red-500">** Location Code in Use **</div>
        ) : null}
      </div>
      <div className="flex flex-col justify-center gap-6 px-6 pb-4">
        {locationData.length > 0 ? (
          <div className="flex flex-col gap-2">
            {LocationSorting()}
            {locationData
              .filter((obj) => obj.Current.DataBaseUUID === UUID)
              .concat(
                locationData.filter((obj) => obj.Current.DataBaseUUID !== UUID)
              )
              .map((item, index) => {
                let showButton = true;
                let Name = item.Location[0]["dcTrack Location Name *"].value;
                let Code = item.Location[0]["dcTrack Location Code *"].value;
                // console.log(Code);
                let Hierarchy =
                  item.Location[0]["dcTrack Location Hierarchy *"].value;
                if (item.Current.DataBaseUUID === UUID) {
                  Name = fullState.Location[0]["dcTrack Location Name *"].value;
                  Code = fullState.Location[0]["dcTrack Location Code *"].value;
                  Hierarchy =
                    fullState.Location[0]["dcTrack Location Hierarchy *"].value;
                  showButton = false;
                }
                return (
                  <div
                    key={index}
                    className={
                      "border-2 w-full  py-3 px-2 rounded-md transition-all flex flex-col justify-start"
                    }
                  >
                    {LocationBaseDataCard(
                      index,
                      showButton,
                      Code,
                      Name,
                      Hierarchy,
                      item
                    )}
                    {LocationAdditionalDataCard(showButton, item)}
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
      {ReplacePopUp()}
    </div>
  );

  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                  BREAK RETURN                                  ||
  // ! ||--------------------------------------------------------------------------------||

  function LocationSorting() {
    return (
      <div className="w-full border-b-2 flex flex-row gap-4 justify-between py-2 text-sm">
        <div className="flex flex-row gap-4 bg-[#F7F5F1] items-center">
          <label className="pl-4">Location Code:</label>
          <div className="flex flex-row gap-2">
            <button
              className="button orangeButton"
              onClick={() => {
                let locationDataCopy = structuredClone(locationData);
                locationDataCopy = locationDataCopy.sort((a, b) => {
                  return a.Location[0][
                    "dcTrack Location Code *"
                  ].value.localeCompare(
                    b.Location[0]["dcTrack Location Code *"].value
                  );
                });
                setLocationData(locationDataCopy);
              }}
            >
              <FaChevronUp />
            </button>
            <button
              className="button orangeButton"
              onClick={() => {
                let locationDataCopy = structuredClone(locationData);
                locationDataCopy = locationDataCopy.sort((a, b) => {
                  return b.Location[0][
                    "dcTrack Location Code *"
                  ].value.localeCompare(
                    a.Location[0]["dcTrack Location Code *"].value
                  );
                });
                setLocationData(locationDataCopy);
              }}
            >
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
                  return a.Location[0][
                    "dcTrack Location Name *"
                  ].value.localeCompare(
                    b.Location[0]["dcTrack Location Name *"].value
                  );
                });
                setLocationData(locationDataCopy);
              }}
            >
              <FaChevronUp />
            </button>
            <button
              className="button orangeButton"
              onClick={() => {
                let locationDataCopy = structuredClone(locationData);
                locationDataCopy = locationDataCopy.sort((a, b) => {
                  return b.Location[0][
                    "dcTrack Location Name *"
                  ].value.localeCompare(
                    a.Location[0]["dcTrack Location Name *"].value
                  );
                });
                setLocationData(locationDataCopy);
              }}
            >
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
                  return a.Current.DataBaseTime.localeCompare(
                    b.Current.DataBaseTime
                  );
                });
                setLocationData(locationDataCopy);
              }}
            >
              <FaChevronUp />
            </button>
            <button
              className="button orangeButton"
              onClick={() => {
                let locationDataCopy = structuredClone(locationData);
                locationDataCopy = locationDataCopy.sort((a, b) => {
                  return b.Current.DataBaseTime.localeCompare(
                    a.Current.DataBaseTime
                  );
                });
                setLocationData(locationDataCopy);
              }}
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
      </div>
    );
  }

  function LocationBaseDataCard(
    index,
    showButton,
    Code,
    Name,
    Hierarchy,
    item
  ) {
    return (
      <div
        key={fullState + index}
        className={"flex flex-row  w-full px-2 h-full"}
      >
        <div className="w-[2rem] flex flex-row justify-center items-center">
          {!showButton ? (
            <RiCheckboxFill className="text-[#f59439] text-2xl" />
          ) : null}
        </div>
        <div className="lg:flex lg:flex-row justify-between md:grid md:grid-cols-2 w-full">
          <div className="flex flex-row">
            <div>
              <label className="text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[7rem] h-[2rem] pl-2">
                Location Code
              </label>
            </div>
            <div>
              <p
                className={
                  "h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"
                }
              >
                {Code.length > 12 ? Code.substring(0, 12) + "..." : Code}
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
              <p
                className={
                  "h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"
                }
              >
                {Name.length > 12 ? Name.substring(0, 12) + "..." : Name}
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
              <p
                className={
                  "h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"
                }
              >
                {Hierarchy.length > 12
                  ? Hierarchy.substring(0, 12) + "..."
                  : Hierarchy}
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
                    setReload(!reload);
                  } else {
                    setDownloadedItem(item);
                    document.getElementById(
                      "confirmationDialog"
                    ).style.display = "flex";
                  }
                }}
              >
                <TbDownload />
              </button>
            ) : (
              <button
                className="w-[2.5rem] orangeButton"
                onClick={() => {
                  newSaveData(fullState);
                  // saveData(item);
                  setReload(!reload);
                }}
              >
                <RiSaveFill />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  function LocationAdditionalDataCard(showButton, item) {
    return (
      <div
        id="LocationCard"
        className="h-[0rem] overflow-clip transition-all flex flex-col justify-center"
      >
        <div className="flex flex-row justify-end w-full">
          {showButton ? null : (
            <p className="text-[red] text-sm">
              Save data to see most recent changes
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="border-2 rounded-md p-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
            <div>Building: {item.SurveySite[0]["Building"].value}</div>
            <div>
              Room Number: {item.SurveySite[0]["ATG Room Number"].value}
            </div>
            <div>
              Site Contact Name:{" "}
              {item.SurveySite[0]["Local Site Contact"].value}
            </div>
            <div>
              Site Contact Email:{" "}
              {item.SurveySite[0]["Site Contact Email"].value}
            </div>
            <div>
              Site Contact Phone:{" "}
              {item.SurveySite[0]["Site Contact Phone"].value}
            </div>
            <div>
              Updated: {Functions.formatTimestamp(item.Current.DataBaseTime)}
            </div>
          </div>
          <div className="border-2 rounded-md p-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
            <div>Cabinets: {item.Racks.length}</div>
            <div>Assets:{item.Assets.length}</div>
            <div>PDU: {item.PDUs.length}</div>
            <div>
              {/* Structured Cable Connections: {item.StructuredCabling.length} */}
            </div>
            <div></div>
            <div className="flex flex-row justify-end">
              <button className="redButton">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ReplacePopUp() {
    return (
      <div id="confirmationDialog" className="dialog">
        <div className="bg-white p-3 rounded-md w-[20rem]">
          <div className="flex flex-row justify-between">
            <p className="font-bold">Warning:</p>
            <p
              onClick={() => {
                document.getElementById("confirmationDialog").style.display =
                  "none";
                document.getElementById("confirmChange").checked = false;
                setSaveConfirm(false);
              }}
            >
              X
            </p>
          </div>
          <p>Replace Current Data without Saving?</p>
          <p className="text-xs">
            The current data that is saved locally is not synced with the
            database, continuing will remove your local data and replace it with
            the location data you selected
          </p>
          <div
            className="flex flex-row items-center justify-center gap-2"
            id="confirmBox"
          >
            <label>{"Replace: "}</label>
            <input
              type="checkbox"
              id="confirmChange"
              className="w-[1.5rem] h-[1.5rem]"
              onChange={(e) => {
                setSaveConfirm(e.target.checked);
                document.getElementById("confirmBox").classList.remove("p-2");
                document
                  .getElementById("confirmBox")
                  .classList.remove("border-2");
                document
                  .getElementById("confirmBox")
                  .classList.remove("border-red-500");
              }}
            />
          </div>
          <br></br>

          <div className="flex flex-row justify-between">
            <div></div>
            <button
              id="yesButton"
              className="orangeButton"
              onClick={() => {
                let confirm = document.getElementById("confirmChange").checked;
                if (confirm) {
                  downloadData(downloadedItem);
                  setReload(!reload);
                  document.getElementById("confirmationDialog").style.display =
                    "none";
                  document.getElementById("confirmChange").checked = false;
                } else {
                  document.getElementById("confirmBox").classList.add("p-2");
                  document
                    .getElementById("confirmBox")
                    .classList.add("border-2");
                  document
                    .getElementById("confirmBox")
                    .classList.add("border-red-500");
                }
              }}
            >
              Yes
            </button>
            <button
              id="noButton"
              className="redButton"
              onClick={() => {
                document.getElementById("confirmationDialog").style.display =
                  "none";
                setSaveConfirm(false);
                document.getElementById("confirmChange").checked = false;
              }}
            >
              No
            </button>
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  function CreateLocationForm() {
    return (
      <form className="flex flex-row" onSubmit={createLocation}>
        <div className="w-[1rem] flex flex-row justify-center items-center text-red-500">
          *
        </div>
        <label
          className={
            "text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[11rem] pl-2"
          }
        >
          dcTrack Location Code
        </label>
        <input
          type="text"
          required={true}
          className={
            "h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"
          }
          placeholder="Location Name"
          defaultValue={locationCode}
          onChange={(e) => {
            setLocationCode(e.target.value);
            setExistMessageShow(false);
          }}
        />
        <input
          type="submit"
          className="orangeButton ml-3"
          value={"Create Location"}
        />
      </form>
    );
  }
}
