import { Test } from "./Test";
import "./ArrayUtil/index.test";
import "./Box2/index.test";
import "./Box3/index.test";
import "./Duration/index.test";
import "./Handle/index.test";
import "./Instant/index.test";
import "./ManagedObject/index.test";
import "./MutablePoint2/index.test";
import "./MutablePoint3/index.test";
import "./NumberUtil/index.test";
import "./Observable/index.test";
import "./Percent/index.test";
import "./PromiseUtil/index.test";
import "./Ratio/index.test";
import "./SimpleEvent/index.test";
import "./Size2/index.test";
import "./Size3/index.test";
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
