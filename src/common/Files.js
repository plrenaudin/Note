import Database from './Database.js'


export default {
  create(cb) {
    Database.connect(() => {
      var file = {
          title: 'New File',
          content: ''
      }
      var result = Database.get().find(file)
      if (result.length < 1) {
        cb(Database.get().insert(file))
      } else {
        cb(result[0])
      }
    })
  },

  save(file, cb) {
    Database.connect(() => {
      let savedFile
      if (file.$loki) {
        savedFile = Database.get().update(file)
      } else {
        savedFile = Database.get().insert(file)
      }
      Database.save()
      cb(savedFile)
    })
  },

  load(id, cb) {
    Database.connect(() => {
      cb(Database.get().get(id))
    })
  },

  deleteFile(id, cb) {
    Database.connect(() => {
      Database.get().remove({ "$loki": id })
      cb()
    })
  },

  listAll(cb) {
    Database.connect(() => {
      cb(Database.get().find())
    })
  },

  openFirst(cb) {
    Database.connect(() => {
      if (Database.get().count() > 0) {
        let entry = Database.get().find()[0]
        cb(entry)
      } else {
        this.create(cb)
      }
    })
  }
}
