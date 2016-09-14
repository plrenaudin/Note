import Database from './Database.js'


export default {
  create(cb) {
    Database.connect(() => {
      var file = {
          title: 'New File',
          content: ''
      }
      cb(Database.get().insert(file))
    })
  },

  save(file) {
    Database.connect(() => {
      if (file.$loki) {
        Database.get().update(file)
      } else {
        Database.get().insert(file)
      }
      Database.save()
    })
  },

  load(id) {
    return Database.get().get(id)
  },

  deleteFile(id) {
    Database.connect(() => {
      Database.get().remove({ "$loki": id })
    })
  },

  listAll(cb) {
    Database.connect(() => {
      cb(Database.get().find())
    })
  },

  openFirst(cb) {
    Database.connect(() => {
      if (Database.get().count > 0) {
        cb(Database.get().find()[0])
      } else {
        this.create(cb)
      }
    })
  }
}