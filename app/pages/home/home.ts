import {BasePage} from "../../shared/BasePage";
import {Observable, EventData} from "data/observable";
import { Page } from "ui/page";
import {Image} from "ui/image";
var http = require("http");
import listViewModule = require("nativescript-telerik-ui/listview");
import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import {XmlParser,ParserEvent,ParserEventType} from "tns-core-modules/xml";
import {ObservableArray} from "tns-core-modules/data/observable-array";
import timer = require("tns-core-modules/timer");
var vm = new Observable();
class DataItem {
    public id: number;
    public itemName;
    public itemDescription;

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.itemName = name;
        this.itemDescription = description;
    }
}

class HomePage extends BasePage{
        private _items: ObservableArray<DataItem>;
        private _words = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
        private _footerTitle;
        private _headerTitle;
        constructor() {
            super();
            this._footerTitle = "This is list footer";
            this._headerTitle = "This is list header";
        }

        get dataItems() {
            if (!this._items) {
                this._items = new ObservableArray<DataItem>();

                for (var i = 0; i < 10; i++) {
                    this._items.push(new DataItem(i, "Item " + i, "This is item description."));
                }
            }
            return this._items;
        }

        private getRandomLengthString(){
            var sentenceLength = Math.round((Math.random() * 15));
            var result = this._words[0];
            for (var i = 0; i < sentenceLength; i++){
                result += (this._words[i % this._words.length] + " ");
            }
            return result;
        }
         get headerTitle(){
             return this._headerTitle;
        }
    
        get footerTitle(){
            return this._footerTitle;
        }

    loaded(args:EventData){
        // vm.set("selectedPage", "home");
        var view = new HomePage();
        // vm.set("text", "This is the home page");
        // let page = <Page>args.object;
        // logo = page.getViewById<Image>("logo");        
        // page.bindingContext = vm;
        // // Test API
        let page = <Page>args.object;
        page.bindingContext = view;
    }

    fun(){        
        // logo.animate({
        //     rotate: 3600,
        //     duration: 3000
        // });
    }
    callapi()
    { 
        alert("s");
        http.request({
            url: "http://yakyo.innoria.com/xmlrpc/2/object",
            method: "POST",
            headers: { "Content-Type": "application/xml" },
            content:
            "<methodCall><methodName>execute_kw</methodName><params><param><value><string>yakyo</string></value></param><param><value><int>1</int></value></param><param><value><string>1234</string></value></param><param><value><string>product.template</string></value></param><param><value><string>read</string></value></param><param><value><array><data><value><array><data><value><int>29</int></value></data></array></value></data></array></value></param></params></methodCall>"
            //  Param read thong tin sp <methodCall><methodName>execute_kw</methodName><params><param><value><string>yakyo</string></value></param><param><value><int>1</int></value></param><param><value><string>1234</string></value></param><param><value><string>product.template</string></value></param><param><value><string>read</string></value></param><param><value><array><data><value><array><data><value><int>28</int></value><value><int>1</int></value><value><int>12</int></value><value><int>29</int></value></data></array></value></data></array></value></param></params></methodCall>
        }).then(function (response) {
            var  result = response.content.toString();
            // var obj = response.content.toString(); 

            var onEventCallback = function (event: ParserEvent) {
                switch (event.eventType) {

                    case ParserEventType.StartElement:
                        var message = event.eventType + " " + event.elementName;
                        if (event.attributes) {
                            message += ", Attributes:";
                            for (var attributeName in event.attributes) {
                                if (event.attributes.hasOwnProperty(attributeName)) {
                                    message += " " + attributeName + "=\"" + event.attributes[attributeName] + "\"";
                                }
                            }
                        }
                        // console.log(message); // chi hiển thị   StartElement methodCall StartElement methodName
                        break;

                    case ParserEventType.EndElement:
                        // console.log(event.eventType + " " + event.elementName); // chi hiển thị   StartElement methodCall StartElement methodName
                        break;

                    case ParserEventType.Text:
                        var significantText = event.data.trim();
                        if (significantText !== "") {
                           
                            // console.log(event.eventType + "=\"" + significantText + "\"");
                            console.log("-------------------------");
                             console.log(significantText);
                            console.log("-------------------------");
                        }
                        break;
                }
            };
            var onErrorCallback = function (error: Error) {
                console.log("Error: " + error.message);
            };
            var s = new XmlParser(onEventCallback,onErrorCallback); 
              console.log("------------------------------------------------");
            // console.log(result);
             console.log("------------------------------------------------");
            // var tmp =  s.parse(result);
           
        //    console.log(tmp);
           console.log(response.content);
        }, function (e) {
            console.log("Error occurred " + e);
        });
    }
}
export = new HomePage();