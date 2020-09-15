import { Test } from "@anderjason/tests";
import { ObjectUtil, ValuePath } from "@anderjason/util";
import { PathBinding } from ".";
import {
  Receipt,
  Observable,
  ObservableArray,
  ObservableDict,
} from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";

Test.define("PathBinding can observe a single value", () => {
  const obj = new ManagedObject({});
  obj.activate();

  const input = Observable.givenValue("hello");
  const pathBinding = obj.addManagedObject(
    new PathBinding({
      input,
      path: ValuePath.ofEmpty(),
    })
  );

  Test.assertIsDeepEqual(pathBinding.output.value, "hello");

  let outputValues: unknown[] = [];

  obj.cancelOnDeactivate(
    pathBinding.output.didChange.subscribe((newValue) => {
      outputValues.push(newValue);
    })
  );

  input.setValue("world");
  input.setValue("message");

  Test.assertIsDeepEqual(outputValues, ["world", "message"]);

  obj.deactivate();
});

Test.define("PathBinding can observe undefined", () => {
  const pathBinding = new PathBinding({
    input: undefined,
    path: ValuePath.givenParts(["some", "path"]),
  });

  pathBinding.activate();

  Test.assertIsDeepEqual(pathBinding.output.value, undefined);

  pathBinding.deactivate();
});

Test.define("PathBinding can observe an empty observable", () => {
  const pathBinding = new PathBinding({
    input: Observable.ofEmpty(),
    path: ValuePath.givenParts(["some", "path"]),
  });

  pathBinding.activate();

  Test.assertIsDeepEqual(pathBinding.output.value, undefined);

  pathBinding.deactivate();
});

Test.define(
  "PathBinding can observe a tree of plain objects and arrays",
  () => {
    interface MessagePart {
      type: string;
      content: {
        data: string;
      };
    }

    interface MessageSegment {
      id: string;
      parts: MessagePart[];
    }

    interface Message {
      segments: MessageSegment[];
    }

    const input: Message = {
      segments: [
        {
          id: "111",
          parts: [
            {
              type: "header",
              content: {
                data: "something",
              },
            },
          ],
        },
        {
          id: "222",
          parts: [
            {
              type: "header",
              content: {
                data: "ignore this",
              },
            },
            {
              type: "body",
              content: {
                data: "hello world",
              },
            },
          ],
        },
      ],
    };

    const pathBinding = new PathBinding({
      input,
      path: ValuePath.givenParts([
        "segments",
        1,
        "parts",
        1,
        "content",
        "data",
      ]),
    });

    pathBinding.activate();

    Test.assertIsDeepEqual(pathBinding.output.value, "hello world");

    pathBinding.deactivate();
  }
);

Test.define(
  "PathBinding can observe a single value as a child of an observable",
  () => {
    const receipts: Receipt[] = [];

    interface Message {
      messageText: string;
    }

    const input = Observable.givenValue<Message>({
      messageText: "hello",
    });

    const pathBinding = new PathBinding({
      input,
      path: ValuePath.givenParts(["messageText"]),
    });

    receipts.push(pathBinding.activate());

    Test.assertIsDeepEqual(pathBinding.output.value, "hello");

    let outputValues: unknown[] = [];

    receipts.push(
      pathBinding.output.didChange.subscribe((newValue) => {
        outputValues.push(newValue);
      })
    );

    input.setValue({
      messageText: "world",
    });
    input.setValue({
      messageText: "message",
    });

    receipts.forEach((receipt) => {
      receipt.cancel();
    });

    Test.assert(
      ObjectUtil.objectIsDeepEqual(outputValues, ["world", "message"])
    );
  }
);

Test.define(
  "PathBinding can observe an observable as a child of an object",
  () => {
    const receipts: Receipt[] = [];

    interface Message {
      content: {
        messageText: Observable<string>;
      };
    }

    const input: Message = {
      content: {
        messageText: Observable.givenValue("hello"),
      },
    };

    const pathBinding = new PathBinding({
      input,
      path: ValuePath.givenParts(["content", "messageText"]),
    });

    receipts.push(pathBinding.activate());

    Test.assertIsDeepEqual(pathBinding.output.value, "hello");

    let outputValues: unknown[] = [];

    receipts.push(
      pathBinding.output.didChange.subscribe((newValue) => {
        outputValues.push(newValue);
      })
    );

    input.content.messageText.setValue("world");
    input.content.messageText.setValue("message");

    receipts.forEach((receipt) => {
      receipt.cancel();
    });

    Test.assert(
      ObjectUtil.objectIsDeepEqual(outputValues, ["world", "message"])
    );
  }
);

Test.define("PathBinding can observe an observable at a complex path", () => {
  const receipts: Receipt[] = [];

  interface MessageSegment {
    headers: [];
    content: {
      body: Observable<string>;
    };
  }

  interface Message {
    segments: ObservableArray<MessageSegment>;
  }

  const input = ObservableArray.givenValues<Message>([
    {
      segments: ObservableArray.givenValues<MessageSegment>([
        {
          headers: [],
          content: {
            body: Observable.givenValue("should skip"),
          },
        },
      ]),
    },
    {
      segments: ObservableArray.givenValues<MessageSegment>([
        {
          headers: [],
          content: {
            body: Observable.givenValue("hello"),
          },
        },
        {
          headers: [],
          content: {
            body: Observable.givenValue("skip this too"),
          },
        },
      ]),
    },
  ]);

  const pathBinding = new PathBinding({
    input,
    path: ValuePath.givenParts([1, "segments", 0, "content", "body"]),
  });

  receipts.push(pathBinding.activate());

  Test.assertIsDeepEqual(pathBinding.output.value, "hello");

  let outputValues: unknown[] = [];

  receipts.push(
    pathBinding.output.didChange.subscribe((newValue) => {
      outputValues.push(newValue);
    })
  );

  input.toValues()[1].segments.toValues()[0].content.body.setValue("world");

  input.replaceValueAtIndex(1, {
    segments: ObservableArray.givenValues<MessageSegment>([
      {
        headers: [],
        content: {
          body: Observable.givenValue("message"),
        },
      },
    ]),
  });

  input.toValues()[1].segments.replaceValueAtIndex(0, undefined);

  input.toValues()[1].segments.replaceValueAtIndex(0, {
    headers: [],
    content: {
      body: Observable.givenValue("again"),
    },
  });

  receipts.forEach((receipt) => {
    receipt.cancel();
  });

  Test.assertIsDeepEqual(outputValues, [
    "world",
    "message",
    undefined,
    "again",
  ]);
});

Test.define("PathBinding only changes once for each input change", () => {
  const obj = new ManagedObject({});
  obj.activate();

  const input = Observable.ofEmpty<any>();

  const pathBinding = obj.addManagedObject(
    new PathBinding({
      input,
      path: ValuePath.givenParts(["some", "path"]),
    })
  );

  let changeCount = 0;

  obj.cancelOnDeactivate(
    pathBinding.output.didChange.subscribe(() => {
      changeCount += 1;
    })
  );

  input.setValue({
    some: ObservableDict.givenValues({
      path: ObservableArray.givenValues([1, 2, 3]),
    }),
  });

  input.setValue({
    some: ObservableDict.givenValues({
      path: ObservableArray.givenValues([4, 5, 6]),
    }),
  });

  Test.assert(changeCount === 2);
  Test.assertIsDeepEqual([4, 5, 6], pathBinding.output.value);

  obj.deactivate();
});
