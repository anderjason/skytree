import { Test } from "@anderjason/tests";
import { Observable } from "@anderjason/observable";
import { Connector } from ".";
import { ManagedObject } from "../ManagedObject";

Test.define("Connector sets the target value", () => {
  const obj = new ManagedObject();
  obj.init();

  const connector = obj.addManagedObject(Connector.givenDefinition({}));

  const source = Observable.givenValue("hello");
  const target = Observable.ofEmpty<string>();

  Test.assert(target.value == null);

  connector.source.setValue(source);
  connector.target.setValue(target);

  Test.assert(target.value === "hello");

  obj.uninit();
});

Test.define(
  "Connector updates the target value when the source is changed",
  () => {
    const obj = new ManagedObject();
    obj.init();

    const connector = obj.addManagedObject(Connector.givenDefinition({}));

    const source1 = Observable.givenValue("hello");
    const source2 = Observable.givenValue("world");
    const target = Observable.ofEmpty<string>();
    connector.target.setValue(target);

    connector.source.setValue(source1);
    Test.assert(target.value === "hello");

    connector.source.setValue(source2);
    Test.assert(target.value === "world");

    obj.uninit();
  }
);

Test.define(
  "Connector updates the target value when the source value is changed",
  () => {
    const obj = new ManagedObject();
    obj.init();

    const connector = obj.addManagedObject(Connector.givenDefinition({}));

    const source = Observable.givenValue("hello");
    const target = Observable.ofEmpty<string>();
    connector.target.setValue(target);
    connector.source.setValue(source);

    Test.assert(target.value === "hello");

    source.setValue("world");
    Test.assert(target.value === "world");

    obj.uninit();
  }
);
