'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var React = require("react");
var App$SocialDmTools = require("../src/App.bs.js");
var ReactTestingLibrary = require("bs-react-testing-library/src/ReactTestingLibrary.bs.js");

Jest.describe("Expect", (function (param) {
        return Jest.test("it renders", (function (param) {
                      return Jest.Expect.toMatchSnapshot(Jest.Expect.expect(ReactTestingLibrary.render(undefined, undefined, React.createElement(App$SocialDmTools.make, { })).container));
                    }));
      }));

/*  Not a pure module */
