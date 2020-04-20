export interface testobj {
    showName: boolean
    showIcon: boolean
    hasInport: boolean
    hasOutport: boolean
    hasCodeEditor: boolean
    name: string
    type: string
    icon: string
    iconColor: string
    iconSize: string
    bgColor: string
    inportColor: string
    outportColor: string
    fontColor: String
    fontSize: String,
    fontWeight: string
  }
  

  export interface flowElement {
    id: string
    metadata: testobj
  }  

  export interface conObject {
    cid: string
    sid: string
    tid: string
  }

  export interface nodeObject {
    id: string
    inports : conObject[]
    outports : conObject[]
  }