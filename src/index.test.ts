import { Test } from "./Test";
import "./ArrayInitializer/index.test";
import "./ArrayUtil/index.test";
import "./ConditionalInitializer/index.test";
import "./Duration/index.test";
import "./Handle/index.test";
import "./Instant/index.test";
import "./ManagedObject/index.test";
import "./NumberUtil/index.test";
import "./Observable/index.test";
import "./ObservableArray/index.test";
import "./PathBinding/index.test";
import "./Percent/index.test";
import "./PromiseUtil/index.test";
import "./SequentialWorker/index.test";
import "./SimpleEvent/index.test";
import "./StringUtil/index.test";
import "./ValuePath/index.test";

Test.runAll()
  .then(() => {
    console.log("Tests complete");
  })
  .catch((err) => {
    console.error(err);
    console.error("Tests failed");
  });
