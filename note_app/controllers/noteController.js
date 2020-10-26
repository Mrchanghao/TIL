const Notes = require('../models/noteModel');

const noteController = {
  getNotes: async (req, res) => {
    try {
      
      const notes = await Notes.find({user_id: req.user.id});

      res.json(notes);

    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
    
  },
  createNote: async (req, res) => {
    try {
      const {title, content, date} = req.body;
      
      const newNote = new Notes({
        title, 
        content,
        date,
        user_id: req.user.id,
        name: req.user.name,
      })
      // req.json({user_id: req.user_id, name: req.user.name})

      await newNote.save();
      res.json({msg: '노트 생성'})
    } catch (error) {
      
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Notes.findByIdAndDelete(req.params.id);
      res.json({msg: '노트 삭제 완료'})

    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  updateNote: async (req, res) => {
    try {
      const {title, content } = req.body;
      await Notes.findOneAndUpdate({
        _id: req.params.id,
      }, {
        title: title,
        content: content,
      });

      res.json({msg: '노트 내용이 변경 되었습니다.'})

    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },

  getNote: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      if (!note) return res.status(400).json({msg: '해당 노트가 존재 하지 않습니다,'})
      res.json(note)
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  }

};


module.exports = noteController;