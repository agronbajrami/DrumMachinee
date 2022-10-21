import React, { useState } from "react";
import style from "./Drummachine.module.scss";
import DrumMachineContent from "./DrumMachineContent";
import { Button, Modal } from "antd";

const Drummachine = () => {
  return (
    <div className={style.main}>
      <div className={style.cards}>
        <DrumMachineContent />
      </div>
    </div>
  );
};

export default Drummachine;
