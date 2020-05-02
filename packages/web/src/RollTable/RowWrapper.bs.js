'use strict';

var React = require("react");
var Button$SocialDmTools = require("../common/Button.bs.js");

function RowWrapper(Props) {
  var onDoubleClickOpt = Props.onDoubleClick;
  var onRemove = Props.onRemove;
  var selected = Props.selected;
  var children = Props.children;
  var onDoubleClick = onDoubleClickOpt !== undefined ? onDoubleClickOpt : (function (param) {
        return /* () */0;
      });
  var baseClasses = "ml-8 mr-2 py-2 px-1 flex flex-row justify-between border-b-2 border-gray-200";
  var className = selected ? "ml-8 mr-2 py-2 px-1 flex flex-row justify-between border-b-2 border-gray-200 bg-blue-300 text-blue-700" : baseClasses;
  return React.createElement("li", {
              className: className,
              onDoubleClick: onDoubleClick
            }, children, React.createElement(Button$SocialDmTools.make, {
                  onClick: onRemove,
                  children: "del"
                }));
}

var make = RowWrapper;

exports.make = make;
/* react Not a pure module */
