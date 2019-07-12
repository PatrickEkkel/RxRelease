

class FileModel {

  static newFile(_id, _filename, _path) {
    return {
      id: _id,
      filename: _filename,
      path: _path,
      getId() { return this.id },
      getFilename() { return this.filename},
      getPath() { return this.path},
      toJson() { return { 'id': this.id, 'filename': this.filename, 'path': this.path}}
     }
    }
  }

export default FileModel;
