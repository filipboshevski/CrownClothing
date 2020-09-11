import { createSelector } from "reselect";

const selectSave = state => state.save

export const selectCanSave = createSelector(
    [selectSave],
    save => save.canSave
);

export const selectIsLoading = createSelector(
    [selectSave],
    save => save.isLoading
);