

class StateTypeModel {
  static newStateType(_id, _name, _handler, _module,
     _dependentOn,_state_settings,_jobtype, _connection_credentials) {
    return {
      id: _id,
      name: _name,
      module: _module,
      handler: _handler,
      dependentOn: _dependentOn,
      state_settings: _state_settings,
      jobtype: _jobtype,
      connection_credentials: _connection_credentials,
      getConnectionCredentials() { return this.connection_credentials },
      getJobtype() { return this.jobtype },
      getStateSettings() { return this.state_settings },
      setStateSettings(state_settings) { this.state_settings = state_settings},
      getDependentOn() { return this.dependentOn },
      getHandler() { return this.handler },
      getName() { return this.name},
      getModule() { return this.module},
      getId() { return this.id},
      setId(value) { this.id = value; }

    }
  }
  static mapStateType(_model) {
    return StateTypeModel.newStateType(_model['id'],_model['name'],_model['handler'],_model['module'],_model['dependentOn'],_model['state_settings'],_model['jobtype'],null)
  }
}

export default StateTypeModel;
