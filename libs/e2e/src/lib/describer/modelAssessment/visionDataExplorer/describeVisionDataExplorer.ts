// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { visit } from "../../../../util/visit";
import { Locators } from "../Constants";
import { modelAssessmentDatasets } from "../datasets/modelAssessmentDatasets";
import { IModelAssessmentData } from "../IModelAssessmentData";
import { ensureAllVisionDataExplorerBasicElementsArePresent } from "./ensureAllVisionDataExplorerBasicElementsArePresent";
import { ensureAllVisionDataExplorerClassViewElementsAfterSelectionArePresent } from "./ensureAllVisionDataExplorerClassViewElementsAfterSelectionArePresent";
import { ensureAllVisionDataExplorerImageExplorerViewElementsAfterSelectionArePresent } from "./ensureAllVisionDataExplorerImageExplorerViewElementsAfterSelectionArePresent";
import { ensureAllVisionDataExplorerTableViewElementsAfterSelectionArePresent } from "./ensureAllVisionDataExplorerTableViewElementsAfterSelectionArePresent";


const testName = "VisionDataExplorer";

export function describeVisionDataExplorer(
  datasetShape: IModelAssessmentData,
  name?: keyof typeof modelAssessmentDatasets
): void {
  describe(testName, () => {
    before(() => {
      visit(name);
      cy.get("#ModelAssessmentDashboard").should("exist");
    });

    if (datasetShape.visionDataExplorerData?.hasVisionDataExplorerComponent) {
        it("should have basic components in the initial state", () => {
            ensureAllVisionDataExplorerBasicElementsArePresent();
        });

        it("should show Image explorer view components when selected", () => {
            ensureAllVisionDataExplorerImageExplorerViewElementsAfterSelectionArePresent(datasetShape);
        })

        it("should show Table view components when selected", () => {
            ensureAllVisionDataExplorerTableViewElementsAfterSelectionArePresent();
        })

        it("should show Class view components when selected", () => {
            ensureAllVisionDataExplorerClassViewElementsAfterSelectionArePresent();
        })

        it("should should Flyout view components when selected", () => {
            ensureAllVisionDataExplorerFlyoutBasicElementsArePresent();
        })
    } else {
        it("should not have 'VisionDataExplorer' component", () => {
            cy.get(Locators.VisionDataExplorer).should("not.exist");
        });
    }
  });
}
