import * as React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { DashboardSidebarDividerItem, DashboardSidebarContext } from "../tsx";

const sidebarContextValue = {
  onPageItemClick: () => { },
  mini: false,
  fullyExpanded: true,
  fullyCollapsed: false,
  hasDrawerTransitions: true,
}

test('Snapshot test DashboardSidebarDividerItem', () => {
  const component = render(
    <DashboardSidebarContext.Provider value={sidebarContextValue}>
    <DashboardSidebarDividerItem/>
      </DashboardSidebarContext.Provider>
  );
  expect(component).toMatchSnapshot();
});