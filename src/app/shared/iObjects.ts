export interface styleObject {
  "size": string,
  "color": string
  "background-color": string,
  "weight": string,
  "value": string,
  "border-size": string,
  "border-color": string,
  "height": string,
  "width": string
}

export interface codeEditorObject {
  "enabled": boolean,
  "language": string,
  "showToolBar": boolean,
  "showUploadSave": boolean
}

export interface portConfigObject {
  "enabled": boolean,
  "showInportExt": boolean,
  "showOutportExt": boolean,
  "maxPorts": number,
  "maxConnectionsPerPort": number
}

export interface apperanceConfigObject {
  "enabled": boolean,
  "showLabelConfig": boolean,
  "showIconConfig": boolean,
  "showMarkdownEditor": boolean
}

export interface propertyObject {
  codeEditor: codeEditorObject
  portConfig: portConfigObject
  apperanceConfig: apperanceConfigObject
}

export interface configObject {
  hasInport: boolean
  hasOutport: boolean
  hasIcon: boolean
  hasText: boolean
}

export interface metadataObject {
  operatorType: string
  operator: styleObject
  iconbox: styleObject
  textbox: styleObject
  inport: styleObject
  outport: styleObject
  connection: styleObject
  property: propertyObject
  config: configObject
}

export interface connectionObject {
  cid: string
  sid: string
  tid: string
}

export interface nodeObject {
  id: string
  inports: connectionObject[]
  outports: connectionObject[]
}

export interface portObject {
  inports: portHandler[]
  outports: portHandler[]
}


export interface operatorObject {
  id: string,
  metadata: metadataObject,
  runtime: portObject
}

export interface portHandler {
  id: string
  typ: string
  idx: number
  connections: connectionObject[]
}


export interface codeEditorUIObject {
  id: string
  showCodeEditor: boolean
  showSaveCodeFunction: boolean
  codeLanguage: string
  maxCodeLines: number
  srcCode: string
}

export interface apperanceEditorUIObject {
  id: string
  showCodeEditor: boolean
  showSaveCodeFunction: boolean
  codeLanguage: string
  maxCodeLines: number
  showLabelEditor: boolean
  showIconEditor: boolean
  srcCode: string
}


export interface uiPortObject {
  id: string
  name: string
}

export interface portConfigUIObject {
  id: string
  inports: []
  outports: []
}


/*
// Json Values
{
  "metadata": {
    "operatorType": "",
    "operator": {
      "size": "0",
      "color": "",
      "backgroundColor": "",
      "weight": "",
      "value": "",
      "borderSize": "",
      "borderColor": "",
      "height": "0",
      "width": "0"
    },
    "icon": {
      "size": "0",
      "color": "",
      "backgroundColor": "",
      "weight": "",
      "value": "",
      "borderSize": "",
      "borderColor": "",
      "height": "0",
      "width": "0"
    },
    "text": {
      "size": "0",
      "color": "",
      "backgroundColor": "",
      "weight": "",
      "value": "",
      "borderSize": "",
      "borderColor": "",
      "height": "0",
      "width": "0"
    },
    "port": {
      "size": "0",
      "color": "",
      "backgroundColor": "",
      "weight": "",
      "value": "",
      "borderSize": "",
      "borderColor": "",
      "height": "0",
      "width": "0"
    },
    "connection": {
      "size": "0",
      "color": "",
      "backgroundColor": "",
      "weight": "",
      "value": "",
      "borderSize": "",
      "borderColor": "",
      "height": "0",
      "width": "0"
    },
    "property": {
      "codeEditor": {
        "enabled": false,
        "language": "",
        "showToolBar": false,
        "showUploadSave": false
      },
      "portConfig": {
        "enabled": false,
        "showInportExt": false,
        "showOutportExt": false,
        "maxPorts": 16,
        "maxConnectionsPerPort": 2
      },
      "apperanceConfig": {
        "enabled": false,
        "showLabelConfig": false,
        "showIconConfig": false,
        "showMarkdownEditor": false
      }
    }
  }
}

*/