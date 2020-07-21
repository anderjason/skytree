import { ValuePath } from ".";
import { Test } from "../Test";
import { ObjectUtil } from "../ObjectUtil";

Test.define("ValuePath can be created from path parts", () => {
  const path = ValuePath.givenParts(["general", "image"]);
  Test.assert(path.toString() === "general.image");
});

Test.define("ValuePath can be created from a string", () => {
  const path = ValuePath.givenString("general.image.url");
  Test.assert(
    ObjectUtil.objectIsDeepEqualToObject(path.toParts(), [
      "general",
      "image",
      "url",
    ])
  );
});

Test.define("ValuePath can be compared for equality", () => {
  const a = ValuePath.givenString("general.image.url");
  const b = ValuePath.givenParts(["general", "image", "url"]);
  const c = ValuePath.givenParts(["something", "else"]);

  Test.assert(a.isEqual(b));
  Test.assert(!a.isEqual(c));
});

Test.define("ValuePath can be created as an empty path", () => {
  Test.assert(ValuePath.ofEmpty().isEmpty);
});

Test.define("ValuePath can be created as a descendant of another path", () => {
  const a = ValuePath.givenParts(["general", "images"]);
  const b = ValuePath.givenParts([0, "url"]);

  const expected = ValuePath.givenParts(["general", "images", 0, "url"]);
  const actual = a.withRelativePath(b);

  Test.assert(actual.isEqual(expected));
});

Test.define("ValuePath can be created as a descendant of another path", () => {
  const a = ValuePath.givenParts(["general", "images"]);
  const b = [0, "url"];

  const expected = ValuePath.givenParts(["general", "images", 0, "url"]);
  const actual = a.withRelativeParts(b);

  Test.assert(actual.isEqual(expected));
});

Test.define(
  "ValuePath can be converted to a relative path given a descendant path",
  () => {
    const a = ValuePath.givenParts(["general", "images"]);
    const b = ValuePath.givenParts(["general", "images", 0, "url"]);

    const expected = ValuePath.givenParts([0, "url"]);
    const actual = a.toRelativePath(b);

    Test.assert(actual.isEqual(expected));
  }
);

Test.define(
  "ValuePath can be converted to a relative path given an equal path",
  () => {
    Test.assertThrows(() => {
      const a = ValuePath.givenParts(["general", "images"]);
      const b = ValuePath.givenParts(["general", "images"]);

      a.toRelativePath(b);
    });
  }
);

Test.define(
  "ValuePath can be converted to a relative path given an ancestor path",
  () => {
    Test.assertThrows(() => {
      const a = ValuePath.givenParts(["general", "images", 0, "url"]);
      const b = ValuePath.givenParts(["general", "images"]);

      a.toRelativePath(b);
    });
  }
);

Test.define(
  "ValuePath can be converted to a relative path given an unrelated path",
  () => {
    Test.assertThrows(() => {
      const a = ValuePath.givenParts(["general", "images"]);
      const b = ValuePath.givenParts(["something", "else"]);

      a.toRelativePath(b);
    });
  }
);

Test.define(
  "ValuePath can determine if it is an ancestor of another path given equal paths",
  () => {
    const a = ValuePath.givenString("general.images");
    const b = ValuePath.givenString("general.images");

    Test.assert(!a.isAncestorOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is an ancestor of another path given a descendant path",
  () => {
    const a = ValuePath.givenString("general.images");
    const b = ValuePath.givenString("general.images.0.url");

    Test.assert(a.isAncestorOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is an ancestor of another path given an ancestor path",
  () => {
    const a = ValuePath.givenString("general.images");
    const b = ValuePath.givenString("general");

    Test.assert(!a.isAncestorOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is an ancestor of another path given an unrelated path",
  () => {
    const a = ValuePath.givenString("general.images");
    const b = ValuePath.givenString("something.else");

    Test.assert(!a.isAncestorOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is a descendant of another path given equal paths",
  () => {
    const a = ValuePath.givenString("general.images");
    const b = ValuePath.givenString("general.images");

    Test.assert(!a.isDescendantOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is a descendant of another path given a descendant path",
  () => {
    const a = ValuePath.givenString("general.images.0.url");
    const b = ValuePath.givenString("general.images");

    Test.assert(a.isDescendantOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is a descendant of another path given an ancestor path",
  () => {
    const a = ValuePath.givenString("general");
    const b = ValuePath.givenString("general.images");

    Test.assert(!a.isDescendantOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is a descendant of another path given an unrelated path",
  () => {
    const a = ValuePath.givenString("general.images");
    const b = ValuePath.givenString("something.else");

    Test.assert(!a.isDescendantOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is equal or an ancestor of another path given equal paths",
  () => {
    const a = ValuePath.givenString("general.images");
    const b = ValuePath.givenString("general.images");

    Test.assert(a.isEqualOrAncestorOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is equal or an ancestor of another path given a descendant path",
  () => {
    const a = ValuePath.givenString("general.images");
    const b = ValuePath.givenString("general.images.0.url");

    Test.assert(a.isEqualOrAncestorOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is equal or an ancestor of another path given an ancestor path",
  () => {
    const a = ValuePath.givenString("general.images");
    const b = ValuePath.givenString("general");

    Test.assert(!a.isEqualOrAncestorOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is equal or an ancestor of another path given an unrelated path",
  () => {
    const a = ValuePath.givenString("general.images");
    const b = ValuePath.givenString("something.else");

    Test.assert(!a.isEqualOrAncestorOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is equal or a descendant of another path given equal paths",
  () => {
    const a = ValuePath.givenString("general.images");
    const b = ValuePath.givenString("general.images");

    Test.assert(a.isEqualOrDescendantOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is equal or a descendant of another path given a descendant path",
  () => {
    const a = ValuePath.givenString("general.images.0.url");
    const b = ValuePath.givenString("general.images");

    Test.assert(a.isEqualOrDescendantOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is equal or a descendant of another path given an ancestor path",
  () => {
    const a = ValuePath.givenString("general");
    const b = ValuePath.givenString("general.images");

    Test.assert(!a.isEqualOrDescendantOf(b));
  }
);

Test.define(
  "ValuePath can determine if it is equal or a descendant of another path given an unrelated path",
  () => {
    const a = ValuePath.givenString("general.images");
    const b = ValuePath.givenString("something.else");

    Test.assert(!a.isEqualOrDescendantOf(b));
  }
);
