

class StateModel {
  static newState(_id,_name,_simple_state,_complex_state,_repeatable_state) {
    return {
      id: _id,
      name: _name,
      simple_state: _simple_state,
      complex_state: _complex_state,
      repeatable_state: _repeatable_state}
    }
    static newSimpleState(_id,_name,_simple_state) {
      return StateModel.newState(_id,_name,_simple_state)
    }
  } 
