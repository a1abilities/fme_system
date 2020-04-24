const Task = require('../models/task.js');

const add = async function (req, res, next) {
  console.log('task add body params..',req.body)
  console.log('task add decoded params..',req.decoded)

  const staffData = JSON.parse(req.body.data);

  let attachments = '';

  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });

  const taskParam = {
    // id : staffData.id,
    task_id : staffData.task_id,    
    task_description : staffData.task_description,
    assign_to_role: staffData.assign_to_role,
    assigned_to : staffData.assigned_to,
    due_date : staffData.due_date,
    message : staffData.message,
    document : attachments,
    user_id : req.decoded.user_id,
    created_by: req.decoded.id,
    creator_role : staffData.creator_role,
    msgId : 0,
    docId : 0,
    taskInsertId : 0,
    activity_description : '',
  };
  // console.log('taskparams..',taskParam);

  try {
    const newTask = new Task(taskParam);
    const taskInsertId = await newTask.addTask();
    // console.log('taskInsertId',taskInsertId);
    newTask.taskInsertId = taskInsertId.taskInsertId;
    
    if(taskParam.document !== "" && taskParam.document != undefined){
      const docInsertId = await newTask.addDocument();
      newTask.docId = docInsertId.docInsertId;
      // console.log('docInsertId',docInsertId);
    }
    if(taskParam.message !== "" && taskParam.message != undefined){
      const msgInsertId = await newTask.addMessage();
      newTask.msgId = msgInsertId.msgInsertId;
      // console.log('msgInsertId',msgInsertId);
    }

    newTask.activity_description = "New task added";  
    newTask.activity_status = 1;
    const taskActivityResult = await newTask.taskActivityCreate();
    // console.log('taskActivityResult',taskActivityResult);

    const taskList = await new Task({ user_id: req.decoded.user_id, userId: req.decoded.id }).all();
    res.send({ taskList });
  } catch (err) {
    next(err);
  }
};



const editTask = async function (req, res, next) {
  // console.log('task editTask body params..',req.body)
  // console.log('task editTask decoded params..',req.decoded)

  const staffData = JSON.parse(req.body.data);

  let attachments = '';

  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });

  const taskParam = {
    taskInsertId : staffData.id,    
    task_id : staffData.task_id,
    task_description : staffData.task_description,
    assign_to_role: staffData.assign_to_role,
    assigned_to : staffData.assigned_to,
    due_date : staffData.due_date,    
    status : staffData.status,
    message : staffData.message,
    document : attachments,
    user_id : req.decoded.user_id,
    created_by: req.decoded.id,
    updated_by: req.decoded.id,
    creator_role : staffData.creator_role,
    msgId : 0,
    docId : 0,
    lastDataState : staffData.lastDataState,
    activity_description : '',
    last_due_date : '',
    activity_id : staffData.lastDataState.activity_id,
  };
  console.log('taskparams..',taskParam);

  try {
    const newTask = new Task(taskParam);
    
    if(taskParam.document !== "" && taskParam.document != undefined){
      const docInsertId = await newTask.addDocument();
      newTask.docId = docInsertId.docInsertId;
      console.log('docInsertId',docInsertId);
    }
    if(taskParam.message !== "" && taskParam.message != undefined){
      const msgInsertId = await newTask.addMessage();
      newTask.msgId = msgInsertId.msgInsertId;
      console.log('msgInsertId',msgInsertId);
    }

    if(taskParam.lastDataState.assign_to_role_id != taskParam.assign_to_role || taskParam.lastDataState.assign_to != taskParam.assigned_to){
      
      const taskActivitySetLastIsActiveZero = await newTask.taskActivitySetLastIsActiveZero();

      newTask.activity_description = "assign to other";
      newTask.activity_status = 4; //"assign to other"

      newTask.last_due_date = taskParam.lastDataState.due_date;
      const taskActivityAssignToOther = await newTask.taskActivityAssignToOther(); 
      console.log('taskActivityAssignToOther',taskActivityAssignToOther);
      newTask.activity_id = taskActivityAssignToOther.insertId;

      if(taskParam.lastDataState.task_description !== taskParam.task_description){
        newTask.activity_description = "Change task Description";  
        newTask.activity_status = 2;  
        const taskActivitySetLastIsActiveZero = await newTask.taskActivitySetLastIsActiveZero();   
        const editTaskDescription = await newTask.editTaskDescription();
      }
    } 
    else if(taskParam.due_date != taskParam.lastDataState.due_date) {
      const taskActivitySetLastIsActiveZero = await newTask.taskActivitySetLastIsActiveZero();

      newTask.activity_description = "change due date";   
      newTask.activity_status = 5;   
      const taskActivityEdit = await newTask.taskActivityEdit();

      newTask.activity_id = taskActivityEdit.insertId;

      if(taskParam.lastDataState.task_description !== taskParam.task_description){
        newTask.activity_description = "Change task Description";    
        newTask.activity_status = 2; 
        const taskActivitySetLastIsActiveZero = await newTask.taskActivitySetLastIsActiveZero();   
        const editTaskDescription = await newTask.editTaskDescription();
      }
    }
    else if(newTask.msgId > 0 || newTask.docId > 0) {
      newTask.activity_description = "task Edited";
      newTask.activity_status = 6; 

      const taskActivitySetLastIsActiveZero = await newTask.taskActivitySetLastIsActiveZero();
      const taskActivityAddDocOrMsg = await newTask.taskActivityAddDocOrMsg();
      newTask.activity_id = taskActivityAddDocOrMsg.insertId;

      if(taskParam.lastDataState.task_description !== taskParam.task_description){
        newTask.activity_description = "Change task Description";    
        newTask.activity_status = 2; 

        const taskActivitySetLastIsActiveZero = await newTask.taskActivitySetLastIsActiveZero();   
        const editTaskDescription = await newTask.editTaskDescription();
      }
    } else {
      if(taskParam.lastDataState.task_description !== taskParam.task_description){
        newTask.activity_description = "Change task Description";    
        newTask.activity_status = 2; 

        const taskActivitySetLastIsActiveZero = await newTask.taskActivitySetLastIsActiveZero();   
        const editTaskDescription = await newTask.editTaskDescription();
      }
    }

    const taskList = await new Task({ user_id: req.decoded.user_id, userId: req.decoded.id }).all();
    res.send({ taskList });

  } catch (err) {
    next(err);
  }
};


