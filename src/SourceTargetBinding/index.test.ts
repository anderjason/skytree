import { Observable } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { SourceTargetBinding } from ".";

Test.define("SourceTargetBinding sets the target value", () => {
  const connector = new SourceTargetBinding<string>({});
  connector.activate();

  const source = Observable.givenValue("hello");
  const target = Observable.ofEmpty<string>();

  Test.assert(target.value == null, "target is empty");

  connector.setSource(source);
  connector.setTarget(target);

  Test.assert(target.value === "hello", "target is set");

  connector.deactivate();
});

Test.define(
  "SourceTargetBinding updates the target value when the source is changed",
  () => {
    const connector = new SourceTargetBinding<string>({});
    connector.activate();

    const source1 = Observable.givenValue("hello");
    const source2 = Observable.givenValue("world");
    const target = Observable.ofEmpty<string>();
    connector.setTarget(target);

    connector.setSource(source1);
    Test.assert(target.value === "hello", "target is hello");

    connector.setSource(source2);
    Test.assert(target.value === "world", "target is world");

    connector.deactivate();
  }
);

Test.define(
  "SourceTargetBinding updates the target value when the source value is changed",
  () => {
    const connector = new SourceTargetBinding<string>({});
    connector.activate();

    const source = Observable.givenValue("hello");
    const target = Observable.ofEmpty<string>();
    connector.setTarget(target);
    connector.setSource(source);

    Test.assert(target.value === "hello", "target is hello");

    source.setValue("world");
    Test.assert(target.value === "world", "target is world");

    connector.deactivate();
  }
);

Test.define(
  "SourceTargetBinding can accept a non-observable value as a source",
  () => {
    const connector = new SourceTargetBinding<string>({});
    connector.activate();

    const target = Observable.ofEmpty<string>();
    connector.setTarget(target);
    connector.setSource("hello");

    Test.assert(target.value === "hello", "target is hello");

    connector.deactivate();
  }
);

Test.define(
  "SourceTargetBinding updates the target if the source is set before the connector is activated",
  () => {
    const target = Observable.ofEmpty<string>();
    const connector = new SourceTargetBinding<string>({
      target,
    });

    connector.setSource("hello");

    Test.assert(target.value == null, "target is empty");

    connector.activate();
    Test.assert(target.value == "hello", "target is hello");

    connector.deactivate();
  }
);
