import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { codeEditorUIObject } from '../shared/iObjects';

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
  selector: 'app-markdown-view',
  templateUrl: './markdown-view.component.html',
  styleUrls: ['./markdown-view.component.css']
})
export class MarkdownViewComponent implements OnInit {
  @ViewChild('markDownEditor', { static: true }) codeEditorElmRef: ElementRef;

  @Input() data = {} as any;

  private codeEditor: ace.Ace.Editor;
  private buildDom: any;
  private editorBeautify;
  public THEME = 'ace/theme/github';
  public LANG = 'ace/mode/markdown';
  public refs = {};
  public showMarkDownToolBar: boolean = true;
  public showUploadSave: boolean = true;
  public showCodeEditor: boolean = false;
  public isChanged: boolean = false;

  constructor() { }

  ngOnInit() {
    var that = this
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(this.THEME);
    this.codeEditor.getSession().setMode(this.LANG);
    this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
    this.editorBeautify = ace.require('ace/ext/beautify');
    this.buildDom = ace.require("ace/lib/dom").buildDom;

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

  public onToolBarBtnClick(src) {
    var range = this.codeEditor.getSelectionRange();
    console.log(range)
    var stext = this.codeEditor.getSelectedText()
    if (src === "B") {
      this.codeEditor.session.replace(range, "**" + stext + "**");
    }

    if (src === "I") {
      this.codeEditor.session.replace(range, "*" + stext + "*");
    }

    if (src === "C") {
      this.codeEditor.session.replace(range, "`" + stext + "`");
    }

    if (src === "h1") {
      this.codeEditor.session.replace(range, "# " + stext);
    }

    if (src === "h2") {
      this.codeEditor.session.replace(range, "## " + stext);
    }

    if (src === "h3") {
      this.codeEditor.session.replace(range, "### " + stext);
    }

    if (src === "h4") {
      this.codeEditor.session.replace(range, "#### " + stext);
    }

    if (src === "h5") {
      this.codeEditor.session.replace(range, "##### " + stext);
    }

    if (src === "h6") {
      this.codeEditor.session.replace(range, "###### " + stext);
    }

    if (src === "ol") {
      this.codeEditor.session.replace(range, "* " + stext);
    }

    if (src === "ul") {
      this.codeEditor.session.replace(range, "> " + stext);
    }

    if (src === "hr") {
      this.codeEditor.session.replace(range, "--- " + stext);
    }

    if (src === "link") {
      this.codeEditor.session.replace(range, "[" + stext + "]()");
    }

  }

}
