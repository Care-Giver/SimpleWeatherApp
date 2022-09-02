import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { MyInfoButtonAfterUpdate } from "./my-info-button-after-update"

storiesOf("MyInfoButtonAfterUpdate", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <MyInfoButtonAfterUpdate style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
