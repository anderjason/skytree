import { Observable } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { MultiBinding } from ".";
import { ManagedObject } from "../ManagedObject";

Test.define(
  "MultiBinding invalidates each time all inputs in any group have changed at least once",
  () => {
    const obj = new ManagedObject();
    obj.init();

    const inputA1 = Observable.givenValue("a1");
    const inputA2 = Observable.givenValue("a2");
    const inputA3 = Observable.givenValue("a3");
    const inputA4 = Observable.givenValue("a4");

    const inputB1 = Observable.givenValue("b1");

    const inputC1 = Observable.givenValue("c1");
    const inputC2 = Observable.givenValue("c2");

    const multiBinding = obj.addManagedObject(
      MultiBinding.givenGroups([
        [inputA1, inputA2, inputA3, inputA4],
        [inputB1],
        [inputC1, inputC2],
      ])
    );

    let didInvalidate: any = false;
    obj.addReceipt(
      multiBinding.didInvalidate.subscribe(() => {
        didInvalidate = true;
      })
    );

    Test.assert(didInvalidate == false);

    inputA1.setValue("X");
    Test.assert(didInvalidate == false);

    inputA2.setValue("X");
    Test.assert(didInvalidate == false);

    inputA3.setValue("X");
    Test.assert(didInvalidate == false);

    inputA4.setValue("X");
    Test.assert(didInvalidate == true);

    didInvalidate = false;

    inputB1.setValue("X");
    Test.assert(didInvalidate == true);

    didInvalidate = false;

    inputA1.setValue("Y");
    inputA1.setValue("Z");
    inputA1.setValue("A");
    inputA1.setValue("B");
    Test.assert(didInvalidate == false);

    inputC1.setValue("Y");
    Test.assert(didInvalidate == false);

    inputC2.setValue("Y");
    Test.assert(didInvalidate == true);

    obj.uninit();
  }
);
