import { Test } from "@anderjason/tests";
import "./ArrayInitializer/index.test";
import "./ConditionalInitializer/index.test";
import "./Connector/index.test";
import "./ManagedObject/index.test";
import "./MultiBinding/index.test";
import "./PathBinding/index.test";
import "./SequentialWorker/index.test";
import "./Transformer/index.test";

Test.runAll()
  .then(() => {
    console.log("Tests complete");
  })
  .catch((err) => {
    console.error(err);
    console.error("Tests failed");
  });
