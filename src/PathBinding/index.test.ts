import { Observable } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { ValuePath } from "@anderjason/util";
import { ManagedObject } from "../ManagedObject";
import { PathBinding } from "./";

Test.define("PathBinding can observe a simple value", () => {
  const input = Observable.givenValue({
    design: {
      color: "red",
    },
  });

  const binding = new PathBinding({
    input,
    path: ValuePath.givenString("design.color"),
  });
  binding.activate();

  Test.assert(binding.output.value === "red");

  input.setValue({
    design: {
      color: "green",
    },
  });

  Test.assert(binding.output.value === "green");

  input.setValue({
    design: undefined,
  });

  Test.assert(binding.output.value == null);

  input.setValue(undefined);

  Test.assert(binding.output.value == null);

  input.setValue({
    design: {
      color: "blue",
    },
  });

  Test.assert(binding.output.value === "blue");

  binding.deactivate();
});

Test.define(
  "PathBinding updates bindings with the shortest path first, given the same input",
  () => {
    const mo = new ManagedObject({});
    mo.activate();

    const input = Observable.givenValue({
      artboards: [
        {
          design: {
            color: "red",
          },
          size: "large",
        },
        {
          design: {
            color: "blue",
          },
          size: "medium",
        },
      ],
    });

    const secondArtboardSize = mo.addManagedObject(
      new PathBinding<any, string>({
        input,
        path: ValuePath.givenString("artboards.1.size"),
      })
    );

    const artboards = mo.addManagedObject(
      new PathBinding<any, any[]>({
        input,
        path: ValuePath.givenString("artboards"),
      })
    );

    const secondArtboardColor = mo.addManagedObject(
      new PathBinding<any, string>({
        input,
        path: ValuePath.givenString("artboards.1.design.color"),
      })
    );

    Test.assert(Array.isArray(artboards.output.value));
    Test.assert(artboards.output.value.length === 2);
    Test.assert(secondArtboardColor.output.value === "blue");

    let changedPaths: string[] = [];

    [artboards, secondArtboardColor, secondArtboardSize].forEach(
      (pathBinding) => {
        mo.cancelOnDeactivate(
          pathBinding.output.didChange.subscribe(() => {
            changedPaths.push(pathBinding.props.path.toString());
          })
        );
      }
    );

    input.setValue({
      artboards: [
        {
          design: {
            color: "green",
          },
          size: "small",
        },
        {
          design: {
            color: "orange",
          },
          size: "small",
        },
      ],
    });

    Test.assertIsDeepEqual(changedPaths, [
      "artboards",
      "artboards.1.size",
      "artboards.1.design.color",
    ]);

    changedPaths = [];

    input.setValue({
      artboards: [
        {
          design: {
            color: "green",
          },
          size: "small",
        },
        {
          design: {
            color: "orange",
          },
          size: "large",
        },
      ],
    });

    Test.assertIsDeepEqual(changedPaths, ["artboards", "artboards.1.size"]);

    mo.deactivate();

    // @ts-ignore
    Test.assert(PathBinding.bindingGroupsByInput.size === 0);
  }
);
