

class StateModel {
  static newState(_id,_name,_simple_state,_complex_state,_repeatable_state,_type,_statetype) {
    return {
      id: _id,
      name: _name,
      simple_state: _simple_state,
      complex_state: _complex_state,
      repeatable_state: _repeatable_state,
      type: _type,
      statetype: _statetype }
    }
    static newRepeatableState(_id,_name,_repeatable_state, _statetype) {
      return StateModel.newState(_id,_name,null,_repeatable_state,null,'REPEATABLE',_statetype)
    }
    static newSimpleState(_id,_name,_simple_state, _statetype) {
      return StateModel.newState(_id,_name,_simple_state,null,null,'SIMPLE',_statetype)
    }
    static newComplexState(_id,_name,_complex_state, _statetype) {
      return StateModel.newState(_id,_name,null,_complex_state,null,'COMPLEX', _statetype)
    }
  }

export default StateModel;
