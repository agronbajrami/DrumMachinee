import React, { Fragment, useEffect, useState } from "react";
import { Card } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import style from "./DrumMachineContent.module.scss";
import { Button, Modal, Select, notification, Form } from "antd";

const { Option } = Select;

const cardsHashMap = new Map();
const indexHashMap = new Map();

import styles from "./DrumMachineContent.module.scss";

const DrumMachineContent = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hotKey, setHotKey] = useState<string>("");
  const [sound, setSound] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  const detectKeyDown = (e: any) => {
    const soundString = cardsHashMap.get(e.key.toUpperCase());
    if (soundString) {
      const audio = new Audio(`sounds/sounds/${soundString}.mp3`);
      audio.play();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
    return () => document.removeEventListener("keydown", detectKeyDown);
  }, []);

  const handleChange = (value: string) => {
    console.log(` drumsample ${value}`);
    setSound(`${value}`);
  };

  const handleChanges = (value: string) => {
    console.log(` keyboard  ${value}`);
    setHotKey(`${value}`);
  };

  const showModal = () => {
    console.log("showmodaliscalled");
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setHotKey("");
    setSound("");
  };

  const cardInfo = (i: number) => {
    const value = indexHashMap.get(i);
    const existsIndex = Array.from(indexHashMap.values()).findIndex(
      (key) => key === hotKey
    );
    if (existsIndex !== -1 && existsIndex !== i) {
      notification.error({
        message: "This HotKey already exists, please choose another.",
      });
    } else if (hotKey && sound && value) {
      cardsHashMap.delete(value);
      cardsHashMap.set(hotKey, sound);
      indexHashMap.set(i, hotKey);
      hideModal();
    } else if (hotKey && sound && !value) {
      if (cardsHashMap.get(hotKey) === undefined) {
        cardsHashMap.set(hotKey, sound);
        indexHashMap.set(i, hotKey);
        hideModal();
      }
    } else {
      notification.error({ message: "please input both fields" });
    }
  };

  console.log("cardsHASHMAP", cardsHashMap);
  console.log("indexHashMapp", indexHashMap);

  const submitHandler = () => {
    cardInfo(index);
  };

  return (
    <div className={style.cards}>
      <div>
        <h2 className={style.title}>Drum Machine</h2>
        <div className={style.first}>
          {Array.from({ length: 12 }).map((_, i) => {
            return (
              <>
                <div className={style.firstcards}>
                  <Card
                    key={i}
                    onClick={function (event) {
                      const existingHotKey = indexHashMap.get(i);
                      const existingSound = cardsHashMap.get(existingHotKey);

                      if (indexHashMap.get(i)) setHotKey(existingHotKey);
                      if (existingSound) setSound(existingSound);
                      showModal();
                      setIndex(i);
                    }}
                    className={styles.card}
                  >
                    {indexHashMap.get(i) ? (
                      <div className={style.hotkeyandedit}>
                        <span className={style.hotkey}>
                          {indexHashMap.get(i)}
                          {console.log(cardsHashMap.get(indexHashMap.get(i)))}
                        </span>
                        <EditOutlined
                          style={{
                            position: "absolute",
                            width: "49px",
                            height: "49px",
                            bottom: "3px",
                            right: "3px",
                            backgroundColor: "white",
                            fontSize: "20px",
                            color: "black",
                            borderRadius: "16px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      </div>
                    ) : (
                      <PlusOutlined />
                    )}
                  </Card>
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div className={style.modalclass}>
        <Modal
          className={style.modal}
          maskStyle={{ backgroundColor: "gray", color: "white" }}
          width={300}
          bodyStyle={{
            backgroundColor: "#000000",
            borderRadius: "16px",
            color: "white",
          }}
          open={isModalOpen}
          onCancel={hideModal}
          footer={null}
        >
          <p style={{ color: "white" }}>Drum Sample</p>
          <Select
            className={style.select}
            placeholder='Enter your sample'
            dropdownStyle={{ backgroundColor: "gray" }}
            style={{
              width: "100%",
              borderRadius: "10px",
            }}
            onChange={handleChange}
            value={sound}
          >
            <Option value='crash'>crash</Option>
            <Option value='kick-bass'>kick-bass</Option>
            <Option value='snare'>snare</Option>
            <Option value='tom-1'>tom-1</Option>
            <Option value='tom-2'>tom-2</Option>
            <Option value='tom-3'>tom-3</Option>
            <Option value='tom-4'>tom-4</Option>
          </Select>
          <p style={{ color: "white" }}>Keyboard Shortcut</p>
          <Select
            className={style.select}
            placeholder='Enter your  shortcut'
            dropdownStyle={{ backgroundColor: "gray" }}
            style={{
              width: "100%",
              borderRadius: "10px",
            }}
            onChange={handleChanges}
            value={hotKey}
          >
            {Array.from("QWERTYASDFGH").map((letter) => (
              <Option key={letter} value={letter}>
                {letter}
              </Option>
            ))}
          </Select>

          <Button
            onClick={submitHandler}
            style={{
              marginTop: "2rem",
              width: "100%",
              backgroundColor: "#0085FF",
              color: "white",
              height: "2.5rem",
            }}
          >
            SAVE
          </Button>
        </Modal>
      </div>
    </div>
  );
};

export default DrumMachineContent;
