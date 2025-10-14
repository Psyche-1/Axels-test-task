import * as React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { ThemeSwitcher } from "../../components/tsx";

test('Snapshot test ThemeSwitcher', () => {
    const component = render(<ThemeSwitcher/>);
  expect(component).toMatchSnapshot();
});