import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import { MenuPicture } from "../Components/ProfilePicture";
import DateTimePicker from "@react-native-community/datetimepicker";
import { dateComplete, dateMonth, ShowMonth } from "../Components/Date";
import { getTimers } from "../Services/TimerRegister/TimerUser";
import { ModalReload } from "../Components/Modal";
import { DateTimer, DateTimerData } from "../Components/Calendar";
import MonthPicker from 'react-native-month-year-picker';
// NAVIGATIONS IMPORT
export const TimerData = () => {
  const navigation = useNavigation();
  // DATE PICKER MONTH
  const [dateTmp, setDateTmp] = React.useState(dateMonth());
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [mode, setMode] = React.useState("date");
  // DATE PICKER DATE
  const [dateDay, setDateDay] = React.useState(dateComplete());
  const [dateNotChange, setDateNotChange] = React.useState(dateComplete());
  const [date1, setDate1] = React.useState(new Date());
  const [showDay, setShowDay] = React.useState(false);
  const [change, setChange] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  let textMonth = ShowMonth(dateTmp);
  let totalDay = 0;
  let totalExtra = 0;
  // ESTADO
  // DATE PICKER MONTH
  const [dataTime, setDataTime] = React.useState();
  if (dataTime != null || dataTime != undefined) {
    totalDay = dataTime.totalDay;
    totalExtra = dataTime.totalExtraDay;
  }
  React.useEffect(() => {
    getTimers(setDataTime, date1);
  }, []);
  let ActualizacionTime = () => {
    if (change == true) {
      return <></>;
    } else {
      return <ComponenteCarga />;
    }
  };
  let ComponenteBottom = () => {
    if (search == false) {
      return (
        <Button
          mode="contained"
          color={"#6DC0D5"}
          style={styles.buttonStyle}
          labelStyle={styles.buttonTextStyle}
          onPress={async () => {
            setChange(true);
            getTimers(setDataTime, date1);
            setChange(false);
            setSearch(true);
          }}
        >
          Buscar
        </Button>
      );
    } else {
      if (dataTime == null) {
        return (
          <Button
            mode="contained"
            color={"#6DC0D5"}
            style={styles.buttonStyle}
            disabled={true}
            labelStyle={styles.buttonTextStyle}
            onPress={async () => {
              navigation.navigate("TIMERMOREDATA", {
                timeMoreData: dataTime,
                DayEfe: date1.getDay(),
              });
            }}
          >
            MAS DETALLES
          </Button>
        );
      } else {
        return (
          <Button
            mode="contained"
            color={"#6DC0D5"}
            style={styles.buttonStyle}
            disabled={false}
            labelStyle={styles.buttonTextStyle}
            onPress={async () => {
              navigation.navigate("TIMERMOREDATA", {
                timeMoreData: dataTime,
                DayEfe: date1.getDay(),
              });
            }}
          >
            MAS DETALLES
          </Button>
        );
      }
    }
  };
  let ComponenteCarga = () => {
    if (search == true) {
      if (dataTime == null) {
        return (
          <>
            <DateTimerData dayNumber={date1.getDay()} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}> JORNADA DIARIA: </Text>
              <Text style={styles.textSubtitle}>0 HORAS</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}> HORAS EXTRA: </Text>
              <Text style={styles.textSubtitle}>0 HORAS</Text>
            </View>
            <Text style={{ fontSize: 15, color: "red", fontWeight: "bold" }}>
              NO HAY DATOS REGISTRADOS EL DIA {date1.getDate()}
            </Text>
          </>
        );
      } else {
        return (
          <>
            <DateTimerData dayNumber={date1.getDay()} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}> JORNADA DIARIA: </Text>
              <Text style={styles.textSubtitle}>
                {dataTime == null ? "0" : totalDay} HORAS
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}> HORAS EXTRA: </Text>
              <Text style={styles.textSubtitle}>
                {dataTime == null ? "0" : totalExtra} HORAS
              </Text>
            </View>
          </>
        );
      }
    } else {
      return <></>;
    }
  };


  const showPicker = (value) => setShow(value);

  const onValueChange = (event, newDate) => {
    const selectedDate = newDate || date;
    showPicker(false);
    setDate(selectedDate);
  };
  // DATE PCIKER DIA
  const showModeDay = (currentMode) => {
    setShowDay(true);
    setMode(currentMode);
  };
  const onChangeDay = async (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShowDay(Platform.OS === "windows");
    setDate1(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      (tempDate.getDate() < 10 ? "0" : "") +
      tempDate.getDate() +
      "-" +
      (tempDate.getMonth() < 9 ? "0" : "") +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getFullYear();
    setDateDay(fDate);
    setSearch(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <View style={[styles.incontainer2]}>
          <View style={{ width: Dimensions.get("window").width / 2.3 }}>
            <Text style={styles.textinContainer2}>
              {global.name} {global.lastName}
            </Text>
            <Text style={styles.text2inContainer2}>{global.workStation}</Text>
          </View>
          <View>
            <MenuPicture colorBackground={"#6DC0D5"} />
          </View>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textCalendar}> SELECCIONA EL MES: </Text>
          <Text>{(date, "MM-YYYY")}</Text>
          <IconButton
            icon={"calendar-month"}
            iconColor={"black"}
            size={Dimensions.get("window").width / 12}
            onPress={async () => {
              showPicker(true);
            }}
          />
        </View>
        <View>
          <Text style={styles.textMonth}>{textMonth}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textTitle}> HORAS MENSUALES: </Text>
          <Text style={styles.textSubtitle}>{global.totalMonth} HORAS</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textTitle}> HORAS EXTRAS: </Text>
          <Text style={styles.textSubtitle}>{global.extraMonth} HORAS</Text>
        </View>
        <View>
          <Text style={styles.textMonthDetails}>DETALLES</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textCalendar}> SELECCIONA EL DIA: </Text>
          <Text style={styles.textCalendar}>{dateDay}</Text>
          <IconButton
            icon={"calendar-month"}
            iconColor={"black"}
            size={Dimensions.get("window").width / 12}
            onPress={async () => {
              showModeDay(), console.log(ShowMonth(dateTmp));
            }}
          />
        </View>
        <ActualizacionTime />
        <View>
          <ComponenteBottom />
        </View>
        {show && (
         <MonthPicker
         onChange={onValueChange}
         value={date}
         minimumDate={new Date()}
         maximumDate={new Date(2025, 5)}
       />
        )}
        {showDay && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date1}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeDay}
            maximumDate={new Date()}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container3: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#3D3D3D",
    alignItems: "center",
    width: Dimensions.get("window").width,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,
    shadowColor: "black",
  },
  container2: {
    flex: 3,
    alignItems: "center",
    backgroundColor: "white",
    width: Dimensions.get("window").width,
  },
  buttonSubtittleStyle: {
    fontWeight: "bold",
    fontSize: 45,
  },
  incontainer2: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    position: "relative",
    width: Dimensions.get("window").width / 1.09,
    maxHeight: 100,
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 4,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    borderColor: "#6DC0D5",
    shadowRadius: 16.0,
    elevation: 24,
  },
  textinContainer2: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 20,
  },
  text2inContainer2: {
    fontSize: 18,
    textAlign: "center",
  },
  buttonSubtittleStyle: {
    fontWeight: "bold",
    fontSize: 15,
  },
  textCalendar: {
    fontSize: 15,
    paddingTop: Dimensions.get("window").width / 17,
    paddingHorizontal: Dimensions.get("window").height / 40,
    fontWeight: "bold",
  },
  textMonth: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: Dimensions.get("window").width / 25,
  },
  textMonthDetails: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: Dimensions.get("window").width / 25,
  },
  textTitle: {
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: Dimensions.get("window").width / 30,
  },
  textSubtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2FDAA7",
    paddingVertical: Dimensions.get("window").width / 30,
  },
  buttonStyle: {
    borderRadius: 15,
    marginTop: 50,
    width: Dimensions.get("window").width / 1.5,
  },
  buttonTextStyle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
});
