import { ObjectsRegistry } from "../../../../support/Objects/Registry";

const {
  AggregateHelper: agHelper,
  CommonLocators: locator,
  JSEditor: jsEditor,
} = ObjectsRegistry;

describe("storeValue Action test", () => {
  before(() => {
    //
  });

  it("1. Bug 14653: Running consecutive storeValue actions and await", function() {
    const jsObjectBody = `export default {
      myFun1: () => {
        let values =
          [
            storeValue('val1', 'number 1'),
            storeValue('val2', 'number 2'),
            storeValue('val3', 'number 3'),
            storeValue('val4', 'number 4')
          ]
        return Promise.all(values)
          .then(() => {
            showAlert(JSON.stringify(appsmith.store))
        })
          .catch((err) => {
            return showAlert('Could not store values in store ' + err.toString());
          })
      }
    }`;

    jsEditor.CreateJSObject(jsObjectBody, {
      paste: true,
      completeReplace: true,
      toRun: true,
      shouldCreateNewJSObj: true,
    });
    agHelper.ValidateToastMessage(
      JSON.stringify({
        val1: "number 1",
        val2: "number 2",
        val3: "number 3",
        val4: "number 4",
      }),
      2,
    );
  });

  it("2. Accepts paths as keys and updates path accordingly", function() {
    const JS_OBJECT_BODY = `export default {
      myFun1: async ()=>{
      await storeValue("student", {details:{name:"Abha"}}, false)
      await storeValue("student.details.name", "Annah", false)
      await showAlert(appsmith.store.student.details.name)
    }	
    }`;

    // create js object
    jsEditor.CreateJSObject(JS_OBJECT_BODY, {
      paste: true,
      completeReplace: true,
      toRun: true,
      shouldCreateNewJSObj: true,
    });

    cy.get(locator._toastMsg)
      .first()
      .should("contain.text", "Annah");
  });
});
