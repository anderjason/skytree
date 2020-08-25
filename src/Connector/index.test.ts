import { Test } from "../Test";
import { Observable } from "../Observable";
import { Connector } from ".";

Test.define("Connector sets the target value", (obj) => {
  const connector = obj.addManagedObject(Connector.givenDefinition({}));

  const source = Observable.givenValue("hello");
  const target = Observable.ofEmpty<string>();

  Test.assert(target.value == null);

  connector.source.setValue(source);
  connector.target.setValue(target);

  Test.assert(target.value === "hello");
});

Test.define(
  "Connector updates the target value when the source is changed",
  (obj) => {
    const connector = obj.addManagedObject(Connector.givenDefinition({}));

    const source1 = Observable.givenValue("hello");
    const source2 = Observable.givenValue("world");
    const target = Observable.ofEmpty<string>();
    connector.target.setValue(target);

    connector.source.setValue(source1);
    Test.assert(target.value === "hello");

    connector.source.setValue(source2);
    Test.assert(target.value === "world");
  }
);

Test.define(
  "Connector updates the target value when the source value is changed",
  (obj) => {
    const connector = obj.addManagedObject(Connector.givenDefinition({}));

    const source = Observable.givenValue("hello");
    const target = Observable.ofEmpty<string>();
    connector.target.setValue(target);
    connector.source.setValue(source);

    Test.assert(target.value === "hello");

    source.setValue("world");
    Test.assert(target.value === "world");
  }
);
