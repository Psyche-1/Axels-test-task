import * as React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { DashboardSidebarContext } from "../tsx";

test('Snapshot test DashboardSidebarContext', () => {
    const component = render(
        <DashboardSidebarContext
            onPageItemClick={(id = 1, hasNestedNavigation = true) => { }}
            mini = {true}
            fullyExpanded = {false}
            fullyCollapsed = {false}
            hasDrawerTransitions = {true}
        />
    );
  expect(component).toMatchSnapshot();
});