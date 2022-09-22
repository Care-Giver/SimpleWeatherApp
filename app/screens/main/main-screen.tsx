/* eslint-disable camelcase */
import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  LayoutAnimation,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, FormRow, GradientBackground, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { FontAwesome } from "@expo/vector-icons"
import { Api } from "../../services/api"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
  paddingHorizontal: spacing[5],
}

const DATE_TXT: TextStyle = {
  color: "#2196f3",
  fontSize: 34,
  paddingBottom: 0,
  alignSelf: "center",
  marginTop: 20,
}

const TIME_TXT: TextStyle = {
  fontSize: 54,
  color: "white",
  alignSelf: "center",
}

const CITY_TXT: TextStyle = {
  color: "white",
  marginTop: 60,
  fontSize: 40,
  textDecorationStyle: "dashed",
  textDecorationLine: "underline",
  fontWeight: "bold",
}

const WEATHER_BOXES: ViewStyle = {
  // flexDirection: "row",
  width: "100%",
  height: 400,
  // backgroundColor: "red",
  justifyContent: "space-between",
  marginTop: 60,
}

const WEATHER_BOX: ViewStyle = {
  // width: "20%",
  // height: " 30%",
  paddingVertical: 20,
  paddingHorizontal: 12,
  flexDirection: "row",
  alignItems: "center",
  borderRadius: 8,
}

const FUTURE_TIME_TXT: TextStyle = {
  color: "black",
  fontSize: 20,
}

const RAIN_TXT: TextStyle = {
  color: "black",
  fontSize: 40,
  fontWeight: "bold",
  marginLeft: "auto",
}

const BUTTON: ViewStyle = {
  // paddingHorizontal: 40,

  backgroundColor: "navy",
  alignSelf: "center",
  marginTop: "auto",
  marginBottom: 60,
  width: "100%",
  borderRadius: 12,
}
const BUTTON_TXT: TextStyle = {
  fontSize: 40,
  fontStyle: "italic",
}

const WeatherBox = ({ sky, rain, time }) => {
  let COLOR = ""

  switch (sky.fcstValue) {
    //? 하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
    case "1":
      COLOR = color.palette.white
      break
    case "3":
      COLOR = color.palette.lightGrey
      break
    case "4":
      COLOR = "grey"
      break
    default:
      COLOR = color.error
  }

  switch (time) {
    case 0:
      time = "30분 후"
      break
    case 1:
      time = "1시간 \n 30분 후"
      break
    case 2:
      time = "3시간 \n 30분 후"
      break
    case 6:
      time = "6시간 \n 30분 후"
      break
    default:
      time = "NULL"
  }
  return (
    <View style={[WEATHER_BOX, { backgroundColor: COLOR }]}>
      <Text preset="fieldLabel" text={time} style={[FUTURE_TIME_TXT]} />
      <Text preset="fieldLabel" text={rain.fcstValue} style={[RAIN_TXT, { marginLeft: "auto" }]} />
    </View>
  )
}

// @ts-ignore
export const MainScreen: FC<StackScreenProps<NavigatorParamList, "main">> = observer(
  function MainScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const [city, setCity] = useState("경기도 하남시 미사1동")
    const [currentTime, setTime] = useState(null)
    const [currentDay, setDay] = useState(null)
    const [weatherData, setWeatherData] = useState(null)
    const [baseDate, setBaseDate] = useState(null)
    const [baseTime, setBaseTime] = useState(null)

    const daysArray = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ]

    const getCurrentTime = () => {
      const now = new Date()
      let hour = now.getHours()
      let minutes = now.getMinutes()
      let seconds = now.getSeconds()
      let am_pm = "PM"

      if (hour < 10) {
        hour = "0" + hour
      }

      if (hour > 12) {
        hour = "0" + (hour - 12)
      }
      if (hour === 0);
      hour = hour = 12

      if (minutes === 0) {
        minutes = "00"
      }

      if (minutes < 10) {
        minutes = "0" + minutes
      }

      if (seconds < 10) {
        seconds = "0" + seconds
      }

      if (now.getHours() < 12) am_pm = "AM"

      setTime(am_pm + " " + hour + ":" + minutes + ":" + seconds)

      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let date = now.getDate()
      if (month < 10) {
        month = "0" + month
      }

      setBaseDate(year + month + date)

      let _hour = (now.getHours() - 3).toString() //? NZ 오클랜드 시차 적용
      if (_hour < 10) {
        _hour = "0" + _hour
      }

      setBaseTime(_hour + minutes)

      daysArray.map((item, key) => {
        if (key === now.getDay()) {
          setDay(item.toUpperCase())
        }
      })
    }

    useEffect(() => {
      //? 실시간 시계 기능 구현을 위한 코드
      return setInterval(() => {
        getCurrentTime()
      }, 1000)

      //TODO: 시계 기능 때문에 매초마다 rerendering 이 발생함.
      //TODO: 이때문에, 시계 외 다른 컴포넌트들도 rerendering 되는 낭비가 발생한다
      //TODO: useMemo 로 해결해볼것.
    }, [])

    const api = new Api() //? api 객체 생성
    api.setup() //? api 셋업
    //!  api 객체 안에 있는 모든 메서드들은, api.setup() 이후 사용 할 수 있습니다!!

    return (
      <Screen style={ROOT} preset="fixed">
        <GradientBackground colors={[color.palette.white, color.palette.blue]} />

        <Text style={DATE_TXT}>{new Date().toLocaleDateString()}</Text>
        <Text style={TIME_TXT}>{currentTime}</Text>

        <View style={{ alignSelf: "center" }}>
          <Text preset="header" text={city} style={[CITY_TXT]} />
        </View>

        {weatherData && (
          <View style={[WEATHER_BOXES]}>
            <WeatherBox sky={weatherData.futureSky[0]} rain={weatherData.isRainy[0]} time={0} />
            <WeatherBox sky={weatherData.futureSky[1]} rain={weatherData.isRainy[1]} time={1} />
            <WeatherBox sky={weatherData.futureSky[2]} rain={weatherData.isRainy[2]} time={2} />
            <WeatherBox
              sky={weatherData.futureSky[weatherData.futureSky.length - 1]}
              rain={weatherData.isRainy[weatherData.isRainy.length - 1]}
              time={6}
            />
          </View>
        )}

        <Button
          style={BUTTON}
          text="비가 올까..?"
          textStyle={BUTTON_TXT}
          onPress={() => {
            //? 위치좌표에 해당하는 예보날씨 api call 요청하기
            api
              .getWeather(
                { nx: 55, ny: 128, cityName: city },
                { baseDate: baseDate, baseTime: baseTime },
              )
              .then(setWeatherData)

            LayoutAnimation.easeInEaseOut()
          }}
        />
      </Screen>
    )
  },
)
