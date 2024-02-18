import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";
import Head from "next/head";

const HomePage = () => {
  return (
    <div className="">
      <Head>
        <title>Pizza Theatre</title>
      </Head>
      <Navbar />
      <Landing />
    </div>
  );
};

export default HomePage;
