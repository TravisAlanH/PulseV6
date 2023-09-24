import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../Store/Slices/Slice";

import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

export default function Scanner({ Step, keyName }) {
  const current = useSelector((state) => state.data.Current[Step]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   let payload = {
  //     Step: Step,
  //     Current: current,
  //     Key: keyName,
  //     value: undefined,
  //   };
  //   const Scanner = new Html5QrcodeScanner(
  //     "reader",
  //     {
  //       fps: 10,
  //       qrbox: { width: 250, height: 250 },
  //       rememberLastUsedCamera: true,
  //       // Only support camera scan type.
  //       supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  //     },
  //     false
  //   );

  //   Scanner.render(onScanSuccess);
  //   function onScanSuccess(qrCodeMessage) {
  //     Scanner.clear();
  //     payload.value = qrCodeMessage;
  //     dispatch(Actions.changeData(payload));
  //     let modal = document.getElementById("ScanModal");
  //     modal.style.display = "none";
  //   }
  // }, [Step, keyName, current, dispatch]);

  window.onclick = function (event) {
    let modal = document.getElementById("ScanModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  return (
    <div>
      <button
        className="orangeButton w-[4rem]"
        onClick={() => {
          let payload = {
            Step: Step,
            Current: current,
            Key: keyName,
            value: undefined,
          };
          const Scanner = new Html5QrcodeScanner(
            "reader",
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
              rememberLastUsedCamera: true,
              // Only support camera scan type.
              supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            },
            false
          );

          Scanner.render(onScanSuccess);
          function onScanSuccess(qrCodeMessage) {
            Scanner.clear();
            payload.value = qrCodeMessage;
            dispatch(Actions.changeData(payload));
            let modal = document.getElementById("ScanModal");
            modal.style.display = "none";
          }
          let modal = document.getElementById("ScanModal");
          modal.style.display = "block";
        }}>
        Scan
      </button>
      {/* Modal */}
      <div className="modal" id="ScanModal">
        <div className="modal-content flex flex-col gap-2">
          <span
            className="close"
            onClick={() => {
              let modal = document.getElementById("ScanModal");
              modal.style.display = "none";
            }}>
            &times;
          </span>

          {/*  */}
          <div className="" id="reader"></div>
          {/*  */}
        </div>
      </div>
    </div>
  );
}
