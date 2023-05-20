import { createSlice } from '@reduxjs/toolkit'


export const appSlice = createSlice({
  name: 'app',
  initialState: {
    reloadTable: false,
    params: {},
    searcherParams: {},
    rows: [],
    ready: true,
    infoPagination: {}
  },
  reducers: {
    reloadTable: (state) => {
      state.reloadTable = !state.reloadTable
    },
    setQueryParamas: (state, action) => {
      state.ready = false
      state.params = action.payload
      state.ready = true
    },
    setInfoPagination: (state, action) => {
      state.ready = false
      state.infoPagination = action.payload
      state.ready = true
    },
    setSearcherParams: (state, action) => {
      state.ready = false
      state.searcherParams = action.payload
      state.ready = true
    },
    setRows: (state, action) => {
      state.ready = false
      state.rows = action.payload
      state.ready = true
    },
    setReady: (state, action) => {
      state.ready = action.payload
    }
  },
})

export const { reloadTable, setQueryParamas, setSearcherParams, setRows, setReady } = appSlice.actions

export default appSlice.reducer
