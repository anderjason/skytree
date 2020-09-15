import { Observable } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { Connector } from ".";

Test.define("Connector sets the target value", () => {
  const connector = new Connector({});
  connector.activate();

  const source = Observable.givenValue("hello");
  const target = Observable.ofEmpty<string>();

  Test.assert(target.value == null);

  connector.setSource(source);
  connector.setTarget(target);

  Test.assert(target.value === "hello");

  connector.deactivate();
});

Test.define(
  "Connector updates the target value when the source is changed",
  () => {
    const connector = new Connector({});
    connector.activate();

    const source1 = Observable.givenValue("hello");
    const source2 = Observable.givenValue("world");
    const target = Observable.ofEmpty<string>();
    connector.setTarget(target);

    connector.setSource(source1);
    Test.assert(target.value === "hello");

    connector.setSource(source2);
    Test.assert(target.value === "world");

    connector.deactivate();
  }
);

Test.define(
  "Connector updates the target value when the source value is changed",
  () => {
    const connector = new Connector({});
    connector.activate();

    const source = Observable.givenValue("hello");
    const target = Observable.ofEmpty<string>();
    connector.setTarget(target);
    connector.setSource(source);

    Test.assert(target.value === "hello");

    source.setValue("world");
    Test.assert(target.value === "world");

    connector.deactivate();
  }
);

Test.define("Connector can accept a non-observable value as a source", () => {
  const connector = new Connector({});
  connector.activate();

  const target = Observable.ofEmpty<string>();
  connector.setTarget(target);
  connector.setSource("hello");

  Test.assert(target.value === "hello");

  connector.deactivate();
});
