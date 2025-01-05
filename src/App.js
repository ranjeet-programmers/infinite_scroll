import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import "./styles.css";

const randomNameGenerator = (length = 21) => {
  let nameArray = "";
  for (let index = 0; index < length; index++) {
    const value = 40 + parseInt(Math.random() * 10000);
    nameArray = nameArray + String.fromCharCode(value);
  }
  return nameArray;
};

const mockApi = async (len = 20) => {
  const data = new Array(len).fill("").map((v, index) => randomNameGenerator());
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

export default function App() {
  const [data, setData] = useState([]);
  const loaderRef = useRef(null);

  const getData = async () => {
    const data = await mockApi(8);
    setData((pre) => [...pre, ...data]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
        if (entry.isIntersecting) {
          console.log(entry);
          getData();
        }
      },
      { rootMargin: "100px", threshold: 0 }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  // console.log(randomNameGenerator());
  return (
    <div style={{ height: "10vh", width: "100%" }}>
      {data.length === 0 ? (
        <Card name={"NO DATA"} />
      ) : (
        data.map((row, index) => (
          <Card key={row} name={row} index={index + 1} />
        ))
      )}
      <div
        ref={loaderRef}
        style={{
          height: "50px",
          background: "lightcoral",
          textAlign: "center",
        }}
      >
        Loading more...
      </div>
    </div>
  );
}