const all = async function (req, res, next) {
  try {  
   const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).all();
   res.send({ taskList });
  } catch (err) {
    next(err);
  }
};



const staffUpdate = async function (req, res, next) {
  const staffData = JSON.parse(req.body.data);
  let attachments = '';

  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });
  const taskParam = {
    taskInsertId : staffData.id,
    task_id: staffData.task_id,
    message: staffData.message,
    status: staffData.status,
    document: attachments,
    assign_to_role : staffData.assign_to_role,
    assigned_to : staffData.assigned_to,
    due_date : staffData.due_date,
    start_date : staffData.start_date,
    reschedule_req_date : staffData.reschedule_req_date,
    last_due_date : staffData.last_due_date,

    user_id: req.decoded.user_id,
    created_by: req.decoded.id,

    msgId : 0,
    docId : 0,
    lastDataState : staffData.lastDataState,
    activity_description : '',
    activity_id : staffData.lastDataState.activity_id,
  };
  try {
    const newTask = new Task(taskParam);

    if(taskParam.document !== "" && taskParam.document != undefined){
      const docInsertId = await newTask.addDocument();
      newTask.docId = docInsertId.docInsertId;
      console.log('docInsertId',docInsertId);
    }
    if(taskParam.message !== "" && taskParam.message != undefined){
      const msgInsertId = await newTask.addMessage();
      newTask.msgId = msgInsertId.msgInsertId;
      console.log('msgInsertId',msgInsertId);
    }
    
    if(taskParam.status == 2){
      newTask.activity_description = "Task has been started by assignee";      
      newTask.activity_status = 3; 
    } else if(taskParam.status == 3){
      newTask.activity_description = "assignee request to reschedule task";
      newTask.activity_status = 7; 
    } else if(taskParam.status == 6){ 
      newTask.activity_description = "task completed";
      newTask.activity_status = 9; 
    } else if(newTask.msgId > 0 || newTask.docId > 0){
      newTask.activity_description = "task edited";
      newTask.activity_status = 6;       
    }


    const taskActivitySetLastIsActiveZero = await newTask.taskActivitySetLastIsActiveZero();
    const taskActivityUpdateByStaff = await newTask.taskActivityUpdateByStaff();

    const taskList = await new Task({ user_id: req.decoded.user_id, userId: req.decoded.id }).all();
    res.send({ taskList });

  } catch (err) {
    next(err);
  }
};



