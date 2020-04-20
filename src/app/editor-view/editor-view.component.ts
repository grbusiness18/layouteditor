import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, Input, EventEmitter, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as $ from 'jquery';
import { ResizeEvent } from 'angular-resizable-element';



@Component({
  selector: 'app-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['./editor-view.component.css']
})
export class EditorViewComponent implements OnInit {

  constructor() {    
  }

  ngOnInit() {
    jqueryInitialize()
  }
}


// jquery
function jqueryInitialize(){
  $(document).ready(function(){
    $("#editor-ui-box").width(parseInt($(document).width()) - 250 -20);
    $("#editor-ui-box").css('left', 250+'px');

    $(window).resize(function(){
      $("#editor-ui-box").width(parseInt($(document).width()) - 250 -20);
    })
    

    $(".close-handle").on('click', function(){
        var oParent = $(this).parent();
        console.log(oParent);
        $(this).parent().toggle();
    });
  });   
}