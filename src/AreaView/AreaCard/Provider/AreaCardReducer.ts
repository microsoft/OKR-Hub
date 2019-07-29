import * as Actions from "./AreaCardActions";

export const areaCardReducer = (state, action) => {
	switch (action.type) {
		case Actions.updateArea:
			return {
				...state,
				area: action.area
			};
		case Actions.toggleEditMode:
			return {
				...state,
				editMode: !state.editMode
			}
	}
}