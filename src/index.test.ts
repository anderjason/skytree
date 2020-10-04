import { Test } from "@anderjason/tests";
import "./ArrayActivator/index.test";
import "./ConditionalActivator/index.test";
import "./ConvertBinding/index.test";
import "./SourceTargetBinding/index.test";
import "./DelayActivator/index.test";
import "./Actor/index.test";
import "./MultiBinding/index.test";
import "./PathBinding/index.test";
import "./SequentialWorker/index.test";

Test.runAll()
  .then(() => {
    console.log("Tests complete");
  })
  .catch((err) => {
    console.error(err);
    console.error("Tests failed");
  });
