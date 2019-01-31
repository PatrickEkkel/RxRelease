

class StateModel {
  static newState(_id,_name,_simple_state,_complex_state,_repeatable_state,_type) {
    return {
      id: _id,
      name: _name,
      simple_state: _simple_state,
      complex_state: _complex_state,
      repeatable_state: _repeatable_state,
      type: _type }
    }
    static newRepeatableState(_id,_name,_repeatable_state) {
      return StateModel.newState(_id,_name,null,_repeatable_state,null,'REPEATABLE')
    }
    static newSimpleState(_id,_name,_simple_state) {
      return StateModel.newState(_id,_name,_simple_state,null,null,'SIMPLE')
    }
  }

export default StateModel;
