import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import Drummachine from "../components/Drummachine";
import { useState } from "react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Drummachine />
    </div>
  );
};

export default Home;
