
import express from 'express';
const router = express.Router();


// 모든 할 일 가져오기
router.get('/', async (req, res) => {
    // const todos = await req.db.collection('todos').find().toArray();
    // res.json(todos);
    console.log('???');
    res.send('???');
});

// 특정 할 일 가져오기
// router.get('/:id', async (req, res) => {
//     const todo = await req.db.collection('todos').findOne({ _id: new ObjectId(req.params.id) });
//     if (!todo) return res.status(404).json({ error: '할 일을 찾을 수 없습니다.' });
//     res.json(todo);
// });

// 할 일 추가하기
// router.post('/', async (req, res) => {
//     const newTodo = { title: req.body.title, completed: false };
//     const result = await req.db.collection('todos').insertOne(newTodo);
//     res.status(201).json({ _id: result.insertedId, ...newTodo });
// });

export default router; // ✅ router 객체를 내보냄