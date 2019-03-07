export const fsm = (function () {
  function _Constuctor () {
    var fs = require('fs')
    var {dialog} = require('electron').remote
    var dirTree = require('directory-tree')
    // const tree = dirTree('/some/path');
    function saveContentToFile (fileContent, onComplete, onError) {
      let content = fileContent
      dialog.showSaveDialog((filename) => {
        if (filename === undefined) {
          if (onError !== undefined) {
            onError()
          }
          return
        }
        fs.writeFile(filename, content, (err) => {
          if (err) {
            if (onError !== undefined) {
              onError(err)
            }
            return
          }
          if (onComplete !== undefined) {
            onComplete(filename)
          }
        })
      })
    }
    function readSelectedFile (onComplete, onError) {
      dialog.showOpenDialog((files) => {
        if (files === undefined) {
          if (onError !== undefined) {
            onError()
          }
          return
        }
        fs.readFile(files[0], 'utf-8', (err, data) => {
          if (err) {
            if (onError !== undefined) {
              onError(err)
            }
            return
          }
          if (onComplete !== undefined) {
            onComplete(data, files[0])
          }
        })
      })
    }
    function overwriteFile (filePath, content, onComplete, onError) {
      fs.writeFile(filePath, content, (err) => {
        if (err) {
          if (onError !== undefined) {
            onError(err)
          }
          return
        }
        if (onComplete !== undefined) {
          onComplete(filePath)
        }
      })
    }
    function deleteFile (filePath, onComplete, onError) {
      if (!fs.existsSync(filePath)) {
        if (onError !== undefined) {
          onError()
        }
        return
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          if (onError !== undefined) {
            onError(err)
          }
          return
        }
        if (onComplete !== undefined) {
          onComplete(filePath)
        }
      })
    }
    function openFolder (onComplete, manifest) {
      dialog.showOpenDialog({title: 'dir', properties: ['openDirectory']}, (files) => {
        // console.log(files);
        // if (files === undefined) {
        //   if (onError !== undefined) {
        //     onError()
        //   }
        //   return
        // }
        getFilesInFolder(files[0], onComplete, manifest)
      })
    }

    function openFolderWithSizes (onComplete, manifest) {
      dialog.showOpenDialog({title: 'dir', properties: ['openDirectory']}, (files) => {
        // console.log(files);
        // if (files === undefined) {
        //   if (onError !== undefined) {
        //     onError()
        //   }
        //   return
        // }
        getFilesInFolderWithFileSize(files[0], onComplete, manifest)
      })
    }
    function isFolder (pathToItem) {
      var archive = false
      var isFolder = false
      var exensions = ['zip', 'zip7', 'gzip', 'asar', 'dbmdl', 'db']
      for (var i = 0; i < exensions.length; i++) {
        if (pathToItem.split('.')[pathToItem.split('.').length - 1] === exensions[i]) {
          archive = true
        }
      }
      if (!archive) {
        isFolder = fs.lstatSync(pathToItem).isDirectory()
      }
      return isFolder
    }

    function getSize (pathToItem) {
      return fs.lstatSync(pathToItem)['size']
    }
    function makeFilePath (dir, name) {
      return dir + '\\' + name
    }
    function getFilesInFolder (folderPath, onComplete, manifest) {
      // var allFiles = {dir: folderPath, filenames: []};
      var allFiles = []
      fs.readdirSync(folderPath).forEach(file => {
        // allFiles.filenames.push(file);
        allFiles.push(makeFilePath(folderPath, file))
        if (manifest !== undefined) {
          manifest.push(makeFilePath(folderPath, file))
          if (isFolder(makeFilePath(folderPath, file))) {
            getFilesInFolder(makeFilePath(folderPath, file), undefined, manifest)
          }
        }
      })
      if (onComplete !== undefined) {
        if (manifest !== undefined) {
          onComplete(manifest)
        } else {
          onComplete(allFiles)
        }
      }
    }
    function getFilesInFolderWithFileSize (folderPath, onComplete, manifest) {
      // var allFiles = {dir: folderPath, filenames: []};
      if (onComplete !== undefined) {
        // onComplete(allFiles)
        onComplete(dirTree(folderPath))
      }
      // var targetFolderSize = getSize(folderPath)
      // if (manifest === undefined) {
      //   manifest = {}
      // }
      // manifest.size = targetFolderSize
      // manifest.path = folderPath
      // manifest.files = []
      // manifest.isFolder = true
      // fs.readdirSync(folderPath).forEach(file => {
      //   var size = getSize(makeFilePath(folderPath, file))
      //   manifest.size += size
      //   var folder = isFolder(makeFilePath(folderPath, file))
      //   manifest.files.push({size: size, path: makeFilePath(folderPath, file), isFolder: folder})
      //   if (isFolder(makeFilePath(folderPath, file))) {
      //     getFilesInFolderWithFileSize(makeFilePath(manifest.path, file), undefined, manifest.files[manifest.files.length - 1])
      //   }
      // })
      // if (onComplete !== undefined) {
      //   // onComplete(allFiles)
      //   onComplete(manifest)
      // }
    }
    function copyFile (filePath, targetPath) {
      fs.createReadStream(filePath).pipe(fs.createWriteStream(targetPath))
    }
    this.saveAs = function (fileContent, onComplete, onError) {
      saveContentToFile(fileContent, onComplete, onError)
    }
    this.selectFile = function (onComplete, onError) {
      readSelectedFile(onComplete, onError)
    }
    this.save = function (filePath, content, onComplete, onError) {
      overwriteFile(filePath, content, onComplete, onError)
    }
    this.delete = function (filePath, onComplete, onError) {
      deleteFile(filePath, onComplete, onError)
    }
    this.selectFolder = function (onComplete, manifest) {
      openFolder(onComplete, manifest)
    }
    this.selectFolderWithSizes = function (onComplete, manifest) {
      openFolderWithSizes(onComplete, manifest)
    }
    this.readFolder = function (folderPath, onComplete, manifest) {
      getFilesInFolder(folderPath, onComplete, manifest)
    }
    this.copy = function (filePath, targetPath) {
      copyFile(filePath, targetPath)
    }
    this.size = function (filePath) {
      return getSize(filePath)
    }
    this.isDir = function (filePath) {
      return isFolder(filePath)
    }
  }
  return new _Constuctor()
})()
