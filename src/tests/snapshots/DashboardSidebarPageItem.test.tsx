import * as React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { DashboardSidebarPageItem, DashboardSidebarContext } from "../../components/tsx";

const sidebarContextValue = {
  onPageItemClick: () => { },
  mini: false,
  fullyExpanded: true,
  fullyCollapsed: false,
  hasDrawerTransitions: true,
}

test('Snapshot test DashboardSidebarPageItem', () => {
  const component = render(
    <DashboardSidebarContext.Provider value={sidebarContextValue}>
          <DashboardSidebarPageItem
            id = '1'
            title="Page Item"
            icon={<span>Icon</span>}
            href="/page-item"
            action={() => {}}
            defaultExpanded = {false}
            expanded = {true}
            selected = {false}
            disabled = {false}
            nestedNavigation={<span>Nested</span>}
          />
      </DashboardSidebarContext.Provider>
  );
  expect(component).toMatchSnapshot();
});