import { useState, useEffect } from "react";
import { Text, StyleSheet, Button } from "react-native";

getMinAndSeconds = (time) => {
  mins = Math.floor(time / 60);
  seconds = time % 60;
  const text = `${mins < 10 ? "0" + mins : mins} : ${
    seconds < 10 ? "0" + seconds : seconds
  }`;
  return text;
};

const AudioTimer = ({ recordState, sound }) => {
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    var timer = null;
    if (recordState === "STARTED") {
      timer = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (recordState === "STOPPED") {
      clearInterval(timer);
    } else if (recordState === "NOT_STARTED") {
      setTime(0);
    } else if (recordState=== "PLAY") {
      if(!sound) {
        setTime(0)
      }
      timer = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (recordState === "PAUSE"){
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [recordState]);

  return (
      <Text style={styles.textStyle}>{getMinAndSeconds(time)}</Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: "center",
    //  backgroundColor: 'red',
    fontSize: 20,
    color: "#636262",
    marginBottom: 20,
  },
});

export default AudioTimer;
