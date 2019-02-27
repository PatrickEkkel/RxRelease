

class FileModel {
  static newFile(_id,_filename,_path) {
    return {
      id: _id,
      filename: _filename,
      path: _path,
      getFilename() { return this.filename},
      getPath() { return this.path}
     }
    }
  }

export default FileModel;
