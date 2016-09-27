import IndexedAdapter from 'lokijs/build/loki-indexed-adapter.min.js'
import loki from 'lokijs'

const idbAdapter = new IndexedAdapter('loki')

var db, started, loading, entries

export default {
  connect(done) {
    if (started) {
      return done()
    }

    //defer callback (avoid multiple instantiations)
    if (loading) {
      setTimeout(() => { this.connect(done) }, 150)
      return
    }
    loading = true
    db = new loki('book', {
      autosave: true,
      autoload: true,
      autoloadCallback : loadHandler,
      adapter: idbAdapter
    })
    function loadHandler() {
      //create main collection if not exist
      entries = db.getCollection('entries')
      if (!entries) {
        entries = db.addCollection('entries')
      }
      started = true
      loading = false
      done()
    }
  },

  get() {
    return entries
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