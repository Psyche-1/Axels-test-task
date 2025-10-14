import * as React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { DashboardSidebarHeaderItem, DashboardSidebarContext } from "../../components/tsx";

const sidebarContextValue = {
  onPageItemClick: () => { },
  mini: false,
  fullyExpanded: true,
  fullyCollapsed: false,
  hasDrawerTransitions: true,
}

test('Snapshot test DashboardSidebarHeaderItem', () => {
  const component = render(
    <DashboardSidebarContext.Provider value={sidebarContextValue}>
    <DashboardSidebarHeaderItem/>
      </DashboardSidebarContext.Provider>
  );
  expect(component).toMatchSnapshot();
});