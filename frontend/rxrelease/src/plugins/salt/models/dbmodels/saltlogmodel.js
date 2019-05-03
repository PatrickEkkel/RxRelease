

class SaltLogModel {

  static newSaltLogModel(_id,_minion_id,_saltstate,_duration,_comment,_start_date,
  _start_time,_run_num,_changes,_sls,_result,_test,_type) {
    return {
      id: _id,
      minion_id: _minion_id,
      saltstate: _saltstate,
      duration: _duration,
      comment: _comment,
      start_time: _start_time,
      start_date: _start_date,
      run_num: _run_num,
      changes: _changes,
      result: _result,
      sls: _sls,
      test: _test,
      type: _type,
      getId() { return this.id},
      getSaltState() { return this.saltstate },
      getMinion() { return this.minion_id },
      getType() { return this.type },
      getDuration() { return this.duration },
      getComment() { return this.comment },
      getStartdate() { return this.start_date },
      getStartTime() { return this.start_time },
      getSls() { return this.sls }
    }
  }
}

export default SaltLogModel;
