/* global beforeAll, describe, it, expect */

import Files from '../../src/common/Files.js'
import Database from '../../src/common/Database.js'
var entries;

describe('Files test', () => {
  beforeAll((done) => {
    Database.connect(()=>{
      entries = Database.get()
      entries.clear()
      done()
    })
  })

  it('Creates a New File only if there is not one already', (done) => {
    expect(entries.count()).toBe(0)
    Files.create(() => {
      expect(entries.count()).toBe(1)
      Files.create(() => {
        expect(entries.count()).toBe(1)
        done()
      })
    })
  })

  it('Edits the file', (done) => {
    var myFile = entries.get(1)
    expect(myFile.content).toBe('')
    expect(myFile.title).toBe('New File')
    myFile.content = "test";
    myFile.title = "New title"
    Files.save(myFile, (savedFile) => {
      expect(savedFile.title).toBe(myFile.title)
      expect(savedFile.content).toBe(myFile.content)
      done()
    })
  })

  it('Lists all files', (done) => {
    Files.listAll((list) => {
      expect(list.length).toBe(1)
      expect(list[0].content).toBe(entries.get(1).content)
      done()
    })
  })

  it('Deletes the file', (done) => {
    Files.deleteFile(1,() => {
      expect(entries.count()).toBe(0)
      done()
    })
  })

})
