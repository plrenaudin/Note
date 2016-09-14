import Config from '../Config.js'
import IndexedAdapter from 'lokijs/build/loki-indexed-adapter.min.js'
import loki from 'lokijs'

const idbAdapter = new IndexedAdapter('loki')

var db, started

export default {
  connect(done) {
    if (started) return done()
    db = new loki('book', {
      autosave: true,
      autosaveInterval: Config.SAVE_INTERVAL_MS,
      adapter: idbAdapter
    })
    db.loadDatabase({}, () => {
      var entries = db.getCollection('entries')
      if (!entries) {
        entries = db.addCollection('entries')
      }
      started = true
      done();
    })
  },

  get() {
    return db.getCollection('entries')
  },

  save() {
    db.saveDatabase()
  },

  close(done) {
    if (started) {
      started = null
      db.close(done)
    }
  }
}