const reschedule = async function (req, res, next) {
  console.log('reschedule Req',req.body);

  const staffData = JSON.parse(req.body.data);
  let attachments = '';

  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });

  const taskParam = {

    taskInsertId : staffData.id,
    task_id : staffData.task_id,
    task_description : staffData.task_description,
    assign_to_role : staffData.assign_to_role,
    assigned_to : staffData.assigned_to,
    due_date : staffData.due_date,
    start_date : staffData.start_date,
    reschedule_req_date : staffData.reschedule_req_date,
    last_due_date : staffData.last_due_date,
    message : staffData.message,
    status : staffData.status,
    document : attachments,
    lastDataState : staffData.lastDataState, 
    msgId : 0,
    docId : 0,
    activity_description : '',
    activity_id : staffData.lastDataState.activity_id,

    user_id: req.decoded.user_id,
    created_by: req.decoded.id,
  };
  try {
    const newTask = new Task(taskParam);

    if(taskParam.document !== "" && taskParam.document != undefined){
      const docInsertId = await newTask.addDocument();
      newTask.docId = docInsertId.docInsertId;
      console.log('docInsertId',docInsertId);
    }
    if(taskParam.message !== "" && taskParam.message != undefined){
      const msgInsertId = await newTask.addMessage();
      newTask.msgId = msgInsertId.msgInsertId;
      console.log('msgInsertId',msgInsertId);
    }

    if(taskParam.lastDataState.assign_to_role_id != taskParam.assign_to_role || taskParam.lastDataState.assign_to != taskParam.assigned_to){
      const taskActivitySetLastIsActiveZero = await newTask.taskActivitySetLastIsActiveZero();      
      newTask.activity_description = "assign to other";
      newTask.activity_status = 4; 

      const taskActivityAssignToOther = await newTask.taskActivityAssignToOther();    
      console.log('taskActivityAssignToOther',taskActivityAssignToOther);
      // newTask.activity_id = taskActivityAssignToOther.insertId;
    } else {     
      const taskActivitySetLastIsActiveZero = await newTask.taskActivitySetLastIsActiveZero();   
      
      newTask.activity_description = "task rescheduled";  
      newTask.activity_status = 8; 
      const reschedule = await newTask.reschedule();
      console.log('reschedule',reschedule);
    }

    const taskList = await new Task({ user_id: req.decoded.user_id, userId: req.decoded.id }).all();
    res.send({ taskList });

  } catch (err) {
    next(err);
  }
};



const last = async function (req, res, next) {
  try {
    const taskLast = await new Task({ user_id: req.decoded.user_id }).last();
    
    res.send(taskLast);
  } catch (err) {
    next(err);
  }
};




const deleteTask = async function (req, res, next) {
  const taskParam = {
    activity_id: req.body.activity_id,    
    id: req.body.id,
    user_id: req.decoded.user_id,
    // updated_by: req.decoded.id,
  };
  try {
    const newTask = new Task(taskParam);
    await newTask.deleteTask();

    const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).all();
    res.send({ taskList });    
  } catch (err) {
    next(err);
  }
};





const getTaskHistory = async function (req, res, next) {
  console.log('history req.body',req.body)
  console.log('history req.decoded',req.decoded)
  const taskParam = {    

    taskInsertId : req.body.id,
    task_id : req.body.task_id,
    user_id : req.decoded.user_id,
    userId : req.decoded.id,
    assigned_to : req.body.assigned_to,
    assign_to_role : req.body.assign_to_role,
    task_created_by : req.body.task_created_by,
    creator_role : req.body.creator_role,    
    user_role : req.body.user_role,
  };

  try {
    const newTask = new Task(taskParam);
    const historyList = await newTask.getTaskHistory();
    res.send( historyList );
  } catch (err) {
    next(err);
  }
};



const getMsgList = async function (req, res, next) {

  const taskParam = {
    taskInsertId : req.body.id,
    user_id : req.decoded.user_id,
  };

  try {
    const newTask = new Task(taskParam);
    const msgList = await newTask.getMsgList();
    res.send( msgList );
  } catch (err) {
    next(err);
  }
};




const fetchAssignedTask = async function (req, res, next) {
  console.log('history req.body',req.body)
  console.log('history req.decoded',req.decoded)
  const taskParam = {    
    user_id : req.decoded.user_id,
    assigned_to : req.decoded.id,
    assign_to_role : req.body.assign_to_role,    
  };

  try {
    const newTask = new Task(taskParam);
    const fetchingList = await newTask.fetchAssignedTask();
    res.send( fetchingList );
  } catch (err) {
    next(err);
  }
};





// const rescheduledTaskList = async function (req, res, next) {
//   try {
//     const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).rescheduledTaskList();
//     res.send({ taskList });
//   } catch (err) {
//     next(err);
//   }
// };

// const assignToOther = async function (req, res, next) {
//   try {
//     const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).assignToOther();
//     res.send({ taskList });
//   } catch (err) {
//     next(err);
//   }
// };



// const completedList = async function (req, res, next) {
//   try {
//     const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).completedList();
//     res.send({ taskList });
//   } catch (err) {
//     next(err);
//   }
// };


// staff task list
// const staffTasks = async function (req, res, next) {
//   try {
//     const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).staffTasks();    
//     res.send({ taskList });
//   } catch (err) {
//     next(err);
//   }
// };






module.exports = { 
  add, 
  editTask, 
  all, 
  last, 
  deleteTask,
  reschedule, 
  getTaskHistory,
  staffUpdate,
  getMsgList,
  fetchAssignedTask,
  // completedList, staffTasks,  rescheduledTaskList, assignToOther 
};