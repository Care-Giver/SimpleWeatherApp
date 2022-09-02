import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Icon, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { types, getRoot, destroy } from "mobx-state-tree"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.lightGrey,
  // justifyContent: "center",
  alignItems: "center",
  flex: 1,
}

const TODO_CARD: ViewStyle = {
  backgroundColor: color.palette.deepPurple,
  borderWidth: 2,
  borderRadius: 8,
  padding: 10,
  width: "80%",
  marginVertical: 4,
}

const BUTTON: ViewStyle = {
  borderWidth: 2,
  borderRadius: 8,
  width: "80%",

  marginTop: spacing[3],
  alignSelf: "center",
}

const ADD_TODO: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  borderWidth: 2,
  borderRadius: 8,
  padding: 10,
  width: "80%",
  marginBottom: spacing[5],
}

// //* Todo 모델
// const Todo = types
//   .model({
//     id: types.identifierNumber,
//     title: types.string,
//     body: types.string,
//     createdAt: types.number,
//     updatedAt: types.number,
//   })
//   .actions((self) => ({
//     setTitle(newTitle) {
//       self.title = newTitle
//     },

//     setBody(newBody) {
//       self.body = newBody
//     },

//     update(updatedTime) {
//       self.updatedAt = updatedTime
//     },

//     // remove() {
//     //   getRoot(self).removeTodo(self)
//     // },
//   }))

// const RootStore = types
//   .model({
//     todos: types.array(Todo),
//   })
//   .actions((self) => ({
//     addTodo(title, body) {
//       const id = self.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
//       const createdAt = Date.now()
//       const updatedAt = Date.now()
//       self.todos.unshift({ id, title, body, createdAt, updatedAt })
//     },

//     removeTodo(todo) {
//       destroy(todo)
//     },
//   }))

// const exampleTodo = Todo.create({
//   id: 1,
//   title: "Hi there!",
//   body: "write down something to do",
//   createdAt: Date.now(),
//   updatedAt: Date.now(),
// })

// const todoStore = RootStore.create({
//   todos: [exampleTodo],
// })

const TodoCard = ({ todo, todoStore }) => (
  <View style={TODO_CARD}>
    <Icon
      icon="back"
      style={{ marginLeft: "auto" }}
      onPress={() => {
        todoStore.removeTodo(todo)
      }}
    />
    <Text preset="header" text={`${todo.id}) ${todo.title}`} />
    <Text preset="default" text={todo.body} />
    <Text
      preset="secondary"
      text={`생성일: ${Date(todo.createdAt)}`}
      style={{ marginTop: spacing[3] }}
    />
    <Text preset="secondary" text={`수정일: ${Date(todo.updatedAt)}`} />
  </View>
)

// @ts-ignore
export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  function HomeScreen() {
    // Pull in one of our MST stores
    const { todoStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const [title, setTitle] = useState(null)
    const [body, setBody] = useState(null)

    const handle = () => {
      if (title && body) {
        todoStore.addTodo(title, body)
        setTitle(null)
        setBody(null)
      } else {
        alert("ㄴㄴ")
      }
    }

    return (
      <Screen style={ROOT} preset="scroll">
        <Text preset="header" text="home" />

        <View style={ADD_TODO}>
          <TextField
            placeholder="제목"
            inputStyle={{ color: "black" }}
            value={title}
            onChangeText={setTitle}
          />
          <TextField
            placeholder="설명"
            inputStyle={{ color: "grey" }}
            value={body}
            onChangeText={setBody}
          />

          <Button
            preset=""
            text="Todo 추가하기"
            textStyle={{ fontSize: 20, fontWeight: "bold" }}
            style={BUTTON}
            onPress={handle}
          />
        </View>

        {todoStore.todos.map((todo, index) => (
          <TodoCard todo={todo} key={index} todoStore={todoStore} />
        ))}
      </Screen>
    )
  },
)
