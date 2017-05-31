import {BasePage} from "../../shared/BasePage";
import {Observable, EventData} from "data/observable";
import { Page } from "ui/page";
import {Image} from "ui/image";
var http = require("http");

 import {XmlParser,ParserEvent,ParserEventType} from "tns-core-modules/xml";
let vm = new Observable();
let logo:Image;
class HomePage extends BasePage{
    loaded(args:EventData){
        vm.set("selectedPage", "home");
        vm.set("text", "This is the home page");
        let page = <Page>args.object;
        logo = page.getViewById<Image>("logo");        
        page.bindingContext = vm;
        // Test API
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
           console.dir(response.toString()[0]);
        }, function (e) {
            console.log("Error occurred " + e);
        });

    }    
    fun(){        
        logo.animate({
            rotate: 3600,
            duration: 3000
        });
    }
}
export = new HomePage();