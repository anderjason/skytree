import { Test } from "../Test";
import { ValuePath } from "../ValuePath";
import { PathBinding } from ".";
import { Observable } from "../Observable";
import { ObjectUtil } from "../ObjectUtil";
import { Handle } from "../Handle";
import { ObservableArray } from "../ObservableArray";

Test.define("PathBinding can observe a single value", () => {
  const handles: Handle[] = [];

  const input = Observable.givenValue("hello");
  const pathBinding = PathBinding.givenDefinition({
    input,
    path: ValuePath.ofEmpty(),
  });

  handles.push(pathBinding.init());

  Test.assertIsDeepEqual(pathBinding.output.value, "hello");

  let outputValues: unknown[] = [];

  handles.push(
    pathBinding.output.didChange.subscribe((newValue) => {
      outputValues.push(newValue);
    })
  );

  input.setValue("world");
  input.setValue("message");

  handles.forEach((handle) => {
    handle.release();
  });

  Test.assert(ObjectUtil.objectIsDeepEqual(outputValues, ["world", "message"]));
});

Test.define("PathBinding can observe undefined", () => {
  const pathBinding = PathBinding.givenDefinition({
    input: undefined,
    path: ValuePath.givenParts(["some", "path"]),
  });

  pathBinding.init();

  Test.assertIsDeepEqual(pathBinding.output.value, undefined);

  pathBinding.uninit();
});

Test.define("PathBinding can observe an empty observable", () => {
  const pathBinding = PathBinding.givenDefinition({
    input: Observable.ofEmpty(),
    path: ValuePath.givenParts(["some", "path"]),
  });

  pathBinding.init();

  Test.assertIsDeepEqual(pathBinding.output.value, undefined);

  pathBinding.uninit();
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

    const pathBinding = PathBinding.givenDefinition({
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

    pathBinding.init();

    Test.assertIsDeepEqual(pathBinding.output.value, "hello world");

    pathBinding.uninit();
  }
);

Test.define(
  "PathBinding can observe a single value as a child of an observable",
  () => {
    const handles: Handle[] = [];

    interface Message {
      messageText: string;
    }

    const input = Observable.givenValue<Message>({
      messageText: "hello",
    });

    const pathBinding = PathBinding.givenDefinition({
      input,
      path: ValuePath.givenParts(["messageText"]),
    });

    handles.push(pathBinding.init());

    Test.assertIsDeepEqual(pathBinding.output.value, "hello");

    let outputValues: unknown[] = [];

    handles.push(
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

    handles.forEach((handle) => {
      handle.release();
    });

    Test.assert(
      ObjectUtil.objectIsDeepEqual(outputValues, ["world", "message"])
    );
  }
);

Test.define(
  "PathBinding can observe an observable as a child of an object",
  () => {
    const handles: Handle[] = [];

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

    const pathBinding = PathBinding.givenDefinition({
      input,
      path: ValuePath.givenParts(["content", "messageText"]),
    });

    handles.push(pathBinding.init());

    Test.assertIsDeepEqual(pathBinding.output.value, "hello");

    let outputValues: unknown[] = [];

    handles.push(
      pathBinding.output.didChange.subscribe((newValue) => {
        outputValues.push(newValue);
      })
    );

    input.content.messageText.setValue("world");
    input.content.messageText.setValue("message");

    handles.forEach((handle) => {
      handle.release();
    });

    Test.assert(
      ObjectUtil.objectIsDeepEqual(outputValues, ["world", "message"])
    );
  }
);

Test.define("PathBinding can observe an observable at a complex path", () => {
  const handles: Handle[] = [];

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

  const pathBinding = PathBinding.givenDefinition({
    input,
    path: ValuePath.givenParts([1, "segments", 0, "content", "body"]),
  });

  handles.push(pathBinding.init());

  Test.assertIsDeepEqual(pathBinding.output.value, "hello");

  let outputValues: unknown[] = [];

  handles.push(
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

  handles.forEach((handle) => {
    handle.release();
  });

  Test.assert(
    ObjectUtil.objectIsDeepEqual(outputValues, [
      "world",
      "message",
      undefined,
      "again",
    ])
  );
});

Test.define("PathBinding only changes once for each input change", (obj) => {
  const input = Observable.ofEmpty<any>();

  const pathBinding = obj.addManagedObject(
    PathBinding.givenDefinition({
      input,
      path: ValuePath.givenParts(["some", "path"]),
    })
  );

  let changeCount = 0;

  obj.addHandle(
    pathBinding.output.didChange.subscribe(() => {
      changeCount += 1;
    })
  );

  input.setValue({
    some: {
      path: "test",
    },
  });

  Test.assert(changeCount === 1);
});
