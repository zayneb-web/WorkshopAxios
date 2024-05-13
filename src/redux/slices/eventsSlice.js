import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addEvent, deleteEvent, getallEvents} from "../../service/api.js";
let initialState = {
  events: [],
  selectedEvent: {},
  errors: "",
};
const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    populateEvents(state, action) {
      state.events = action.payload;
    },
    selectEvent(state, action) {
      state.selectedEvent = action.payload;
    },
    unselectEvent(state) {
      state.selectedEvent = null;
    },
    //state+action
    deleteEventReducer: (state, action) => {
      const payload = action.payload;
      state.events = state.events.filter(
          (eventItem) => eventItem.id !== payload
      );
    },
    updateEventReducer: (state, action) => {
      const payload = action.payload;
      const index = state.events.findIndex((item) =>
          item.id === payload.id);
      if (index !== -1) {
        state.events[index] = payload;
      }
    },
    addEventReducer: (state, action) => {
      const payload = action.payload;
      state.events.push(payload);
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});
export const fetchEvents = () => async (dispatch) => {
  try {
    const eventsResult = await getallEvents();
    dispatch(populateEvents(eventsResult.data));
    dispatch(setErrors(null));
    console.log(eventsResult)
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Unknown error';
    dispatch(setErrors(errorMessage));
  }
};

export const selectEvents = (state) => {
  return [state.events.events, state.events.errors];
};
export const selectSelectedEvent = (state) => {
  return state.events.selectedEvent;
};
//appel fct reducer 
export const addEventThunk = createAsyncThunk(
    'events/addEventRedux',
    async (eventData, { dispatch, rejectWithValue }) => {
      try {
        const response = await addEvent(eventData); // Your API call to add an event
        dispatch(addEventReducer(response.data));
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);
export const deleteEventThunk = createAsyncThunk(
    'events/deleteEventRedux',
    async (eventId, { rejectWithValue }) => {
      try {
        // Replace this with the actual API call to delete the event
        await deleteEvent(eventId);
        return eventId; // Return the deleted event's ID on success
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const {
  populateEvents,
  selectEvent,
  unselectEvent,
  setErrors,
  deleteEventReducer,
  updateEventReducer,
  addEventReducer,
} = eventsSlice.actions;
export default eventsSlice.reducer;