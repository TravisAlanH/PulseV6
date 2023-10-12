import React from "react";
import * as FireActions from "../../FireActions";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../../firebase";

import LoadingSpinner from "../Reuse/LoadingSpinner/Spinner";
import { TbDownload } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../Store/Slices/Slice";

export default function HomeLayout() {
  const [locationCode, setLocationCode] = React.useState("");
  const [locationData, setLocationData] = React.useState([]);
  const [existMessageShow, setExistMessageShow] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const UUID = useSelector((state) => state.data.Current.DataBaseUUID);

  console.log(UUID);

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
      // console.log("location Data useEffect", locationData);
    };
    data().catch((error) => {
      setLoading(false);
      console.error("Error adding document: ", error);
    });
  }, [reload, user.uid]);

  function createLocation(e) {
    let LocationTest = [];
    e.preventDefault();
    //! get Location data
    setLoading(true);
    const data = async () => {
      const db = getFirestore(app);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLocationData(docSnap.data().LocationsList);
        LocationTest = docSnap.data().LocationsList;
        for (let i = 0; i < LocationTest.length; i++) {
          if (LocationTest[i].Location[0]["dcTrack Location Code *"].value === locationCode) {
            setExistMessageShow(true);
            setLoading(false);
            return;
          }
        }
      }
    };
    data().catch((error) => {
      setLoading(false);
      console.error("Error adding document: ", error);
    });
    //! Create Location Template
    let stateTemplate = structuredClone(state);
    stateTemplate.Location[0]["dcTrack Location Code *"].value = locationCode;
    stateTemplate.Current.DataBaseUUID = uuidv4();
    console.log(stateTemplate);
    //! Add to Database
    FireActions.addToLocations(user, stateTemplate, reload).then(() => {
      setLoading(false);
      setReload(!reload);
    });

    // setLocationData(FireActions.addToLocations(user, stateTemplate, reload));

    //! Reset Template
    // setLocationCode("");
  }

  function setStateData(item) {
    const changeIndex = locationData.findIndex((location) => UUID === location.Current.DataBaseUUID);

    if (changeIndex !== -1) {
      FireActions.changeLocationAtIndex(changeIndex, item, user).then(() => {
        const payload = { value: item };
        dispatch(Actions.setAllStateDataToActionPayloadValue(payload));
      });
    } else {
      const payload = { value: item };
      dispatch(Actions.setAllStateDataToActionPayloadValue(payload));
    }
  }

  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        Created Locations
      </div>
      <div className="flex flex-col gap-3 w-full items-center justify-center p-2 border-b-2 mb-2">
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
        {existMessageShow ? <div className="text-sm text-red-500">** Location Code in Use **</div> : null}
      </div>
      <div className="flex flex-col justify-center gap-6 px-6">
        {locationData.length > 0 ? (
          <div>
            {locationData.map((item, index) => {
              return (
                <div key={index} className="border-b-2 w-full py-3">
                  <div className="lg:flex lg:flex-row justify-between md:grid md:grid-cols-2">
                    <div className="flex flex-row">
                      <div>
                        <label className="text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[7rem] h-full pl-2">
                          Location Code
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"}
                          value={item.Location[0]["dcTrack Location Code *"].value}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div>
                        <label className="text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[7rem] h-full pl-2">
                          Location Name
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"}
                          defaultValue={item.Location[0]["dcTrack Location Name *"].value}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div>
                        <label className="text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[7rem] h-full pl-2">
                          Hierarchy
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          className={"h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit w-[10rem]"}
                          defaultValue={item.Location[0]["dcTrack Location Hierarchy *"].value}
                        />
                      </div>
                    </div>
                    <button className="orangeButton w-[2.5rem]" onClick={() => setStateData(item)}>
                      <TbDownload />
                    </button>
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
    </div>
  );
}
