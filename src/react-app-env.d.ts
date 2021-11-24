/// <reference types="react-scripts" />

// How to add custom types to a library without types.
// https://www.credera.com/insights/typescript-adding-custom-type-definitions-for-existing-libraries

declare module 'react-click-n-hold' {
  const noTypesYet: any
  export default noTypesYet
  // export interface Props {
  //   time?: number
  //   onStart?: (event: any) => void
  //   onClickNHold?: (event: any) => void
  //   onEnd?: (event: any) => void
  // }

  // export default class ClickNHold extends Component<Props> {}
}
