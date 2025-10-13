import * as React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { PageContainer } from "../tsx";

test('Snapshot test PageContainer', () => {
    const component = render(<PageContainer/>);
  expect(component).toMatchSnapshot();
});