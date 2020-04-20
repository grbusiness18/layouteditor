import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import { UtilService } from '../services/util.service';

import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-github';
// auto complete
import 'ace-builds/src-noconflict/ext-language_tools';
// beautify
import 'ace-builds/src-noconflict/ext-beautify';
import 'brace/theme/clouds';
import 'brace/mode/json.js';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.css']
})
export class CodeViewComponent implements OnInit {
  @ViewChild('codeEditor', { static: true }) codeEditorElmRef: ElementRef;

  @Input() data: {};

  private codeEditor: ace.Ace.Editor;
  private buildDom: any;
  private editorBeautify;

  public THEME = 'ace/theme/github';
  public LANG = 'ace/mode/javascript';

  public refs = {};
  public showMarkDownToolBar: boolean = true;
  public showUploadSave: boolean = true;
  public showCodeEditor: boolean = false;
  public isChanged: boolean = false
  public srcCode: string = ""

  constructor(private util: UtilService) {
    this.isChanged = false
  }

  ngOnInit() {
    // data pass
    //console.log("code-view", this.codeConfig, this.isChanged);
    console.log("NGONINT:", "codeview", this.data)

    this.showCodeEditor = true

    if (this.showCodeEditor) {
      const element = this.codeEditorElmRef.nativeElement;
      const editorOptions = this.getEditorOptions();
      this.codeEditor = ace.edit(element, editorOptions);
      this.codeEditor.setTheme(this.THEME);
      this.codeEditor.getSession().setMode(this.LANG);
      this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
      this.editorBeautify = ace.require('ace/ext/beautify');
      if ("srccode" in this.data['runtime']) {
        this.setContent(this.data['runtime']['srccode']);
      } else {
        this.data['runtime']['srccode'] = "";
      }
      var that = this

      this.codeEditor.on("change", function () {
        if (that.data['runtime']['srccode'] !== that.getContent() && that.getContent() !== "") {
          that.isChanged = true;
          that.data['runtime']['srccode'] = that.getContent();
        }
      });

    }
  }


  ngAfterViewInit() {

  }

  // missing propery on EditorOptions 'enableBasicAutocompletion' so this is a wolkaround still using ts
  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 14,
      maxLines: Infinity,
    };

    const extraEditorOptions = {
      enableBasicAutocompletion: true
    };
    const margedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
    return margedOptions;
  }

  public getContent() {
    if (this.codeEditor) {
      const code = this.codeEditor.getValue();
      return code;
    }
  }

  public setContent(content: string): void {
    if (this.codeEditor) {
      this.codeEditor.setValue(content);
    }
  }

  public beautifyContent(): void {
    if (this.codeEditor && this.editorBeautify) {
      const session = this.codeEditor.getSession();
      this.editorBeautify.beautify(session);
    }
  }

}

/*

function test(oInstance) {
  //oInstance.codeEditor.on("input", oInstance.updateToolbar);
  //oInstance.codeEditor.session.setValue(localStorage.savedValue || "Welcome to ace Toolbar demo!")
  oInstance.buildDom(["div", { class: "cdtoolbar" },
    ["button", {
      style: "font-weight: bold",
      onclick: function () {
        oInstance.codeEditor.insertSnippet("**${1:$SELECTION}**");
        oInstance.codeEditor.renderer.scrollCursorIntoView()
      }
    }, "B"],
    ["button", {
      style: "font-style: italic",
      onclick: function () {
        oInstance.codeEditor.insertSnippet("*${1:$SELECTION}*");
        oInstance.codeEditor.renderer.scrollCursorIntoView()
      }
    }, "I"],
    ["button", {
      html: "u",
      onclick: function () {
        console.log("on Underline")
        oInstance.codeEditor.insertSnippet("*${1:$SELECTION}*");
        oInstance.codeEditor.renderer.scrollCursorIntoView()
      }
    }, "U"]

  ], document.getElementById("codeToolBar"), oInstance.refs);


  //document.getElementById("codeToolBar").appendChild(oInstance.codeEditor.container);
}


//https://github.com/ajaxorg/ace/blob/master/demo/toolbar.html

*/